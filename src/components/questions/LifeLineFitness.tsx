import React from 'react';
import GoBack from "@/components/common/GoBack.tsx";
import { ArrowRight } from 'lucide-react';
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
            title: "Over 10 Million women have use this",
            subtitle: "LifeLine will help you in this fitness journey with science based approach this",
            image: womenimg
        },
        men: {
            title: "Over 8 Million men have use this",
            subtitle: "LifeLine will help you in this fitness journey with science based approach this",
            image: menimg
        }
    };

    const handleContinue = () => {
        onContinue?.();
    };

    return (
        <div className="my-8">
            <div className="flex items-center justify-center">
                {/* Main Content */}
                <div className="text-center max-w-6xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 leading-tight">
                        {gender == 'male' ? content.men.title : content.women.title}
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                        {gender == 'male' ? content.men.subtitle : content.women.subtitle}
                    </p>

                    {/* Image Section */}
                    <div className="mb-12 relative">
                        <div className="relative inline-block">
                            <img
                                src={gender == 'male' ? content.men.image : content.women.image}
                                alt={`${gender} fitness group`}
                                className="w-full h-full  mx-auto "
                            />
                          
                        </div>
                    </div>

                    {/* Continue Button */}
                    <div className={'flex items-center justify-center '}>
                        <GoBack onClick={onBack} />
                        <button
                            onClick={handleContinue}
                            className="inline-flex items-center justify-between p-4 rounded-full bg-primary hover:bg-primary-600 text-white font-medium border w-auto h-auto px-8 py-4 transition-all duration-200"
                        >
                            Continue
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LifeLineFitness;