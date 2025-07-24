// // done
// import React, { useState, useEffect } from 'react';
// import { Button } from '../ui/button';
// import hero1 from "@/assets/images/landing/hero-1.webp";
// import hero2 from "@/assets/images/landing/hero-2.webp";
// import hero3 from "@/assets/images/landing/hero-3.webp";
//
// export const HeroSection: React.FC = () => {
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
//     const [nextImageIndex, setNextImageIndex] = useState(1);
//     const [isTransitioning, setIsTransitioning] = useState(false);
//     const images = [hero1, hero2, hero3];
//
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setIsTransitioning(true);
//             setTimeout(() => {
//                 setCurrentImageIndex(nextImageIndex);
//                 setNextImageIndex((nextImageIndex + 1) % images.length);
//                 setIsTransitioning(false);
//             }, 1000);
//         }, 5000);
//         return () => clearInterval(interval);
//     }, [nextImageIndex, images.length]);
//
//     return (
//         <section className="relative min-h-screen overflow-hidden">
//             <div className="absolute inset-0">
//                 <div className="absolute inset-0">
//                     <img
//                         src={images[currentImageIndex]}
//                         alt="Fitness background"
//                         className="w-full h-full object-cover"
//                     />
//                 </div>
//                 <div className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}>
//                     <img
//                         src={images[nextImageIndex]}
//                         alt="Fitness background"
//                         className="w-full h-full object-cover"
//                     />
//                 </div>
//                 <div className="absolute inset-0 bg-black bg-opacity-40"></div>
//             </div>
//
//             <div className="absolute top-2 left-2 text-white opacity-30 text-lg font-light md:text-3xl md:top-10 md:left-10">+</div>
//             <div className="absolute top-1/2 right-2 text-white opacity-20 text-xl font-light md:text-4xl md:right-20">+</div>
//             <div className="absolute bottom-10 right-4 text-white opacity-25 text-lg font-light md:text-3xl md:bottom-20 md:right-1/3">+</div>
//
//             <div className="relative z-10 min-h-screen flex items-center">
//                 <div className="container mx-auto px-4 md:px-6 lg:px-12">
//                     <div className="max-w-2xl">
//                         <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold leading-tight text-white mb-4 md:mb-8">
//                             YOUR FITNESS{' '}
//                             <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-600">
//                                 PARTNER!
//                             </span>
//                         </h1>
//                         <p className="text-sm md:text-lg lg:text-xl text-white leading-relaxed mb-6 md:mb-12 max-w-xl opacity-90">
//                             Their guidelines recommend 150 minutes of moderate-intensity
//                             aerobic physical activity each week or vigorous-intensity
//                             aerobic
//                         </p>
//                         <div>
//                             <Button
//                                 size="lg"
//                                 className="bg-primary hover:bg-primary-600 text-white font-semibold px-4 py-2 md:px-8 md:py-4 text-base md:text-lg rounded-lg transition-all duration-300 transform hover:scale-105"
//                             >
//                                 Get Started
//                             </Button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };


import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import hero1 from "@/assets/images/landing/hero-1.webp";
import hero2 from "@/assets/images/landing/hero-2.webp";
import hero3 from "@/assets/images/landing/hero-3.webp";

export const HeroSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const images = [hero1, hero2, hero3];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex(nextImageIndex);
        setNextImageIndex((nextImageIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, [nextImageIndex, images.length]);

  return (
    <section className="relative min-h-[50vh] lg:min-h-screen overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <div className="w-full h-full aspect-[1/1] lg:aspect-[16/9] relative">
          {/* Current image */}
          <img
            src={images[currentImageIndex]}
            alt="Fitness background"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Transition image */}
          <img
            src={images[nextImageIndex]}
            alt="Next background"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>
      </div>

      {/* Decorative + signs */}
      <div className="absolute top-2 left-2 text-white opacity-30 text-lg font-light md:text-3xl md:top-10 md:left-10">+</div>
      <div className="absolute top-1/2 right-2 text-white opacity-20 text-xl font-light md:text-4xl md:right-20">+</div>
      <div className="absolute bottom-10 right-4 text-white opacity-25 text-lg font-light md:text-3xl md:bottom-20 md:right-1/3">+</div>

      {/* Content */}
      <div className="relative z-10 min-h-[50vh] lg:min-h-screen flex items-center">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="max-w-2xl">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold leading-tight text-white mb-4 md:mb-8">
              YOUR FITNESS{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-600">
                                PARTNER!
                            </span>
            </h1>
            <p className="text-sm md:text-lg lg:text-xl text-white leading-relaxed mb-6 md:mb-12 max-w-xl opacity-90">
              Their guidelines recommend 150 minutes of moderate-intensity
              aerobic physical activity each week or vigorous-intensity aerobic
            </p>
            <div>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary-600 text-white font-semibold px-4 py-2 md:px-8 md:py-4 text-base md:text-lg rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
