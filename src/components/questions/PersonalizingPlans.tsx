import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const PersonalizingPlans: React.FC = () => {
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
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

            <p className="text-sm text-gray-600 mb-6">
                This will just take a moment. Get ready to transform your fitness journey!
            </p>

            <button
                className="bg-[#21C8C2] text-white font-semibold py-2 px-6 rounded-md disabled:opacity-50"
                disabled={progress < 100}
            >
                Continue
            </button>
        </div>
    );
};

export default PersonalizingPlans;
