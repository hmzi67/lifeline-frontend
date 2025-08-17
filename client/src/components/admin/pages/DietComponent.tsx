import React from 'react';
import { Package, Plus } from 'lucide-react';

const DietComponent: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl">
                            <Package className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Diet Management</h2>
                            <p className="text-gray-500">Track nutrition and meal plans</p>
                        </div>
                    </div>
                    <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                        <Plus className="w-5 h-5" />
                        <span className="font-medium">Add Meal Plan</span>
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[{ title: 'Total Calories', value: '2,450', unit: 'kcal', color: 'from-orange-100 to-red-100' }, { title: 'Protein', value: '125', unit: 'g', color: 'from-blue-100 to-cyan-100' }, { title: 'Carbs', value: '280', unit: 'g', color: 'from-yellow-100 to-orange-100' }, { title: 'Fats', value: '85', unit: 'g', color: 'from-purple-100 to-pink-100' }].map((item, index) => (
                        <div key={index} className={`bg-gradient-to-br ${item.color} rounded-xl p-6`}>
                            <h3 className="text-sm font-medium text-gray-600 mb-2">{item.title}</h3>
                            <div className="flex items-end gap-2">
                                <span className="text-3xl font-bold text-gray-900">{item.value}</span>
                                <span className="text-sm text-gray-600 mb-1">{item.unit}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Today's Meal Plan</h3>
                    <div className="space-y-4">
                        {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map((meal, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg">
                                <div>
                                    <h4 className="font-semibold text-gray-900">{meal}</h4>
                                    <p className="text-sm text-gray-500">Planned meal for today</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-lg font-bold text-gray-900">450</span>
                                    <span className="text-sm text-gray-500 ml-1">kcal</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DietComponent;
