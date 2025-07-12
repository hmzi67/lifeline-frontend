import React from 'react';
import commingSoonImage from "@/assets/images/comming-soon/comming-soon.svg";

const ComingSoonFinal: React.FC = () => {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center py-24">
            <div className="text-center max-w-6xl mx-auto">
                {/* Coming Soon Image - Main Visual */}
                    <img
                        src={commingSoonImage}
                        alt="Coming Soon - We're working hard to bring you something amazing!"
                        className="w-full max-w-5xl mx-auto h-auto object-contain"
                    />

                {/* Subtitle - Matches the design spacing and typography */}
                <div className="mt-12">
                    <p className="text-xl lg:text-2xl text-gray-800 font-medium max-w-3xl mx-auto leading-relaxed">
                        Currently we're working on it but it will be soon available.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default ComingSoonFinal;