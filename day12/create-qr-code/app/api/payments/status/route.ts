import { NextRequest, NextResponse } from "next/server";
import { getPaymentStatus } from "@/app/lib/payment-store";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");

    if (!code) {
        return NextResponse.json({ error: "Missing payment code" }, { status: 400 });
    }

    const status = await getPaymentStatus(code);

    return NextResponse.json({
        code,
        status,
        timestamp: new Date().toISOString(),
    });
}
