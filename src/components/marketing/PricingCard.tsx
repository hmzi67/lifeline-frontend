import React, {useState} from 'react';

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
  const [showCouponField, setShowCouponField] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponStatus, setCouponStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [finalPrice, setFinalPrice] = useState(price);

  // Mock coupon validation - you can replace this with actual API call
  const validateCoupon = (code: string): number | undefined => {
    const validCoupons: { [key: string]: number } = {
      'SAVE20': 0.8,      // 20% off
      'SAVE50': 0.5,      // 50% off
      'WELCOME10': 0.9    // 10% off
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
      // Reset when closing
      setCouponCode('');
      setCouponStatus('idle');
      setFinalPrice(price);
    }
  };

  return (
      <div className={`
      relative p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg cursor-pointer
      ${isHighlighted
          ? 'bg-primary text-white border-primary transform scale-105'
          : 'bg-white text-gray-800 border-gray-200 hover:border-primary-300'
      }
    `}>
        <div className="text-center mb-6">
          <h3 className={`text-lg font-semibold mb-4 ${isHighlighted ? 'text-white' : 'text-gray-800'}`}>
            {title}
          </h3>

          <div className="mb-2">
            <span className="text-4xl font-bold">${finalPrice}</span>
            <span className={`text-lg ${isHighlighted ? 'text-white' : 'text-gray-600'}`}>/m</span>
          </div>

          <div className={`text-sm mb-4 ${isHighlighted ? 'text-white' : 'text-gray-500'}`}>
            <span className="line-through">{originalPrice}</span>
          </div>

          <p className={`text-sm mb-4 ${isHighlighted ? 'text-white' : 'text-gray-600'}`}>
            Get our Monthly Plan, now discounted to just ${finalPrice}! Act now and start achieving your fitness goals for less!
          </p>

          {hasCoupon && (
              <div className="mb-4">
                <button
                    onClick={handleCouponToggle}
                    className={`
                text-sm underline hover:no-underline transition-all
                ${isHighlighted ? 'text-white hover:text-gray-200' : 'text-primary hover:text-primary-600'}
              `}
                >
                  {showCouponField ? 'Hide coupon field' : 'Do you have a coupon?'}
                </button>

                {showCouponField && (
                    <div className="mt-4 space-y-3">
                      <div className="flex gap-2">
                        <input
                            type="text"
                            value={couponCode}
                            onChange={handleCouponChange}
                            placeholder="Enter coupon code"
                            className={`
                      flex-1 px-3 py-2 rounded-lg border text-sm
                      ${isHighlighted
                                ? 'bg-white/20 border-white/30 text-white placeholder-white/70'
                                : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                            }
                      focus:outline-none focus:ring-2 focus:ring-teal-300
                    `}
                        />
                        <button
                            onClick={handleCouponSubmit}
                            className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-all
                      ${isHighlighted
                                ? 'bg-white text-primary hover:bg-gray-50'
                                : 'bg-primary text-white hover:bg-primary'
                            }
                    `}
                        >
                          Apply
                        </button>
                      </div>

                      {couponStatus === 'valid' && (
                          <div className={`
                    text-sm p-2 rounded-lg
                    ${isHighlighted
                              ? 'bg-white/20 text-white'
                              : 'bg-green-100 text-green-800'
                          }
                  `}>
                            ✓ Coupon applied successfully!
                          </div>
                      )}

                      {couponStatus === 'invalid' && (
                          <div className={`
                    text-sm p-2 rounded-lg
                    ${isHighlighted
                              ? 'bg-white/20 text-white'
                              : 'bg-red-100 text-red-800'
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

        <div className="space-y-3 mb-6">
          {features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <div className={`
              w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0
              ${isHighlighted ? 'bg-white' : 'bg-primary'}
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
            ? 'bg-white text-primary hover:bg-gray-50'
            : 'bg-primary text-white hover:bg-primary'
        }
      `}>
          Get Started
        </button>
      </div>
  );
};