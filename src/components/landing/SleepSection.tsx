import React from 'react';
import { Button } from '../ui/button';
import { Check } from 'lucide-react';

export const SleepSection: React.FC = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-3 gap-8 items-center max-w-7xl mx-auto">
                    {/* Left Content - Moonlit Bedroom Scene */}
                    <div className="relative">
                        <div className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-blue-900 rounded-3xl overflow-hidden h-96 lg:h-[500px]">
                            {/* Bedroom Scene Background */}
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-800/60">
                                {/* Moon */}
                                <div className="absolute top-8 right-8 w-16 h-16 bg-yellow-200 rounded-full shadow-lg opacity-90">
                                    <div className="absolute inset-1 bg-yellow-100 rounded-full"></div>
                                </div>
                                
                                {/* Clouds */}
                                <div className="absolute top-12 left-8 w-20 h-8 bg-gray-600/40 rounded-full blur-sm"></div>
                                <div className="absolute top-16 left-16 w-16 h-6 bg-gray-600/30 rounded-full blur-sm"></div>
                                
                                {/* Bed silhouette */}
                                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent">
                                    <div className="absolute bottom-4 left-4 right-4 h-20 bg-slate-800/60 rounded-t-3xl"></div>
                                    <div className="absolute bottom-8 left-8 right-8 h-12 bg-slate-700/40 rounded-full"></div>
                                </div>
                            </div>
                            
                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                                    <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Center Content - Phone Mockup */}
                    <div className="relative mx-auto">
                        <div className="relative w-64 h-[520px] bg-black rounded-[3rem] p-2 shadow-2xl">
                            {/* Phone Screen */}
                            <div className="w-full h-full bg-teal-100 rounded-[2.5rem] overflow-hidden relative">
                                {/* Status Bar */}
                                <div className="bg-teal-200/50 px-6 py-3 flex justify-between items-center text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 text-gray-600">←</div>
                                        <span className="text-gray-700 font-medium">Better Sleep</span>
                                    </div>
                                </div>
                                
                                {/* App Content Grid */}
                                <div className="p-4 grid grid-cols-2 gap-3 h-full">
                                    {/* Sleep content cards */}
                                    {Array.from({ length: 8 }).map((_, index) => (
                                        <div key={index} className="bg-teal-200/60 rounded-2xl p-3 relative overflow-hidden">
                                            <div className="absolute top-2 left-2 text-xs text-gray-600">Lorem Ipsum</div>
                                            <div className="mt-6 h-16 bg-gradient-to-br from-slate-600 to-slate-800 rounded-xl relative">
                                                {/* Mini play button */}
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-6 h-6 bg-white/80 rounded-full flex items-center justify-center">
                                                        <div className="w-0 h-0 border-l-[4px] border-l-gray-600 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent ml-0.5"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-2 text-xs text-gray-600">
                                                {index === 0 ? "Calm & Mindful Music for Better Sleep" : "Lorem Ipsum"}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Phone notch */}
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl"></div>
                        </div>
                    </div>

                    {/* Right Content - Text and Features */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight text-gray-900">
                                Get <span className="text-teal-400">Better</span> Sleep<br />
                                Now With <span className="text-teal-400">Us!</span>
                            </h2>
                        </div>

                        {/* Stats Section */}
                        <div className="space-y-6">
                            <div>
                                <div className="grid grid-cols-4">
                                  <div>
                                    <div className="text-sm text-black-400">Sound</div>
                                    <div className="text-2xl font-bold text-black-400">99+</div>
                                  </div>
                                  <div className='col-span-3 text-center'>
                                    <div className="text-sm text-gray-400">Need of about 100 people</div>
                                    <div className="text-2xl font-bold text-purple-400">Calm & Mindful Sleep</div>
                                  </div>
                                </div>
                            </div>

                            <div className="border-b border-gray-200 my-4"></div>
                                 <div>
                                <div className="grid grid-cols-4">
                                  <div>
                                    <div className="text-sm text-black-400">Sound</div>
                                    <div className="text-2xl font-bold text-black-400">99+</div>
                                  </div>
                                  <div className='col-span-3 text-center'>
                                    <div className="text-sm text-gray-400">Need of about 100 people</div>
                                    <div className="text-2xl font-bold text-purple-400">Calm & Mindful Sleep</div>
                                  </div>
                                </div>
                            </div>

                            <div className="border-b border-gray-200 my-4"></div>
                        </div>

                       {/* Benefits */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-teal-400 rounded-full p-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">Increase Muscle and Strength</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-teal-400 rounded-full p-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">Be Healthier than before</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-teal-400 rounded-full p-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">Increase Stamina</span>
                </div>
              </div>

                        {/* Buttons */}
             <div className="flex gap-4">
                 <Button
                     size="lg"
                     className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-4 text-lg  transition-all duration-300 transform hover:scale-105"
                 >
                     Try Now
                 </Button>
                 <Button
                     size="lg"
                     variant="ghost"
                     className="text-teal-500 hover:text-teal-600 font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300"
                 >
                     Contact us
                 </Button>
             </div>
                    </div>
                </div>
            </div>
        </section>
    );
};