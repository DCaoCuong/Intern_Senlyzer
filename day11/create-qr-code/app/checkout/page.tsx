"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function CheckoutPage() {
    const [selectedPlan] = useState({
        name: "Pro",
        price: "$3",
        period: "/month",
        originalPrice: "$6",
        discount: "50% OFF",
        features: [
            "1,000 QR generations/month",
            "Custom branded QR codes",
            "PNG & SVG formats",
            "Priority support",
            "API access",
        ],
    });

    const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "bank_transfer">("card");
    const [paymentInfo, setPaymentInfo] = useState<any>(null);
    const [isLoadingPayment, setIsLoadingPayment] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState<"pending" | "checking" | "completed">("pending");

    // Generate payment info when bank transfer is selected
    useEffect(() => {
        if (paymentMethod === "bank_transfer" && !paymentInfo) {
            generatePaymentInfo();
        }
    }, [paymentMethod]);

    // Check payment status periodically
    useEffect(() => {
        if (paymentStatus === "checking") {
            const interval = setInterval(() => {
                checkPaymentStatus();
            }, 3000); // Check every 3 seconds

            return () => clearInterval(interval);
        }
    }, [paymentStatus]);

    const generatePaymentInfo = async () => {
        setIsLoadingPayment(true);
        try {
            // In a real app, you would call your API to generate payment info
            // For now, we'll generate it client-side
            const paymentCode = generatePaymentCode();
            const amount = 50000; // Example: 50,000 VND
            const accountNumber = process.env.NEXT_PUBLIC_SEPAY_ACCOUNT_NUMBER || "0123456789";
            const accountName = process.env.NEXT_PUBLIC_SEPAY_ACCOUNT_NAME || "SENLYZER";
            const bankBin = process.env.NEXT_PUBLIC_SEPAY_BANK_BIN || "970422";
            const bankName = process.env.NEXT_PUBLIC_SEPAY_BANK_NAME || "MB Bank";

            const content = `${paymentCode} Thanh toan goi Pro`;
            const qrCodeUrl = `https://img.vietqr.io/image/${bankBin}-${accountNumber}-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(content)}&accountName=${encodeURIComponent(accountName)}`;

            setPaymentInfo({
                paymentCode,
                amount,
                accountNumber,
                accountName,
                bankName,
                content,
                qrCodeUrl,
            });
        } catch (error) {
            console.error("Error generating payment info:", error);
        } finally {
            setIsLoadingPayment(false);
        }
    };

    const generatePaymentCode = () => {
        const timestamp = Date.now().toString(36).toUpperCase();
        const random = Math.random().toString(36).substring(2, 5).toUpperCase();
        return `PAY${timestamp}${random}`;
    };

    const checkPaymentStatus = async () => {
        // In a real app, you would call your API to check payment status
        // For demo purposes, we'll simulate a random success after some time
        console.log("Checking payment status...");
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // You could add a toast notification here
        alert("Đã copy vào clipboard!");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="border-b border-gray-200 bg-white">
                <div className="container mx-auto px-4">
                    <nav className="flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#F37221] to-[#d96316] rounded-lg flex items-center justify-center">
                                <svg
                                    className="w-5 h-5 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                                    />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-gray-900">QR Bank</span>
                        </Link>
                        <div className="text-sm text-gray-500">
                            <svg className="w-5 h-5 inline mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Secure Checkout
                        </div>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-6xl mx-auto">
                    {/* Page Title */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Purchase</h1>
                        <p className="text-gray-600">You're just one step away from upgrading your account</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column - Payment Form */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Payment Method */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <svg className="w-6 h-6 text-[#F37221]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                    Payment Method
                                </h2>

                                <div className="space-y-3">
                                    {/* Credit Card */}
                                    <button
                                        onClick={() => setPaymentMethod("card")}
                                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${paymentMethod === "card"
                                            ? "border-[#F37221] bg-orange-50"
                                            : "border-gray-200 hover:border-gray-300"
                                            }`}
                                    >
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "card" ? "border-[#F37221]" : "border-gray-300"
                                            }`}>
                                            {paymentMethod === "card" && (
                                                <div className="w-3 h-3 rounded-full bg-[#F37221]" />
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg className="w-8 h-6" viewBox="0 0 48 32" fill="none">
                                                <rect width="48" height="32" rx="4" fill="#1434CB" />
                                                <circle cx="18" cy="16" r="8" fill="#EB001B" />
                                                <circle cx="30" cy="16" r="8" fill="#F79E1B" />
                                            </svg>
                                            <span className="font-semibold text-gray-900">Credit / Debit Card</span>
                                        </div>
                                    </button>

                                    {/* PayPal */}
                                    <button
                                        onClick={() => setPaymentMethod("paypal")}
                                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${paymentMethod === "paypal"
                                            ? "border-[#F37221] bg-orange-50"
                                            : "border-gray-200 hover:border-gray-300"
                                            }`}
                                    >
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "paypal" ? "border-[#F37221]" : "border-gray-300"
                                            }`}>
                                            {paymentMethod === "paypal" && (
                                                <div className="w-3 h-3 rounded-full bg-[#F37221]" />
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg className="w-20 h-6" viewBox="0 0 100 32" fill="none">
                                                <path d="M12 8h8c4 0 6 2 6 6s-2 6-6 6h-4l-1 6H11l3-18z" fill="#003087" />
                                                <path d="M16 14h8c4 0 6 2 6 6s-2 6-6 6h-4l-1 6H15l3-18z" fill="#009CDE" />
                                            </svg>
                                            <span className="font-semibold text-gray-900">PayPal</span>
                                        </div>
                                    </button>

                                    {/* Bank Transfer */}
                                    <button
                                        onClick={() => setPaymentMethod("bank_transfer")}
                                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${paymentMethod === "bank_transfer"
                                            ? "border-[#F37221] bg-orange-50"
                                            : "border-gray-200 hover:border-gray-300"
                                            }`}
                                    >
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "bank_transfer" ? "border-[#F37221]" : "border-gray-300"
                                            }`}>
                                            {paymentMethod === "bank_transfer" && (
                                                <div className="w-3 h-3 rounded-full bg-[#F37221]" />
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                            <div className="text-left">
                                                <span className="font-semibold text-gray-900 block">Chuyển khoản ngân hàng</span>
                                                <span className="text-xs text-gray-500">Quét mã QR hoặc chuyển khoản thủ công</span>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {/* Card Details Form (only show if card selected) */}
                            {paymentMethod === "card" && (
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Card Details</h2>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Card Number
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="1234 5678 9012 3456"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#F37221] focus:ring-1 focus:ring-[#F37221] transition-colors"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Expiry Date
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="MM/YY"
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#F37221] focus:ring-1 focus:ring-[#F37221] transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    CVV
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="123"
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#F37221] focus:ring-1 focus:ring-[#F37221] transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Cardholder Name
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="John Doe"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#F37221] focus:ring-1 focus:ring-[#F37221] transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Bank Transfer Details */}
                            {paymentMethod === "bank_transfer" && (
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <svg className="w-6 h-6 text-[#F37221]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                        </svg>
                                        Thông tin chuyển khoản
                                    </h2>

                                    {isLoadingPayment ? (
                                        <div className="flex items-center justify-center py-8">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F37221]"></div>
                                        </div>
                                    ) : paymentInfo ? (
                                        <div className="space-y-4">
                                            {/* QR Code */}
                                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-[#F37221]/20">
                                                <div className="flex flex-col items-center">
                                                    <Image
                                                        src={paymentInfo.qrCodeUrl}
                                                        alt="QR Code thanh toán"
                                                        width={250}
                                                        height={250}
                                                        className="rounded-lg bg-white p-2"
                                                        unoptimized
                                                    />
                                                    <p className="text-sm text-gray-600 mt-3 text-center">
                                                        Quét mã QR bằng app ngân hàng để thanh toán
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Payment Details */}
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                    <span className="text-sm font-medium text-gray-600">Ngân hàng</span>
                                                    <span className="text-sm font-bold text-gray-900">{paymentInfo.bankName}</span>
                                                </div>

                                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                    <span className="text-sm font-medium text-gray-600">Số tài khoản</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-mono font-bold text-gray-900">{paymentInfo.accountNumber}</span>
                                                        <button
                                                            onClick={() => copyToClipboard(paymentInfo.accountNumber)}
                                                            className="text-[#F37221] hover:text-[#d96316] transition-colors"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                    <span className="text-sm font-medium text-gray-600">Chủ tài khoản</span>
                                                    <span className="text-sm font-bold text-gray-900">{paymentInfo.accountName}</span>
                                                </div>

                                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                    <span className="text-sm font-medium text-gray-600">Số tiền</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-bold text-[#F37221]">
                                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(paymentInfo.amount)}
                                                        </span>
                                                        <button
                                                            onClick={() => copyToClipboard(paymentInfo.amount.toString())}
                                                            className="text-[#F37221] hover:text-[#d96316] transition-colors"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="flex items-start justify-between p-3 bg-orange-50 border border-[#F37221]/20 rounded-lg">
                                                    <span className="text-sm font-medium text-gray-600">Nội dung CK</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-mono font-bold text-[#F37221] text-right">{paymentInfo.content}</span>
                                                        <button
                                                            onClick={() => copyToClipboard(paymentInfo.content)}
                                                            className="text-[#F37221] hover:text-[#d96316] transition-colors flex-shrink-0"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Important Note */}
                                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                                <div className="flex gap-3">
                                                    <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                    </svg>
                                                    <div className="text-sm text-yellow-800">
                                                        <p className="font-semibold mb-1">Lưu ý quan trọng:</p>
                                                        <ul className="list-disc list-inside space-y-1">
                                                            <li>Chuyển khoản <strong>đúng số tiền</strong> và <strong>đúng nội dung</strong></li>
                                                            <li>Hệ thống sẽ tự động xác nhận thanh toán sau khi nhận được tiền</li>
                                                            <li>Thời gian xử lý: 1-5 phút</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Check Payment Button */}
                                            {paymentStatus === "pending" && (
                                                <button
                                                    onClick={() => setPaymentStatus("checking")}
                                                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border border-gray-300"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                                    </svg>
                                                    Tôi đã chuyển khoản
                                                </button>
                                            )}

                                            {paymentStatus === "checking" && (
                                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                                                        <span className="text-sm font-medium text-blue-800">
                                                            Đang kiểm tra thanh toán...
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : null}
                                </div>
                            )}
                        </div>

                        {/* Right Column - Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 sticky top-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

                                {/* Plan Details */}
                                <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl mb-4 border border-[#F37221]/20">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="font-bold text-gray-900">{selectedPlan.name} Plan</h3>
                                            <p className="text-sm text-gray-600">Monthly subscription</p>
                                        </div>
                                        <span className="px-2 py-1 bg-[#F37221] text-white text-xs font-bold rounded">
                                            {selectedPlan.discount}
                                        </span>
                                    </div>

                                    <div className="mt-3 pt-3 border-t border-[#F37221]/20">
                                        <ul className="space-y-2">
                                            {selectedPlan.features.slice(0, 3).map((feature, i) => (
                                                <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                                                    <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Price Breakdown */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="text-gray-400 line-through">{selectedPlan.originalPrice}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Discount (50%)</span>
                                        <span className="text-green-600 font-semibold">-$3.00</span>
                                    </div>
                                    <div className="pt-3 border-t border-gray-200">
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-gray-900 font-semibold">Total</span>
                                            <div className="text-right">
                                                <span className="text-3xl font-bold text-[#F37221]">{selectedPlan.price}</span>
                                                <span className="text-gray-500 text-sm">{selectedPlan.period}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Complete Payment Button */}
                                <button className="w-full bg-gradient-to-r from-[#F37221] to-[#d96316] hover:from-[#d96316] hover:to-[#F37221] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Complete Payment
                                </button>

                                <p className="text-xs text-gray-500 text-center mt-4">
                                    By completing this purchase, you agree to our Terms of Service
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
