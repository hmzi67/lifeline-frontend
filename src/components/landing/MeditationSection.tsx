import React from 'react';
import { Button } from '../ui/button';
import { PlayIcon } from 'lucide-react';

export const MeditationSection: React.FC = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-slate-50 to-teal-50">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
                    {/* Left Content - Image */}
                    <div className="relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="/api/placeholder/600/400"
                                alt="Person meditating in nature"
                                className="w-full h-96 object-cover"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                            {/* Play Button */}
                            <button className="absolute inset-0 flex items-center justify-center group">
                                <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-all duration-300 group-hover:scale-110">
                                    <PlayIcon className="w-8 h-8 text-teal-600 ml-1" fill="currentColor" />
                                </div>
                            </button>

                            {/* Experience Card */}
                            <div className="absolute bottom-6 left-6 bg-white rounded-lg p-4 shadow-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                                        <span className="text-teal-600 font-semibold">💡</span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Experience and Check</p>
                                        <p className="font-semibold text-gray-900">Your health today</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Stats */}
                        <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-6 shadow-xl">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-teal-600 mb-1">85%</div>
                                <div className="text-sm text-gray-500">Success Rate</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Text */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                Where <span className="text-teal-600">Sustainability</span><br />
                                Meets <span className="text-teal-600">Meditation</span>
                            </h2>

                            <p className="text-xl text-gray-600 leading-relaxed mb-8">
                                Discover the perfect balance between environmental consciousness and inner peace.
                                Our meditation programs are designed to help you connect with nature while
                                building sustainable wellness habits.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Mindful Living</h4>
                                    <p className="text-gray-600">Practice mindfulness while developing eco-friendly habits that benefit both you and the planet.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Nature Connection</h4>
                                    <p className="text-gray-600">Strengthen your bond with nature through guided outdoor meditation sessions.</p>
                                </div>
                            </div>
                        </div>

                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
                        >
                            Start Meditating
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
