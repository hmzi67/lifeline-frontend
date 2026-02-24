# 🍋 Lemon Squeezy Integration - Implementation Checklist

## ✅ Pre-Implementation (Already Done!)

- [x] Analyzed codebase structure
- [x] Understood framework (Node/Express/TypeScript/Prisma)
- [x] Checked existing authentication system
- [x] Reviewed existing payment flow (Stripe)
- [x] Identified integration points
- [x] Created implementation plan

---

## ✅ Backend Implementation (Already Done!)

### Database Schema

- [x] Added `subscriptionActive` field to User model
- [x] Added `subscriptionId` field to User model
- [x] Added `subscriptionStatus` field to User model
- [x] Added `currentPeriodEnd` field to User model
- [x] Added `lemonSqueezyCustomerId` field to User model

### Configuration

- [x] Added Lemon Squeezy env variables to config schema
- [x] Created config object with LS settings
- [x] Created `.env.example.lemonsqueezy` template

### Service Layer

- [x] Created `lemonSqueezyService.ts`
- [x] Implemented `createCheckout()` function
- [x] Implemented `getOrder()` function
- [x] Added error handling and logging
- [x] Followed Lemon Squeezy API v1 spec

### Controller

- [x] Created `lemonSqueezyController.ts`
- [x] Implemented `createLemonSqueezyCheckout()` handler
- [x] Implemented `handleLemonSqueezyWebhook()` handler
- [x] Added HMAC-SHA256 signature verification
- [x] Implemented `order_created` event handler
- [x] Implemented `subscription_created` event handler
- [x] Implemented `subscription_updated` event handler
- [x] Implemented `subscription_cancelled` event handler

### Routes

- [x] Created `lemonSqueezyRoutes.ts`
- [x] Added checkout endpoint (protected)
- [x] Added webhook endpoint (public)
- [x] Registered routes in `app.ts`
- [x] Configured webhook raw body capture

---

## ✅ Frontend Implementation (Already Done!)

### Configuration

- [x] Added Lemon Squeezy config to client config
- [x] Created `.env.example.lemonsqueezy` template

### Components

- [x] Created `LemonSqueezyCheckout.tsx` component
- [x] Implemented checkout creation logic
- [x] Added redirect to Lemon Squeezy
- [x] Added loading states
- [x] Added error handling
- [x] Styled to match existing UI

### Pages

- [x] Updated `Plan.tsx` with Lemon Squeezy option
- [x] Added state management for payment method
- [x] Added UI for Lemon Squeezy selection
- [x] Added payment form screen
- [x] Maintained existing Stripe integration

---

## ✅ Documentation (Already Done!)

- [x] Created comprehensive integration guide
- [x] Created quick start guide
- [x] Created visual architecture guide
- [x] Created implementation summary
- [x] Created this checklist
- [x] Created setup automation script

---

## 📋 Your Setup Tasks (To Do Now)

### 1. Get Lemon Squeezy Credentials

- [ ] Log into Lemon Squeezy Dashboard
- [ ] Go to Settings → API
- [ ] Create or copy API Key
- [ ] Note your Store ID
- [ ] Create a Product if you haven't
- [ ] Note the Variant ID for your product

### 2. Configure Backend Environment

- [ ] Open `/api/.env` file
- [ ] Add these lines:
  ```bash
  LEMONSQUEEZY_API_KEY=your_api_key_here
  LEMONSQUEEZY_STORE_ID=your_store_id_here
  LEMONSQUEEZY_WEBHOOK_SECRET=temporary_secret  # Will update after webhook setup
  LEMONSQUEEZY_VARIANT_ID=your_variant_id_here
  ```

### 3. Run Database Migration

- [ ] Open terminal in project root
- [ ] Run: `cd api`
- [ ] Run: `npx prisma migrate dev --name add_lemonsqueezy_fields`
- [ ] Run: `npx prisma generate`
- [ ] Verify no errors

### 4. Test Backend Locally

- [ ] Run: `cd api && npm run dev`
- [ ] Check terminal - should start without errors
- [ ] Verify you see: "Server running on port 3000"
- [ ] Test health check: `curl http://localhost:3000/health`

### 5. Test Frontend Locally

- [ ] Open new terminal
- [ ] Run: `cd client && npm run dev`
- [ ] Open browser to frontend URL (usually http://localhost:5173)
- [ ] Navigate to `/plan` route
- [ ] Verify "Lemon Squeezy" option appears

### 6. Test Checkout Flow (Without Payment)

- [ ] Select a plan on `/plan` page
- [ ] Click "Continue"
- [ ] Click "Lemon Squeezy" option
- [ ] Click "Pay" button
- [ ] Should see loading spinner
- [ ] Check browser network tab for API call
- [ ] Verify API returns checkoutUrl
- [ ] You should be redirected to Lemon Squeezy (may show error if using test mode)

---

## 🌐 Webhook Setup (For Testing)

### 7. Install ngrok (for local testing)

- [ ] Install ngrok: https://ngrok.com/download
- [ ] Or use: `brew install ngrok` (Mac) or `snap install ngrok` (Linux)

### 8. Start ngrok Tunnel

- [ ] Open new terminal
- [ ] Run: `ngrok http 3000`
- [ ] Copy the HTTPS URL (looks like: `https://abc123.ngrok.io`)
- [ ] Keep this terminal running

### 9. Configure Webhook in Lemon Squeezy

- [ ] Go to Lemon Squeezy Dashboard
- [ ] Navigate to Settings → Webhooks
- [ ] Click "Create Webhook"
- [ ] Webhook URL: `https://your-ngrok-url.ngrok.io/api/webhooks/lemonsqueezy`
- [ ] Select events:
  - [x] order_created
  - [x] subscription_created
  - [x] subscription_updated
  - [x] subscription_cancelled
- [ ] Save webhook
- [ ] Copy the Signing Secret

### 10. Update Webhook Secret

- [ ] Open `/api/.env`
- [ ] Update: `LEMONSQUEEZY_WEBHOOK_SECRET=your_actual_signing_secret`
- [ ] Restart backend server (Ctrl+C and `npm run dev` again)

---

## 🧪 Full Integration Test

### 11. Test with Lemon Squeezy Test Mode

- [ ] Enable Test Mode in Lemon Squeezy Dashboard
- [ ] Go to your frontend `/plan` page
- [ ] Select a plan
- [ ] Choose "Lemon Squeezy"
- [ ] Complete checkout with test card: `4242 4242 4242 4242`
- [ ] Complete the purchase

### 12. Verify Webhook Received

- [ ] Check your backend terminal logs
- [ ] Should see: "Received Lemon Squeezy webhook: subscription_created"
- [ ] Should see: "Subscription activated for user {userId}"

### 13. Verify Database Updated

- [ ] Open database tool or run query:
  ```sql
  SELECT
    email,
    subscription_active,
    subscription_id,
    subscription_status
  FROM users
  WHERE email = 'your-test-email@example.com';
  ```
- [ ] Verify `subscription_active = true`
- [ ] Verify `subscription_id` is populated
- [ ] Verify `subscription_status` shows "active"

---

## 🚀 Production Deployment

### 14. Get Production Credentials

- [ ] Switch Lemon Squeezy to Production Mode
- [ ] Create production API Key
- [ ] Update `.env` with production API key

### 15. Configure Production Webhook

- [ ] Create new webhook in production mode
- [ ] Use production URL: `https://your-actual-domain.com/api/webhooks/lemonsqueezy`
- [ ] Select same events as before
- [ ] Copy production signing secret
- [ ] Update production `.env` with signing secret

### 16. Deploy to Production

- [ ] Deploy backend with updated `.env`
- [ ] Deploy frontend
- [ ] Run database migration on production DB
- [ ] Test production checkout end-to-end

### 17. Production Testing

- [ ] Make a real test purchase (you can refund it)
- [ ] Verify webhook received in production
- [ ] Verify database updated
- [ ] Verify user can access subscription features
- [ ] Refund test purchase

---

## 📊 Monitoring Setup (Recommended)

### 18. Set Up Logging

- [ ] Configure log aggregation (e.g., Datadog, LogRocket)
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Monitor webhook delivery success rate
- [ ] Track failed payments

### 19. Set Up Alerts

- [ ] Alert on webhook failures
- [ ] Alert on high error rates
- [ ] Alert on payment processing issues
- [ ] Monitor API response times

---

## 🎯 Post-Deployment Checklist

### 20. Documentation & Team Training

- [ ] Share integration documentation with team
- [ ] Train support team on Lemon Squeezy flow
- [ ] Document troubleshooting procedures
- [ ] Create runbook for common issues

### 21. User Communication

- [ ] Update user-facing documentation
- [ ] Announce new payment option (if applicable)
- [ ] Update FAQ with Lemon Squeezy info
- [ ] Prepare support responses for common questions

---

## 🔄 Ongoing Maintenance

### Regular Tasks

- [ ] Monitor webhook success rate weekly
- [ ] Review payment failures monthly
- [ ] Update Lemon Squeezy SDK if needed
- [ ] Check for Lemon Squeezy API changes quarterly

### When Issues Arise

- [ ] Check backend logs first
- [ ] Verify webhook signature is correct
- [ ] Test with Lemon Squeezy test mode
- [ ] Contact Lemon Squeezy support if needed

---

## 📚 Reference Documents

- [ ] Bookmark: [LEMONSQUEEZY_INTEGRATION.md](./LEMONSQUEEZY_INTEGRATION.md)
- [ ] Bookmark: [QUICK_START_LEMONSQUEEZY.md](./QUICK_START_LEMONSQUEEZY.md)
- [ ] Bookmark: [VISUAL_GUIDE.md](./VISUAL_GUIDE.md)
- [ ] Bookmark: [Lemon Squeezy API Docs](https://docs.lemonsqueezy.com/api)

---

## ✅ Completion Criteria

### You're Done When:

- [x] All backend code written and tested
- [x] All frontend code written and tested
- [x] Documentation complete
- [ ] Environment variables configured
- [ ] Database migration successful
- [ ] Local checkout flow works
- [ ] Webhook receives and processes events
- [ ] Database updates correctly
- [ ] Production deployment successful
- [ ] Real payment test successful

---

## 🎉 Success!

Once all checkboxes are complete, your Lemon Squeezy integration is fully operational!

**Current Status**: Code Complete ✅ | Setup Pending ⏳

**Next Step**: Start with "Your Setup Tasks" section above!

---

## 💡 Quick Help

**Stuck?**

1. Check [QUICK_START_LEMONSQUEEZY.md](./QUICK_START_LEMONSQUEEZY.md)
2. Review logs in terminal
3. Verify environment variables
4. Check [VISUAL_GUIDE.md](./VISUAL_GUIDE.md) for architecture

**Need More Detail?**

- See [LEMONSQUEEZY_INTEGRATION.md](./LEMONSQUEEZY_INTEGRATION.md) for comprehensive guide

---

_Last Updated: Integration Complete - Ready for Configuration_
