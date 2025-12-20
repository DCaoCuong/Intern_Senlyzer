import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    email: string;
    subscriptionStatus: "free" | "pro" | "business";
    qrUsageCount: number;
    qrLimit: number;
    lastPaymentId?: string;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    subscriptionStatus: { type: String, enum: ["free", "pro", "business"], default: "free" },
    qrUsageCount: { type: Number, default: 0 },
    qrLimit: { type: Number, default: 10 }, // Default free limit
    lastPaymentId: { type: String },
}, { timestamps: true });

export interface IPayment extends Document {
    paymentCode: string; // PAY...
    userId: string; // email or user ID
    plan: string;
    status: "pending" | "completed" | "expired";
    amount: number;
    sePayTransactionId?: number;
    referenceNumber?: string;
    updatedAt: Date;
}

const PaymentSchema: Schema = new Schema({
    paymentCode: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    plan: { type: String, required: true },
    status: { type: String, enum: ["pending", "completed", "expired"], default: "pending" },
    amount: { type: Number, required: true },
    sePayTransactionId: { type: Number },
    referenceNumber: { type: String },
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export const Payment = mongoose.models.Payment || mongoose.model<IPayment>("Payment", PaymentSchema);
