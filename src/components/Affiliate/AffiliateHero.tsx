import React from 'react';

const AffiliateHero: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-teal-400 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-blue-400 rounded-full blur-lg"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-purple-400 rounded-full blur-2xl"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-6 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 leading-tight">
                Join LifeFeline's{' '}
                <span className="text-teal-400">Affiliate</span>
                <br />
                <span className="text-gray-700">Business</span> Program
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-600 max-w-lg leading-relaxed">
                Cultivate a healthy, thriving, and unstoppable workforce with 
                BetterMe's health transformation ecosystem
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-teal-400 hover:bg-teal-500 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Start Earning
              </button>
              <button className="text-teal-500 hover:text-teal-600 font-semibold px-8 py-4 rounded-lg border-2 border-transparent hover:border-teal-500 transition-all duration-300">
                Contact us
              </button>
            </div>
          </div>

          {/* Right Content - People Image */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
              {/* Simulated people with phones */}
              <div className="flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-teal-50 h-96">
                
                {/* Person 1 */}
                <div className="relative mr-4 transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                  <div className="w-32 h-32 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-24 h-24 bg-gradient-to-br from-yellow-100 to-yellow-300 rounded-full flex items-center justify-center">
                      <div className="text-2xl">👩🏼</div>
                    </div>
                  </div>
                  {/* Phone */}
                  <div className="absolute -bottom-2 -right-2 w-12 h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg shadow-md flex items-center justify-center">
                    <div className="w-8 h-12 bg-orange-300 rounded-md"></div>
                  </div>
                  {/* Excitement indicators */}
                  <div className="absolute -top-4 -left-4 text-2xl animate-bounce">🙌</div>
                </div>

                {/* Person 2 */}
                <div className="relative ml-4 transform rotate-12 hover:rotate-0 transition-transform duration-300">
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-200 to-purple-400 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-purple-300 rounded-full flex items-center justify-center">
                      <div className="text-2xl">👩🏽</div>
                    </div>
                  </div>
                  {/* Phone */}
                  <div className="absolute -bottom-2 -left-2 w-12 h-20 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg shadow-md flex items-center justify-center">
                    <div className="w-8 h-12 bg-gray-600 rounded-md"></div>
                  </div>
                  {/* Excitement indicators */}
                  <div className="absolute -top-4 -right-4 text-2xl animate-bounce delay-300">🎉</div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-teal-400 rounded-full animate-pulse"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 bg-yellow-400 rounded-full animate-pulse delay-500"></div>
            </div>

            {/* Decorative floating elements */}
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-teal-300 rounded-full opacity-30 animate-float"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-purple-300 rounded-full opacity-40 animate-float delay-1000"></div>
          </div>
        </div>
      </div>

      {/* Additional decorative elements */}
      <div className="absolute top-1/4 right-8 w-2 h-2 bg-teal-400 rounded-full animate-ping"></div>
      <div className="absolute bottom-1/3 left-8 w-3 h-3 bg-purple-400 rounded-full animate-ping delay-700"></div>
    </div>
  );
};

export default AffiliateHero;