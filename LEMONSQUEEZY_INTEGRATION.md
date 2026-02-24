# Lemon Squeezy Payment Integration - Complete Guide

## 📋 Summary of Changes

### Backend (API)

#### Files Created:

1. **`/api/src/services/lemonSqueezyService.ts`** - Service layer for Lemon Squeezy API interactions
   - `createCheckout()` - Creates checkout sessions
   - `getOrder()` - Retrieves order details

2. **`/api/src/controllers/lemonSqueezyController.ts`** - Request handlers
   - `createLemonSqueezyCheckout` - POST /api/lemonsqueezy/checkout (protected)
   - `handleLemonSqueezyWebhook` - POST /api/webhooks/lemonsqueezy (public)
   - Webhook signature verification with HMAC-SHA256
   - Event handlers for: order_created, subscription_created, subscription_updated, subscription_cancelled

3. **`/api/src/routes/lemonSqueezyRoutes.ts`** - Route definitions
   - Checkout endpoint (requires authentication)
   - Webhook endpoint (public, signature verified)

4. **`/api/.env.example.lemonsqueezy`** - Environment variable template

#### Files Modified:

1. **`/api/prisma/schema.prisma`** - Added subscription fields to User model:

   ```prisma
   subscriptionActive        Boolean?  @default(false)
   subscriptionId            String?
   subscriptionStatus        String?
   currentPeriodEnd          DateTime?
   lemonSqueezyCustomerId    String?
   ```

2. **`/api/src/config/index.ts`** - Added Lemon Squeezy configuration
   - API key, Store ID, Webhook secret, Variant ID

3. **`/api/src/app.ts`** - Registered routes with special webhook handling
   - Webhook route registered BEFORE express.json() to capture raw body
   - Checkout route registered with normal middleware chain

### Frontend (Client)

#### Files Created:

1. **`/client/src/components/payment/LemonSqueezyCheckout.tsx`** - Payment component
   - Creates checkout session via API
   - Redirects to Lemon Squeezy hosted checkout
   - Error handling and loading states

2. **`/client/.env.example.lemonsqueezy`** - Environment variable template (optional)

#### Files Modified:

1. **`/client/src/config/index.ts`** - Added Lemon Squeezy store ID config

2. **`/client/src/pages/marketing/Plan.tsx`** - Added Lemon Squeezy payment option
   - New payment method button with lemon emoji 🍋
   - State management for showing Lemon Squeezy form
   - Integration alongside existing Stripe payment

---

## 🔧 Environment Variables Setup

### Backend (.env)

Add these variables to your `/api/.env` file:

```bash
# Lemon Squeezy Configuration
LEMONSQUEEZY_API_KEY=your_secret_api_key_here
LEMONSQUEEZY_STORE_ID=your_store_id_here
LEMONSQUEEZY_WEBHOOK_SECRET=your_webhook_signing_secret_here
LEMONSQUEEZY_VARIANT_ID=your_product_variant_id_here
```

**How to get these values:**

1. **API Key**:
   - Go to Lemon Squeezy Dashboard → Settings → API
   - Create a new API key
   - Copy the key (starts with `lemon_api_...`)

2. **Store ID**:
   - Dashboard → Settings → Stores
   - Copy your store ID (numeric value)

3. **Webhook Secret**:
   - Dashboard → Settings → Webhooks
   - Create a new webhook endpoint
   - Copy the signing secret

4. **Variant ID**:
   - Dashboard → Products → Select your product
   - Click on the variant you want to sell
   - Copy the variant ID from the URL

### Frontend (.env) - Optional

Add to `/client/.env` (only if needed):

```bash
VITE_LEMONSQUEEZY_STORE_ID=your_store_id_here
```

---

## 🗄️ Database Migration

Run Prisma migration to add the new fields to your database:

```bash
cd api
npm run migrate
# or
npx prisma migrate dev --name add_lemonsqueezy_fields
```

If you need to generate Prisma client:

```bash
npx prisma generate
```

---

## 🧪 Testing the Integration

### 1. Test Checkout Flow Locally

1. **Start your backend server:**

   ```bash
   cd api
   npm run dev
   ```

2. **Start your frontend:**

   ```bash
   cd client
   npm run dev
   ```

3. **Test the flow:**
   - Navigate to the `/plan` route
   - Select a plan
   - Click "Continue"
   - Select "Lemon Squeezy" payment method
   - Click the payment button
   - You should be redirected to Lemon Squeezy checkout

### 2. Testing Webhooks Locally with ngrok

Since webhooks need a public URL, use ngrok to expose your local server:

1. **Install ngrok:**

   ```bash
   # On Mac
   brew install ngrok

   # On Linux
   sudo snap install ngrok

   # Or download from https://ngrok.com/download
   ```

2. **Start ngrok tunnel:**

   ```bash
   ngrok http 3000
   ```

   This will give you a public URL like: `https://abc123.ngrok.io`

3. **Configure webhook in Lemon Squeezy:**
   - Go to Lemon Squeezy Dashboard → Settings → Webhooks
   - Click "Create Webhook"
   - Set URL: `https://abc123.ngrok.io/api/webhooks/lemonsqueezy`
   - Select events to listen to:
     - ✅ `order_created`
     - ✅ `subscription_created`
     - ✅ `subscription_updated`
     - ✅ `subscription_cancelled`
   - Copy the signing secret to your `.env` file
   - Save the webhook

4. **Test a purchase:**
   - Use Lemon Squeezy test mode
   - Complete a test checkout
   - Check your backend logs for webhook events
   - Verify database is updated with subscription info

### 3. Testing with Lemon Squeezy Test Mode

Enable test mode in Lemon Squeezy dashboard to test without real payments.

**Test card numbers:**

- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

---

## 🔍 Monitoring & Debugging

### Backend Logs

The integration includes comprehensive logging:

```typescript
// Check your terminal/logs for:
-"Creating Lemon Squeezy checkout for user {userId}" -
  "Checkout created successfully: {checkoutId}" -
  "Received Lemon Squeezy webhook: {eventName}" -
  "Processing subscription_created for user {userId}" -
  "Subscription activated for user {userId}";
```

### Database Verification

After a successful webhook, verify the user record:

```sql
SELECT
  id,
  email,
  subscription_active,
  subscription_id,
  subscription_status,
  current_period_end,
  lemon_squeezy_customer_id
FROM users
WHERE email = 'test@example.com';
```

### Common Issues & Solutions

1. **"Invalid signature" webhook error**
   - ✅ Verify `LEMONSQUEEZY_WEBHOOK_SECRET` matches dashboard
   - ✅ Ensure webhook route is registered BEFORE express.json()
   - ✅ Check that raw body is captured correctly

2. **"User ID not found in custom data"**
   - ✅ Verify user is authenticated when creating checkout
   - ✅ Check that custom data is being sent in checkout request

3. **"Lemon Squeezy API key is not configured"**
   - ✅ Add `LEMONSQUEEZY_API_KEY` to `.env`
   - ✅ Restart your server after adding env variables

4. **Checkout creation fails**
   - ✅ Verify store ID and variant ID are correct
   - ✅ Check API key has proper permissions
   - ✅ Ensure product is active in Lemon Squeezy dashboard

---

## 🔐 Security Best Practices

1. **Never expose API keys in frontend code**
   - ✅ API key is only in backend `.env`
   - ✅ Frontend only calls backend API

2. **Always verify webhook signatures**
   - ✅ Uses HMAC-SHA256 verification
   - ✅ Timing-safe comparison prevents timing attacks

3. **Validate user authentication**
   - ✅ Checkout endpoint requires JWT authentication
   - ✅ User ID extracted from authenticated request

4. **Use environment variables**
   - ✅ Sensitive data in `.env` files
   - ✅ `.env` files in `.gitignore`

---

## 🚀 Production Deployment

### Before Going Live:

1. **Switch to production API key:**
   - Get production API key from Lemon Squeezy
   - Update `LEMONSQUEEZY_API_KEY` in production `.env`

2. **Update webhook URL:**
   - Create new webhook with production URL
   - URL format: `https://your-domain.com/api/webhooks/lemonsqueezy`
   - Update `LEMONSQUEEZY_WEBHOOK_SECRET` with new secret

3. **Test in production:**
   - Do a real test purchase (you can refund it)
   - Verify webhooks are received
   - Check database updates

4. **Monitor logs:**
   - Set up proper logging (Winston, Datadog, etc.)
   - Monitor webhook failures
   - Set up alerts for payment issues

---

## 📊 Webhook Event Details

### order_created

- **Triggers**: When a customer completes a purchase
- **Action**: Creates SubscriptionPayment record in database
- **Data**: Order details, amount, customer info

### subscription_created

- **Triggers**: When a new subscription is created
- **Action**:
  - Sets `subscriptionActive = true`
  - Stores subscription ID and status
  - Records period end date
  - Saves customer ID

### subscription_updated

- **Triggers**: When subscription details change
- **Action**: Updates subscription status and period end date

### subscription_cancelled

- **Triggers**: When customer cancels subscription
- **Action**:
  - If immediate: Sets `subscriptionActive = false`
  - If at period end: Schedules deactivation

---

## 🛠️ Advanced Customization

### Adding Custom Checkout Options

Modify `lemonSqueezyService.ts`:

```typescript
const requestBody = {
  data: {
    type: "checkouts",
    attributes: {
      checkout_data: {
        email: userEmail,
        custom: {
          user_id: userId,
        },
        discount_code: "PROMO2024", // Add discount
        name: userName, // Pre-fill name
      },
      checkout_options: {
        embed: false,
        media: true,
        logo: true,
        desc: true,
        discount: true,
        dark: false,
        subscription_preview: true,
        button_color: "#7C3AED",
      },
    },
    // ... rest of the request
  },
};
```

### Handling Multiple Product Variants

Pass variant ID from frontend:

```typescript
// In Plan.tsx
<LemonSqueezyCheckout
  amount={parseFloat(cardData[selectedCardIndex ?? 1].price)}
  planTitle={cardData[selectedCardIndex ?? 1].title}
  variantId="12345" // Different variant per plan
  onSuccess={() => { /* ... */ }}
  onError={(error) => { /* ... */ }}
/>
```

---

## 📚 Additional Resources

- [Lemon Squeezy API Documentation](https://docs.lemonsqueezy.com/api)
- [Webhook Event Reference](https://docs.lemonsqueezy.com/api/webhooks)
- [Checkout API Guide](https://docs.lemonsqueezy.com/api/checkouts)
- [Testing Guide](https://docs.lemonsqueezy.com/guides/developer/testing)

---

## 🎯 Next Steps & Future Improvements

### Recommended Enhancements:

1. **Subscription Management UI**
   - Add user dashboard to view subscription status
   - Allow users to cancel/upgrade subscriptions
   - Show billing history

2. **Email Notifications**
   - Send confirmation emails after successful payment
   - Notify users before subscription renewal
   - Alert on payment failures

3. **Analytics Integration**
   - Track conversion rates
   - Monitor payment success/failure rates
   - A/B test different pricing

4. **Customer Portal**
   - Integrate Lemon Squeezy customer portal
   - Allow users to manage payment methods
   - View invoices and receipts

5. **Refund Handling**
   - Add webhook handler for `order_refunded`
   - Update subscription status accordingly
   - Revoke access if needed

6. **Dunning Management**
   - Handle failed payment retries
   - Notify users of payment issues
   - Graceful subscription suspension

---

## ✅ Integration Checklist

- [x] Prisma schema updated with subscription fields
- [x] Database migrated
- [x] Environment variables configured
- [x] Lemon Squeezy service created
- [x] Checkout controller implemented
- [x] Webhook handler with signature verification
- [x] Routes registered correctly
- [x] Frontend payment component created
- [x] Plan page updated with Lemon Squeezy option
- [ ] Webhook configured in Lemon Squeezy dashboard
- [ ] Test mode checkout completed
- [ ] Webhook events verified
- [ ] Production API keys added
- [ ] Production webhook configured
- [ ] Monitoring and alerts set up

---

**Need Help?** Check the logs, verify environment variables, and ensure your Lemon Squeezy dashboard is properly configured. All API calls include detailed error logging to help debug issues.

Good luck with your payment integration! 🍋✨
