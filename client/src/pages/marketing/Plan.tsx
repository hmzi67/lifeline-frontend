import Footer from "@/components/common/Footer";
import { PricingCard } from "@/components/marketing/PricingCard";
import { Button } from "@/components/ui/button";
import { Tag, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripePaymentForm from "@/components/payment/StripePaymentForm";
import LemonSqueezyCheckout from "@/components/payment/LemonSqueezyCheckout";
import { config } from "@/config";

const stripePromise = loadStripe(config.stripePublishableKey);

export default function Plan() {
  const [showPayment, setShowPayment] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(1);
  const [showStripeForm, setShowStripeForm] = useState(false);
  const [showLemonSqueezyForm, setShowLemonSqueezyForm] = useState(false);

  const features = ["Steps Counter track by hand", "Heart Rate by our premium fitness band", "Calorie Counter on daily basis", "Progress Tracking weekly and monthly as well", "Water Intake by your every intake"]; const highlightedFeatures = ["Steps Counter track by hand", "Heart Rate by our premium fitness band", "Calorie Counter on daily basis", "Progress Tracking weekly and monthly as well", "Water intake by your every intake", "Steps Counter track by hand", "Heart Rate by our premium fitness band", "Calorie Counter on daily basis"]; const cardData = [{ title: "12 Months Plan", price: "19.99", originalPrice: "$39.99/m", features: features, hasCoupon: true }, { title: "12 Months Plan", price: "19.99", originalPrice: "$39.99/m", features: highlightedFeatures, hasCoupon: true }, { title: "12 Months Plan", price: "19.99", originalPrice: "$39.99/m", features: features, hasCoupon: true }];

  return (
    <>
      {/* Header */}
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <img src="/logo.svg" className="w-16 h-16 sm:w-20 sm:h-20" />
          <div className="flex items-center justify-center gap-4">
            <p className="hidden md:flex items-center justify-center gap-2 text-gray-800">
              <Tag />
              Your Discount is applied for 12:00
            </p>
            <Button
              className="bg-primary hover:bg-primary-500 text-white font-semibold rounded-lg py-3 text-base transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>


      <div className="flex flex-col items-center justify-center bg-white text-gray-800 py-8 sm:py-16 px-4">
        {!showPayment ? (
          // PRICING SCREEN
          <>
            <div className="mb-8 sm:mb-12 text-center max-w-2xl">
              <h1 className="font-extrabold text-3xl sm:text-4xl text-gray-900 mb-4">
                Select Payment Method
              </h1>
              <p className="text-base sm:text-lg text-gray-600">
                LifeLine will help you in this fitness journey with science based approach this
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
              {cardData.map((card, index) => (
                <PricingCard
                  key={index}
                  title={card.title}
                  price={card.price}
                  originalPrice={card.originalPrice}
                  features={card.features}
                  hasCoupon={card.hasCoupon}
                  isSelected={selectedCardIndex === index}
                  onSelect={() => setSelectedCardIndex(index)}
                  onContinue={() => setShowPayment(true)}
                />
              ))}
            </div>

            <p className="text-gray-700 font-semibold max-w-4xl text-center mt-12 text-sm sm:text-base">
              Unlock our library of meditations, sleep sounds, and more. We'll send you reminder that your trails is ending soon. You'll be charged on March 28, cancel anytime before.
            </p>
          </>
        ) : !showStripeForm && !showLemonSqueezyForm ? (
          // PAYMENT METHOD SCREEN
          <div className="w-full max-w-2xl rounded-3xl p-4 sm:p-8">
            <button
              onClick={() => setShowPayment(false)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Plans
            </button>
            <div className="mb-8 sm:mb-12 text-center max-w-2xl">
              <h1 className="font-extrabold text-3xl sm:text-4xl text-gray-900 mb-4">
                Select Payment Method
              </h1>
              <p className="text-base sm:text-lg text-gray-600">
                LifeLine will support you on your fitness journey with a science-based approach.
              </p>
            </div>
            <div className="space-y-6">
              {/* Stripe Payment Option */}
              <div
                onClick={() => setShowStripeForm(true)}
                className="flex items-center border border-primary rounded-full p-4 sm:p-5 hover:shadow-md transition cursor-pointer hover:bg-gray-50"
              >
                <span className="text-blue-600 font-bold mr-4 text-xl w-16 sm:w-20 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 750 471"
                  >
                    <g fill="#3EC6C9">
                      <path d="M278.198,334.228l33.36-195.763h53.358l-33.384,195.763H278.198L278.198,334.228z" />
                      <path d="M524.307,142.687c-10.57-3.966-27.135-8.222-47.822-8.222c-52.725,0-89.863,26.551-90.18,64.604c-0.297,28.129,26.514,43.821,46.754,53.185c20.77,9.597,27.752,15.716,27.652,24.283c-0.133,13.123-16.586,19.116-31.924,19.116c-21.355,0-32.701-2.967-50.225-10.274l-6.877-3.112l-7.488,43.823c12.463,5.466,35.508,10.199,59.438,10.445c56.09,0,92.502-26.248,92.916-66.884c0.199-22.27-14.016-39.216-44.801-53.188c-18.65-9.056-30.072-15.099-29.951-24.269c0-8.137,9.668-16.838,30.559-16.838c17.447-0.271,30.088,3.534,39.936,7.5l4.781,2.259L524.307,142.687" />
                      <path d="M661.615,138.464h-41.23c-12.773,0-22.332,3.486-27.941,16.234l-79.244,179.402h56.031c0,0,9.16-24.121,11.232-29.418c6.123,0,60.555,0.084,68.336,0.084c1.596,6.854,6.492,29.334,6.492,29.334h49.512L661.615,138.464L661.615,138.464z M596.198,264.872c4.414-11.279,21.26-54.724,21.26-54.724c-0.314,0.521,4.381-11.334,7.074-18.684l3.607,16.878c0,0,10.217,46.729,12.352,56.527h-44.293V264.872L596.198,264.872z" />
                      <path d="M45.878906 138.46484L45.197266 142.53711C66.290228 147.64311 85.129273 155.0333 101.62305 164.22656L148.96875 333.91406L205.42383 333.85156L289.42773 138.46484L232.90234 138.46484L180.66406 271.96094L175.09961 244.83008C174.83893 243.99185 174.55554 243.15215 174.26562 242.31055L156.10547 154.99219C152.87647 142.59619 143.50892 138.89684 131.91992 138.46484L45.878906 138.46484z" />
                    </g>
                  </svg>
                </span>
                <div>
                  <p className="font-semibold text-lg sm:text-xl">Stripe</p>
                  <p className="text-gray-500 text-sm">
                    Pay securely using your VISA/MasterCard via Stripe.
                  </p>
                </div>
              </div>

              {/* Lemon Squeezy Payment Option */}
              <div
                onClick={() => setShowLemonSqueezyForm(true)}
                className="flex items-center border border-primary rounded-full p-4 sm:p-5 hover:shadow-md transition cursor-pointer hover:bg-gray-50"
              >
                <span className="mr-4 w-16 sm:w-20 flex-shrink-0 flex items-center justify-center">
                  <span className="text-4xl">🍋</span>
                </span>
                <div>
                  <p className="font-semibold text-lg sm:text-xl">Lemon Squeezy</p>
                  <p className="text-gray-500 text-sm">
                    Fast and secure payment processing with Lemon Squeezy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : showStripeForm ? (
          // STRIPE PAYMENT FORM SCREEN
          <div className="w-full max-w-2xl rounded-3xl p-4 sm:p-8">
            <button
              onClick={() => setShowStripeForm(false)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Payment Methods
            </button>
            <div className="mb-8 sm:mb-12 text-center max-w-2xl">
              <h1 className="font-extrabold text-3xl sm:text-4xl text-gray-900 mb-4">
                Complete Your Payment
              </h1>
              <p className="text-base sm:text-lg text-gray-600">
                Secure payment powered by Stripe
              </p>
            </div>
            <Elements stripe={stripePromise}>
              <StripePaymentForm
                amount={parseFloat(cardData[selectedCardIndex ?? 1].price)}
                planTitle={cardData[selectedCardIndex ?? 1].title}
                onSuccess={() => {
                  alert("Payment successful! Your subscription is now active.");
                  // You can redirect to dashboard or confirmation page here
                }}
                onError={(error) => {
                  console.error("Payment error:", error);
                }}
              />
            </Elements>
          </div>
        ) : (
          // LEMON SQUEEZY PAYMENT FORM SCREEN
          <div className="w-full max-w-2xl rounded-3xl p-4 sm:p-8">
            <button
              onClick={() => setShowLemonSqueezyForm(false)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Payment Methods
            </button>
            <div className="mb-8 sm:mb-12 text-center max-w-2xl">
              <h1 className="font-extrabold text-3xl sm:text-4xl text-gray-900 mb-4">
                Complete Your Payment
              </h1>
              <p className="text-base sm:text-lg text-gray-600">
                Secure payment powered by Lemon Squeezy
              </p>
            </div>
            <LemonSqueezyCheckout
              amount={parseFloat(cardData[selectedCardIndex ?? 1].price)}
              planTitle={cardData[selectedCardIndex ?? 1].title}
              onSuccess={() => {
                console.log("Redirecting to Lemon Squeezy checkout...");
              }}
              onError={(error) => {
                console.error("Lemon Squeezy error:", error);
                alert(error);
              }}
            />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
