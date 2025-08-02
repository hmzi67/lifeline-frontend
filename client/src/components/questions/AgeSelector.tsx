import React, { useState, useEffect } from 'react';
import GoBack from "@/components/common/GoBack.tsx";
import GoNext from "@/components/common/GoNext.tsx";

interface AgeDateSelectorProps {
    onAgeSelect?: (age: number) => void;
    onSelection?: (age: number, birthYear: number) => void;
    onContinue?: (age: number, birthYear: number, birthMonth: string, birthDay: number) => void;
    onBack?: () => void;
}

const AgeDateSelector: React.FC<AgeDateSelectorProps> = ({ onAgeSelect, onSelection, onContinue, onBack }) => {
    const [selectedDate, setSelectedDate] = useState({
        month: 'January',
        day: 1,
        year: 2007
    });
    const [age, setAge] = useState(18);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 58 }, (_, i) => currentYear - 18 - i); // 18 to 75 years old

    const calculateAge = (birthMonth: string, birthDay: number, birthYear: number) => {
        const today = new Date();
        const birth = new Date(birthYear, months.indexOf(birthMonth), birthDay);
        
        let calculatedAge = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            calculatedAge--;
        }
        
        return calculatedAge;
    };

    useEffect(() => {
        const newAge = calculateAge(selectedDate.month, selectedDate.day, selectedDate.year);
        setAge(newAge);
        if (onAgeSelect) onAgeSelect(newAge);
        if (onSelection) onSelection(newAge, selectedDate.year);
    }, [selectedDate, onAgeSelect, onSelection]);

    const handleContinue = () => {
        if (onContinue) {
            onContinue(age, selectedDate.year, selectedDate.month, selectedDate.day);
        }
    };

    const DateColumn = ({ 
        label, 
        items, 
        selectedValue, 
        onSelect 
    }: { 
        label: string;
        items: (string | number)[];
        selectedValue: string | number;
        onSelect: (value: string | number) => void;
    }) => {
        const [isDragging, setIsDragging] = useState(false);
        const [dragStart, setDragStart] = useState({ y: 0, index: 0 });
        const [scrollOffset, setScrollOffset] = useState(0);
        const [isAnimating, setIsAnimating] = useState(false);
        const containerRef = React.useRef<HTMLDivElement>(null);
        const wheelTimeoutRef = React.useRef<number>(0);
        const scrollAccumulatorRef = React.useRef(0);

        const handleStart = (clientY: number) => {
            setIsDragging(true);
            setDragStart({
                y: clientY,
                index: items.indexOf(selectedValue)
            });
        };

        const handleMove = (clientY: number) => {
            if (!isDragging) return;
            
            const deltaY = clientY - dragStart.y;
            const itemHeight = 50;
            const indexChange = Math.round(-deltaY / itemHeight);
            const currentIndex = items.indexOf(selectedValue);
            const isLooping = label === 'Month' || label === 'Day';
            
            let newIndex;
            if (isLooping) {
                newIndex = ((currentIndex + indexChange) % items.length + items.length) % items.length;
            } else {
                newIndex = Math.max(0, Math.min(items.length - 1, dragStart.index + indexChange));
            }
            
            if (newIndex !== currentIndex) {
                onSelect(items[newIndex]);
            }
        };

        const handleEnd = () => {
            setIsDragging(false);
        };

        const animateScroll = (direction: number) => {
            if (isAnimating) return;
            
            setIsAnimating(true);
            setScrollOffset(direction * 10);
            
            setTimeout(() => {
                setScrollOffset(0);
                setIsAnimating(false);
            }, 200);
        };

        const handleWheel = (e: React.WheelEvent) => {
            e.preventDefault();
            
            scrollAccumulatorRef.current += e.deltaY;
            
            if (wheelTimeoutRef.current) {
                clearTimeout(wheelTimeoutRef.current);
            }
            
            wheelTimeoutRef.current = window.setTimeout(() => {
                const threshold = 50;
                const scrollSteps = Math.floor(Math.abs(scrollAccumulatorRef.current) / threshold);
                
                if (scrollSteps > 0) {
                    const direction = scrollAccumulatorRef.current > 0 ? 1 : -1;
                    const currentIndex = items.indexOf(selectedValue);
                    const isLooping = label === 'Month' || label === 'Day';
                    
                    let newIndex;
                    if (isLooping) {
                        newIndex = ((currentIndex + direction) % items.length + items.length) % items.length;
                    } else {
                        newIndex = Math.max(0, Math.min(items.length - 1, currentIndex + direction));
                    }
                    
                    if (newIndex !== currentIndex) {
                        onSelect(items[newIndex]);
                        animateScroll(direction);
                    }
                }
                
                scrollAccumulatorRef.current = 0;
            }, 50);
        };

        const handleMouseDown = (e: React.MouseEvent) => {
            e.preventDefault();
            handleStart(e.clientY);
        };

        const handleMouseMove = (e: React.MouseEvent) => {
            e.preventDefault();
            handleMove(e.clientY);
        };

        const handleTouchStart = (e: React.TouchEvent) => {
            e.preventDefault();
            handleStart(e.touches[0].clientY);
        };

        const handleTouchMove = (e: React.TouchEvent) => {
            e.preventDefault();
            handleMove(e.touches[0].clientY);
        };

        // Get display items
        const currentIndex = items.indexOf(selectedValue);
        const isLooping = label === 'Month' || label === 'Day';
        
        let previousItem, nextItem;
        
        if (isLooping) {
            // For months and days, wrap around
            const prevIndex = ((currentIndex - 1) % items.length + items.length) % items.length;
            const nextIndex = (currentIndex + 1) % items.length;
            previousItem = items[prevIndex];
            nextItem = items[nextIndex];
        } else {
            // For years, show actual values but handle bounds
            if (currentIndex > 0) {
                previousItem = items[currentIndex - 1];
            } else {
                previousItem = (items[0] as number) + 1; // Show year above first selectable
            }
            
            if (currentIndex < items.length - 1) {
                nextItem = items[currentIndex + 1];
            } else {
                nextItem = (items[items.length - 1] as number) - 1; // Show year below last selectable
            }
        }

        return (
            <div className="flex flex-col items-center">
                <label className="text-sm font-medium text-gray-700 mb-3">{label}</label>
                <div 
                    ref={containerRef}
                    className={`flex flex-col items-center space-y-2 select-none cursor-grab touch-none transition-transform duration-200 ${
                        isDragging ? 'cursor-grabbing' : ''
                    }`}
                    style={{
                        transform: `translateY(${scrollOffset}px)`
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleEnd}
                    onMouseLeave={handleEnd}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleEnd}
                    onWheel={handleWheel}
                >
                    {/* Previous item */}
                    <div className="px-4 py-2 text-lg font-medium transition-all duration-300 text-gray-400 scale-100">
                        {previousItem}
                    </div>
                    
                    {/* Current item */}
                    <div className="px-4 py-2 text-lg font-medium transition-all duration-300 text-primary-500 bg-teal-50 rounded-lg scale-110">
                        {selectedValue}
                    </div>
                    
                    {/* Next item */}
                    <div className="px-4 py-2 text-lg font-medium transition-all duration-300 text-gray-400 scale-100">
                        {nextItem}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex items-center justify-center p-4">
            
            <div className="p-8 max-w-md w-full text-center ">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    What's your age?
                </h1>

                <p className="text-gray-500 text-base mb-8">
                    Age help us to understand your metabolism
                </p>

                {/* Age Display Circle */}
                <div className="mb-8">
                    <div className="w-32 h-32 bg-teal-400 rounded-full flex items-center justify-center mx-auto shadow-lg transition-all duration-300">
                        <span className="text-6xl font-bold text-white">
                            {age}
                        </span>
                    </div>
                </div>

                {/* Date Selection */}
                <div className="grid grid-cols-3 gap-8 mb-8">
                    <DateColumn 
                        label="Month"
                        items={months}
                        selectedValue={selectedDate.month}
                        onSelect={(value) => setSelectedDate(prev => ({ ...prev, month: value as string }))}
                    />
                    <DateColumn 
                        label="Day"
                        items={days}
                        selectedValue={selectedDate.day}
                        onSelect={(value) => setSelectedDate(prev => ({ ...prev, day: value as number }))}
                    />
                    <DateColumn 
                        label="Year"
                        items={years}
                        selectedValue={selectedDate.year}
                        onSelect={(value) => setSelectedDate(prev => ({ ...prev, year: value as number }))}
                    />
                </div>

                <p className="text-red-500 text-sm mb-8">
                    *At this time our application allows age between 18 to 75 years
                </p>


                {/* Continue Button */}
                <div className={'flex items-center justify-center gap-5'}>
                    <GoBack onClick={onBack} />
                    <GoNext onClick={handleContinue} />
                </div>
            </div>
        </div>
    );
};

export default AgeDateSelector;