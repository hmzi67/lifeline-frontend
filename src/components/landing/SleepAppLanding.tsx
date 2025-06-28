import React, { useState, useEffect } from 'react';
import { Play, Download, Check } from 'lucide-react';

interface SoundItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  isPlaying?: boolean;
}

const SleepAppLanding: React.FC = () => {
  const [activeSound, setActiveSound] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const sounds: SoundItem[] = [
    { id: 1, title: "Lorem Ipsum", subtitle: "Calm & Mindful Music for Better Sleep", image: "🌊" },
    { id: 2, title: "Lorem Ipsum", subtitle: "Nature Sounds", image: "🏔️" },
    { id: 3, title: "Lorem Ipsum", subtitle: "Rain & Thunder", image: "⛈️" },
    { id: 4, title: "Lorem Ipsum", subtitle: "Ocean Waves", image: "🌊" },
    { id: 5, title: "Lorem Ipsum", subtitle: "Forest Ambience", image: "🌲" },
    { id: 6, title: "Lorem Ipsum", subtitle: "Calm & Mindful Music for Better Sleep", image: "🌙" }
  ];

  const heroImages = ["🌙", "🌊", "⭐", "🌲"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePlaySound = (id: number) => {
    setActiveSound(activeSound === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
      {/* Background Animation */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-40 w-32 h-32 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          
          {/* Left Side - Hero Content */}
          <div className="space-y-8">
            {/* Hero Background */}
            <div className="relative bg-gradient-to-br from-blue-800/30 to-purple-900/30 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
              <div className="text-center">
                <div className="text-8xl mb-6 transition-all duration-1000 transform hover:scale-110">
                  {heroImages[currentImageIndex]}
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 inline-block hover:bg-white/30 transition-all duration-300 cursor-pointer transform hover:scale-110">
                  <Play className="w-8 h-8 text-white" fill="white" />
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-teal-400 rounded-full p-2 animate-bounce">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-purple-400 rounded-full p-2 animate-bounce delay-1000">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>

            {/* Mobile App Preview */}
            <div className="bg-gradient-to-b from-teal-400 to-teal-600 rounded-3xl p-6 mx-auto max-w-sm shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="bg-teal-500 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-white font-semibold">Better Sleep</div>
                  <div className="w-6 h-6 bg-white/30 rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {sounds.map((sound) => (
                    <div
                      key={sound.id}
                      className={`bg-white/20 backdrop-blur-sm rounded-xl p-3 cursor-pointer transition-all duration-300 hover:bg-white/30 ${
                        activeSound === sound.id ? 'ring-2 ring-white' : ''
                      }`}
                      onClick={() => handlePlaySound(sound.id)}
                    >
                      <div className="text-2xl mb-2">{sound.image}</div>
                      <div className="text-xs text-white/90 font-medium">{sound.title}</div>
                      <div className="text-xs text-white/70 mt-1">{sound.subtitle}</div>
                      <div className="mt-2">
                        <div className="bg-white/30 rounded-full p-1 w-6 h-6 flex items-center justify-center">
                          <Play className="w-3 h-3 text-white" fill="white" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Get <span className="text-teal-400">Better</span> Sleep<br />
                Now With <span className="text-teal-400">Us!</span>
              </h1>
              
              {/* Stats */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm text-gray-300">Sounds</div>
                    <div className="text-sm text-teal-400">Need of about 100 people</div>
                  </div>
                  <div className="text-4xl font-bold">99+</div>
                  <div className="text-lg text-gray-300">Calm & Mindful Sleep</div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm text-gray-300">Stories</div>
                    <div className="text-sm text-teal-400">Need of about 100 people</div>
                  </div>
                  <div className="text-4xl font-bold">99+</div>
                  <div className="text-lg text-gray-300">Calm & Mindful Sleep</div>
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-teal-400 rounded-full p-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-300">Increase Muscle and Strength</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-teal-400 rounded-full p-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-300">Be Healthier than before</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-teal-400 rounded-full p-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-300">Increase Stamina</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex space-x-4 pt-6">
                <button className="bg-teal-400 hover:bg-teal-500 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  Try Now
                </button>
                <button className="border border-gray-400 hover:border-white text-gray-300 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Download Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SleepAppLanding;