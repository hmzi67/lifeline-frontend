import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import GoBack from "@/components/common/GoBack.tsx";
import GoNext from "@/components/common/GoNext.tsx";


interface PersonalizePlansActions {
    onContinue?: () => void;
    onBack?: () => void;
}

const PersonalizingPlans: React.FC<PersonalizePlansActions> = ({ onContinue, onBack }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (progress < 100) {
            const interval = setInterval(() => {
                setProgress((prev) => Math.min(prev + 1, 100));
            }, 50); // adjust speed here
            return () => clearInterval(interval);
        }
    }, [progress]);

    return (
        <div className="flex flex-col items-center justify-center py-10">
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Personalizing plans for you!</h1>
            <p className="text-sm text-gray-600 mb-6">Please wait.....</p>

            <div className="w-84 h-84 mb-6">
                <CircularProgressbar
                    value={progress}
                    text={`${progress}%`}
                    styles={buildStyles({
                        pathColor: '#21C8C2',
                        textColor: '#21C8C2',
                        trailColor: '#e6e6e6',
                        textSize: '16px',
                    })}
                />
            </div>

            <p className="text-sm text-gray-600 mb-6 text-center ">
                This will just take a moment. Get ready to transform your fitness journey!
            </p>

            {/* Continue Button */}
            <div className={'flex items-center justify-center gap-5 mt-12'}>
                <GoBack onClick={onBack} />
                <GoNext onClick={onContinue} />
            </div>
        </div>
    );
};

export default PersonalizingPlans;
