import { ImageResponse } from "next/og";
import QRCode from "qrcode";
import { generateVietQRData } from "../../lib/vietqr";

export const runtime = "nodejs";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const bankBin = searchParams.get("bankBin");
        const accountNumber = searchParams.get("accountNumber");
        const amount = searchParams.get("amount");
        const description = searchParams.get("description");

        let qrData = "";
        if (bankBin && accountNumber) {
            qrData = generateVietQRData(bankBin, accountNumber, amount || "", description || "");
        } else {
            return new Response("Missing parameters", { status: 400 });
        }

        const qrSvg = await QRCode.toString(qrData, {
            type: "svg",
            width: 400,
            margin: 2,
            color: {
                dark: "#000000",
                light: "#ffffff",
            },
        });

        const qrDataUrl = await QRCode.toDataURL(qrData, {
            width: 400,
            margin: 2,
            color: {
                dark: "#000000",
                light: "#ffffff",
            },
        });

        return new ImageResponse(
            (
                <div
                    style={{
                        display: "flex",
                        height: "100%",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        backgroundColor: "white",
                    }}
                >
                    <img src={qrDataUrl} width="400" height="400" />
                </div>
            ),
            {
                width: 500,
                height: 500,
            }
        );
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}