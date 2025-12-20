"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";

interface QRCodeDisplayProps {
    data: string;
}

export default function QRCodeDisplay({ data }: QRCodeDisplayProps) {
    const [src, setSrc] = useState<string>("");

    useEffect(() => {
        if (!data) {
            setSrc("");
            return;
        }

        QRCode.toDataURL(data, {
            width: 500,
            margin: 2,
            color: {
                dark: "#000000",
                light: "#ffffff",
            },
        })
            .then((url) => {
                setSrc(url);
            })
            .catch((err) => {
                console.error("Error generating QR code", err);
            });
    }, [data]);

    if (!src) return null;

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md mt-6">
            <div className="relative w-72 h-72">
                <Image
                    src={src}
                    alt="Generated QR Code"
                    width={500}
                    height={500}
                    className="w-full h-full object-contain"
                />
            </div>
        </div>
    );
}
