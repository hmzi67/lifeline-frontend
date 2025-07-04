import React, { useState } from 'react';
import { Check, Download, ShoppingCart } from 'lucide-react';

// import { Button } from '../ui/button';

export const ProgressSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Weekly');

    const features = [
        'Heart Rate Tracker',
        'Steps Counter',
        'Sleep Tracking',
        'Water Intake',
        'Calories Counter'
    ];

    const weeklyData = [
        { day: 'Mon', value: 85, height: 'h-16' },
        { day: 'Tue', value: 95, height: 'h-20' },
        { day: 'Wed', value: 75, height: 'h-14' },
        { day: 'Thu', value: 90, height: 'h-18' },
        { day: 'Fri', value: 65, height: 'h-12' },
        { day: 'Sat', value: 45, height: 'h-8' },
        { day: 'Sun', value: 55, height: 'h-10' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center gap-8">

                {/* Left Side - Marketing Content */}
                <div className="flex-1 max-w-lg">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                        <span className="text-teal-400">Track</span> Your Fitness,
                        <span className="text-teal-400">See</span> Your Progress
                    </h1>

                    <div className="space-y-4 mb-8">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="w-6 h-6 bg-teal-400 rounded-full flex items-center justify-center">
                                    <Check className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-gray-600 text-lg">{feature}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <button className="bg-teal-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-500 transition-colors flex items-center gap-2">
                            <ShoppingCart className="w-5 h-5" />
                            Buy Now
                        </button>
                        <button className="text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
                            <Download className="w-5 h-5" />
                            Download App
                        </button>
                    </div>
                </div>

                {/* Right Side - Phone Mockup */}
                <div className="flex-1 flex justify-center">
                    <div className="relative">
                        {/* Phone Frame */}
                        <div className="w-80 h-[600px] bg-black rounded-[2.5rem] p-2 shadow-2xl">
                            <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden">

                                {/* Status Bar */}
                                <div className="flex justify-between items-center px-6 py-3 bg-white">
                                    <span className="text-sm font-semibold">9:41</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-4 h-2 bg-gray-300 rounded-sm"></div>
                                        <div className="w-4 h-2 bg-gray-300 rounded-sm"></div>
                                        <div className="w-4 h-2 bg-gray-900 rounded-sm"></div>
                                    </div>
                                </div>

                                {/* Header */}
                                <div className="px-6 py-4">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                            <span className="text-gray-600">←</span>
                                        </div>
                                        <h2 className="text-xl font-semibold text-gray-900">Progress</h2>
                                    </div>

                                    {/* Tabs */}
                                    <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                                        {['Weekly', 'Monthly'].map((tab) => (
                                            <button
                                                key={tab}
                                                onClick={() => setActiveTab(tab)}
                                                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                                                    activeTab === tab
                                                        ? 'bg-teal-400 text-white'
                                                        : 'text-gray-600 hover:text-gray-900'
                                                }`}
                                            >
                                                {tab}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Calories Section */}
                                    <div className="mb-6">
                                        <h3 className="text-gray-600 text-sm mb-3">Calories Intakes</h3>
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-24 h-24">
                                                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                                                    <circle
                                                        cx="50"
                                                        cy="50"
                                                        r="40"
                                                        stroke="#e5e7eb"
                                                        strokeWidth="8"
                                                        fill="none"
                                                    />
                                                    <circle
                                                        cx="50"
                                                        cy="50"
                                                        r="40"
                                                        stroke="#14b8a6"
                                                        strokeWidth="8"
                                                        fill="none"
                                                        strokeDasharray="251.2"
                                                        strokeDashoffset="75.36"
                                                        className="transition-all duration-500"
                                                    />
                                                </svg>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="text-center">
                                                        <div className="text-2xl font-bold text-gray-900">256</div>
                                                        <div className="text-xs text-gray-500">Total</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex gap-4">
                                                {[
                                                    { label: 'Protein', value: '45g', color: 'bg-orange-400' },
                                                    { label: 'Carbs', value: '45g', color: 'bg-blue-400' },
                                                    { label: 'Fat', value: '45g', color: 'bg-purple-400' }
                                                ].map((item, index) => (
                                                    <div key={index} className="text-center">
                                                        <div className={`w-3 h-3 ${item.color} rounded-full mx-auto mb-1`}></div>
                                                        <div className="text-xs text-gray-500">{item.label}</div>
                                                        <div className="text-sm font-semibold">{item.value}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Weight Section */}
                                    <div className="mb-6">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-teal-400 text-sm">💧 Current Weight</span>
                                            <span className="text-2xl font-bold">69 <span className="text-sm text-gray-500">kg</span></span>
                                        </div>
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-gray-600 text-sm">Water Intake</span>
                                            <span className="text-gray-600 text-sm">Dehydrated</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-teal-400 h-2 rounded-full w-1/3"></div>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">43%</div>
                                    </div>

                                    {/* Exercise Section */}
                                    <div>
                                        <h3 className="text-gray-600 text-sm mb-3">Exercise</h3>
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-4 h-4 bg-teal-400 rounded-full"></div>
                                            <span className="text-sm text-gray-600">Active Day</span>
                                        </div>

                                        {/* Chart */}
                                        <div className="flex items-end justify-between gap-1 h-24">
                                            {weeklyData.map((item, index) => (
                                                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                                                    <div className={`w-full ${item.height} bg-teal-400 rounded-t-sm ${index === 3 ? 'bg-teal-600' : ''}`}></div>
                                                    <span className="text-xs text-gray-500">{item.day}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
