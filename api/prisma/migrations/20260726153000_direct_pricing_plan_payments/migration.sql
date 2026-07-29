ALTER TABLE "users"
ADD COLUMN "trial_used_at" TIMESTAMP(3);

ALTER TABLE "pricing_plans"
ADD COLUMN "trial_days" INTEGER NOT NULL DEFAULT 0;

ALTER TABLE "subscription_payments"
ADD COLUMN "pricing_plan_id" TEXT,
ADD COLUMN "duration_months" INTEGER,
ADD COLUMN "stripe_setup_intent_id" VARCHAR(255),
ADD COLUMN "stripe_payment_method_id" VARCHAR(255);

CREATE INDEX "subscription_payments_pricing_plan_id_idx"
ON "subscription_payments"("pricing_plan_id");

ALTER TABLE "subscription_payments"
ADD CONSTRAINT "subscription_payments_pricing_plan_id_fkey"
FOREIGN KEY ("pricing_plan_id") REFERENCES "pricing_plans"("id")
ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "pricing_plans"
DROP COLUMN "stripe_price_id";
