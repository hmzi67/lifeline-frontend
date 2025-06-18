import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import hero1 from "@/assets/images/landing/hero-1.jpg"
import hero2 from "@/assets/images/landing/hero-2.jpg"
import hero3 from "@/assets/images/landing/hero-3.jpg"

export const HeroSection: React.FC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [nextImageIndex, setNextImageIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Array of images that will cycle through automatically
    const images = [
        hero1, // Replace with your yoga/stretching image
        hero2, // Replace with your meditation image  
        hero3  // Replace with your nutrition image
    ];

    // Auto-slide functionality with smooth crossfade
    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true);

            setTimeout(() => {
                setCurrentImageIndex(nextImageIndex);
                setNextImageIndex((nextImageIndex + 1) % images.length);
                setIsTransitioning(false);
            }, 1000); // Half of transition duration
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, [nextImageIndex, images.length]);

    return (
        <section className="relative min-h-screen overflow-hidden">
            {/* Background Images with Crossfade Effect */}
            <div className="absolute inset-0">
                {/* Current Image */}
                <div className="absolute inset-0">
                    <img
                        src={images[currentImageIndex]}
                        alt="Fitness background"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Next Image for Crossfade */}
                <div
                    className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${isTransitioning ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <img
                        src={images[nextImageIndex]}
                        alt="Fitness background"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>

            {/* Decorative Plus Elements */}
            <div className="absolute top-20 left-10 text-white opacity-30 text-3xl font-light">+</div>
            <div className="absolute top-1/2 right-20 text-white opacity-20 text-4xl font-light">+</div>
            <div className="absolute bottom-40 right-1/3 text-white opacity-25 text-3xl font-light">+</div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex items-center">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="max-w-2xl">
                        {/* Main Heading */}
                        <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-white mb-8">
                            YOUR FITNESS{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                                PARTNER!
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg lg:text-xl text-white leading-relaxed mb-12 max-w-xl opacity-90">
                            Their guidelines recommend 150 minutes of moderate-intensity
                            aerobic physical activity each week or vigorous-intensity
                            aerobic
                        </p>

                        {/* CTA Button */}
                        <div>
                            <Button
                                size="lg"
                                className="bg-teal-400 hover:bg-teal-500 text-gray-900 font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-300 transform hover:scale-105"
                            >
                                Get Started
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};