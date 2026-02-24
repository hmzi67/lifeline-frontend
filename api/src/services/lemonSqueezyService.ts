import { config } from '../config/index.js';

/**
 * Lemon Squeezy API Service
 * Handles all interactions with the Lemon Squeezy API
 */

interface CheckoutData {
  checkoutUrl: string;
  checkoutId: string;
}

interface LemonSqueezyCheckoutResponse {
  data: {
    id: string;
    type: string;
    attributes: {
      url: string;
      store_id: number;
      variant_id: number;
      custom_price: number | null;
      product_options: any;
      checkout_options: any;
      checkout_data: any;
      preview: any;
      created_at: string;
      updated_at: string;
    };
  };
}

interface LemonSqueezyOrderResponse {
  data: {
    id: string;
    type: string;
    attributes: {
      store_id: number;
      customer_id: number;
      order_number: number;
      user_name: string;
      user_email: string;
      currency: string;
      total: number;
      status: string;
      created_at: string;
      updated_at: string;
    };
  };
}

/**
 * Create a checkout session in Lemon Squeezy
 * @param userId - User ID to associate with the checkout
 * @param userEmail - User email for the checkout
 * @param variantId - Product variant ID (optional, defaults to env variable)
 * @returns Checkout URL and ID
 */
export const createCheckout = async (
  userId: string,
  userEmail: string,
  variantId?: string
): Promise<CheckoutData> => {
  try {
    if (!config.lemonSqueezy.apiKey) {
      throw new Error('Lemon Squeezy API key is not configured');
    }

    if (!config.lemonSqueezy.storeId) {
      throw new Error('Lemon Squeezy store ID is not configured');
    }

    const productVariantId = variantId || config.lemonSqueezy.variantId;
    if (!productVariantId) {
      throw new Error('Product variant ID is required');
    }

    console.log('Lemon Squeezy Configuration Check:');
    console.log('- API Key present:', !!config.lemonSqueezy.apiKey);
    console.log('- Store ID:', config.lemonSqueezy.storeId);
    console.log('- Variant ID:', productVariantId);

    // Construct the request body according to Lemon Squeezy API spec
    const requestBody = {
      data: {
        type: 'checkouts',
        attributes: {
          checkout_data: {
            email: userEmail,
            custom: {
              user_id: userId,
            },
          },
        },
        relationships: {
          store: {
            data: {
              type: 'stores',
              id: config.lemonSqueezy.storeId,
            },
          },
          variant: {
            data: {
              type: 'variants',
              id: productVariantId,
            },
          },
        },
      },
    };

    console.log(`Creating Lemon Squeezy checkout for user ${userId} (${userEmail})`);

    const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.lemonSqueezy.apiKey}`,
        'Content-Type': 'application/vnd.api+json',
        Accept: 'application/vnd.api+json',
      },
      body: JSON.stringify(requestBody),
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lemon Squeezy API error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(`Lemon Squeezy API error: ${response.status} - ${errorText}`);
    }

    const data: LemonSqueezyCheckoutResponse = await response.json();

    console.log(`Checkout created successfully: ${data.data.id}`);

    return {
      checkoutUrl: data.data.attributes.url,
      checkoutId: data.data.id,
    };
  } catch (error) {
    console.error('Error creating Lemon Squeezy checkout:', error);
    
    // Enhanced error reporting
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Lemon Squeezy API request timed out. Please check your network connection.');
      }
      if (error.message.includes('fetch failed')) {
        throw new Error('Unable to connect to Lemon Squeezy API. Please check your internet connection and firewall settings.');
      }
    }
    
    throw error;
  }
};

/**
 * Get order details from Lemon Squeezy
 * @param orderId - The order ID to retrieve
 * @returns Order details
 */
export const getOrder = async (orderId: string): Promise<LemonSqueezyOrderResponse['data']> => {
  try {
    if (!config.lemonSqueezy.apiKey) {
      throw new Error('Lemon Squeezy API key is not configured');
    }

    console.log(`Fetching order details for order ${orderId}`);

    const response = await fetch(`https://api.lemonsqueezy.com/v1/orders/${orderId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${config.lemonSqueezy.apiKey}`,
        Accept: 'application/vnd.api+json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lemon Squeezy API error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(`Lemon Squeezy API error: ${response.status} - ${errorText}`);
    }

    const data: LemonSqueezyOrderResponse = await response.json();

    console.log(`Order retrieved successfully: ${data.data.id}`);

    return data.data;
  } catch (error) {
    console.error('Error fetching Lemon Squeezy order:', error);
    throw error;
  }
};
