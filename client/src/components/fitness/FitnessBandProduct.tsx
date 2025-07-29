import { useMemo, useState } from 'react';
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

  const bandVariants: BandVariant[] = useMemo(() => [
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
  ], []);

  const currentBand = useMemo(
    () => bandVariants.find(band => band.id === selectedBand) || bandVariants[0],
    [selectedBand, bandVariants]
  );

  return (
    <div className="min-h-screen sm:mt-24 mt-8 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-4 sm:hidden mb-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Track It, <span className="text-primary">Hack It</span><br />
            Transform Your <span className="text-primary">Body</span>
          </h1>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-md">
            Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
            <div className="space-y-4 hidden sm:block">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Track It, <span className="text-primary">Hack It</span><br />
                Transform Your <span className="text-primary">Body</span>
              </h1>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-md">
                Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy.
              </p>
            </div>

            {/* Discount Badge */}
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r bg-primary text-white px-3 py-1 md:px-4 md:py-2 rounded-full font-semibold text-sm md:text-base">
                Up to 92% off
              </div>
              <span className="text-gray-500 text-xs md:text-sm flex items-center gap-1">
                <Clock className="w-3 h-3 md:w-4 md:h-4" />
                19 Hours ago
              </span>
              <div className="w-5">
                <svg width="24" height="24" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6">
                  <path d="M15.8255..." fill="#3EC6C9" />
                </svg>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                ))}
              </div>
              <span className="text-gray-600 font-medium text-sm md:text-base">(142)</span>
            </div>

            {/* Product Titles */}
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
            <div className="grid grid-cols-2 gap-2 md:gap-4 py-4 md:py-6 text-sm md:text-base">
              <span className="text-gray-600 font-medium">Brand</span>
              <p className="text-gray-900 font-semibold">NexSUS Tech Company</p>
              <span className="text-gray-600 font-medium">Size</span>
              <p className="text-gray-900 font-semibold">15.7 x 11.1 x 1.0 inches</p>
              <span className="text-gray-600 font-medium">Weight</span>
              <p className="text-gray-900 font-semibold">6.28 pounds</p>
              <span className="text-gray-600 font-medium">Delivery</span>
              <p className="text-gray-900 font-semibold">Worldwide</p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 md:gap-6">
              {[
                { icon: <ThumbsUp className="w-4 h-4 md:w-5 md:h-5" />, label: "1.8k Like" },
                { icon: <ThumbsDown className="w-4 h-4 md:w-5 md:h-5" />, label: "Dislike" },
                { icon: <Share2 className="w-4 h-4 md:w-5 md:h-5" />, label: "Share" }
              ].map(({ icon, label }, i) => (
                <button key={i} className="flex items-center gap-2 text-gray-600 hover:text-primary text-sm md:text-base transition-colors">
                  {icon}<span className="font-medium">{label}</span>
                </button>
              ))}
            </div>

            {/* Buy Now */}
            <button className="w-full md:w-8/12 bg-gradient-to-r bg-primary hover:bg-primary-600 text-white font-semibold py-3 md:py-4 px-8 md:px-12 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base">
              Buy Now
            </button>
          </div>

          {/* Right Image Section */}
          <div className="relative order-1 lg:order-2">
            <div className="relative z-10 flex justify-center items-center">
              <img src={Phone} alt="Phone" className="w-full max-w-xs md:max-w-sm lg:max-w-md" loading="lazy" />

              {/* Fitness Band */}
              <div className="absolute -right-4 md:-right-8 top-1/2 transform -translate-y-1/2 z-20">
                <img
                  src={currentBand.image}
                  alt={currentBand.name}
                  className="w-48 h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 mt-48 md:mt-64 lg:mt-96 object-contain transition-all duration-300"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Band Selector */}
            <div className="flex justify-center gap-2 md:gap-4 mt-6 md:mt-8">
              {bandVariants.map((band) => {
                const isSelected = selectedBand === band.id;
                return (
                  <button
                    key={band.id}
                    onClick={() => setSelectedBand(band.id)}
                    className={`relative p-1 md:p-2 rounded-xl md:rounded-2xl transition-all transform hover:scale-105
                      ${isSelected ? "ring-2 md:ring-4 ring-offset-1 md:ring-offset-2 shadow-lg bg-teal-50" : "hover:shadow-md bg-gray-50 hover:bg-gray-100"}`}
                    style={isSelected ? { borderColor: band.color, boxShadow: `0 0 0 2px ${band.color}` } : {}}
                  >
                    <div className="w-12 h-14 md:w-16 md:h-20 flex items-center justify-center">
                      <img
                        src={band.thumbnail}
                        alt={band.name}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-4 h-4 md:w-6 md:h-6 bg-primary rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};