import React from 'react';
interface PricingCardProps {
  title: string;
  price: string;
  originalPrice: string;
  isHighlighted?: boolean;
  features: string[];
  hasCoupon?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  originalPrice,
  isHighlighted = false,
  features,
  hasCoupon = true
}) => {
  return (
    <div className={`
      relative p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg
      ${isHighlighted 
        ? 'bg-teal-400 text-white border-teal-400 transform scale-105' 
        : 'bg-white text-gray-800 border-gray-200 hover:border-teal-300'
      }
    `}>
      <div className="text-center mb-6">
        <h3 className={`text-lg font-semibold mb-4 ${isHighlighted ? 'text-white' : 'text-gray-800'}`}>
          {title}
        </h3>
        
        <div className="mb-2">
          <span className="text-4xl font-bold">${price}</span>
          <span className={`text-lg ${isHighlighted ? 'text-white' : 'text-gray-600'}`}>/m</span>
        </div>
        
        <div className={`text-sm mb-4 ${isHighlighted ? 'text-white' : 'text-gray-500'}`}>
          <span className="line-through">{originalPrice}</span>
        </div>
        
        <p className={`text-sm mb-4 ${isHighlighted ? 'text-white' : 'text-gray-600'}`}>
          Get our Monthly Plan, now discounted to just $19.99! Act now and start achieving your fitness goals for less!
        </p>
        
        {hasCoupon && (
          <button className={`
            text-sm underline mb-4 hover:no-underline transition-all
            ${isHighlighted ? 'text-white hover:text-gray-200' : 'text-teal-500 hover:text-teal-600'}
          `}>
            Do you have a coupon?
          </button>
        )}
      </div>
      
      <div className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start">
            <div className={`
              w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0
              ${isHighlighted ? 'bg-white' : 'bg-teal-400'}
            `}></div>
            <span className={`text-sm ${isHighlighted ? 'text-white' : 'text-gray-600'}`}>
              {feature}
            </span>
          </div>
        ))}
      </div>
      
      <button className={`
        w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:transform hover:scale-105
        ${isHighlighted 
          ? 'bg-white text-teal-400 hover:bg-gray-50' 
          : 'bg-teal-400 text-white hover:bg-teal-500'
        }
      `}>
        Get Started
      </button>
    </div>
  );
};