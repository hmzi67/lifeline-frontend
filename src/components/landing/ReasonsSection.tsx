import React from 'react';

export const ReasonsSection: React.FC = () => {
    const reasons = [
        {
            title: "ENJOYABLE",
            description: "Transform your workout routine into an enjoyable and engaging experience with personalized challenges.",
            icon: "🎯"
        },
        {
            title: "FEEL FREE",
            description: "Experience the freedom of flexible workout schedules that adapt to your lifestyle and preferences.",
            icon: "🕊️"
        },
        {
            title: "SO EASY ON",
            description: "Simple and intuitive interface makes tracking your fitness journey effortless and motivating.",
            icon: "✨"
        },
        {
            title: "BE STRONG",
            description: "Build strength both physically and mentally with our comprehensive wellness approach.",
            icon: "💪"
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Reasons To <span className="text-teal-600">Run</span> With Us!
                    </h2>
                </div>

                {/* Reasons Grid with Phone Mockup */}
                <div className="grid lg:grid-cols-3 gap-12 items-center max-w-7xl mx-auto">
                    {/* Left Reasons */}
                    <div className="space-y-8">
                        {reasons.slice(0, 2).map((reason, index) => (
                            <div key={index} className="text-right lg:text-right">
                                <div className="inline-flex items-center gap-3 mb-3">
                                    <h3 className="text-xl font-bold text-gray-900">{reason.title}</h3>
                                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-xl">
                                        {reason.icon}
                                    </div>
                                </div>
                                <p className="text-gray-600 leading-relaxed max-w-sm ml-auto">
                                    {reason.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Center Phone Mockup */}
                    <div className="relative flex justify-center">
                        <div className="relative">
                            <div className="w-80 h-[600px] bg-gradient-to-b from-gray-900 to-gray-800 rounded-[3rem] p-2 shadow-2xl">
                                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                                    <img
                                        src="/api/placeholder/300/580"
                                        alt="Fitness app interface"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            {/* Floating UI Elements */}
                            <div className="absolute -top-4 -right-4 bg-teal-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                                Daily Goals
                            </div>
                            <div className="absolute -bottom-4 -left-4 bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                                Progress
                            </div>
                        </div>
                    </div>

                    {/* Right Reasons */}
                    <div className="space-y-8">
                        {reasons.slice(2, 4).map((reason, index) => (
                            <div key={index} className="text-left">
                                <div className="inline-flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-xl">
                                        {reason.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">{reason.title}</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed max-w-sm">
                                    {reason.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
