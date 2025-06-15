import React from 'react';
import { Button } from '../ui/button';
import { ArrowRightIcon, StarIcon } from 'lucide-react';

export const CTASection: React.FC = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-32 h-32 border border-white rounded-full"></div>
                <div className="absolute bottom-20 right-20 w-24 h-24 border border-white rounded-full"></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
                <div className="absolute bottom-1/3 right-1/3 w-20 h-20 bg-white/20 rounded-full"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="mb-8">
                        <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
                            <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">Join 50,000+ Happy Users</span>
                        </div>

                        <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                            Ready to Transform<br />
                            Your <span className="text-yellow-300">Wellness Journey?</span>
                        </h2>

                        <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed mb-8 max-w-3xl mx-auto">
                            Start your personalized fitness adventure today. Join thousands who have
                            already discovered the power of holistic wellness with our comprehensive platform.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                        <Button
                            size="lg"
                            className="bg-white text-teal-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl"
                        >
                            Get Started Free
                            <ArrowRightIcon className="w-5 h-5 ml-2" />
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300 backdrop-blur-sm"
                        >
                            Watch Demo
                        </Button>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🎯</span>
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Personalized Plans</h3>
                            <p className="text-blue-100 text-sm">Custom workouts and nutrition plans tailored to your goals</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">📊</span>
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Smart Tracking</h3>
                            <p className="text-blue-100 text-sm">Advanced analytics and insights for your wellness journey</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🤝</span>
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Community Support</h3>
                            <p className="text-blue-100 text-sm">Connect with like-minded individuals on your fitness journey</p>
                        </div>
                    </div>

                    {/* Trust Indicators */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-center">
                        <div className="flex items-center gap-2">
                            <span className="text-yellow-300 text-sm">★★★★★</span>
                            <span className="text-blue-100 text-sm">4.9 App Store Rating</span>
                        </div>

                        <div className="hidden sm:block w-px h-6 bg-white/20"></div>

                        <div className="text-blue-100 text-sm">
                            🔒 Your data is secure and private
                        </div>

                        <div className="hidden sm:block w-px h-6 bg-white/20"></div>

                        <div className="text-blue-100 text-sm">
                            ⚡ Cancel anytime, no commitments
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" className="w-full h-20 fill-white">
                    <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
                </svg>
            </div>
        </section>
    );
};
