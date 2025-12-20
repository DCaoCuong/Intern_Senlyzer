import dbConnect from './mongodb';
import { Payment } from './models';
import { PaymentStatus } from './sepay.types';

export const updatePaymentStatus = async (paymentCode: string, status: PaymentStatus, extraData: any = {}) => {
    await dbConnect();
    console.log(`[PaymentStore] Updating DB: ${paymentCode} to ${status}`);

    await Payment.findOneAndUpdate(
        { paymentCode: paymentCode.toUpperCase() },
        {
            status: status as any,
            ...extraData
        },
        { upsert: true, new: true }
    );
};

export const getPaymentStatus = async (paymentCode: string): Promise<PaymentStatus> => {
    await dbConnect();
    const payment = await Payment.findOne({ paymentCode: paymentCode.toUpperCase() });
    return (payment?.status as PaymentStatus) || PaymentStatus.PENDING;
};
