import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

export const FAQSection: React.FC = () => {
    const [openFAQ, setOpenFAQ] = useState<number | null>(0);

    const faqs = [
        {
            question: "What is the app designed to deliver?",
            answer: "Our app is designed to be your comprehensive fitness partner, delivering personalized workout plans, nutrition tracking, meditation guides, sleep optimization, and progress analytics all in one platform. We focus on creating sustainable wellness habits that fit your lifestyle."
        },
        {
            question: "How does the progress tracking work?",
            answer: "Our advanced tracking system monitors your activities across fitness, nutrition, sleep, and mindfulness. It provides real-time analytics, goal achievement metrics, and historical data to help you visualize your wellness journey and stay motivated."
        },
        {
            question: "Can I customize my workout and nutrition plans?",
            answer: "Absolutely! Our AI-powered system creates personalized plans based on your goals, fitness level, dietary preferences, and lifestyle. You can adjust plans anytime, and the system learns from your preferences to provide better recommendations."
        },
        {
            question: "Is there a community feature for motivation?",
            answer: "Yes! Join our supportive community of wellness enthusiasts. Participate in daily challenges, share achievements, get motivation from peers, and connect with like-minded individuals on similar fitness journeys."
        },
        {
            question: "What devices and platforms are supported?",
            answer: "Our app is available on iOS and Android devices, with web access through any modern browser. We also integrate with popular fitness wearables and health apps to provide comprehensive tracking across all your devices."
        },
        {
            question: "How much does the subscription cost?",
            answer: "We offer flexible pricing plans including a free tier with basic features. Premium plans start at $9.99/month with advanced analytics, personalized coaching, and unlimited access to all features. Annual subscriptions provide significant savings."
        }
    ];

    const toggleFAQ = (index: number) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            FAQs - <span className="text-teal-600">Frequently</span><br />
                            <span className="text-teal-600">Asked Questions</span>
                        </h2>
                        <p className="text-xl text-gray-600">
                            Got questions? We've got answers! Here are the most common questions
                            about our fitness and wellness platform.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full px-8 py-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-inset"
                                >
                                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                                        {faq.question}
                                    </h3>
                                    <div className="flex-shrink-0">
                                        {openFAQ === index ? (
                                            <ChevronUpIcon className="w-5 h-5 text-teal-600" />
                                        ) : (
                                            <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                                        )}
                                    </div>
                                </button>

                                {openFAQ === index && (
                                    <div className="px-8 pb-6">
                                        <div className="pt-2 border-t border-gray-200">
                                            <p className="text-gray-600 leading-relaxed pt-4">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Contact Support */}
                    <div className="mt-12 text-center bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Still have questions?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Our support team is here to help you 24/7. Get in touch with us anytime.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="mailto:support@lifeline.com"
                                className="inline-flex items-center justify-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-full hover:bg-teal-700 transition-colors duration-200"
                            >
                                Email Support
                            </a>
                            <a
                                href="/contact"
                                className="inline-flex items-center justify-center px-6 py-3 border-2 border-teal-600 text-teal-600 font-semibold rounded-full hover:bg-teal-600 hover:text-white transition-all duration-200"
                            >
                                Contact Us
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
