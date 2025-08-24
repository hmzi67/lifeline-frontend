import {ArrowLeft} from "lucide-react";
import React from "react";

interface goBackProp {
    onClick?: () => void;
}

const GoBack: React.FC<goBackProp> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="inline-flex items-center justify-between gap-2 rounded-full bg-gray-50 hover:bg-gray-100 text-primary font-medium border w-auto h-auto p-3 transition-all duration-200"
        >
                <ArrowLeft className="w-6 h-6" />
        </button>
    )
}

export default GoBack;