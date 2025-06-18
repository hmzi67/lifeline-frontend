import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { PlayIcon } from 'lucide-react';
import meditationImage1 from "@/assets/images/landing/meditation-1.svg";
import meditationImage2 from "@/assets/images/landing/meditation-2.svg";
import meditationImage3 from "@/assets/images/landing/meditation-3.svg";

export const MeditationSection: React.FC = () => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    // Card data
    const cards = [
        {
            image: meditationImage2,
            title: "Experience the future of meditation",
            description: "Lorem ipsum dolor sit amet, labore consectetur adipiscing incididunt ut labore et dolore"
        },
        {
            image: meditationImage3,
            title: "Mindful Journey & Inner Peace",
            description: "Discover tranquility through guided meditation sessions and breathing exercises"
        }
    ];

    // Auto-slide functionality for cards
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentCardIndex((prevIndex) =>
                prevIndex === cards.length - 1 ? 0 : prevIndex + 1
            );
        }, 4000); // Change card every 4 seconds

        return () => clearInterval(interval);
    }, [cards.length]);

    return (
        <section className="relative min-h-screen overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={meditationImage1}
                    alt="Woman meditating with mountain view"
                    className="w-full h-full object-cover"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 min-h-screen flex items-center">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="max-w-2xl">
                        {/* Small subtitle */}
                        <p className="text-white text-lg mb-4 font-medium">
                            More power efficiency
                        </p>

                        {/* Main heading */}
                        <h1 className="text-5xl lg:text-7xl font-bold text-white mb-12 leading-tight">
                            Where Sustainability<br />
                            Meets Meditation
                        </h1>

                        {/* CTA Button */}
                        <Button
                            size="lg"
                            className="bg-white hover:bg-gray-100 text-gray-900 font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
                        >
                            Start doing today
                        </Button>
                    </div>
                </div>
            </div>

            {/* Floating Cards with Invisible Slider - Bottom Right */}
            <div className="absolute bottom-8 right-8 w-[600px] overflow-hidden">
                <div
                    className="flex transition-transform duration-1000 ease-in-out"
                    style={{ transform: `translateX(-${currentCardIndex * 520}px)` }}
                >
                    {cards.map((card, index) => (
                        <React.Fragment key={index}>
                            {/* Main Card */}
                            <div className="relative bg-white/15 backdrop-blur-lg rounded-3xl p-5 shadow-2xl w-[380px] h-[120px] border border-white/20 flex-shrink-0 mr-4">
                                <div className="flex gap-4 h-full">
                                    {/* Image with Play Button */}
                                    <div className="relative flex-shrink-0">
                                        <img
                                            src={card.image}
                                            alt="Meditation scene"
                                            className="w-20 h-16 object-cover rounded-xl"
                                        />
                                        {/* Play Button Overlay */}
                                        <button className="absolute inset-0 flex items-center justify-center group">
                                            <div className="w-7 h-7 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-all duration-300 group-hover:scale-110 shadow-lg">
                                                <PlayIcon className="w-2.5 h-2.5 text-gray-700 ml-0.5" fill="currentColor" />
                                            </div>
                                        </button>
                                    </div>

                                    {/* Text Content */}
                                    <div className="flex-1 flex flex-col justify-center">
                                        <h3 className="text-base font-bold text-white mb-1 leading-tight">
                                            {card.title}
                                        </h3>
                                        <p className="text-white/70 text-xs leading-relaxed line-clamp-3">
                                            {card.description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Second Card for the next item */}
                            <div className="relative bg-white/15 backdrop-blur-lg rounded-3xl p-5 shadow-2xl w-[380px] h-[120px] border border-white/20 flex-shrink-0">
                                <div className="flex gap-4 h-full">
                                    {/* Image with Play Button */}
                                    <div className="relative flex-shrink-0">
                                        <img
                                            src={cards[(index + 1) % cards.length].image}
                                            alt="Meditation scene"
                                            className="w-20 h-16 object-cover rounded-xl"
                                        />
                                        {/* Play Button Overlay */}
                                        <button className="absolute inset-0 flex items-center justify-center group">
                                            <div className="w-7 h-7 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-all duration-300 group-hover:scale-110 shadow-lg">
                                                <PlayIcon className="w-2.5 h-2.5 text-gray-700 ml-0.5" fill="currentColor" />
                                            </div>
                                        </button>
                                    </div>

                                    {/* Text Content */}
                                    <div className="flex-1 flex flex-col justify-center">
                                        <h3 className="text-base font-bold text-white mb-1 leading-tight">
                                            {cards[(index + 1) % cards.length].title}
                                        </h3>
                                        <p className="text-white/70 text-xs leading-relaxed line-clamp-3">
                                            {cards[(index + 1) % cards.length].description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-2 h-2 bg-white bg-opacity-30 rounded-full animate-pulse"></div>
            <div className="absolute top-1/3 right-20 w-1.5 h-1.5 bg-white bg-opacity-40 rounded-full animate-pulse delay-75"></div>
            <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-white bg-opacity-30 rounded-full animate-pulse delay-150"></div>
        </section>
    );
};