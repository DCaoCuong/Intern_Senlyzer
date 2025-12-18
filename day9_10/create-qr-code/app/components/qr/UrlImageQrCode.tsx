'use client'

import { useEffect, useRef } from "react";
import QRCode from "qrcode";

export default function UrlImageQrCode({ data }: { data: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!data || !canvasRef.current) return;

        QRCode.toCanvas(canvasRef.current, data, {
            width: 500,
            margin: 2,
            color: {
                dark: "#000000",
                light: "#ffffff",
            },
        }, (error) => {
            if (error) console.error(error);
        });
    }, [data]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-zinc-900">
            <div className="p-4 bg-white rounded-lg shadow-md">
                <canvas ref={canvasRef} />
            </div>
        </div>
    )
}   