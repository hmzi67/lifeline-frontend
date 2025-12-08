import { useState } from "react";
import type { FormEvent } from "react";
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
// import { paymentService } from "@/services/paymentService";

interface StripePaymentFormProps {
    amount: number;
    planTitle: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
}

const cardElementOptions = {
    style: {
        base: {
            fontSize: "16px",
            color: "#424770",
            "::placeholder": {
                color: "#aab7c4",
            },
            fontFamily: "system-ui, -apple-system, sans-serif",
        },
        invalid: {
            color: "#9e2146",
        },
    },
};

export default function StripePaymentForm({
    amount,
    planTitle,
    onSuccess,
    onError,
}: StripePaymentFormProps) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cardholderName, setCardholderName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Get card element
            const cardNumberElement = elements.getElement(CardNumberElement);

            if (!cardNumberElement) {
                throw new Error("Card element not found");
            }

            // Create payment method
            const { error: paymentMethodError, paymentMethod } =
                await stripe.createPaymentMethod({
                    type: "card",
                    card: cardNumberElement,
                    billing_details: {
                        name: cardholderName,
                        email: email,
                    },
                });

            if (paymentMethodError) {
                throw new Error(paymentMethodError.message);
            }

            console.log("Payment Method Created:", paymentMethod);

            // For now, we'll simulate successful payment since backend Stripe integration
            // needs to be implemented. In production, you would:
            // 1. Create payment intent on backend
            // 2. Confirm payment with Stripe
            // 3. Save payment record to database

            // Simulate API call delay
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // TODO: Implement backend Stripe payment intent creation
            // const { clientSecret } = await paymentService.createPaymentIntent({
            //   amount: amount,
            //   currency: "usd",
            //   planName: planTitle,
            // });

            // const { error: confirmError, paymentIntent } =
            //   await stripe.confirmCardPayment(clientSecret, {
            //     payment_method: paymentMethod.id,
            //   });

            // if (confirmError) {
            //   throw new Error(confirmError.message);
            // }

            // Create subscription payment record in database
            // Note: This requires user ID from auth context
            // await paymentService.createSubscriptionPayment({
            //   userId: "user-id-from-auth",
            //   planName: planTitle,
            //   amount: amount,
            //   method: "stripe",
            //   status: "COMPLETED",
            // });

            // Call onSuccess callback
            if (onSuccess) {
                onSuccess();
            }
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "An error occurred";
            setError(errorMessage);
            if (onError) {
                onError(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    }; return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-medium">Plan:</span>
                    <span className="text-gray-900 font-semibold">{planTitle}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Amount:</span>
                    <span className="text-gray-900 font-semibold text-xl">
                        ${amount.toFixed(2)}
                    </span>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="you@example.com"
                    />
                </div>

                <div>
                    <label
                        htmlFor="cardholderName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Cardholder Name
                    </label>
                    <input
                        id="cardholderName"
                        type="text"
                        required
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="John Doe"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                    </label>
                    <div className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
                        <CardNumberElement options={cardElementOptions} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiration Date
                        </label>
                        <div className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
                            <CardExpiryElement options={cardElementOptions} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVC
                        </label>
                        <div className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
                            <CardCvcElement options={cardElementOptions} />
                        </div>
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            <Button
                type="submit"
                disabled={!stripe || loading}
                className="w-full bg-primary hover:bg-primary-600 text-white font-semibold py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
                {loading ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                    </>
                ) : (
                    `Pay $${amount.toFixed(2)}`
                )}
            </Button>

            <p className="text-xs text-gray-500 text-center mt-4">
                Your payment information is securely processed by Stripe. We never store
                your card details.
            </p>
        </form>
    );
}
