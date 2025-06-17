import AppImage from '../../assets/images/blogs/fitnessAppImage.svg'

export const AppDownload = () => {
    return (
        <div className="bg-gradient-to-br from-cyan-400 via-teal-400 to-teal-500 my-28 py-14 flex items-center relative overflow-visible">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative">
                <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                    {/* Left Content */}
                    <div className="text-white space-y-8 lg:pr-8">
                        <div className="space-y-6">
                            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                                Download the most
                                <br />
                                loved fitness app
                            </h1>
                            <p className="text-xl opacity-90 max-w-md">
                                Start your fitness journey with us. Join the cult!
                            </p>
                        </div>

                        {/* App Store Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Google Play Store */}
                            <div className="bg-black rounded-xl px-6 py-3 flex items-center space-x-3 cursor-pointer hover:bg-gray-800 transition-all duration-200 shadow-lg">
                                <div className="text-2xl">
                                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                                    </svg>
                                </div>
                                <div className="text-white">
                                    <div className="text-xs opacity-80">GET IT ON</div>
                                    <div className="text-lg font-semibold">Google Play</div>
                                </div>
                            </div>

                            {/* App Store */}
                            <div className="bg-black rounded-xl px-6 py-3 flex items-center space-x-3 cursor-pointer hover:bg-gray-800 transition-all duration-200 shadow-lg">
                                <div className="text-2xl">
                                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.19 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                                    </svg>
                                </div>
                                <div className="text-white">
                                    <div className="text-xs opacity-80">Download on the</div>
                                    <div className="text-lg font-semibold">App Store</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Phone Mockups */}
                    <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 overflow-visible z-0">
                        <img src={AppImage} alt="App Preview" className="w-[500px] max-w-none" />
                    </div>
                </div>
            </div>
        </div>
    );
};
