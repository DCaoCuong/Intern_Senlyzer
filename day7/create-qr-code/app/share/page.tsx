
import React from "react";
import { Metadata } from "next";
import Link from "next/link";

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const { bankBin, accountNumber, amount, description } = await searchParams;

    const queryParams = new URLSearchParams();
    if (bankBin) queryParams.set("bankBin", bankBin as string);
    if (accountNumber) queryParams.set("accountNumber", accountNumber as string);
    if (amount) queryParams.set("amount", amount as string);
    if (description) queryParams.set("description", description as string);

    const imageUrl = `/view-qr?${queryParams.toString()}`;

    const title = `Chuyển khoản - ${accountNumber}`;
    const desc = description ? (description as string) : `Chuyển khoản nhanh đến số tài khoản ${accountNumber}`;

    return {
        title: title,
        description: desc,
        openGraph: {
            title: title,
            description: desc,
            images: [imageUrl],
        },
        twitter: {
            card: "summary_large_image",
            title: title,
            description: desc,
            images: [imageUrl],
        },
    };
}

export default async function SharePage({ searchParams }: Props) {
    const { bankBin, accountNumber, amount, description } = await searchParams;

    const queryParams = new URLSearchParams();
    if (bankBin) queryParams.set("bankBin", bankBin as string);
    if (accountNumber) queryParams.set("accountNumber", accountNumber as string);
    if (amount) queryParams.set("amount", amount as string);
    if (description) queryParams.set("description", description as string);

    const imageUrl = `/view-qr?${queryParams.toString()}`;

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-black p-4">
            <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-zinc-800">
                <div className="p-8 flex justify-center bg-white">
                    <img
                        src={imageUrl}
                        alt="QR Code"
                        width={400}
                        height={400}
                        className="w-full h-auto max-w-[300px] border-4 border-white shadow-sm rounded-lg"
                    />
                </div>
                <div className="p-4 border-t border-gray-100 dark:border-zinc-800 text-center">
                    <Link href="/" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
                        &larr; Tạo mã QR mới
                    </Link>
                </div>
            </div>
        </div>
    );
}
