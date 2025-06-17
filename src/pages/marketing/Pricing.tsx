
import { PricingCard } from '@/components/marketing/PricingCard';
import React from 'react';



const Pricing: React.FC = () => {
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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            User, Your plan is Ready!
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            LifeLine will help you in this fitness journey with science based approach this
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <PricingCard
            title="12 Months Plan"
            price="19.99"
            originalPrice="$39.99/m"
            features={features}
          />
          
          <PricingCard
            title="12 Months Plan"
            price="19.99"
            originalPrice="$39.99/m"
            features={highlightedFeatures}
            isHighlighted={true}
          />
          
          <PricingCard
            title="12 Months Plan"
            price="19.99"
            originalPrice="$39.99/m"
            features={features}
          />
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 max-w-2xl mx-auto">
            Unlock our library of meditations, sleep sounds, and more. We'll send you a reminder that your trial is 
            ending soon. You'll be charged on March 28, cancel anytime before.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
