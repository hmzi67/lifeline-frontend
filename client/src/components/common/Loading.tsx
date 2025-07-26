import React from 'react';
import {LoaderCircle} from "lucide-react";

const Loading: React.FC = () => {
    return (
        <div className="flex flex-col gap-2 items-center justify-center h-screen bg-gray-300">
            <LoaderCircle className="w-12 h-12 text-primary-800 animate-spin" />
            <p className={'text-lg text-gray-900'}>Loading</p>
        </div>
    );
};

export default Loading;
