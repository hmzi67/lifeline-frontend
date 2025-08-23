import { ArrowRight } from "lucide-react";
import React from "react";

interface GoNextProps {
    onClick?: () => void;
    loading?: boolean;
}

const GoNext: React.FC<GoNextProps> = ({ onClick, loading = false }) => {
    return (
        <button
            onClick={onClick}
            disabled={loading}
            className={`inline-flex items-center justify-between gap-2 rounded-full bg-primary hover:bg-primary-600 text-white font-medium border w-auto h-auto px-6 sm:px-8 py-3 sm:py-4 transition-all duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
        >
            {loading ? "Loading..." : "Continue"}
            <ArrowRight className="w-5 h-5" />
        </button>
    );
};

export default GoNext;
