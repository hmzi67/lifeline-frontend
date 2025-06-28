import React, { useState } from 'react';
import { ChevronDown, Minus } from 'lucide-react';

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
      question: "What is the main purpose to design lifeline?",
      answer: "The LifeLine app is designed to support you in managing anxiety through features like mood tracking, medication reminders, meditation with soothing sounds, food scanning, sleep tracking. It aims to provide tools and insights to help you better understand and manage your anxiety."
    },
    {
      id: 2,
      question: "How do the medication reminders work?",
      answer: "The medication reminders feature allows you to set custom schedules for your medications. You can configure multiple reminders throughout the day, set specific dosages, and receive push notifications to ensure you never miss a dose. The app also tracks your medication adherence over time."
    },
    {
      id: 3,
      question: "How does the CBT feature benefit me?",
      answer: "The Cognitive Behavioral Therapy (CBT) feature provides guided exercises and techniques to help you identify and challenge negative thought patterns. It includes mood tracking, thought records, behavioral activation exercises, and personalized coping strategies to support your mental health journey."
    },
    {
      id: 4,
      question: "What meditation features does the app offer?",
      answer: "The app offers a comprehensive meditation library with guided sessions for anxiety, stress relief, and relaxation. Features include soothing background sounds, customizable session lengths, breathing exercises, mindfulness practices, and progress tracking to help you build a consistent meditation habit."
    }
  ];

  const toggleExpansion = (id: number) => {
    setExpandedItem(expandedItem === id ? 0 : id);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              <span className="text-teal-400">FAQs</span>
              <span className="text-gray-800"> - Frequently Asked </span>
              <span className="text-teal-400">Questions</span>
            </h1>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Got Questions? We're Here to Help!
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Explore our FAQs and quickly get the information you need.
            </p>
          </div>
        </div>

        {/* Right Section - FAQ Items */}
        <div className="space-y-4">
          {faqItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleExpansion(item.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-gray-800 font-medium text-sm lg:text-base pr-4">
                  {item.question}
                </span>
                <div className="flex-shrink-0">
                  {expandedItem === item.id ? (
                    <Minus className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </div>
              </button>
              
              {expandedItem === item.id && (
                <div className="px-6 pb-4">
                  <div className="border-t border-teal-100 pt-4">
                    <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
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
  );
};