import { Heart, Moon,  Play } from 'lucide-react';

const ProductShowcase = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Let's <span className="text-cyan-400">Meet</span> the Product
          </h1>
          <p className="text-gray-600 text-lg">
            LifeLine where every heartbeat counts!
          </p>
        </div>

        {/* Phone Mockups */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {/* Phone 1 - Heart Rate Monitor */}
          <div className="flex flex-col items-center">
            <div className="relative w-64 h-[520px] bg-black rounded-[3rem] p-2 shadow-2xl">
              <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                {/* Status Bar */}
                <div className="bg-gray-50 px-6 py-2 flex justify-between items-center text-xs">
                  <span className="font-medium">9:41</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 bg-gradient-to-b from-blue-50 to-white h-full">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center mr-3">
                      <Heart className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Emerson Dias</h3>
                      <p className="text-sm text-gray-500">Good Morning 👋</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
                    <p className="text-sm text-gray-600 mb-2">
                      💡 Every step brings you closer to greatness! 🌟
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Water Intake</p>
                      <p className="text-sm font-medium">2.5L</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Dehydrated</p>
                      <p className="text-sm font-medium">40%</p>
                    </div>
                  </div>
                  
                  {/* Heart Rate Circle */}
                  <div className="flex justify-center mb-6">
                    <div className="relative w-24 h-24">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="8"/>
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#06b6d4" strokeWidth="8"
                                strokeDasharray="251" strokeDashoffset="75" strokeLinecap="round"/>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-xl font-bold text-gray-800">256</div>
                          <div className="text-xs text-gray-500">Cal</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center mb-4">
                    <p className="text-xs text-gray-500">Current Weight</p>
                    <p className="text-lg font-semibold text-gray-800">65 kg</p>
                  </div>
                  
                  <div className="bg-cyan-400 rounded-2xl p-3 text-center">
                    <p className="text-white font-medium text-sm">Start</p>
                    <p className="text-white text-xs">Squad Jump Challenge</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Better Sleep</h3>
              <p className="text-gray-600 text-sm">
                Unlock our library of meditations, sleep sounds, and more.
              </p>
            </div>
          </div>

          {/* Phone 2 - Sleep Tracking */}
          <div className="flex flex-col items-center">
            <div className="relative w-64 h-[520px] bg-black rounded-[3rem] p-2 shadow-2xl">
              <div className="w-full h-full bg-slate-700 rounded-[2.5rem] overflow-hidden">
                {/* Status Bar */}
                <div className="bg-slate-600 px-6 py-2 flex justify-between items-center text-xs text-white">
                  <span className="font-medium">9:41</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 h-full text-white">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold">Better Sleep</h2>
                    <Moon className="w-5 h-5" />
                  </div>
                  
                  {/* Calendar */}
                  <div className="grid grid-cols-7 gap-1 mb-6 text-xs">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                      <div key={day} className="text-center text-gray-400 py-2">{day}</div>
                    ))}
                    {[1,2,3,4,5,6,7].map(date => (
                      <div key={date} className="text-center py-2 bg-slate-600 rounded m-0.5">
                        {date}
                      </div>
                    ))}
                  </div>
                  
                  {/* Sleep Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-600 rounded-xl p-3">
                      <p className="text-xs text-gray-300 mb-1">Average Sleep</p>
                      <p className="text-lg font-bold">7h 14m</p>
                      <p className="text-xs text-gray-400">Our sleep average goes 99%</p>
                    </div>
                    <div className="bg-slate-600 rounded-xl p-3">
                      <p className="text-xs text-gray-300 mb-1">Bed Time</p>
                      <p className="text-lg font-bold">10:09 PM</p>
                      <div className="mt-2">
                        <p className="text-xs text-gray-300">Wake Up Time</p>
                        <p className="text-sm font-medium">06:05 AM</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Sleep Sounds */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-teal-600 rounded-xl p-3 flex items-center">
                      <Play className="w-4 h-4 mr-2" />
                      <div>
                        <p className="text-xs font-medium">Sleep Sounds</p>
                        <p className="text-xs text-gray-200">Ocean sounds</p>
                      </div>
                    </div>
                    <div className="bg-teal-600 rounded-xl p-3 flex items-center">
                      <Play className="w-4 h-4 mr-2" />
                      <div>
                        <p className="text-xs font-medium">Sleep Stories</p>
                        <p className="text-xs text-gray-200">Sleep Journey</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Better Sleep</h3>
              <p className="text-gray-600 text-sm">
                Unlock our library of meditations, sleep sounds, and more.
              </p>
            </div>
          </div>

          {/* Phone 3 - Progress Tracking */}
          <div className="flex flex-col items-center">
            <div className="relative w-64 h-[520px] bg-black rounded-[3rem] p-2 shadow-2xl">
              <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                {/* Status Bar */}
                <div className="bg-gray-50 px-6 py-2 flex justify-between items-center text-xs">
                  <span className="font-medium">9:41</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 h-full">
                  <h2 className="text-lg font-semibold text-gray-800 mb-6">Progress</h2>
                  
                  {/* Toggle */}
                  <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                    <button className="flex-1 bg-cyan-400 text-white rounded-md py-2 text-sm font-medium">
                      Weekly
                    </button>
                    <button className="flex-1 text-gray-600 py-2 text-sm">
                      Monthly
                    </button>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-600">Calories Intakes</p>
                  </div>
                  
                  {/* Progress Circle */}
                  <div className="flex justify-center mb-6">
                    <div className="relative w-32 h-32">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="35" fill="none" stroke="#f3f4f6" strokeWidth="6"/>
                        <circle cx="50" cy="50" r="35" fill="none" stroke="#06b6d4" strokeWidth="6"
                                strokeDasharray="220" strokeDashoffset="55" strokeLinecap="round"/>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-800">256</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-800">45g</div>
                      <div className="text-xs text-gray-500">Protein</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-800">45g</div>
                      <div className="text-xs text-gray-500">Carbs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-800">45g</div>
                      <div className="text-xs text-gray-500">Fat</div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Current Weight</span>
                      <span className="text-lg font-bold text-gray-800">69 kg</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Last Year</span>
                      <span>Difference</span>
                    </div>
                    
                    <div className="mt-2 bg-gray-100 rounded-full h-2">
                      <div className="bg-cyan-400 h-2 rounded-full" style={{width: '65%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Better Sleep</h3>
              <p className="text-gray-600 text-sm">
                Unlock our library of meditations, sleep sounds, and more.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;