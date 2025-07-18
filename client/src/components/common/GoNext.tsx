import {ArrowRight} from "lucide-react";
import React from "react";

interface goBackProp {
    onClick?: () => void;
}

const GoNext: React.FC<goBackProp> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            // nline-flex items-center justify-between gap-2 rounded-full bg-gray-50 hover:bg-gray-100 text-primary font-medium border w-auto h-auto px-8 py-4 transition-all duration-200
            className="inline-flex items-center justify-between gap-2 rounded-full bg-primary hover:bg-primary-600 text-white font-medium border w-auto h-auto px-6 sm:px-8 py-3 sm:py-4 transition-all duration-200"
        >
            Continue
                <ArrowRight className="w-5 h-5" />
                
        </button>
    )
}

export default GoNext;