/**
 * SePay TypeScript Type Definitions
 * Định nghĩa các types cho SePay webhook và payment
 */

/**
 * Webhook payload từ SePay khi có giao dịch
 */
export interface SePayWebhookPayload {
    id: number; // ID giao dịch duy nhất
    gateway: string; // Tên ngân hàng (VD: "MB Bank", "Vietcombank")
    transaction_date: string; // Ngày giờ giao dịch (format: "YYYY-MM-DD HH:mm:ss")
    account_number: string; // Số tài khoản nhận tiền
    sub_account?: string; // Tài khoản ảo (Virtual Account) nếu có
    amount_in: number; // Số tiền chuyển vào (VNĐ)
    amount_out: number; // Số tiền chuyển ra (VNĐ)
    accumulated: number; // Số dư tích lũy
    code: string | null; // Mã thanh toán được parse từ nội dung chuyển khoản
    transaction_content: string; // Nội dung gốc của giao dịch
    reference_number: string; // Số tham chiếu từ ngân hàng
    body: string; // Nội dung rút gọn
    bank_brand_name?: string; // Tên thương hiệu ngân hàng
}

/**
 * Thông tin thanh toán được tạo cho đơn hàng
 */
export interface PaymentInfo {
    paymentCode: string; // Mã thanh toán duy nhất
    amount: number; // Số tiền cần thanh toán (VNĐ)
    accountNumber: string; // Số tài khoản nhận
    accountName: string; // Tên chủ tài khoản
    bankBin: string; // Mã BIN ngân hàng
    bankName: string; // Tên ngân hàng
    content: string; // Nội dung chuyển khoản
    qrCode: string; // URL QR code VietQR
    expiresAt: Date; // Thời gian hết hạn
}

/**
 * Trạng thái thanh toán
 */
export enum PaymentStatus {
    PENDING = "pending", // Đang chờ thanh toán
    COMPLETED = "completed", // Đã thanh toán thành công
    EXPIRED = "expired", // Đã hết hạn
    CANCELLED = "cancelled", // Đã hủy
}

/**
 * Thông tin đơn hàng/giao dịch
 */
export interface Transaction {
    id: string; // ID đơn hàng/giao dịch
    paymentCode: string; // Mã thanh toán
    amount: number; // Số tiền
    status: PaymentStatus; // Trạng thái
    createdAt: Date; // Ngày tạo
    paidAt?: Date; // Ngày thanh toán (nếu đã thanh toán)
    sePayTransactionId?: number; // ID giao dịch từ SePay
    referenceNumber?: string; // Số tham chiếu ngân hàng
}

/**
 * Response từ SePay API
 */
export interface SePayApiResponse<T = any> {
    status: number;
    messages: string;
    data: T;
}

/**
 * Cấu hình SePay
 */
export interface SePayConfig {
    apiToken: string; // API Token từ SePay
    accountNumber: string; // Số tài khoản ngân hàng
    accountName?: string; // Tên chủ tài khoản
    bankBin?: string; // Mã BIN ngân hàng
    bankName?: string; // Tên ngân hàng
}
