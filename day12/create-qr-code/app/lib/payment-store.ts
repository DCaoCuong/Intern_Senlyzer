import { PaymentStatus } from './sepay.types';

const paymentStore = new Map<string, PaymentStatus>();

export const updatePaymentStatus = (paymentCode: string, status: PaymentStatus) => {
    console.log(`[PaymentStore] Updating ${paymentCode} to ${status}`);
    paymentStore.set(paymentCode.toUpperCase(), status);
};

export const getPaymentStatus = (paymentCode: string): PaymentStatus => {
    return paymentStore.get(paymentCode.toUpperCase()) || PaymentStatus.PENDING;
};
