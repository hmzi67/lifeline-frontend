import { useState } from "react";
import { config } from "@/config";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";

interface LemonSqueezyCheckoutProps {
    planTitle: string;
    amount: number;
    variantId?: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
}

/**
 * Lemon Squeezy Checkout Component
 * Creates a checkout session and redirects user to Lemon Squeezy hosted checkout
 */
export default function LemonSqueezyCheckout({
    planTitle,
    amount,
    variantId,
    onSuccess,
    onError,
}: LemonSqueezyCheckoutProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckout = async () => {
        try {
            setIsLoading(true);

            // Create checkout session (auth token is automatically added by axios interceptor)
            const response = await api.post(
                "/lemonsqueezy/checkout",
                {
                    variantId: variantId,
                }
            );

            if (response.data.success && response.data.data.checkoutUrl) {
                // Redirect to Lemon Squeezy checkout
                window.location.href = response.data.data.checkoutUrl;

                // Call success callback before redirect
                if (onSuccess) {
                    onSuccess();
                }
            } else {
                throw new Error("Failed to create checkout session");
            }
        } catch (error: any) {
            console.error("Lemon Squeezy checkout error:", error);

            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "Failed to initiate checkout";

            if (onError) {
                onError(errorMessage);
            } else {
                alert(errorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="border rounded-lg p-6 bg-gray-50">
                <h3 className="text-xl font-semibold mb-2">{planTitle}</h3>
                <p className="text-3xl font-bold text-primary mb-4">
                    ${amount}
                    <span className="text-base font-normal text-gray-600">/month</span>
                </p>
                <p className="text-sm text-gray-600 mb-4">
                    Secure payment powered by Lemon Squeezy
                </p>
            </div>

            <Button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary-600 text-white font-semibold py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
                {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        Processing...
                    </span>
                ) : (
                    `Pay $${amount} with Lemon Squeezy`
                )}
            </Button>

            <p className="text-xs text-gray-500 text-center">
                You will be redirected to secure Lemon Squeezy checkout page
            </p>
        </div>
    );
}
