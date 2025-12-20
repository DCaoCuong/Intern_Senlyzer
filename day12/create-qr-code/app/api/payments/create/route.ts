import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongodb";
import { Payment, User } from "@/app/lib/models";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { paymentCode, amount, plan } = await request.json();

        await dbConnect();

        // Ensure user exists
        await User.findOneAndUpdate(
            { email: session.user.email },
            { $setOnInsert: { email: session.user.email, subscriptionStatus: "free", qrUsageCount: 0, qrLimit: 10 } },
            { upsert: true, new: true }
        );

        const payment = await Payment.create({
            paymentCode,
            userId: session.user.email,
            plan,
            amount,
            status: "pending",
        });

        console.log(`[PaymentCreate] Successfully created intent: ${paymentCode} for ${session.user.email}`);

        return NextResponse.json({ success: true, payment });
    } catch (error: any) {
        console.error("[PaymentCreate] Error creating payment intent:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
