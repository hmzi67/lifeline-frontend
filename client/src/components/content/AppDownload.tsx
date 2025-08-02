// Responsive AppDownload Component
import AppImage from '../../assets/images/blogs/fitnessAppImage.svg';
import LandingAppImage from '../../assets/images/landing/appDownloadImg.webp';
import AppBgImage from '../../assets/images/landing/appDownloadBgImg.svg';

export const AppDownload = ({ isLandingPage = false }) => {
    return (
        <div className="bg-gradient-to-br bg-primary my-16 md:my-28 py-12 md:py-14 flex items-center relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full relative">
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">

                    {/* Left Section */}
                    <div className="text-white space-y-6 md:space-y-8 lg:pr-8 order-2 lg:order-1">
                        <div className="space-y-4 md:space-y-6">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                {isLandingPage ? (
                                    <>
                                        <span className="block">Ready, Set, Run! The</span>
                                        <span className="block">Challenge is Live – Don't</span>
                                        <span className="block">Miss Out!</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="block">Download the most</span>
                                        <span className="block">loved fitness app</span>
                                    </>
                                )}
                            </h1>

                            <p className="text-lg md:text-xl opacity-90 max-w-md">
                                Start your fitness journey with us. Join the cult!
                            </p>
                        </div>

                        {/* App Store Buttons */}
                        <div className="flex sm:justify-start justify-center gap-3 md:gap-4">

                            {/* Google Play Button */}
                            <a
                                href="#"
                                className="bg-black flex-1 rounded-xl px-4 md:px-6 py-3 flex items-center space-x-3 justify-center cursor-pointer hover:bg-gray-800 transition-all duration-200 shadow-lg flex-shrink-0"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                                </svg>
                                <div className="text-white ">
                                    <div className="text-xs opacity-80">GET IT ON</div>
                                    <div className="text-base md:text-lg font-semibold">Google Play</div>
                                </div>
                            </a>

                            {/* App Store Button */}
                            <a
                                href="#"
                                className="bg-black flex-1 rounded-xl px-4 md:px-6 py-3 flex items-center justify-center space-x-3 cursor-pointer hover:bg-gray-800 transition-all duration-200 shadow-lg flex-shrink-0"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.19 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                                </svg>
                                <div className="text-white min-w-0">
                                    <div className="text-xs opacity-80">Download on the</div>
                                    <div className="text-base md:text-lg font-semibold">App Store</div>
                                </div>
                            </a>

                        </div>
                    </div>

                    {/* Right Section - Mobile */}
                    <div className="flex justify-center lg:hidden order-1 lg:order-2 mb-4">
                        <div className="relative w-full max-w-xs sm:max-w-sm">
                            {/* Background Image for mobile */}
                            {isLandingPage && (
                                <img
                                    src={AppBgImage}
                                    alt="App Background"
                                    className="absolute inset-0 w-full h-full object-cover opacity-20"
                                />
                            )}
                            
                            <img
                                src={isLandingPage ? LandingAppImage : AppImage}
                                alt="App Preview"
                                className="relative z-10 w-full h-auto"
                            />
                        </div>
                    </div>

                    {/* Right Section - Desktop */}
                    <div className="hidden lg:block order-2 relative">
                        <div className="relative w-full max-w-lg ml-auto">
                            {/* Background Image for desktop */}
                            {isLandingPage && (
                                <img
                                    src={AppBgImage}
                                    alt="App Background"
                                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                                />
                            )}
                            
                            <img
                                src={isLandingPage ? LandingAppImage : AppImage}
                                alt="App Preview"
                                className="relative z-10 w-full h-auto"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};