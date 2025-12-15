"use client";

import { useState, useMemo } from "react";
import BankSelect from "./BankSelect";
import QRCodeDisplay from "./QRCodeDisplay";
import { generateVietQRData } from "../lib/vietqr";
import QRCode from "qrcode";

export default function QRForm() {
    const [bankBin, setBankBin] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");

    const qrData = useMemo(() => {
        if (!bankBin || !accountNumber) return "";
        return generateVietQRData(bankBin, accountNumber, amount, description);
    }, [bankBin, accountNumber, amount, description]);

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
            link.download = "vietqr.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            console.error("Error downloading QR code", err);
        }
    };

    return (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800">
                <BankSelect value={bankBin} onChange={setBankBin} />

                <div className="mb-4">
                    <label
                        htmlFor="accountNumber"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                    >
                        Số tài khoản <span className="text-red-500">(*)</span>
                    </label>
                    <input
                        type="text"
                        id="accountNumber"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white sm:text-sm p-2 border"
                        placeholder="Nhập số tài khoản"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="amount"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                    >
                        Số tiền chuyển khoản (Optional)
                    </label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white sm:text-sm p-2 border"
                        placeholder="Nhập số tiền (VND)"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                    >
                        Nội dung chuyển khoản (Optional)
                    </label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white sm:text-sm p-2 border"
                        placeholder="Nhập nội dung"
                    />
                </div>

            </div>

            <div className="flex flex-col items-center justify-start pt-4">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                    QR đây - quẹt đi
                </h2>
                {qrData ? (
                    <QRCodeDisplay data={qrData} />
                ) : (
                    <div className="flex flex-col items-center justify-center p-12 bg-gray-50 dark:bg-zinc-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-zinc-700 text-gray-400">
                        <p>Nhập thông tin để tạo mã QR</p>
                    </div>
                )}
                <div className="mt-4">
                    <Button onClick={handleDownload} className="mr-2">Tải xuống QR</Button>
                    {qrData && (
                        <Button
                            onClick={() => navigator.clipboard.writeText(qrData)}
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                        >
                            Copy URL QR
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

const Button = ({ onClick, children, className }: { onClick: () => void; children: React.ReactNode; className?: string }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-md font-semibold text-sm transition-colors duration-200 bg-indigo-600 hover:bg-indigo-700 text-white ${className}`}
    >
        {children}
    </button>
);

