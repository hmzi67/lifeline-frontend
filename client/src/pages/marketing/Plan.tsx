import { PricingCard } from "@/components/marketing/PricingCard";
import { useState } from "react";

export default function Plan() {
  const [showPayment, setShowPayment] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(1);

  const features = ["Steps Counter track by hand", "Heart Rate by our premium fitness band", "Calorie Counter on daily basis", "Progress Tracking weekly and monthly as well", "Water Intake by your every intake"]; const highlightedFeatures = ["Steps Counter track by hand", "Heart Rate by our premium fitness band", "Calorie Counter on daily basis", "Progress Tracking weekly and monthly as well", "Water intake by your every intake", "Steps Counter track by hand", "Heart Rate by our premium fitness band", "Calorie Counter on daily basis"]; const cardData = [{ title: "12 Months Plan", price: "19.99", originalPrice: "$39.99/m", features: features, hasCoupon: true }, { title: "12 Months Plan", price: "19.99", originalPrice: "$39.99/m", features: highlightedFeatures, hasCoupon: true }, { title: "12 Months Plan", price: "19.99", originalPrice: "$39.99/m", features: features, hasCoupon: true }];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white text-gray-800 p-6">
      {!showPayment ? (
        // PRICING SCREEN
        <>
          <div className="mb-12 text-center max-w-2xl">
            <h1 className="font-extrabold text-4xl text-gray-900 mb-4">
              Select Payment Method
            </h1>
            <p className="text-lg text-gray-600">
              LifeLine will help you in this fitness journey with science based approach this
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full">
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
        </>
      ) : (
        // PAYMENT METHOD SCREEN
        <div className="w-full max-w-2xl rounded-3xl p-8">        
          <div className="mb-12 text-center max-w-2xl">
            <h1 className="font-extrabold text-4xl text-gray-900 mb-4">
              Select Payment Method
            </h1>
            <p className="text-lg text-gray-600">
              LifeLine will help you in this fitness journey with science based approach this
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex items-center border rounded-2xl p-5 hover:shadow-md transition cursor-pointer">
              <span className="text-blue-600 font-bold mr-4 text-xl">VISA</span>
              <div>
                <p className="font-semibold text-xl">Stripe</p>
                <p className="text-gray-500 text-sm">
                  Pay securely using your VISA/MasterCard via Stripe.
                </p>
              </div>
            </div>

            <div className="flex items-center border rounded-2xl p-5 hover:shadow-md transition cursor-pointer">
              <span className="mr-4">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="Google Pay"
                  className="w-6 h-6"
                />
              </span>
              <div>
                <p className="font-semibold text-xl">Google Pay</p>
                <p className="text-gray-500 text-sm">
                  Quick checkout with your Google account.
                </p>
              </div>
            </div>

            <div className="flex items-center border rounded-2xl p-5 hover:shadow-md transition cursor-pointer">
              <span className="mr-4">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                  alt="Apple Pay"
                  className="w-6 h-6"
                />
              </span>
              <div>
                <p className="font-semibold text-xl">Apple Pay</p>
                <p className="text-gray-500 text-sm">
                  Pay seamlessly with your Apple devices.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
