"use client";

import { useState, useMemo, useEffect } from "react";
import BankSelect from "./BankSelect";
import QRCodeDisplay from "./QRCodeDisplay";
import { generateVietQRData } from "../../lib/vietqr";
import QRCode from "qrcode";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function QRForm() {
    const searchParams = useSearchParams();

    const [bankBin, setBankBin] = useState(searchParams.get("bankBin") || "");
    const [accountNumber, setAccountNumber] = useState(searchParams.get("accountNumber") || "");
    const [amount, setAmount] = useState(searchParams.get("amount") || "");
    const [description, setDescription] = useState(searchParams.get("description") || "");
    const [copySuccess, setCopySuccess] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const qrData = useMemo(() => {
        if (!bankBin || !accountNumber) return "";
        return generateVietQRData(bankBin, accountNumber, amount, description);
    }, [bankBin, accountNumber, amount, description]);

    // Track usage when QR data is generated and bank info is complete
    useEffect(() => {
        if (qrData) {
            const trackUsage = async () => {
                try {
                    const res = await fetch('/api/qr/track-usage', { method: 'POST' });
                    const data = await res.json();
                    if (!res.ok) {
                        setError(data.error || "Failed to track usage");
                    } else {
                        setError(null);
                    }
                } catch (err) {
                    console.error("Usage tracking failed:", err);
                }
            };
            trackUsage();
        }
    }, [qrData]);

    const handleShare = async () => {
        const params = new URLSearchParams();
        if (bankBin) params.set("bankBin", bankBin);
        if (accountNumber) params.set("accountNumber", accountNumber);
        if (amount) params.set("amount", amount);
        if (description) params.set("description", description);

        const shareUrl = `${window.location.origin}/view-qr?${params.toString()}`;

        try {
            const dataUrl = await QRCode.toDataURL(qrData, {
                width: 500,
                margin: 2,
                color: {
                    dark: "#000000",
                    light: "#ffffff",
                },
            });

            const imgBlob = await fetch(dataUrl).then((r) => r.blob());
            const textBlob = new Blob([shareUrl], { type: "text/plain" });

            const item = new ClipboardItem({
                "text/plain": textBlob,
                "image/png": imgBlob,
            });

            await navigator.clipboard.write([item]);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            console.error("copy failed:", err);
            navigator.clipboard.writeText(shareUrl);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        }
    };

    const handleDownload = async () => {
        if (!qrData) return;
        try {
            const url = await QRCode.toDataURL(qrData, {
                width: 500,
                margin: 2,
                color: {
                    dark: "#000000",
                    light: "#ffffff",
                },
            });
            const link = document.createElement("a");
            link.href = url;
            link.download = "qr_bank_code.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            console.error("Error downloading QR code", err);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="card">
                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#F37221]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Transfer Information
                </h2>

                <BankSelect value={bankBin} onChange={setBankBin} />

                <div className="mb-4">
                    <label
                        htmlFor="accountNumber"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Account Number <span className="text-[#F37221]">*</span>
                    </label>
                    <input
                        type="text"
                        id="accountNumber"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className="block w-full rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#F37221] focus:ring-1 focus:ring-[#F37221] transition-colors text-sm p-3"
                        placeholder="Enter account number"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="amount"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Amount <span className="text-gray-500">(optional)</span>
                    </label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="block w-full rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#F37221] focus:ring-1 focus:ring-[#F37221] transition-colors text-sm p-3"
                        placeholder="Enter amount (VND)"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Description <span className="text-gray-500">(optional)</span>
                    </label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="block w-full rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#F37221] focus:ring-1 focus:ring-[#F37221] transition-colors text-sm p-3"
                        placeholder="Enter transfer description"
                    />
                </div>
            </div>

            {/* QR Display Section */}
            <div className="flex flex-col items-center justify-start">
                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#F37221]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                    QR Code
                </h2>

                {error ? (
                    <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-2xl border-2 border-dashed border-red-300 text-red-600">
                        <svg className="w-12 h-12 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <p className="text-sm font-semibold">{error}</p>
                        <Link href="/checkout" className="mt-4 text-sm font-bold underline">Upgrade Plan</Link>
                    </div>
                ) : qrData ? (
                    <div className="relative">
                        <div className="p-4 bg-white rounded-2xl shadow-lg">
                            <QRCodeDisplay data={qrData} />
                        </div>
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-[#0ea5e9]/10 blur-2xl -z-10 rounded-full" />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center p-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 text-gray-500">
                        <svg className="w-12 h-12 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                        </svg>
                        <p className="text-sm">Enter information to generate QR code</p>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap gap-3 justify-center">
                    <button
                        onClick={handleDownload}
                        disabled={!qrData}
                        className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download
                    </button>
                    {qrData && (
                        <button
                            onClick={handleShare}
                            className="btn btn-secondary"
                        >
                            {copySuccess ? (
                                <>
                                    <svg className="w-4 h-4 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                    </svg>
                                    Share
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
