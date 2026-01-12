import React from 'react';
import { Plus } from 'lucide-react';

interface GenericProps {
    title: string;
    icon: React.ElementType;
    description: string;
}

const GenericComponent: React.FC<GenericProps> = ({ title, icon: Icon, description }) => (
    <div className="space-y-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl">
                        <Icon className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
                        <p className="text-gray-500">{description}</p>
                    </div>
                </div>
                <button className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    <Plus className="w-5 h-5" />
                    <span className="font-medium">Add New</span>
                </button>
            </div>
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-12 text-center">
                <Icon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">{title} Management</h3>
                <p className="text-gray-500">This section is under development. More features coming soon!</p>
            </div>
        </div>
    </div>
);

export default GenericComponent;
