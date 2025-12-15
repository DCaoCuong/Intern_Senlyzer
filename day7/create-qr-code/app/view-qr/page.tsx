import UrlImageQrCode from "../components/UrlImageQrCode";
import { generateVietQRData } from "../lib/vietqr";
import { Metadata } from "next";

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const { bankBin, accountNumber, amount, description } = await searchParams;

    const params = new URLSearchParams();
    if (bankBin) params.set("bankBin", bankBin as string);
    if (accountNumber) params.set("accountNumber", accountNumber as string);
    if (amount) params.set("amount", amount as string);
    if (description) params.set("description", description as string);

    return {
        title: "QR Code Chuyển Khoản",
        description: "Quét mã QR để chuyển khoản nhanh chóng.",
        openGraph: {
            title: "QR Code Chuyển Khoản",
            description: "Quét mã QR để chuyển khoản nhanh chóng.",
            images: [
                {
                    url: `/api/og?${params.toString()}`,
                    width: 500,
                    height: 500,
                    alt: "QR Code Payment",
                },
            ],
        },
    };
}

export default async function ViewQR({ searchParams }: Props) {
    const { bankBin, accountNumber, amount, description } = await searchParams;

    let qrData = "";
    if (bankBin && accountNumber) {
        qrData = generateVietQRData(
            bankBin as string,
            accountNumber as string,
            (amount as string) || undefined,
            (description as string) || undefined
        );
    }

    return (
        <div>
            {qrData && <UrlImageQrCode data={qrData} />}
        </div>
    );
}
