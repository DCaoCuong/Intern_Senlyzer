import Link from "next/link";

export default function CTASection() {
    return (
        <section className="section relative overflow-hidden">
            {/* Background glow */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(243, 114, 33, 0.2), transparent)",
                }}
            />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Ready to create your
                        <br />
                        <span className="text-gradient">payment QR code?</span>
                    </h2>
                    <p className="text-lg text-gray-600 mb-10">
                        Start now - completely free, no registration required
                    </p>
                    <Link
                        href="/auth/signin"
                        className="btn btn-primary text-lg px-10 py-4 animate-pulse-glow"
                    >
                        Get Started
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
