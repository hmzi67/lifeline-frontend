import React from 'react';
import { Activity } from 'lucide-react';

interface LogoProps {
    className?: string;
    showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "text-cyan-500", showText = false }) => {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {/* Fitness logo with heartbeat/activity icon */}
            <div className="relative">
                <Activity className="h-8 w-8" strokeWidth={2} />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full"></div>
            </div>
            {showText && (
                <span className="text-xl font-bold">FitApp</span>
            )}
        </div>
    );
};

export default Logo;