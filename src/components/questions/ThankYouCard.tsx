import React from 'react';

const ThankYouCard: React.FC = () => {
    const bgUrl = 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1';

    return (
        <div
            className="relative w-full h-screen bg-cover bg-center flex items-center justify-center text-center px-4"
            style={{
                backgroundImage: `linear-gradient(to top, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.0)), url(${bgUrl})`,
            }}
        >
            <div className="backdrop-blur-sm bg-white/30 p-6 rounded-2xl shadow-lg max-w-xl w-full">
                <h1 className="text-4xl font-bold text-gray-800 select-text">Thank You!</h1>
                <h2 className="text-xl font-semibold text-cyan-600 mt-2 select-text">Getting Ready Your Plan</h2>
                <p className="text-gray-700 mt-4 select-text">
                    We’re Customizing Your Exercise Plan <br /> According To Your Physique.
                </p>
            </div>
        </div>
    );
};

export default ThankYouCard;

