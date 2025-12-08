import { api } from "./api";

export interface CreatePaymentIntentRequest {
  amount: number;
  currency?: string;
  planId?: string;
  planName?: string;
  paymentMethodId?: string;
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
  paymentMethodId: string;
}

export interface ConfirmPaymentResponse {
  success: boolean;
  subscriptionId?: string;
  message?: string;
}

class PaymentService {
  /**
   * Create a payment intent on the server
   * Note: This requires backend implementation for Stripe payment intent creation
   */
  async createPaymentIntent(
    data: CreatePaymentIntentRequest
  ): Promise<CreatePaymentIntentResponse> {
    try {
      // This endpoint needs to be implemented on the backend
      const response = await api.post<CreatePaymentIntentResponse>(
        "/payments/create-intent",
        {
          amount: data.amount,
          currency: data.currency || "usd",
          planId: data.planId,
          planName: data.planName,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating payment intent:", error);
      throw error;
    }
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
      const response = await api.post<ConfirmPaymentResponse>(
        "/payments/confirm",
        {
          paymentIntentId: data.paymentIntentId,
          paymentMethodId: data.paymentMethodId,
        }
      );
      return response.data;
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
