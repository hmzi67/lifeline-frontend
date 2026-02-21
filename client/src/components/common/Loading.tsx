import React from 'react';

const Loading: React.FC = () => {
    return (
        // <div className="flex flex-col gap-2 items-center justify-center h-screen bg-gray-300">
        //     <LoaderCircle className="w-12 h-12 text-primary-800 animate-spin" />
        //     <p className={'text-lg text-gray-900'}>Loading</p>
        // </div>

        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading...</p>
            </div>
        </div>
    );
};

export default Loading;
