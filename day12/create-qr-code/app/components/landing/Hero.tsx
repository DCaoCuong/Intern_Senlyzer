import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(243, 114, 33, 0.2), transparent)",
                }}
            />

            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`,
                    backgroundSize: "50px 50px",
                }}
            />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
                    <div className="text-center lg:text-left">
                        {/* Artistic Heading */}
                        <h1 className="mb-6 animate-fade-in-up">
                            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-gray-900 leading-none mb-3">
                                Create QR Code
                            </span>
                            <span className="flex items-center justify-center lg:justify-start gap-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                                <span className="text-gray-600">for</span>
                                <span className="relative">
                                    <span className="text-gradient">Bank Transfer</span>
                                    {/* Decorative underline */}
                                    <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#F37221]/20" viewBox="0 0 200 12" preserveAspectRatio="none">
                                        <path d="M0,7 Q50,0 100,7 T200,7" stroke="currentColor" strokeWidth="3" fill="none" />
                                    </svg>
                                </span>
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-gray-600 mb-10 animate-fade-in-up animate-delay-100">
                            Generate VietQR standard bank transfer QR codes in seconds.
                            Share and receive payments easily.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start animate-fade-in-up animate-delay-200">
                            <Link
                                href="/create"
                                className="btn btn-primary text-lg px-10 py-5 animate-pulse-glow shadow-xl hover:shadow-2xl transition-all"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                                Live Demo
                            </Link>
                        </div>
                    </div>

                    {/* Right Column - Demo Card */}
                    <div className="flex justify-center lg:justify-end animate-fade-in-up animate-delay-300">
                        <div className="relative">
                            {/* Demo Card */}
                            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full border border-gray-100">
                                {/* Header */}
                                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#F37221] to-[#d96316] rounded-xl flex items-center justify-center">
                                        <svg
                                            className="w-7 h-7 text-white"
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
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg">QR Bank Demo</h3>
                                        <p className="text-sm text-gray-500">VietQR Standard</p>
                                    </div>
                                </div>

                                {/* Bank Info */}
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between items-start">
                                        <span className="text-sm text-gray-500">Bank</span>
                                        <span className="font-semibold text-gray-900 text-right">Vietcombank</span>
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <span className="text-sm text-gray-500">Account Number</span>
                                        <span className="font-mono font-semibold text-gray-900">1234567890</span>
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <span className="text-sm text-gray-500">Account Holder</span>
                                        <span className="font-semibold text-gray-900 text-right">BEE HANDSOME</span>
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <span className="text-sm text-gray-500">Amount</span>
                                        <span className="font-bold text-[#F37221] text-lg">100,000 VNĐ</span>
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <span className="text-sm text-gray-500">Description</span>
                                        <span className="font-medium text-gray-900 text-right max-w-[200px]">Payment for order #12345</span>
                                    </div>
                                </div>

                                {/* QR Code */}
                                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 flex items-center justify-center">
                                    <div className="bg-white p-4 rounded-xl shadow-lg">
                                        <div className="w-48 h-48 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                                            {/* QR Pattern Simulation */}
                                            <svg
                                                className="w-40 h-40 text-gray-700"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 13h6v6H3v-6zm2 2v2h2v-2H5zm13-2h1v1h-1v-1zm-3 0h1v1h-1v-1zm3 3h1v1h-1v-1zm-3 0h1v1h-1v-1zm-2 0h1v1h-1v-1zm2 2h1v1h-1v-1zm-2 0h1v1h-1v-1zm5-2h1v1h-1v-1zm0 2h1v1h-1v-1z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Note */}
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <div className="flex items-start gap-2 text-xs text-gray-500">
                                        <svg className="w-4 h-4 text-[#F37221] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        <p>Scan QR code with your bank app for quick payment</p>
                                    </div>
                                </div>
                            </div>

                            {/* Glow effect behind card */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#F37221]/20 to-purple-500/20 blur-3xl -z-10 rounded-full scale-110" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                </svg>
            </div>
        </section>
    );
}
