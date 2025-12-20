import QRForm from "../components/qr/QRForm";
import { Suspense } from "react";
import Link from "next/link";

export default function CreatePage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Simple Header */}
            <header className="border-b border-gray-200">
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
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="text-center mb-10">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Create QR
                        <span className="text-gradient"> Transfer Code</span>
                    </h1>
                    <p className="text-gray-600">
                        Enter bank information to generate VietQR standard code
                    </p>
                </div>


                <Suspense
                    fallback={
                        <div className="flex items-center justify-center py-20">
                            <div className="w-8 h-8 border-2 border-[#F37221] border-t-transparent rounded-full animate-spin" />
                        </div>
                    }
                >
                    <QRForm />
                </Suspense>
            </main>

        </div>
    );
}
