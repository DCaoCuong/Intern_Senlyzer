"use client";

import { useState } from "react";
import Link from "next/link";

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

    const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");

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
