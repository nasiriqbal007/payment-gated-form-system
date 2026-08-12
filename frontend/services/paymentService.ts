import { apiClient } from "./apiClient";

export interface VerifyPaymentResponse {
  success: boolean;
  message: string;
  data: {
    paid: boolean;
    sessionId: string;
  };
}

export interface CreateCheckoutSessionResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    url: string;
    success_url: string;
    cancel_url: string;
  };
}

export const paymentService = {
  createCheckoutSession: (
    amount: number,
    currency?: string,
    successUrl?: string,
    cancelUrl?: string,
  ) =>
    apiClient.post<CreateCheckoutSessionResponse>("/payment/checkout-session", {
      amount,
      ...(currency ? { currency } : {}),
      successUrl,
      cancelUrl,
    }),

  verifyPayment: (sessionId: string) =>
    apiClient.get<VerifyPaymentResponse>(
      `/payment/verify?sessionId=${sessionId}`,
    ),
};
