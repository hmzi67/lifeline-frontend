import { Search, X } from "lucide-react";
import { useState } from "react";

export const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleClear = () => {
        setSearchTerm('');
    };

    return (
        <div className="relative sm:w-full sm:max-w-md mx-auto">
            <div className={`
                relative flex items-center 
                bg-white border-2 rounded-xl 
                transition-all duration-300 ease-in-out
                shadow-sm hover:shadow-md
                ${isFocused 
                    ? 'border-primary-500 shadow-lg  scale-[1.02]' 
                    : 'border-gray-200 hover:border-gray-300'
                }
            `}>
                {/* Search Icon */}
                <div className="pl-4 pr-3">
                    <Search 
                        className={`
                            w-5 h-5 transition-colors duration-200
                            ${isFocused ? 'text-primary-500' : 'text-gray-400'}
                        `} 
                    />
                </div>

                {/* Input Field */}
                <input
                    type="text"
                    placeholder="Search for anything..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="
                        flex-1 py-3 pr-12 
                        bg-transparent 
                        text-gray-900 placeholder-gray-500
                        focus:outline-none 
                        text-sm font-medium
                    "
                />

                {/* Clear Button */}
                {searchTerm && (
                    <button
                        onClick={handleClear}
                        className="
                            absolute right-3 
                            p-1 rounded-full 
                            text-gray-400 hover:text-gray-600 
                            hover:bg-gray-100 
                            transition-all duration-200
                            focus:outline-none focus:ring-2 focus:ring-primary-500/30
                        "
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}

                {/* Animated Border */}
                <div className={`
                    absolute inset-0 rounded-xl 
                    bg-gradient-to-r from-primary-500 via-blue-500 to-purple-500
                    opacity-0 -z-10
                    transition-opacity duration-300
                    ${isFocused ? 'opacity-100' : 'opacity-0'}
                `}>
                    <div className="absolute inset-[2px] bg-white rounded-[10px]"></div>
                </div>
            </div>

            {/* Search Suggestions Placeholder */}
            {isFocused && searchTerm && (
                <div className="
                    absolute top-full left-0 right-0 mt-2 
                    bg-white border border-gray-200 rounded-xl 
                    shadow-lg shadow-gray-200/50
                    z-50 overflow-hidden
                    animate-in fade-in slide-in-from-top-2 duration-200
                ">
                    <div className="p-3 text-sm text-gray-500 border-b border-gray-100">
                        Search results for "{searchTerm}"
                    </div>
                    <div className="p-3 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer">
                        No results found
                    </div>
                </div>
            )}
        </div>
    );
};