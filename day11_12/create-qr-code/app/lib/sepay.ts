import { PaymentInfo, SePayWebhookPayload, SePayConfig } from './sepay.types';

/**
 * Lấy cấu hình SePay từ environment variables
 */
export function getSePayConfig(): SePayConfig {
    const apiToken = process.env.SEPAY_API_TOKEN;
    const accountNumber = process.env.SEPAY_ACCOUNT_NUMBER;
    const accountName = process.env.SEPAY_ACCOUNT_NAME || 'Senlyzer';
    const bankBin = process.env.SEPAY_BANK_BIN || '970422'; // Default: MB Bank
    const bankName = process.env.SEPAY_BANK_NAME || 'MB Bank';

    if (!apiToken || !accountNumber) {
        throw new Error('SePay configuration is missing. Please check .env.local file.');
    }

    return {
        apiToken,
        accountNumber,
        accountName,
        bankBin,
        bankName,
    };
}

/**
 * Tạo mã thanh toán duy nhất
 * Format: PAY + timestamp(base36) + random
 * VD: PAY1A2B3C4D5E
 */
export function generatePaymentCode(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `PAY${timestamp}${random}`;
}

/**
 * Tạo nội dung chuyển khoản
 * Format: {paymentCode} {description}
 */
export function generateTransferContent(paymentCode: string, description?: string): string {
    if (description) {
        return `${paymentCode} ${description}`;
    }
    return paymentCode;
}

/**
 * Tạo URL QR Code VietQR
 * @param accountNumber Số tài khoản
 * @param bankBin Mã BIN ngân hàng
 * @param amount Số tiền
 * @param content Nội dung chuyển khoản
 * @param accountName Tên chủ tài khoản
 * @returns URL của QR code
 */
export function generateVietQRUrl(
    accountNumber: string,
    bankBin: string,
    amount: number,
    content: string,
    accountName?: string
): string {
    const baseUrl = 'https://img.vietqr.io/image';
    const template = 'compact2'; // compact, compact2, qr_only, print

    let url = `${baseUrl}/${bankBin}-${accountNumber}-${template}.png`;
    url += `?amount=${amount}`;
    url += `&addInfo=${encodeURIComponent(content)}`;

    if (accountName) {
        url += `&accountName=${encodeURIComponent(accountName)}`;
    }

    return url;
}

/**
 * Tạo thông tin thanh toán đầy đủ
 * @param amount Số tiền cần thanh toán
 * @param description Mô tả đơn hàng (optional)
 * @param expiresInMinutes Thời gian hết hạn (phút), default: 15 phút
 */
export function createPaymentInfo(
    amount: number,
    description?: string,
    expiresInMinutes: number = 15
): PaymentInfo {
    const config = getSePayConfig();
    const paymentCode = generatePaymentCode();
    const content = generateTransferContent(paymentCode, description);
    const qrCode = generateVietQRUrl(
        config.accountNumber,
        config.bankBin || '970422',
        amount,
        content,
        config.accountName
    );

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + expiresInMinutes);

    return {
        paymentCode,
        amount,
        accountNumber: config.accountNumber,
        accountName: config.accountName || '',
        bankBin: config.bankBin || '970422',
        bankName: config.bankName || 'MB Bank',
        content,
        qrCode,
        expiresAt,
    };
}

/**
 * Kiểm tra mã thanh toán có trong nội dung chuyển khoản không
 * @param transactionContent Nội dung giao dịch
 * @param paymentCode Mã thanh toán cần check
 */
export function isPaymentCodeMatch(transactionContent: string, paymentCode: string): boolean {
    const normalizedContent = transactionContent.toUpperCase().trim();
    const normalizedCode = paymentCode.toUpperCase().trim();
    return normalizedContent.includes(normalizedCode);
}

/**
 * Validate webhook payload từ SePay
 * @param payload Webhook payload
 * @returns true nếu hợp lệ
 */
export function validateWebhookPayload(payload: SePayWebhookPayload): boolean {
    // Kiểm tra các trường bắt buộc
    if (!payload.id || !payload.gateway || !payload.transaction_date) {
        return false;
    }

    if (!payload.account_number || !payload.reference_number) {
        return false;
    }

    // Kiểm tra số tiền phải > 0
    if (payload.amount_in <= 0 && payload.amount_out <= 0) {
        return false;
    }

    return true;
}

/**
 * Parse mã thanh toán từ nội dung giao dịch
 * Tìm pattern PAYxxxxxxxxx trong nội dung
 */
export function extractPaymentCode(transactionContent: string): string | null {
    const content = transactionContent.toUpperCase();
    const match = content.match(/PAY[A-Z0-9]{8,15}/);
    return match ? match[0] : null;
}

/**
 * Kiểm tra giao dịch có phải là tiền vào không
 */
export function isMoneyIn(payload: SePayWebhookPayload): boolean {
    return payload.amount_in > 0;
}

/**
 * Lấy số tiền từ webhook payload
 */
export function getTransactionAmount(payload: SePayWebhookPayload): number {
    return isMoneyIn(payload) ? payload.amount_in : payload.amount_out;
}

/**
 * Format số tiền VNĐ
 * VD: 50000 -> "50,000 VNĐ"
 */
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
}

/**
 * Kiểm tra giao dịch có hợp lệ với đơn hàng không
 * @param payload Webhook payload
 * @param expectedAmount Số tiền mong đợi
 * @param paymentCode Mã thanh toán
 */
export function isTransactionValid(
    payload: SePayWebhookPayload,
    expectedAmount: number,
    paymentCode: string
): boolean {
    // Phải là tiền vào
    if (!isMoneyIn(payload)) {
        return false;
    }

    // Số tiền phải khớp
    const transactionAmount = getTransactionAmount(payload);
    if (transactionAmount < expectedAmount) {
        return false;
    }

    // Mã thanh toán phải có trong nội dung
    if (!isPaymentCodeMatch(payload.transaction_content, paymentCode)) {
        return false;
    }

    return true;
}
