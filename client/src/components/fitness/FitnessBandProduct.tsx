import { useState } from 'react';
import { Clock, Star, ThumbsUp, ThumbsDown, Share2 } from 'lucide-react';
import Phone from "../../assets/images/fitness/phone.svg";
import Band from "../../assets/images/fitness/band.svg";
import Band1 from "../../assets/images/fitness/band-1.webp";
import Band2 from "../../assets/images/fitness/band-2.webp";
import Band3 from "../../assets/images/fitness/band-3.webp";
import Band4 from "../../assets/images/fitness/band-4.webp";

interface BandVariant {
  id: string;
  name: string;
  image: string;
  thumbnail: string;
  color: string;
}

export const FitnessBandProduct = () => {
  const [selectedBand, setSelectedBand] = useState('band1');

  const bandVariants: BandVariant[] = [
    {
      id: 'band1',
      name: 'Classic Band',
      image: Band,
      thumbnail: Band,
      color: "#51D2CC"
    },
    {
      id: 'band2',
      name: 'Sport Band',
      image: Band1,
      thumbnail: Band1,
      color: "#51813F"
    },
    {
      id: 'band3',
      name: 'Premium Band',
      image: Band2,
      thumbnail: Band2,
      color: "#000000"
    },
    {
      id: 'band4',
      name: 'Elite Band',
      image: Band3,
      thumbnail: Band3,
      color: "#847DA8"
    },
    {
      id: 'band5',
      name: 'Pro Band',
      image: Band4,
      thumbnail: Band4,
      color: "#D7E3EE"
    }
  ];

  const currentBand = bandVariants.find(band => band.id === selectedBand) || bandVariants[0];

  return (
    <div className="min-h-screen sm:mt-24 mt-8 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content Section */}
          <div className="space-y-6 md:space-y-8">
            {/* H1 & P - Always first on mobile */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Track It, <span className="text-primary">Hack It</span>
                <br />
                Transform Your <span className="text-primary">Body</span>
              </h1>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-md">
                Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy.
              </p>
            </div>

            {/* Image Section for Mobile - Moved here for mobile view */}
            <div className="relative lg:hidden">
              {/* Main Device Display */}
              <div className="relative z-10 flex justify-center items-center">
                {/* Phone Mockup */}
                <div className="relative">
                  <img src={Phone} alt="Phone" className="w-full max-w-xs" />
                </div>
                {/* Fitness Band */}
                <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-20">
                  <div className="relative">
                    {/* Band */}
                    <img
                      src={currentBand.image}
                      alt={currentBand.name}
                      className="w-48 h-48 mt-48 object-contain transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
              {/* Band Selection */}
              <div className="flex justify-center gap-2 mt-6">
                {bandVariants.map((band) => (
                  <button
                    key={band.id}
                    onClick={() => setSelectedBand(band.id)}
                    className={`relative p-1 rounded-xl transition-all duration-300 transform hover:scale-105 ${selectedBand === band.id
                      ? `ring-2 ring-offset-1 scale-105 shadow-lg bg-teal-50`
                      : 'hover:shadow-md bg-gray-50 hover:bg-gray-100'
                    }`}
                    style={selectedBand === band.id ? { borderColor: band.color, boxShadow: '0 0 0 2px ' + band.color } : {}}
                  >
                    <div className="w-12 h-14 flex items-center justify-center">
                      <img
                        src={band.thumbnail}
                        alt={band.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    {selectedBand === band.id && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Rest of the content - after images on mobile */}
            <div className="space-y-6 md:space-y-8">
              {/* Discount Badge */}
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r bg-primary text-white px-3 py-1 md:px-4 md:py-2 rounded-full font-semibold text-sm md:text-base">
                  Up to 92% off
                </div>
                <span className="text-gray-500 text-xs md:text-sm flex items-center gap-1">
                  <Clock className="w-3 h-3 md:w-4 md:h-4" />
                  19 Hours ago
                </span>
                <div className="flex gap-1 w-5">
                  <svg width="24" height="24" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6">
                    <path d="M15.8255 0.0351562C16.995 0.0352273 18.1244 0.461238 19.0027 1.23354L19.2342 1.45156L20.2838 2.50109C20.5718 2.78725 20.9479 2.96789 21.3513 3.01382L21.5543 3.02585H23.058C24.2868 3.02578 25.469 3.49584 26.3623 4.33962C27.2556 5.18341 27.7922 6.33698 27.8621 7.56377L27.8696 7.83743V9.34105C27.8696 9.74703 28.008 10.1425 28.2576 10.4582L28.3929 10.6086L29.4409 11.6581C30.3096 12.5219 30.8161 13.6844 30.8572 14.9087C30.8983 16.1331 30.4708 17.327 29.662 18.247L29.4439 18.4785L28.3944 19.5281C28.1082 19.8161 27.9276 20.1922 27.8817 20.5956L27.8696 20.7986V22.3022C27.8697 23.531 27.3996 24.7133 26.5558 25.6065C25.712 26.4998 24.5585 27.0364 23.3316 27.1063L23.058 27.1138H21.5543C21.1489 27.1139 20.7554 27.2506 20.4371 27.5017L20.2868 27.6371L19.2372 28.6851C18.3735 29.5538 17.2109 30.0603 15.9865 30.1013C14.7622 30.1424 13.5683 29.715 12.6483 28.9061L12.4167 28.6881L11.3672 27.6386C11.0791 27.3524 10.703 27.1718 10.2996 27.1258L10.0966 27.1138H8.59295C7.36415 27.1139 6.18188 26.6438 5.28859 25.8C4.39531 24.9563 3.8587 23.8027 3.78881 22.5759L3.7813 22.3022V20.7986C3.78116 20.3932 3.64451 19.9997 3.39336 19.6814L3.25803 19.5311L2.20999 18.4815C1.34131 17.6178 0.834795 16.4552 0.793723 15.2309C0.752651 14.0066 1.18011 12.8127 1.98896 11.8927L2.20698 11.6611L3.25653 10.6116C3.54269 10.3236 3.72334 9.94745 3.76927 9.54404L3.7813 9.34105V7.83743L3.78881 7.56377C3.85596 6.3841 4.35482 5.27038 5.19034 4.43488C6.02586 3.59937 7.1396 3.10051 8.31929 3.03337L8.59295 3.02585H10.0966C10.502 3.02572 10.8955 2.88906 11.2138 2.63792L11.3642 2.50259L12.4137 1.45457C12.8608 1.00482 13.3924 0.647889 13.9779 0.404294C14.5634 0.160698 15.1913 0.0352481 15.8255 0.0351562ZM21.3844 10.9845C21.1024 10.7026 20.7201 10.5443 20.3214 10.5443C19.9226 10.5443 19.5403 10.7026 19.2583 10.9845L14.3068 15.9344L12.3626 13.9917L12.2212 13.8669C11.919 13.6333 11.5392 13.5234 11.1589 13.5596C10.7786 13.5958 10.4263 13.7755 10.1736 14.062C9.92099 14.3485 9.78687 14.7205 9.79852 15.1023C9.81019 15.4842 9.96675 15.8473 10.2364 16.1179L13.2437 19.1251L13.3851 19.2499C13.6744 19.4743 14.0356 19.5855 14.401 19.5625C14.7665 19.5395 15.1109 19.384 15.3699 19.1251L21.3844 13.1106L21.5092 12.9693C21.7336 12.68 21.8448 12.3187 21.8218 11.9533C21.7988 11.5879 21.6433 11.2434 21.3844 10.9845Z" fill="#3EC6C9" />
                  </svg>
                </div>
              </div>
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600 font-medium text-sm md:text-base">(142)</span>
              </div>
              {/* Product Title */}
              <div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  LifeLine's Customized Fitness
                </h2>
                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-700">
                  Band to Track your Progress
                </h3>
              </div>
              {/* Price */}
              <div className="flex items-baseline gap-2 md:gap-3">
                <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">$99.0</span>
                <span className="text-base md:text-lg lg:text-xl text-red-400 line-through">$149.99</span>
              </div>
              {/* Product Details */}
              <div className="grid grid-cols-2 gap-2 md:gap-4 py-4 md:py-6">
                <div>
                  <span className="text-gray-600 font-medium text-sm md:text-base">Brand</span>
                </div>
                <div>
                  <p className="text-gray-900 font-semibold text-sm md:text-base">NexSUS Tech Company</p>
                </div>
                <div>
                  <span className="text-gray-600 font-medium text-sm md:text-base">Size</span>
                </div>
                <div>
                  <p className="text-gray-900 font-semibold text-sm md:text-base">15.7 x 11.1 x 1.0 inches</p>
                </div>
                <div>
                  <span className="text-gray-600 font-medium text-sm md:text-base">Weight</span>
                </div>
                <div>
                  <p className="text-gray-900 font-semibold text-sm md:text-base">6.28 pounds</p>
                </div>
                <div>
                  <span className="text-gray-600 font-medium text-sm md:text-base">Delivery</span>
                </div>
                <div>
                  <p className="text-gray-900 font-semibold text-sm md:text-base">Worldwide</p>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="flex items-center gap-4 md:gap-6">
                <div className="flex items-center gap-2 md:gap-4">
                  <button className="flex items-center gap-1 md:gap-2 text-gray-600 hover:text-primary transition-colors text-sm md:text-base">
                    <ThumbsUp className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="font-medium">1.8k Like</span>
                  </button>
                  <button className="flex items-center gap-1 md:gap-2 text-gray-600 hover:text-primary transition-colors text-sm md:text-base">
                    <ThumbsDown className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="font-medium">Dislike</span>
                  </button>
                  <button className="flex items-center gap-1 md:gap-2 text-gray-600 hover:text-primary transition-colors text-sm md:text-base">
                    <Share2 className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="font-medium">Share</span>
                  </button>
                </div>
              </div>
              {/* Buy Button */}
              <button className="w-full md:w-8/12 bg-gradient-to-r bg-primary hover:bg-primary-600 text-white font-semibold py-3 md:py-4 px-8 md:px-12 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base">
                Buy Now
              </button>
            </div>
          </div>

          {/* Right Image Section - Hidden on mobile, shown on desktop */}
          <div className="relative hidden lg:block">
            {/* Main Device Display */}
            <div className="relative z-10 flex justify-center items-center">
              {/* Phone Mockup */}
              <div className="relative">
                <img src={Phone} alt="Phone" className="w-full max-w-xs md:max-w-sm lg:max-w-md" />
              </div>
              {/* Fitness Band */}
              <div className="absolute -right-4 md:-right-8 top-1/2 transform -translate-y-1/2 z-20">
                <div className="relative">
                  {/* Band */}
                  <img
                    src={currentBand.image}
                    alt={currentBand.name}
                    className="w-48 h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 mt-48 md:mt-64 lg:mt-96 object-contain transition-all duration-300"
                  />
                </div>
              </div>
            </div>
            {/* Band Selection */}
            <div className="flex justify-center gap-2 md:gap-4 mt-6 md:mt-8">
              {bandVariants.map((band) => (
                <button
                  key={band.id}
                  onClick={() => setSelectedBand(band.id)}
                  className={`relative p-1 md:p-2 rounded-xl md:rounded-2xl transition-all duration-300 transform hover:scale-105 ${selectedBand === band.id
                    ? `ring-2 md:ring-4 ring-offset-1 md:ring-offset-2 scale-105 shadow-lg bg-teal-50`
                    : 'hover:shadow-md bg-gray-50 hover:bg-gray-100'
                  }`}
                  style={selectedBand === band.id ? { borderColor: band.color, boxShadow: '0 0 0 2px ' + band.color } : {}}
                >
                  <div className="w-12 h-14 md:w-16 md:h-20 flex items-center justify-center">
                    <img
                      src={band.thumbnail}
                      alt={band.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {selectedBand === band.id && (
                    <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-4 h-4 md:w-6 md:h-6 bg-primary rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};