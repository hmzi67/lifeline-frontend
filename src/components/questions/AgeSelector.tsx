import React, { useState, useRef, useEffect } from 'react';

interface AgeSelectorProps {
    onAgeSelect?: (age: number) => void;
}

const AgeSelector: React.FC<AgeSelectorProps> = ({ onAgeSelect }) => {
    const [selectedAge, setSelectedAge] = useState<number>(24);
    const scrollRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    // Generate age range from 18 to 50
    const ages = Array.from({ length: 33 }, (_, i) => 18 + i);
    const itemWidth = 80; // Width of each age item// Offset to center the selected item

    const getBirthYear = (age: number) => 2025 - age;

    const updateSelectedAge = () => {
        if (!scrollRef.current) return;

        const scrollPosition = scrollRef.current.scrollLeft;
        const centerPosition = scrollPosition + scrollRef.current.offsetWidth / 2;
        const index = Math.round((centerPosition - itemWidth / 2) / itemWidth);
        const clampedIndex = Math.max(0, Math.min(ages.length - 1, index));
        const newAge = ages[clampedIndex];

        if (newAge !== selectedAge) {
            setSelectedAge(newAge);
            onAgeSelect?.(newAge);
        }
    };

    const scrollToAge = (age: number) => {
        if (!scrollRef.current) return;

        const index = ages.indexOf(age);
        const scrollPosition = index * itemWidth - scrollRef.current.offsetWidth / 2 + itemWidth / 2;

        scrollRef.current.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        // Center on age 24 initially
        setTimeout(() => scrollToAge(24), 100);
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
        scrollLeft.current = scrollRef.current?.scrollLeft || 0;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - (scrollRef.current.offsetLeft || 0);
        const walk = (x - startX.current) * 2;
        scrollRef.current.scrollLeft = scrollLeft.current - walk;
    };

    const handleMouseUp = () => {
        isDragging.current = false;
        updateSelectedAge();
    };

    const handleScroll = () => {
        if (!isDragging.current) {
            updateSelectedAge();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-300 via-teal-400 to-teal-500 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background decorative circles */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-teal-200/40 to-transparent rounded-full transform translate-x-48 -translate-y-48"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-200/30 to-transparent rounded-full transform -translate-x-32 translate-y-32"></div>

            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center relative z-10 mx-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    What's your age?
                </h1>

                <p className="text-gray-500 text-base mb-8">
                    It will help us personalized your plans
                </p>

                {/* Horizontal scrollable age selector */}
                <div className="relative mb-6">
                    {/* Center indicator line */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-px -translate-y-1/2 w-0.5 h-16 bg-teal-400 z-10 pointer-events-none"></div>

                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none py-4"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            scrollSnapType: 'x mandatory'
                        }}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onScroll={handleScroll}
                    >
                        {/* Left padding */}
                        <div className="flex-shrink-0 w-32"></div>

                        {ages.map((age) => (
                            <div
                                key={age}
                                className="flex-shrink-0 flex items-center justify-center"
                                style={{
                                    width: `${itemWidth}px`,
                                    scrollSnapAlign: 'center'
                                }}
                            >
                <span
                    className={`text-4xl font-bold transition-all duration-300 ${
                        selectedAge === age
                            ? 'text-white bg-teal-400 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg'
                            : 'text-gray-300'
                    }`}
                >
                  {age}
                </span>
                            </div>
                        ))}

                        {/* Right padding */}
                        <div className="flex-shrink-0 w-32"></div>
                    </div>
                </div>

                {/* Birth year display */}
                <p className="text-teal-400 text-lg font-medium mb-6">
                    Your birth year is {getBirthYear(selectedAge)}
                </p>

                {/* Info text */}
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                    Minimum age limit is 18 years as our data will categorized according to different age groups.
                </p>

                {/* Continue button */}
                <button
                    className="w-full bg-teal-400 text-white py-4 rounded-2xl text-lg font-semibold hover:bg-teal-500 transition-all duration-200 shadow-lg hover:shadow-xl"
                    onClick={() => console.log(`Selected age: ${selectedAge}, Birth year: ${getBirthYear(selectedAge)}`)}
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default AgeSelector;