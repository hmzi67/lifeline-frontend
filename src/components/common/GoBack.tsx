import {ArrowLeft} from "lucide-react";
import React from "react";

interface goBackProp {
    onClick?: () => void;
}

const GoBack: React.FC<goBackProp> = ({ onClick }) => {
    return (
        <button onClick={onClick} className="absolute z-20 top-20 left-20 inline-flex items-center gap-2 rounded-2xl bg-gray-50 hover:bg-gray-200 text-gray-800 px-4 py-2 shadow transition-all duration-200">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium text-base">Back</span>
        </button>
    )
}

export default GoBack;