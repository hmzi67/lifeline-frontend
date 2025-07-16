// done
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
        <section className="py-10 md:py-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-[240px_400px_1fr] gap-8 items-center md:ms-0">
                    {/* Left Content - Quote Card and Stats */}
                    <div className="space-y-6 md:space-y-8">
                        {/* Quote Card - No background, only shadow */}
                        <div className="bg-transparent rounded-3xl p-4 shadow-lg">
                            <h3 className="text-md font-semibold text-black leading-relaxed mt-6 mb-6 md:mt-12 md:mb-12">
                                "That's The Thing About<br />
                                Weight Lose:<br />
                                Eat For The Body You Want,<br />
                                Not For The Body You<br />
                                Have."
                            </h3>
                            <p className="text-primary font-semibold text-lg mb-8 md:mb-16">
                                Lisa Lieberman-Wang
                            </p>
                        </div>
                        {/* Active Users Card - Smaller size */}
                        <div className="bg-primary rounded-2xl">
                            <div ref={elementRef} className="text-white rounded-2xl p-4 text-center">
                                <div className="text-3xl md:text-5xl font-bold mb-1">
                                    + {count.toLocaleString()}
                                </div>
                                <p className="text-lg md:text-2xl text-center font-medium">
                                    Active Users
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Center Content - Food Image */}
                    <div className="relative order-first md:order-none">
                        <div className="relative">
                            <img
                                src={nutritionImage}
                                alt="Healthy salad bowl with fresh vegetables"
                                className="w-full h-auto"
                            />
                        </div>
                    </div>

                    {/* Right Content - Text and Features */}
                    <div className="space-y-6 md:space-y-8">
                        <div>
                            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                                <span className="text-primary">Treating</span> your nutrition<br />
                                like it's your <span className="text-primary">secret</span><br />
                                <span className="text-primary">weapon</span>
                            </h2>
                            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
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
                                    <Check className="w-3 h-3 md:w-4 md:h-4 text-white" />
                                </div>
                                <span className="text-sm md:text-base text-gray-700">Traditional Diet Plan</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="bg-primary rounded-full p-1">
                                    <Check className="w-3 h-3 md:w-4 md:h-4 text-white" />
                                </div>
                                <span className="text-sm md:text-base text-gray-700">Vegetarian Diet Plan</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="bg-primary rounded-full p-1">
                                    <Check className="w-3 h-3 md:w-4 md:h-4 text-white" />
                                </div>
                                <span className="text-sm md:text-base text-gray-700">Non Vegetarian Diet Plan</span>
                            </div>
                        </div>
                        {/* Buttons */}
                        <div className="flex gap-3">
                            <Button
                                size="lg"
                                className="bg-primary hover:bg-primary-600 text-white font-semibold px-4 py-2 md:px-8 md:py-4 text-sm md:text-lg transition-all duration-300 transform hover:scale-105"
                            >
                                Try Now
                            </Button>
                            <Button
                                size="lg"
                                variant="ghost"
                                className="text-primary hover:text-primary-600 font-semibold px-4 py-2 md:px-8 md:py-4 text-sm md:text-lg rounded-full transition-all duration-300"
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
