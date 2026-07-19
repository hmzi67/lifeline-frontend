import { api } from "./api";

interface BackendResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface CreatePaymentIntentRequest {
  amount: number;
  currency?: string;
  planId?: string;
  planName?: string;
  paymentMethodId?: string;
  couponCode?: string;
}

export interface CreatePaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

export interface CreateSubscriptionPaymentRequest {
  userId: string;
  planName: string;
  amount: number;
  method: string;
  status?: "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED";
}

export interface ConfirmPaymentRequest {
  paymentIntentId: string;
  paymentMethodId?: string;
  userId?: string;
}

export interface ConfirmPaymentResponse {
  subscriptionId?: string;
  paymentIntentId?: string;
}

class PaymentService {
  /**
   * Create a payment intent on the server
   */
  async createPaymentIntent(
    data: CreatePaymentIntentRequest
  ): Promise<CreatePaymentIntentResponse> {
    try {
      const response = await api.post<BackendResponse<CreatePaymentIntentResponse>>(
        "/payments/create-intent",
        {
          amount: data.amount,
          currency: data.currency || "usd",
          planId: data.planId,
          planName: data.planName,
          couponCode: data.couponCode,
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error creating payment intent:", error);
      throw error;
    }
  }

  /**
   * Get the Stripe publishable key from the server
   */
  async getPublishableKey(): Promise<string> {
    const response = await api.get<BackendResponse<{ publishableKey: string }>>(
      "/payments/publishable-key"
    );
    return response.data.data.publishableKey;
  }

  /**
   * Create a subscription payment record
   */
  async createSubscriptionPayment(
    data: CreateSubscriptionPaymentRequest
  ) {
    try {
      const response = await api.post("/subscription-payments", data);
      return response.data;
    } catch (error) {
      console.error("Error creating subscription payment:", error);
      throw error;
    }
  }

  /**
   * Confirm payment after successful payment method creation
   */
  async confirmPayment(
    data: ConfirmPaymentRequest
  ): Promise<ConfirmPaymentResponse> {
    try {
      const response = await api.post<BackendResponse<ConfirmPaymentResponse>>(
        "/payments/confirm",
        {
          paymentIntentId: data.paymentIntentId,
          paymentMethodId: data.paymentMethodId,
          userId: data.userId,
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error confirming payment:", error);
      throw error;
    }
  }

  /**
   * Get payment history for the user
   */
  async getPaymentHistory(userId: string) {
    try {
      const response = await api.get(`/subscription-payments/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching payment history:", error);
      throw error;
    }
  }

  /**
   * Get all subscription payments with pagination
   */
  async getAllPayments(page = 1, limit = 10) {
    try {
      const response = await api.get("/subscription-payments", {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching payments:", error);
      throw error;
    }
  }

  /**
   * Get subscription status
   */
  async getSubscriptionStatus() {
    try {
      const response = await api.get("/subscriptions/status");
      return response.data;
    } catch (error) {
      console.error("Error fetching subscription status:", error);
      throw error;
    }
  }

  /**
   * Cancel subscription
   */
  async cancelSubscription(subscriptionId: string) {
    try {
      const response = await api.post("/subscriptions/cancel", {
        subscriptionId,
      });
      return response.data;
    } catch (error) {
      console.error("Error canceling subscription:", error);
      throw error;
    }
  }
}

export const paymentService = new PaymentService();
