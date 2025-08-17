import React from 'react';
import { Dumbbell, Plus, Timer, Flame } from 'lucide-react';

const ExerciseComponent: React.FC = () => (
    <div className="space-y-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-r from-red-100 to-orange-100 rounded-xl">
                        <Dumbbell className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Exercise Tracking</h2>
                        <p className="text-gray-500">Monitor workouts and fitness progress</p>
                    </div>
                </div>
                <button className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:from-red-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    <Plus className="w-5 h-5" />
                    <span className="font-medium">Add Workout</span>
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[{ title: 'Workouts This Week', value: '12', icon: Dumbbell, color: 'from-red-100 to-orange-100' }, { title: 'Average Duration', value: '45', unit: 'min', icon: Timer, color: 'from-blue-100 to-cyan-100' }, { title: 'Calories Burned', value: '3,250', unit: 'kcal', icon: Flame, color: 'from-yellow-100 to-orange-100' }].map((item, index) => (
                    <div key={index} className={`bg-gradient-to-br ${item.color} rounded-xl p-6`}>
                        <div className="flex items-center gap-3 mb-4">
                            <item.icon className="w-6 h-6 text-gray-700" />
                            <h3 className="text-sm font-medium text-gray-600">{item.title}</h3>
                        </div>
                        <div className="flex items-end gap-2">
                            <span className="text-3xl font-bold text-gray-900">{item.value}</span>
                            {item.unit && <span className="text-sm text-gray-600 mb-1">{item.unit}</span>}
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Workouts</h3>
                <div className="space-y-4">
                    {[{ name: 'Upper Body Strength', duration: '45 min', calories: '320 kcal', date: 'Today' }, { name: 'Cardio HIIT', duration: '30 min', calories: '280 kcal', date: 'Yesterday' }, { name: 'Leg Day', duration: '50 min', calories: '380 kcal', date: '2 days ago' }].map((workout, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg">
                            <div>
                                <h4 className="font-semibold text-gray-900">{workout.name}</h4>
                                <p className="text-sm text-gray-500">{workout.date}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium text-gray-900">{workout.duration}</p>
                                <p className="text-sm text-gray-500">{workout.calories}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default ExerciseComponent;
