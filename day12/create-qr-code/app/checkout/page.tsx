"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const PLANS: Record<string, any> = {
    pro: {
        id: "pro",
        name: "Pro",
        price: "$3",
        amountVnd: 75000, // Approximately $3
        period: "/month",
        originalPrice: "$6",
        discount: "50% OFF",
        features: [
            "1,000 QR generations/month",
            "Unlimited type of bank QR code",
            "API access",
        ],
    },
    business: {
        id: "business",
        name: "Business",
        price: "$19",
        amountVnd: 475000, // Approximately $19
        period: "/month",
        originalPrice: "$40",
        discount: "50% OFF",
        features: [
            "10,000 QR generations/month",
            "All Pro features",
            "Analytics & tracking",
            "White-label options",
            "Dedicated support",
        ],
    },
};

function CheckoutContent() {
    const searchParams = useSearchParams();
    const planId = searchParams.get("plan") || "pro";
    const selectedPlan = PLANS[planId] || PLANS.pro;

    const [paymentInfo, setPaymentInfo] = useState<any>(null);
    const [isLoadingPayment, setIsLoadingPayment] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState<"pending" | "checking" | "completed">("pending");

    // Generate payment info on mount or plan change
    useEffect(() => {
        generatePaymentInfo();
    }, [planId]);

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
            const paymentCode = generatePaymentCode();
            const amount = selectedPlan.amountVnd;
            const accountNumber = process.env.NEXT_PUBLIC_SEPAY_ACCOUNT_NUMBER || "5602000442";
            const accountName = process.env.NEXT_PUBLIC_SEPAY_ACCOUNT_NAME || "CAO DINH THANH";
            const bankBin = process.env.NEXT_PUBLIC_SEPAY_BANK_BIN || "970418";
            const bankName = process.env.NEXT_PUBLIC_SEPAY_BANK_NAME || "BIDV";

            const content = `${paymentCode} Thanh toan goi ${selectedPlan.name}`;
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
        if (!paymentInfo) return;

        try {
            console.log("Checking payment status for:", paymentInfo.paymentCode);
            const res = await fetch(`/api/payments/status?code=${paymentInfo.paymentCode}`);
            const data = await res.json();

            if (data.status === "completed") {
                setPaymentStatus("completed");
                console.log("Payment completed!");
            }
        } catch (error) {
            console.error("Error checking payment status:", error);
        }
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
                        <p className="text-gray-600">You're just one step away from upgrading your account to {selectedPlan.name}</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column - Payment Details */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Bank Transfer Details */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <svg className="w-6 h-6 text-[#F37221]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                    </svg>
                                    Payment method: Bank transfer (SePay)
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
                                                    QScan the QR code using your banking app to make a payment.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Payment Details */}
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <span className="text-sm font-medium text-gray-600">Bank</span>
                                                <span className="text-sm font-bold text-gray-900">{paymentInfo.bankName}</span>
                                            </div>

                                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <span className="text-sm font-medium text-gray-600">Account number</span>
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
                                                <span className="text-sm font-medium text-gray-600">Account holder</span>
                                                <span className="text-sm font-bold text-gray-900">{paymentInfo.accountName}</span>
                                            </div>

                                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <span className="text-sm font-medium text-gray-600">Amount</span>
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
                                                <span className="text-sm font-medium text-gray-600">Content</span>
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
                                                    <p className="font-semibold mb-1">Important note:</p>
                                                    <ul className="list-disc list-inside space-y-1">
                                                        <li>Transfer the correct amount and correct content</li>
                                                        <li>System will automatically confirm payment after receiving the money</li>
                                                        <li>Processing time: 1-5 minutes</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Check Payment Button */}
                                        {paymentStatus === "pending" && (
                                            <div className="space-y-3">
                                                <button
                                                    onClick={() => setPaymentStatus("checking")}
                                                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border border-gray-300"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                                    </svg>
                                                    I have made the payment
                                                </button>

                                                {/* Local Debug Button */}
                                                {process.env.NODE_ENV === 'development' && (
                                                    <button
                                                        onClick={async () => {
                                                            if (!paymentInfo) return;
                                                            setPaymentStatus("checking");
                                                            try {
                                                                const res = await fetch('/api/sepay-webhook', {
                                                                    method: 'POST',
                                                                    headers: { 'Content-Type': 'application/json' },
                                                                    body: JSON.stringify({
                                                                        id: Math.floor(Math.random() * 1000000),
                                                                        gateway: paymentInfo.bankName,
                                                                        amount_in: paymentInfo.amount,
                                                                        amount_out: 0,
                                                                        transaction_content: paymentInfo.content,
                                                                        reference_number: 'TEST' + Date.now(),
                                                                        transaction_date: new Date().toISOString().replace('T', ' ').split('.')[0],
                                                                        account_number: paymentInfo.accountNumber
                                                                    })
                                                                });
                                                                const data = await res.json();
                                                                if (data.success) {
                                                                    setPaymentStatus("completed");
                                                                    alert("Debug: Payment Success Simulated!");
                                                                } else {
                                                                    alert("Debug: Simulation Failed - " + (data.message || data.error));
                                                                    setPaymentStatus("pending");
                                                                }
                                                            } catch (error) {
                                                                console.error(error);
                                                                alert("Debug: Error simulating payment");
                                                                setPaymentStatus("pending");
                                                            }
                                                        }}
                                                        className="w-full bg-red-50 hover:bg-red-100 text-red-600 text-xs font-mono py-2 px-6 rounded-lg transition-all duration-300 border border-red-200 flex items-center justify-center gap-2"
                                                    >
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                                        </svg>
                                                        [DEBUG] Simulate Webhook Success
                                                    </button>
                                                )}
                                            </div>
                                        )}

                                        {paymentStatus === "checking" && (
                                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                                                    <span className="text-sm font-medium text-blue-800">
                                                        Checking payment...
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {paymentStatus === "completed" && (
                                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                                <div className="flex items-center gap-3">
                                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span className="text-sm font-medium text-green-800">
                                                        Payment Successful! Thank you for your purchase.
                                                    </span>
                                                </div>
                                                <Link
                                                    href="/dashboard"
                                                    className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                                                >
                                                    Go to Dashboard
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                ) : null}
                            </div>
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
                                            {selectedPlan.features.slice(0, 3).map((feature: string, i: number) => (
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
                                        <span className="text-gray-600">Discount ({selectedPlan.discount})</span>
                                        <span className="text-green-600 font-semibold">
                                            -{(parseInt(selectedPlan.originalPrice.replace('$', '')) - parseInt(selectedPlan.price.replace('$', ''))).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                        </span>
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
                                <button
                                    onClick={() => setPaymentStatus("checking")}
                                    className="w-full bg-gradient-to-r from-[#F37221] to-[#d96316] hover:from-[#d96316] hover:to-[#F37221] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                >
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

export default function CheckoutPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F37221]"></div>
            </div>
        }>
            <CheckoutContent />
        </Suspense>
    );
}
