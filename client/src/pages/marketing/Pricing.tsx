import { PricingCard } from '@/components/marketing/PricingCard';
import React, { useState } from 'react';
import PricingHero from "@/components/marketing/PricingHero.tsx";
import ProductShowcase from "@/components/Affiliate/ProductShowcase.tsx";

const Pricing: React.FC = () => {
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(1); // Default to middle card selected

  const features = [
    "Steps Counter track by hand",
    "Heart Rate by our premium fitness band",
    "Calorie Counter on daily basis",
    "Progress Tracking weekly and monthly as well",
    "Water Intake by your every intake"
  ];

  const highlightedFeatures = [
    "Steps Counter track by hand",
    "Heart Rate by our premium fitness band",
    "Calorie Counter on daily basis",
    "Progress Tracking weekly and monthly as well",
    "Water intake by your every intake",
    "Steps Counter track by hand",
    "Heart Rate by our premium fitness band",
    "Calorie Counter on daily basis"
  ];

  const cardData = [
    {
      title: "12 Months Plan",
      price: "19.99",
      originalPrice: "$39.99/m",
      features: features,
      hasCoupon: true
    },
    {
      title: "12 Months Plan",
      price: "19.99",
      originalPrice: "$39.99/m",
      features: highlightedFeatures,
      hasCoupon: true
    },
    {
      title: "12 Months Plan",
      price: "19.99",
      originalPrice: "$39.99/m",
      features: features,
      hasCoupon: true
    }
  ];

  return (
    <>
      <PricingHero />
      <div className="py-0 px-4 relative 2xl:mt-28 ">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Choose the Payment Plan
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
             LifeLine will support you on your fitness journey with a science-based approach.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
                onContinue={() => console.log('clicked')}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Unlock our library of meditations, sleep sounds, and more. We'll send you a reminder that your trial is
              ending soon. You'll be charged on March 28, cancel anytime before.
            </p>
          </div>
        </div>
      </div>

      <ProductShowcase />
    </>
  );
};

export default Pricing;