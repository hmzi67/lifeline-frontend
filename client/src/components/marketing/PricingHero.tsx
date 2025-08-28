import React from 'react';
import PricingHeroBgImage from "../../assets/images/pricing/pricingHeroBg.png";

const PricingHero: React.FC = () => {
  return (
    <div className={''}>
      <section className="min-h-[50vh] sm:min-h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full min-h-[50vh] sm:min-h-screen">
          <div className="aspect-[1/1] lg:aspect-[16/9] w-full min-h-[50vh] sm:min-h-screen relative">
            <img
              src={PricingHeroBgImage}
              alt="Running group stretching outdoors"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-[50vh] lg:min-h-screen flex items-center">
          <div className={'container mx-auto px-4 md:px-6 lg:px-12'}>
            <div className="text-center mx-auto">
              <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                The 15 Secrets That You Should Know
                <br />
                About Running Club
              </h1>

                <p className="hidden sm:block text-base md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                Cultivate a healthy, thriving, and unstoppable workforce with BetterMe's
                health transformation ecosystem
                </p>
            </div>

          </div>
        </div>

        {/* Decorative Gradient */}
       
      </section>
    </div>
  );
};

export default PricingHero;
