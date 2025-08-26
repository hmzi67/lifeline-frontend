import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

// Done For responsive design and better user experience

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export const FAQSection: React.FC = () => {
  const [expandedItem, setExpandedItem] = useState<number>(1);

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "How can LifeLine help me?",
      answer: "The app has personalized diet plans, effective workout routines, guided meditations and progress tracking. Everything is designed to make healthy living easier for you."
    },
    {
      id: 2,
      question: "Does LifeLine sync with other apps or devices?",
      answer: "Yes, LifeLine can sync with other health apps so all your health data stays in one place."
    },
    {
      id: 3,
      question: "Do I need to follow a strict diet or workout plan?",
      answer: "Not at all. LifeLine adapts to your preferences and routine, making healthy living simple and flexible not restrictive."
    },
   
    {
      id: 4,
      question: "Is my personal data safe with LifeLine?",
      answer: "Absolutely. Your information is encrypted and kept private. We never share your data with third parties."
    }
  ];

  const toggleExpansion = (id: number) => {
    setExpandedItem(expandedItem === id ? 0 : id);
  };

  return (
    <div className="w-full bg-white py-12 sm:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-24">
          {/* Left Section */}
          <div className="space-y-6 lg:space-y-8 flex flex-col">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                <span className="text-primary-400">FAQs</span>
                <span className="text-gray-800"> - Frequently</span>
                <br />
                <span className="text-gray-800">Asked </span>
                <span className="text-primary-400">Questions</span>
              </h1>
            </div>

            <div className="space-y-4 lg:space-y-6">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-700">
                Got Questions? We're Here to Help!
              </h2>
              <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed max-w-md lg:max-w-lg">
                Explore our FAQs and quickly get the information you need.
              </p>
            </div>
          </div>

          {/* Right Section - FAQ Items */}
          <div className="space-y-3 lg:space-y-4">
            {faqItems.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 shadow-md ${expandedItem === item.id
                    ? 'border-2 border-primary-300'
                    : 'border border-transparent hover:border-gray-200'
                  }`}
              >
                <button
                  onClick={() => toggleExpansion(item.id)}
                  className="w-full px-5 sm:px-6 lg:px-7 py-4 sm:py-5 lg:py-6 text-left flex items-center justify-between transition-colors duration-200"
                >
                  <span className="text-gray-700 font-medium text-sm sm:text-base lg:text-lg pr-4 leading-relaxed">
                    {item.question}
                  </span>
                  <div className="flex-shrink-0">
                    {expandedItem === item.id ? (
                      <Minus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                    ) : (
                      <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                    )}
                  </div>
                </button>

                {expandedItem === item.id && (
                  <div className="px-5 sm:px-6 lg:px-7 pb-4 sm:pb-5 lg:pb-6">
                    <div className="pt-2">
                      <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};