import React from 'react';
import heroImg from "../../assets/images/landing/hero-1.jpg"

const AffiliateHero: React.FC = () => {
  const meditationCards = [
    {
      title: "Calm & Clarity",
      subtitle: "Meditation",
      description: "For moments of overwhelm",
      duration: "10 min",
      image: "/api/placeholder/300/200"
    },
    {
      title: "Inner Peace",
      subtitle: "Meditation",
      description: "For moments when you need to reconnect with yourself",
      duration: "10 min",
      image: "/api/placeholder/300/200"
    },
    {
      title: "Balance and Focus",
      subtitle: "Meditation",
      description: "Ideal for those looking for gentle stretching",
      duration: "10 min",
      image: "/api/placeholder/300/200"
    },
    {
      title: "Evening Serenity",
      subtitle: "Meditation",
      description: "For winding down after a long day",
      duration: "15 min",
      image: "/api/placeholder/300/200"
    }
  ];

  const workoutCards = [
    {
      title: "Full Body workout",
      duration: "25 Exercises",
      type: "Advanced",
      image: "/api/placeholder/300/200"
    },
    {
      title: "Full Body workout",
      duration: "25 Exercises",
      type: "Beginner",
      image: "/api/placeholder/300/200"
    },
    {
      title: "Cardio workout",
      duration: "20 Exercises",
      type: "Intermediate",
      image: "/api/placeholder/300/200"
    }
  ];

  return (
      <div className="min-h-screen bg-gray-100 relative overflow-hidden">

        {/* Background Image */}
        <div className="absolute inset-0">
          <img
              src={heroImg}
              alt="Professional woman"
              className="w-full h-full object-cover"
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-6 pt-16 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  RETHINK <span className="text-cyan-400">EMPLOYEE</span>
                  <br />
                  <span className="text-white">WELLBEING</span>
                </h1>

                <p className="text-lg text-gray-200 max-w-lg leading-relaxed">
                  Cultivate a healthy, thriving, and unstoppable workforce with
                  BetterMe's health transformation ecosystem
                </p>

                <button className="bg-cyan-400 hover:bg-cyan-500 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all transform hover:scale-105">
                  Get Started
                </button>
              </div>
            </div>

            {/* Right Content - Mobile App Mockups */}
            <div className="relative">
              {/* Phone 1 - Meditation Cards */}
              <div className="absolute right-0 top-0 w-72 h-[600px] bg-white rounded-3xl shadow-2xl p-4 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center justify-between mb-6 px-2">
                  <button className="p-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h2 className="text-lg font-semibold">Exercise</h2>
                  <div className="w-6"></div>
                </div>

                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                  {meditationCards.map((card, index) => (
                      <div key={index} className="bg-gray-50 rounded-xl p-4 relative">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <p className="text-sm text-gray-500 mb-1">{card.subtitle}</p>
                            <h3 className="font-semibold text-gray-800 mb-2">{card.title}</h3>
                            <p className="text-sm text-gray-600">{card.description}</p>
                            <p className="text-sm text-gray-500 mt-2">Duration: {card.duration}</p>
                          </div>
                          <button className="p-2">

                          </button>
                        </div>
                        <div className="w-full h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg"></div>
                      </div>
                  ))}
                </div>
              </div>

              {/* Phone 2 - Workout Cards */}
              <div className="w-72 h-[600px] bg-white rounded-3xl shadow-2xl p-4 transform -rotate-3 hover:rotate-0 transition-transform duration-500 relative z-10">
                <div className="flex items-center justify-between mb-6 px-2">
                  <button className="p-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h2 className="text-lg font-semibold">Exercise</h2>
                  <div className="w-6"></div>
                </div>

                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                  {workoutCards.map((card, index) => (
                      <div key={index} className="relative rounded-xl overflow-hidden group">
                        <div className="h-32 bg-gradient-to-r from-cyan-400 to-blue-500 relative">
                          <div className="absolute inset-0 bg-black/20"></div>
                          <div className="absolute bottom-4 left-4 text-white">
                            <p className="text-sm font-medium">{card.type}</p>
                            <h3 className="font-semibold">{card.title}</h3>
                            <p className="text-sm opacity-90">{card.duration}</p>
                          </div>
                          <button className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">

                          </button>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
  );
};

export default AffiliateHero;