import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Check } from 'lucide-react';
import nutritionImage from "@/assets/images/landing/nutrition-1.webp";

// Custom hook for counting animation
const useCountUp = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                    let startTime: number;
                    const animate = (currentTime: number) => {
                        if (!startTime) startTime = currentTime;
                        const progress = Math.min((currentTime - startTime) / duration, 1);
                        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                        setCount(Math.floor(easeOutQuart * end));
                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.5 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, [end, duration, hasStarted]);

    return { count, elementRef };
};

export const NutritionSection: React.FC = () => {
    const { count, elementRef } = useCountUp(2345);

    return (
        <section className="py-8 md:py-20">
            <div className="container mx-auto px-4 md:px-6">
                {/* Mobile Layout */}
                <div className="block md:hidden">
                    {/* Main heading */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                            <span className="text-primary">Treating</span> Your Nutrition Like It's<br />
                            Your Secret <span className="text-primary">Weapon</span>
                        </h2>
                    </div>

                    {/* Image with overlaid elements */}
                    <div className="relative mb-6">
                        <img
                            src={nutritionImage}
                            alt="Healthy salad bowl with fresh vegetables"
                            className="w-full h-auto rounded-2xl"
                        />
                        
                        {/* Quote overlay - positioned on the left side of image */}
                        <div className="absolute left-4 top-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 max-w-[200px] shadow-lg">
                            <h3 className="text-xs font-semibold text-black leading-tight mb-3">
                                "That's The Thing About<br />
                                Weight Lose:<br />
                                Eat For The Body You Want,<br />
                                Not For The Body You<br />
                                Have."
                            </h3>
                            <p className="text-primary font-semibold text-xs">
                                Lisa Lieberman-Wang
                            </p>
                        </div>

                        {/* Active Users counter - positioned on the right side */}
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <div ref={elementRef} className="bg-primary text-white rounded-2xl p-4 text-center min-w-[100px]">
                                <div className="text-xl font-bold mb-1">
                                    + {count.toLocaleString()}
                                </div>
                                <p className="text-xs font-medium">
                                    Active Users
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Description text */}
                    <div className="mb-6">
                        <p className="text-sm text-gray-600 leading-relaxed text-center">
                            You can follow every routine, take all the right supplements, and eat on time — but if your diet habits are inconsistent, unbalanced, or filled with processed junk, your goals will always stay out of reach
                        </p>
                    </div>

                    {/* Feature List */}
                    <div className="space-y-3 mb-6">
                        <div className="flex items-center space-x-3">
                            <div className="bg-primary rounded-full p-1.5">
                                <Check className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-sm text-gray-700">Traditional Diet Plan</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="bg-primary rounded-full p-1.5">
                                <Check className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-sm text-gray-700">Vegetarian Diet Plan</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="bg-primary rounded-full p-1.5">
                                <Check className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-sm text-gray-700">Non Vegetarian Diet Plan</span>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 justify-center">
                        <Button
                            size="sm"
                            className="bg-primary hover:bg-primary-600 text-white font-semibold px-6 py-2 text-sm transition-all duration-300 transform hover:scale-105"
                        >
                            Try Now
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="text-primary hover:text-primary-600 font-semibold px-6 py-2 text-sm rounded-full transition-all duration-300"
                        >
                            Contact us
                        </Button>
                    </div>
                </div>

                {/* Desktop Layout (unchanged) */}
                <div className="hidden md:grid grid-cols-[240px_400px_1fr] gap-8 items-center">
                    {/* Left Content - Quote Card and Stats */}
                    <div className="space-y-8">
                        {/* Quote Card - No background, only shadow */}
                        <div className="bg-transparent rounded-3xl p-4 shadow-lg">
                            <h3 className="text-md font-semibold text-black leading-relaxed mt-12 mb-12">
                                "That's The Thing About<br />
                                Weight Lose:<br />
                                Eat For The Body You Want,<br />
                                Not For The Body You<br />
                                Have."
                            </h3>
                            <p className="text-primary font-semibold text-lg mb-16">
                                Lisa Lieberman-Wang
                            </p>
                        </div>
                        {/* Active Users Card - Smaller size */}
                        <div className="bg-primary rounded-2xl">
                            <div ref={elementRef} className="text-white rounded-2xl p-4 text-center">
                                <div className="text-5xl font-bold mb-1">
                                    + {count.toLocaleString()}
                                </div>
                                <p className="text-2xl text-center font-medium">
                                    Active Users
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Center Content - Food Image */}
                    <div className="relative">
                        <div className="relative">
                            <img
                                src={nutritionImage}
                                alt="Healthy salad bowl with fresh vegetables"
                                className="w-full h-auto"
                            />
                        </div>
                    </div>

                    {/* Right Content - Text and Features */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                                <span className="text-primary">Treating</span> your nutrition<br />
                                like it's your <span className="text-primary">secret</span><br />
                                <span className="text-primary">weapon</span>
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                You can follow every routine, take all the right supplements,<br />
                                and eat on time — but if your diet habits are inconsistent,<br />
                                unbalanced, or filled with processed junk,<br /> your goals will
                                always stay out of reach
                            </p>
                        </div>
                        {/* Feature List */}
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <div className="bg-primary rounded-full p-1">
                                    <Check className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-base text-gray-700">Traditional Diet Plan</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="bg-primary rounded-full p-1">
                                    <Check className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-base text-gray-700">Vegetarian Diet Plan</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="bg-primary rounded-full p-1">
                                    <Check className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-base text-gray-700">Non Vegetarian Diet Plan</span>
                            </div>
                        </div>
                        {/* Buttons */}
                        <div className="flex gap-3">
                            <Button
                                size="lg"
                                className="bg-primary hover:bg-primary-600 text-white font-semibold px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105"
                            >
                                Try Now
                            </Button>
                            <Button
                                size="lg"
                                variant="ghost"
                                className="text-primary hover:text-primary-600 font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300"
                            >
                                Contact us
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};