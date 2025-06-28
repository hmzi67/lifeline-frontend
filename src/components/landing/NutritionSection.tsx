import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { CheckCircle } from 'lucide-react';
import nutritionImage from "@/assets/images/landing/nutrition-1.svg"

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
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-[240px_400px_1fr] gap-8 items-center ms-20">
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
                            <p className="text-primary-500 font-semibold text-lg mb-16">
                                Lisa Lieberman-Wang
                            </p>
                        </div>

                        {/* Active Users Card - Smaller size */}
                        <div className="bg-teal-400 rounded-2xl">
                            <div
                            ref={elementRef}
                            className="text-white rounded-2xl p-4 text-center "
                        >
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
                                className="w-full h-auto mt-3"
                            />
                        </div>
                    </div>

                    {/* Right Content - Text and Features */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                <span className="text-primary-500">Treating</span> your nutrition<br />
                                like it's your <span className="text-primary-500">secret</span><br />
                                <span className="text-primary-500">weapon</span>
                            </h2>

                            <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                You can follow every routine, take all the right supplements,<br/>
                                and eat on time — but if your diet habits are inconsistent,<br/>
                                unbalanced, or filled with processed junk,<br/> your goals will
                                always stay out of reach
                            </p>
                        </div>


                        {/* Feature List */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <CheckCircle className="w-6 h-6 text-primary-500 fill-current" />
                                <span className="text-gray-700 font-medium">Traditional Diet Plan</span>
                            </div>

                            <div className="flex items-center gap-4">
                                <CheckCircle className="w-6 h-6 text-primary-500 fill-current" />
                                <span className="text-gray-700 font-medium">Vegetarian Diet Plan</span>
                            </div>

                            <div className="flex items-center gap-4">
                                <CheckCircle className="w-6 h-6 text-primary-500 fill-current" />
                                <span className="text-gray-700 font-medium">Non Vegetarian Diet Plan</span>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4">
                            <Button
                                size="lg"
                                className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-4 text-lg  transition-all duration-300 transform hover:scale-105"
                            >
                                Try Now
                            </Button>
                            <Button
                                size="lg"
                                variant="ghost"
                                className="text-teal-500 hover:text-teal-600 font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300"
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