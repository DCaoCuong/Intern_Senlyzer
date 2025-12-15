import { useRef } from "react";

export default function UrlImageQrCode({ url }: { url: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    return (
        <canvas ref={canvasRef} />
    )
}   