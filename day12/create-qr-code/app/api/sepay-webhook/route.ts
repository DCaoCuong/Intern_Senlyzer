import { NextRequest, NextResponse } from 'next/server';
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
        // 1. Parse request body
        const payload: SePayWebhookPayload = await request.json();

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
    console.log('🔄 Processing payment:', data);

    // TODO: Implement your business logic here (Save to DB, etc.)

    // Cập nhật trạng thái vào in-memory store để frontend có thể poll
    updatePaymentStatus(data.paymentCode, PaymentStatus.COMPLETED);

    console.log('✅ Payment marked as COMPLETED for code:', data.paymentCode);

    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 100));
}
