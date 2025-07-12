import React from 'react';
import PricingHeroBgImage from "../../assets/images/pricing/pricingHeroBg.svg";

const PricingHero: React.FC = () => {
    return (
      <div className="min-h-screen overflow-hidden">
    {/* Background Image */}
    <div className="absolute inset-0 ">
        <img
            src={PricingHeroBgImage}
            alt="Running group stretching outdoors"
            className="object-contain w-full"
        />
    </div>

    {/* Dark overlay */}
    <div className="absolute inset-0 bg-black/30"></div>

    {/* Content */}
    <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="text-center mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                The 15 Secrets That You Should Know
                <br />
                About Running Club
            </h1>

            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                Cultivate a healthy, thriving, and unstoppable workforce with BetterMe's
                health transformation ecosystem
            </p>
        </div>
    </div>

    {/* Decorative elements */}
    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/20 to-transparent"></div>
</div>
    );
};

export default PricingHero;