import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import { Payment, User, WebhookLog } from '@/app/lib/models';
import { SePayWebhookPayload } from '@/app/lib/sepay.types';
import {
    validateWebhookPayload,
    isMoneyIn,
    getTransactionAmount,
    extractPaymentCode,
} from '@/app/lib/sepay';

import { updatePaymentStatus } from '@/app/lib/payment-store';
import { PaymentStatus } from '@/app/lib/sepay.types';

const processedTransactions = new Set<number>();

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        // 1. Parse request body
        const payload: SePayWebhookPayload = await request.json();

        // LOG ALL HITS TO DB FOR DIAGNOSTICS
        await WebhookLog.create({ body: payload });

        console.log('📨 Received SePay webhook:', {
            id: payload.id,
            gateway: payload.gateway,
            amount: payload.amount_in,
            content: payload.transaction_content,
            date: payload.transaction_date,
        });

        // 2. Validate webhook payload
        if (!validateWebhookPayload(payload)) {
            console.error(' Invalid webhook payload');
            return NextResponse.json(
                { error: 'Invalid webhook payload' },
                { status: 400 }
            );
        }

        // 3. Kiểm tra duplicate transaction
        if (processedTransactions.has(payload.id)) {
            console.log(' Duplicate transaction, skipping:', payload.id);
            return NextResponse.json(
                { message: 'Transaction already processed' },
                { status: 200 }
            );
        }

        // 4. Chỉ xử lý giao dịch TIỀN VÀO
        if (!isMoneyIn(payload)) {
            console.log(' Skipping money out transaction:', payload.id);
            return NextResponse.json(
                { message: 'Money out transaction ignored' },
                { status: 200 }
            );
        }

        // 5. Extract payment code từ nội dung chuyển khoản
        const paymentCode = extractPaymentCode(payload.transaction_content);

        if (!paymentCode) {
            console.log(' No payment code found in transaction content');
            return NextResponse.json(
                { message: 'No payment code found' },
                { status: 200 }
            );
        }

        // 6. Lấy thông tin giao dịch
        const amount = getTransactionAmount(payload);

        console.log('Valid payment detected:', {
            paymentCode,
            amount,
            referenceNumber: payload.reference_number,
        });

        // 7. Xử lý thanh toán
        await processPayment({
            paymentCode,
            amount,
            sePayTransactionId: payload.id,
            referenceNumber: payload.reference_number,
            gateway: payload.gateway,
            transactionDate: payload.transaction_date,
            transactionContent: payload.transaction_content,
        });

        // 8. Đánh dấu transaction đã xử lý
        processedTransactions.add(payload.id);

        // 9. Response success về SePay
        return NextResponse.json(
            {
                success: true,
                message: 'Payment processed successfully',
                data: {
                    paymentCode,
                    amount,
                    transactionId: payload.id,
                },
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('💥 Error processing webhook:', error);

        // Return 500 để SePay retry
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

/**
 * GET /api/sepay-webhook
 * Health check endpoint
 */
export async function GET() {
    return NextResponse.json({
        status: 'ok',
        message: 'SePay webhook endpoint is ready',
        timestamp: new Date().toISOString(),
    });
}

/**
 * Xử lý thanh toán
 * TODO: Implement logic cụ thể theo business của bạn
 */
async function processPayment(data: {
    paymentCode: string;
    amount: number;
    sePayTransactionId: number;
    referenceNumber: string;
    gateway: string;
    transactionDate: string;
    transactionContent: string;
}) {
    console.log('[Webhook] Processing payment in DB:', data.paymentCode);

    try {
        await dbConnect();

        // 1. Cập nhật trạng thái Payment
        console.log(`[Webhook] Updating payment record for: ${data.paymentCode.toUpperCase()}`);
        const payment = await Payment.findOneAndUpdate(
            { paymentCode: data.paymentCode.toUpperCase() },
            {
                status: 'completed',
                sePayTransactionId: data.sePayTransactionId,
                referenceNumber: data.referenceNumber
            },
            { new: true }
        );

        if (!payment) {
            console.error('[Webhook] ❌ Payment record not found in DB for code:', data.paymentCode.toUpperCase());
            // Vẫn nên đánh dấu là xong để tránh loop, hoặc throw tùy logic
            return;
        }

        console.log(`[Webhook] Found payment for user: ${payment.userId}. Updating subscription to ${payment.plan}`);

        // 2. Cập nhật thông tin User (Subscription & Lượt dùng)
        const plan = payment.plan;
        let qrLimit = 10; // Free
        if (plan === 'pro') qrLimit = 1000;
        if (plan === 'business') qrLimit = 10000;

        await User.findOneAndUpdate(
            { email: payment.userId },
            {
                subscriptionStatus: plan,
                qrLimit: qrLimit,
                // Có thể reset qrUsageCount nếu là nâng cấp mới
                lastPaymentId: payment._id
            }
        );

        console.log(`✅ Payment & User updated: ${payment.userId} is now ${plan} with ${qrLimit} limit`);

    } catch (error) {
        console.error('❌ Error in processPayment DB logic:', error);
        throw error; // Rethrow để webhook có thể retry
    }
}
