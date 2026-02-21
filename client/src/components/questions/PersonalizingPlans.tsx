import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface PersonalizePlansActions {
    onContinue?: () => void;
    onBack?: () => void;
}

const PersonalizingPlans: React.FC<PersonalizePlansActions> = ({ onContinue }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (progress < 100) {
            const interval = setInterval(() => {
                setProgress((prev) => Math.min(prev + 1, 100));
            }, 50); // adjust speed here
            return () => clearInterval(interval);
        }
    }, [progress]);

    // When progress reaches 100, wait 2s then call onContinue
    useEffect(() => {
        if (progress === 100) {
            const timeout = setTimeout(() => {
                if (onContinue) onContinue();
            }, 2000); // 2 seconds delay
            return () => clearTimeout(timeout);
        }
    }, [progress, onContinue]);

    return (
        <div className="flex flex-col items-center justify-center py-10 text-center px-4 mb-3 ">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Personalizing plans for you!</h1>
            <p className="text-sm text-gray-600 mb-6">Please wait.....</p>

            <div className="sm:w-80 w-64 mb-6">
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

            <p className="text-sm text-gray-600 mb-6 text-center">
                This will take just a moment. Get ready to transform your fitness journey!
            </p>
        </div>
    );
};

export default PersonalizingPlans;
