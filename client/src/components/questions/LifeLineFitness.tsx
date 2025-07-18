import React from 'react';
import GoBack from "@/components/common/GoBack.tsx";
import GoNext from '../common/GoNext';
import womenimg from "@/assets/images/question/womengroup2.svg";
import menimg from "@/assets/images/question/mengroup.svg";

interface LifeLineFitnessProps {
    gender: string;
    onContinue?: () => void;
    onBack?: () => void;
}

const LifeLineFitness: React.FC<LifeLineFitnessProps> = ({ gender, onContinue, onBack }) => {
    const content = {
        women: {
            title: "Over 10 Million women have used this",
            subtitle: "LifeLine will help you in this fitness journey with a science-based approach.",
            image: womenimg
        },
        men: {
            title: "Over 8 Million men have used this",
            subtitle: "LifeLine will help you in this fitness journey with a science-based approach.",
            image: menimg
        }
    };

    const handleContinue = () => {
        onContinue?.();
    };

    return (
        <div className="flex flex-col h-screen w-full p-2 box-border">
            <div className="flex flex-col items-center justify-center flex-1 w-full">
                <div className="text-center max-w-4xl px-2 w-full">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-4 leading-tight">
                        {gender === 'male' ? content.men.title : content.women.title}
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-6 max-w-md sm:max-w-xl mx-auto leading-relaxed">
                        {gender === 'male' ? content.men.subtitle : content.women.subtitle}
                    </p>
                    <div className="mb-2 sm:mb-4 w-full">
                        <div className="relative w-full flex items-center justify-center">
                            <img
                                src={gender === 'male' ? content.men.image : content.women.image}
                                alt={`${gender} fitness group`}
                                className="w-full h-auto object-contain max-h-48 sm:max-h-80"
                            />
                        </div>
                    </div>
                </div>
                            <div className="flex items-center justify-center gap-2 sm:gap-3 mt-2 mb-6">
                <GoBack onClick={onBack} />
               <GoNext onClick={handleContinue}/>
            </div>
            </div>
        </div>
    );
};

export default LifeLineFitness;
