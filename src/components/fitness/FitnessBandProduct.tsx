import { useState } from 'react';
import { Heart, Clock, Star, ThumbsUp, ThumbsDown, Share2 } from 'lucide-react';
import Phone from "../../assets/images/fitness/phone.svg"
import Band from "../../assets/images/fitness/band.svg"

interface BandColor {
    id: string;
    name: string;
    color: string;
    bandImage: string;
    phoneImage: string;
}

export const FitnessBandProduct = () => {
    const [selectedColor, setSelectedColor] = useState('teal');

    const bandColors: BandColor[] = [
        {
            id: 'purple',
            name: 'Purple',
            color: 'bg-purple-400',
            bandImage: '/api/placeholder/120/300',
            phoneImage: '/api/placeholder/300/600'
        },
        {
            id: 'black',
            name: 'Black',
            color: 'bg-gray-900',
            bandImage: '/api/placeholder/120/300',
            phoneImage: '/api/placeholder/300/600'
        },
        {
            id: 'green',
            name: 'Green',
            color: 'bg-green-600',
            bandImage: '/api/placeholder/120/300',
            phoneImage: '/api/placeholder/300/600'
        },
        {
            id: 'teal',
            name: 'Teal',
            color: 'bg-teal-400',
            bandImage: '/api/placeholder/120/300',
            phoneImage: '/api/placeholder/300/600'
        }
    ];

    const currentBand = bandColors.find(band => band.id === selectedColor) || bandColors[3];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content Section */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                                Track It, <span className="text-teal-500">Hack It</span>
                                <br />
                                Transform Your <span className="text-teal-500">Body</span>
                            </h1>
                            <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                                Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy.
                            </p>
                        </div>

                        {/* Discount Badge */}
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-full font-semibold">
                                Up to 92% off
                            </div>
                            <span className="text-gray-500 text-sm flex items-center gap-1">
                <Clock className="w-4 h-4" />
                19 Hours ago
              </span>
                            <div className="flex gap-1">
                                <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                                <Heart className="w-4 h-4 text-red-500" />
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-current" />
                                ))}
                            </div>
                            <span className="text-gray-600 font-medium">(142)</span>
                        </div>

                        {/* Product Title */}
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                LifeLine's Customized Fitness
                            </h2>
                            <h3 className="text-xl md:text-2xl font-semibold text-gray-700">
                                Band to Track your Progress
                            </h3>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-3">
                            <span className="text-4xl md:text-5xl font-bold text-teal-500">$99.0</span>
                            <span className="text-xl text-red-400 line-through">$149.99</span>
                        </div>

                        {/* Product Details */}
                        <div className="grid grid-cols-2 gap-4 py-6 border-t border-gray-200">
                            <div>
                                <span className="text-gray-600 font-medium">Brand</span>
                                <p className="text-gray-900 font-semibold">NexSUS Tech Company</p>
                            </div>
                            <div>
                                <span className="text-gray-600 font-medium">Size</span>
                                <p className="text-gray-900 font-semibold">15.7 x 11.1 x 1.0 inches</p>
                            </div>
                            <div>
                                <span className="text-gray-600 font-medium">Weight</span>
                                <p className="text-gray-900 font-semibold">6.28 pounds</p>
                            </div>
                            <div>
                                <span className="text-gray-600 font-medium">Delivery</span>
                                <p className="text-gray-900 font-semibold">Worldwide</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-4">
                                <button className="flex items-center gap-2 text-gray-600 hover:text-teal-500 transition-colors">
                                    <ThumbsUp className="w-5 h-5" />
                                    <span className="font-medium">1.8k Like</span>
                                </button>
                                <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
                                    <ThumbsDown className="w-5 h-5" />
                                    <span className="font-medium">Dislike</span>
                                </button>
                                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                                    <Share2 className="w-5 h-5" />
                                    <span className="font-medium">Share</span>
                                </button>
                            </div>
                        </div>

                        {/* Buy Button */}
                        <button className="w-full md:w-auto bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-4 px-12 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                            Buy Now
                        </button>
                    </div>

                    {/* Right Image Section */}
                    <div className="relative">
                        {/* Main Device Display */}
                        <div className="relative z-10 flex justify-center items-center">

                            {/* Phone Mockup */}
                            <div className="relative">
                            <img src={Phone} alt={'Phone'} />
                            </div>

                            {/* Fitness Band */}
                            <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 z-20">
                                <div className={"relative"}>
                                    {/* Band */}
                                    <img src={Band} alt={'Band'} className={`w-96 h-96 mt-96 ${currentBand.color}`} />
                                </div>
                            </div>
                        </div>

                        {/* Color Selection */}
                        <div className="flex justify-center gap-4 mt-8">
                            {bandColors.map((band) => (
                                <button
                                    key={band.id}
                                    onClick={() => setSelectedColor(band.id)}
                                    className={`relative w-16 h-16 rounded-full transition-all duration-300 transform hover:scale-110 ${
                                        selectedColor === band.id
                                            ? 'ring-4 ring-teal-400 ring-offset-2 scale-110 shadow-lg'
                                            : 'hover:shadow-md'
                                    }`}
                                >
                                    <div className={`w-full h-full ${band.color} rounded-full shadow-lg`}>
                                        <div className="absolute inset-2 bg-white/20 rounded-full"></div>
                                    </div>
                                    {selectedColor === band.id && (
                                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
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
};;