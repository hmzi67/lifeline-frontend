# 🍋 Lemon Squeezy Integration - Visual Guide

## 📱 User Experience Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    /plan Page                               │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐             │
│  │ 12 Month  │  │ 12 Month  │  │ 12 Month  │             │
│  │   Plan    │  │   Plan    │  │   Plan    │             │
│  │  $19.99   │  │  $19.99   │  │  $19.99   │             │
│  │ [Select]  │  │ [Select]  │  │ [Select]  │             │
│  └───────────┘  └───────────┘  └───────────┘             │
└─────────────────────────────────────────────────────────────┘
                         ↓ Click "Select"
┌─────────────────────────────────────────────────────────────┐
│              Select Payment Method                          │
│  ┌───────────────────────────────────────────────────┐    │
│  │  💳 Stripe                                        │    │
│  │  Pay securely using your VISA/MasterCard         │    │
│  └───────────────────────────────────────────────────┘    │
│  ┌───────────────────────────────────────────────────┐    │
│  │  🍋 Lemon Squeezy                     ← NEW!     │    │
│  │  Fast and secure payment processing               │    │
│  └───────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                         ↓ Click Lemon Squeezy
┌─────────────────────────────────────────────────────────────┐
│           Complete Your Payment                             │
│  ┌───────────────────────────────────────────────────┐    │
│  │  12 Month Plan                                    │    │
│  │  $19.99/month                                     │    │
│  │  Secure payment powered by Lemon Squeezy         │    │
│  │                                                   │    │
│  │  [Pay $19.99 with Lemon Squeezy]                │    │
│  └───────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                         ↓ Click Pay Button
┌─────────────────────────────────────────────────────────────┐
│         Redirecting to Lemon Squeezy...                    │
│                 [Loading Spinner]                           │
└─────────────────────────────────────────────────────────────┘
                         ↓ Redirect
┌─────────────────────────────────────────────────────────────┐
│    Lemon Squeezy Hosted Checkout Page                      │
│  (Customer completes payment on Lemon Squeezy)             │
└─────────────────────────────────────────────────────────────┘
                         ↓ After Payment
┌─────────────────────────────────────────────────────────────┐
│         Payment Successful!                                 │
│    Your subscription is now active                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 Backend Architecture

```
┌────────────────────────────────────────────────────────────┐
│                    Express App (app.ts)                    │
└────────────────────────────────────────────────────────────┘
                          │
         ┌────────────────┴─────────────────┐
         ↓                                  ↓
┌────────────────────┐          ┌───────────────────────┐
│  Checkout Route    │          │   Webhook Route       │
│  (Protected)       │          │   (Public)            │
└────────────────────┘          └───────────────────────┘
         │                                  │
         ↓                                  ↓
┌────────────────────┐          ┌───────────────────────┐
│  authenticate      │          │  Verify Signature     │
│  middleware        │          │  (HMAC-SHA256)        │
└────────────────────┘          └───────────────────────┘
         │                                  │
         ↓                                  ↓
┌────────────────────┐          ┌───────────────────────┐
│ lemonSqueezy       │          │ lemonSqueezy          │
│ Controller         │          │ Controller            │
│ createCheckout()   │          │ handleWebhook()       │
└────────────────────┘          └───────────────────────┘
         │                                  │
         ↓                                  │
┌────────────────────┐          ┌───────────┴───────────┐
│ lemonSqueezy       │          │   Event Handlers:     │
│ Service            │          │   - order_created     │
│ - createCheckout() │          │   - subscription_*    │
│ - getOrder()       │          │   - subscription_*    │
└────────────────────┘          └───────────────────────┘
         │                                  │
         ↓                                  ↓
┌────────────────────┐          ┌───────────────────────┐
│ Lemon Squeezy API  │          │  Prisma Database      │
│ (External)         │          │  - User updates       │
└────────────────────┘          │  - Payment records    │
                                └───────────────────────┘
```

---

## 💾 Database Schema

```sql
-- User Model (Updated)
Table: users
┌─────────────────────────┬──────────────┬──────────────┐
│ Field                   │ Type         │ Description  │
├─────────────────────────┼──────────────┼──────────────┤
│ id                      │ String       │ Primary Key  │
│ email                   │ String       │ Unique       │
│ ...existing fields...   │ ...          │ ...          │
├─────────────────────────┼──────────────┼──────────────┤
│ subscription_active     │ Boolean      │ NEW! ✨      │
│ subscription_id         │ String?      │ NEW! ✨      │
│ subscription_status     │ String?      │ NEW! ✨      │
│ current_period_end      │ DateTime?    │ NEW! ✨      │
│ lemon_squeezy_customer  │ String?      │ NEW! ✨      │
└─────────────────────────┴──────────────┴──────────────┘
```

---

## 🔄 Webhook Event Processing

```
┌─────────────────────────────────────────────────────────────┐
│        Lemon Squeezy sends POST request                     │
│   POST /api/webhooks/lemonsqueezy                           │
│   Header: X-Signature: <hmac_sha256>                        │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│     1. Capture Raw Body (before JSON parsing)               │
│        - Required for signature verification                │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│     2. Verify HMAC-SHA256 Signature                         │
│        - HMAC(webhook_secret, raw_body) = X-Signature?      │
│        - Timing-safe comparison                             │
└─────────────────────────────────────────────────────────────┘
                         ↓
                   Valid? ── No ──→ Return 401
                         │
                       Yes ↓
┌─────────────────────────────────────────────────────────────┐
│     3. Parse Event Type                                     │
│        meta.event_name → order_created | subscription_*     │
└─────────────────────────────────────────────────────────────┘
                         ↓
          ┌──────────────┴──────────────┐
          ↓                             ↓
    order_created              subscription_created
          ↓                             ↓
   Create Payment              Activate Subscription
   Record in DB                Update User:
                               - subscription_active = true
                               - subscription_id
                               - subscription_status
                               - current_period_end
                               - customer_id
                         ↓
┌─────────────────────────────────────────────────────────────┐
│     4. Return 200 OK (acknowledge receipt)                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔐 Security Flow

```
┌─────────────────────────────────────────────────────────────┐
│                   Frontend (Client)                         │
│   - User clicks "Pay with Lemon Squeezy"                    │
│   - Gets JWT token from localStorage                        │
└─────────────────────────────────────────────────────────────┘
                         ↓ HTTP Request
┌─────────────────────────────────────────────────────────────┐
│   POST /api/lemonsqueezy/checkout                           │
│   Header: Authorization: Bearer <JWT_TOKEN>                 │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│   authenticate Middleware                                   │
│   1. Extract JWT from Authorization header                  │
│   2. Verify JWT signature with JWT_SECRET                   │
│   3. Decode user info (userId, email)                       │
│   4. Attach user to request object                          │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│   Controller: createLemonSqueezyCheckout                    │
│   1. Get userId and email from authenticated request        │
│   2. Call Lemon Squeezy API with:                           │
│      - Store ID                                             │
│      - Variant ID                                           │
│      - Custom data: { user_id: userId }                     │
│   3. Return checkout URL to frontend                        │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│   Frontend redirects user to checkout URL                   │
│   User pays on Lemon Squeezy (secure, PCI-compliant)        │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│   Lemon Squeezy sends webhook with HMAC signature           │
│   Signature verified with WEBHOOK_SECRET                    │
│   User subscription activated in database                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 📂 File Structure

```
lifeline-frontend/
├── api/
│   ├── .env                           ← Add Lemon Squeezy keys here
│   ├── .env.example.lemonsqueezy      ← NEW! Template
│   ├── prisma/
│   │   └── schema.prisma              ← Modified (5 new fields)
│   └── src/
│       ├── config/
│       │   └── index.ts               ← Modified (LS config added)
│       ├── controllers/
│       │   └── lemonSqueezyController.ts  ← NEW! (310 lines)
│       ├── routes/
│       │   └── lemonSqueezyRoutes.ts      ← NEW! (25 lines)
│       ├── services/
│       │   └── lemonSqueezyService.ts     ← NEW! (185 lines)
│       └── app.ts                     ← Modified (routes registered)
│
├── client/
│   ├── .env.example.lemonsqueezy      ← NEW! Template
│   └── src/
│       ├── components/
│       │   └── payment/
│       │       └── LemonSqueezyCheckout.tsx  ← NEW! (130 lines)
│       ├── config/
│       │   └── index.ts               ← Modified (LS config)
│       └── pages/
│           └── marketing/
│               └── Plan.tsx            ← Modified (payment option)
│
├── LEMONSQUEEZY_INTEGRATION.md        ← NEW! Comprehensive guide
├── QUICK_START_LEMONSQUEEZY.md        ← NEW! Quick reference
├── INTEGRATION_SUMMARY.md             ← NEW! Complete summary
├── VISUAL_GUIDE.md                    ← NEW! This file
└── setup-lemonsqueezy.sh              ← NEW! Setup script
```

---

## 🎨 UI Components

### Payment Method Selection Screen

```
┌──────────────────────────────────────────────┐
│   Select Payment Method                      │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ 💳 Stripe                           │  │
│  │ Pay securely using VISA/MasterCard  │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ 🍋 Lemon Squeezy         [CLICK ME] │  │
│  │ Fast and secure payment processing   │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ← Back to Plans                            │
└──────────────────────────────────────────────┘
```

### Lemon Squeezy Payment Screen

```
┌──────────────────────────────────────────────┐
│   Complete Your Payment                      │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │                                      │  │
│  │  12 Month Plan                       │  │
│  │  $19.99/month                        │  │
│  │                                      │  │
│  │  Secure payment powered by           │  │
│  │  Lemon Squeezy                       │  │
│  │                                      │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │  Pay $19.99 with Lemon Squeezy      │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  You will be redirected to secure           │
│  Lemon Squeezy checkout page                │
│                                              │
│  ← Back to Payment Methods                  │
└──────────────────────────────────────────────┘
```

---

## 🔄 State Management

```typescript
// Plan.tsx State Variables
const [showPayment, setShowPayment] = useState(false);
const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(1);
const [showStripeForm, setShowStripeForm] = useState(false);
const [showLemonSqueezyForm, setShowLemonSqueezyForm] = useState(false);

// State Flow:
Plan Selection Screen
  → showPayment = false
  → User clicks "Continue"
  → showPayment = true

Payment Method Selection
  → showPayment = true
  → showStripeForm = false
  → showLemonSqueezyForm = false
  → User clicks "Lemon Squeezy"
  → showLemonSqueezyForm = true

Lemon Squeezy Payment Form
  → showLemonSqueezyForm = true
  → User clicks "Pay"
  → Redirect to Lemon Squeezy
```

---

## 📡 API Communication

### Frontend → Backend

```
LemonSqueezyCheckout Component
        ↓
    axios.post(
      `${config.apiUrl}/api/lemonsqueezy/checkout`,
      { variantId },
      { headers: { Authorization: `Bearer ${token}` } }
    )
        ↓
    Response: { checkoutUrl, checkoutId }
        ↓
    window.location.href = checkoutUrl
```

### Lemon Squeezy → Backend

```
Lemon Squeezy Webhook System
        ↓
    POST /api/webhooks/lemonsqueezy
    Headers: { X-Signature: "hmac..." }
    Body: { meta: { event_name }, data: {...} }
        ↓
    Backend processes event
        ↓
    Database updated
        ↓
    Response: 200 OK
```

---

## ✅ Success Indicators

### Frontend

- ✅ No TypeScript errors in Plan.tsx
- ✅ No TypeScript errors in LemonSqueezyCheckout.tsx
- ✅ Component renders without errors
- ✅ Button shows "🍋 Lemon Squeezy"
- ✅ Clicking button makes API call
- ✅ Loading spinner shows during API call
- ✅ Redirects to Lemon Squeezy on success

### Backend

- ✅ No TypeScript errors
- ✅ Prisma client generated successfully
- ✅ Server starts without errors
- ✅ Checkout endpoint responds
- ✅ Webhook endpoint accessible
- ✅ Signature verification works
- ✅ Database updates on webhook

### Database

- ✅ Migration applied successfully
- ✅ New fields visible in database
- ✅ User records can be updated
- ✅ Subscription data persists

---

**Visual Guide Complete! 🎉**

Refer to this guide for understanding the system architecture, user flow, and component structure at a glance.
