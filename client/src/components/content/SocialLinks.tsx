import {Search} from "lucide-react";


export const SocialLinks = () => {
    return (
        <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-3">
                <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                    <Search className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center text-white hover:bg-sky-600 transition-colors">
                    <Search className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white hover:bg-pink-600 transition-colors">
                    <Search className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white hover:bg-blue-800 transition-colors">
                    <Search className="w-5 h-5" />
                </a>
            </div>
        </div>
    );
};