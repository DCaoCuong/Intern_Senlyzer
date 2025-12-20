import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongodb";
import { WebhookLog } from "@/app/lib/models";

export async function GET(request: NextRequest) {
    // PROTECT THIS IN PRODUCTION! For now, keep it simple.
    try {
        await dbConnect();
        const logs = await WebhookLog.find().sort({ receivedAt: -1 }).limit(20);
        return NextResponse.json({
            count: logs.length,
            logs
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
