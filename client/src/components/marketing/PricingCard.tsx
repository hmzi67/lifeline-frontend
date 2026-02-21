import React, { useState } from 'react';

interface PricingCardProps {
  title: string;
  price: string;
  originalPrice: string;
  features: string[];
  hasCoupon?: boolean;
  isSelected: boolean;
  onSelect: () => void;
  onContinue: () => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  originalPrice,
  features,
  hasCoupon = true,
  isSelected,
  onSelect,
  onContinue
}) => {
  const [showCouponField, setShowCouponField] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponStatus, setCouponStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [finalPrice, setFinalPrice] = useState(price);

  const validateCoupon = (code: string): number | undefined => {
    const validCoupons: { [key: string]: number } = {
      'SAVE20': 0.8,
      'SAVE50': 0.5,
      'WELCOME10': 0.9
    };
    return validCoupons[code.toUpperCase()];
  };

  const handleCouponSubmit = () => {
    if (!couponCode.trim()) return;
    const discount = validateCoupon(couponCode);
    if (discount) {
      setCouponStatus('valid');
      const newPrice = (parseFloat(price) * discount).toFixed(2);
      setFinalPrice(newPrice);
    } else {
      setCouponStatus('invalid');
      setFinalPrice(price);
    }
  };

  const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value);
    setCouponStatus('idle');
    setFinalPrice(price);
  };

  const handleCouponToggle = () => {
    setShowCouponField(!showCouponField);
    if (showCouponField) {
      setCouponCode('');
      setCouponStatus('idle');
      setFinalPrice(price);
    }
  };

  return (
    <div
      onClick={onSelect}
      className={`
        relative p-8 rounded-3xl transition-all duration-300 cursor-pointer flex flex-col 
        ${isSelected
          ? 'bg-primary text-white shadow-lg transform scale-105'
          : 'bg-white text-gray-800 shadow-sm hover:shadow-md border border-gray-100'
        }
      `}
    >
      {/* Title */}
      <h3 className={`text-xl font-medium mb-8 text-center ${isSelected ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h3>

      {/* Price Section */}
      <div className="text-center mb-6">
        <div className="mb-2 relative inline-flex items-baseline">
          <span className={`text-sm font-bold absolute left-0 ${isSelected ? 'text-white' : 'text-gray-900'}`}>$</span>
          <span className={`text-5xl font-bold ml-3 ${isSelected ? 'text-white' : 'text-gray-900'}`}>{finalPrice}</span>
          <span className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}>/m</span>
        </div>

        <br />

        {/* Original Price Badge */}
        <div className='absolute right-0 top-[160px]'>
          <div className={`
            line-through w-28 flex items-center justify-center px-3 py-1 font-medium rounded-l-full text-lg
            ${isSelected ? 'bg-white text-primary' : 'bg-primary text-white'}
          `}>
            {originalPrice}
          </div>
        </div>

        {/* Description */}
        <p className={`mt-16 text-sm leading-relaxed mb-6 ${isSelected ? 'text-white/90' : 'text-gray-600'}`}>
          Get our Monthly Plan, now discounted to just ${finalPrice}! Act now and start achieving your fitness goals for less!
        </p>

        {/* Coupon Section */}
        {hasCoupon && (
          <div className="mb-6">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCouponToggle();
              }}
              className={`
                py-2 px-6 rounded-2xl font-medium transition-all border border-teal-200
                ${isSelected ? 'bg-white text-gray-900' : 'bg-teal-50 text-gray-900'}
              `}
            >
              {showCouponField ? 'Hide coupon field' : 'Enter Coupon Code'}
            </button>

            {showCouponField && (
              <div className="mt-4 space-y-3" onClick={(e) => e.stopPropagation()}>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={handleCouponChange}
                    placeholder="Enter coupon code"
                    className={`
                      flex-1 px-4 py-3 rounded-xl text-sm
                      ${isSelected
                        ? 'bg-white/20 border border-white/30 text-white placeholder-white/70'
                        : 'bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-500'
                      }
                      focus:outline-none focus:ring-2 focus:ring-teal-300
                    `}
                  />
                  <button
                    onClick={handleCouponSubmit}
                    className={`
                      px-6 py-3 rounded-xl text-sm font-medium transition-all
                      ${isSelected
                        ? 'bg-white text-teal-500 hover:bg-gray-50'
                        : 'bg-teal-500 text-white hover:bg-teal-600'
                      }
                    `}
                  >
                    Apply
                  </button>
                </div>

                {couponStatus === 'valid' && (
                  <div className={`
                    text-sm p-3 rounded-xl
                    ${isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-green-50 text-green-700 border border-green-200'
                    }
                  `}>
                    ✓ Coupon applied successfully!
                  </div>
                )}

                {couponStatus === 'invalid' && (
                  <div className={`
                    text-sm p-3 rounded-xl
                    ${isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-red-50 text-red-700 border border-red-200'
                    }
                  `}>
                    ✗ Invalid coupon code
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Features List */}
      <div className="space-y-4 mb-8 flex-grow">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start">
            <div className={`
              w-2 h-2 rounded-full mt-2.5 mr-4 flex-shrink-0
              ${isSelected ? 'bg-white' : 'bg-gray-600'}
            `}></div>
            <span className={`text-sm leading-relaxed ${isSelected ? 'text-white/95' : 'text-gray-600'}`}>
              {feature}
            </span>
          </div>
        ))}
      </div>

      {/* Get Started Button */}
      <div className='w-full flex items-center justify-center'>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onContinue();
          }}
          className={`
           py-3 px-8  rounded-xl font-bold transition-all duration-300 hover:transform hover:scale-105
          ${isSelected
              ? 'bg-white text-primary hover:bg-gray-50 shadow-md'
              : 'bg-primary text-white hover:bg-teal-500 shadow-md'
            }
        `}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};