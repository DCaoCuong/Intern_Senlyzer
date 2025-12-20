import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongodb";
import { User } from "@/app/lib/models";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await dbConnect();

        const user = await User.findOne({ email: session.user.email });

        if (!user) {
            // Should not happen if they are logged in and we handled it in payment intents, 
            // but let's be safe.
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (user.qrUsageCount >= user.qrLimit) {
            return NextResponse.json({
                error: "Limit reached",
                limit: user.qrLimit,
                usage: user.qrUsageCount
            }, { status: 403 });
        }

        // Increment usage
        user.qrUsageCount += 1;
        await user.save();

        return NextResponse.json({
            success: true,
            usage: user.qrUsageCount,
            limit: user.qrLimit
        });
    } catch (error: any) {
        console.error("Error tracking QR usage:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
