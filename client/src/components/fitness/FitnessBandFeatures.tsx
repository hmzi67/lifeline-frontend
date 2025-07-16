// done
import FeaturesImage from "../../assets/images/fitness/features.svg";

export const FitnessBandFeatures = () => {
    const features = [
        {
            icon: <svg width="38" height="38" viewBox="0 0 52 53" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.3118 26.019C21.2066 31.9725 19.5674 35.2276 14.9382 35.9122C9.79403 36.6729 7.67442 33.2268 6.77965 27.2733C5.57614 19.262 8.40465 14.2793 12.4377 13.9584C16.1082 13.6669 19.4161 20.0664 20.3118 26.019ZM22.7138 42.5422C23.0317 45.9222 21.2046 49.0767 18.4482 49.617C15.6654 50.1614 12.4854 47.9544 11.8375 44.6211C11.1895 41.2879 13.6402 41.1111 16.6434 40.5373C19.6466 39.9635 22.3299 38.4654 22.7138 42.5422ZM31.6868 16.2679C30.7921 22.2215 32.4313 25.4766 37.0595 26.1611C42.2046 26.9218 44.3232 23.4758 45.218 17.5222C46.4225 9.50997 43.593 4.49989 39.561 4.20739C35.8641 3.93927 32.5826 10.3143 31.6868 16.2679ZM29.2849 32.7922C28.967 36.1711 30.7941 39.3267 33.5505 39.867C36.3333 40.4114 39.5132 38.2044 40.1612 34.8711C40.8092 31.5379 38.3585 31.3611 35.3553 30.7863C32.3521 30.2115 29.6688 28.7144 29.2849 32.7922Z" stroke="#3EC6C9" strokeWidth="3" strokeMiterlimit="10"/></svg>,
            title: "Your Daily Step Counter",
            description: "Lorem ipsum is a dummy data simply used for type within and type setting."
        },
        {
            icon: <svg width="38" height="38" viewBox="0 0 52 53" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.18732 27.3868C8.33063 26.5358 7.65189 25.5228 7.19063 24.4068C6.72937 23.2909 6.49482 22.0943 6.50065 20.8868C6.50065 18.4446 7.47081 16.1024 9.19771 14.3755C10.9246 12.6486 13.2668 11.6784 15.709 11.6784C19.1323 11.6784 22.1223 13.5418 23.704 16.3151H26.1307C26.9347 14.9047 28.0982 13.7326 29.5026 12.9181C30.907 12.1037 32.5022 11.6759 34.1257 11.6784C36.5679 11.6784 38.91 12.6486 40.6369 14.3755C42.3638 16.1024 43.334 18.4446 43.334 20.8868C43.334 23.4218 42.2507 25.7618 40.6473 27.3868L24.9173 43.0951L9.18732 27.3868ZM42.164 28.9251C44.2223 26.8451 45.5007 24.0284 45.5007 20.8868C45.5007 17.8699 44.3022 14.9766 42.169 12.8434C40.0358 10.7102 37.1425 9.51176 34.1257 9.51176C30.334 9.51176 26.9757 11.3534 24.9173 14.2134C23.8667 12.7542 22.4833 11.5664 20.8819 10.7488C19.2804 9.93109 17.5071 9.50703 15.709 9.51176C12.6921 9.51176 9.79887 10.7102 7.66564 12.8434C5.53242 14.9766 4.33398 17.8699 4.33398 20.8868C4.33398 24.0284 5.61232 26.8451 7.67065 28.9251L24.9173 46.1718L42.164 28.9251Z" fill="#3EC6C9"/></svg>,
            title: "Tracking Your Heart Rate",
            description: "Lorem ipsum is a dummy data simply used for type within and type setting.lorem ipsum amet ipsum is dolor"
        },
        {
            icon: <svg width="38" height="38" viewBox="0 0 52 53" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.33398 28.9115H15.1673V31.0781L7.06398 41.9115H15.1673V44.0781H4.33398V41.9115L12.459 31.0781H4.33398V28.9115ZM19.5007 20.2448H30.334V22.4115L22.2307 33.2448H30.334V35.4115H19.5007V33.2448L27.6257 22.4115H19.5007V20.2448ZM34.6673 11.5781H45.5007V13.7448L37.3973 24.5781H45.5007V26.7448H34.6673V24.5781L42.7923 13.7448H34.6673V11.5781Z" fill="#3EC6C9"/></svg>,
            title: "Tracking Your Sleep",
            description: "Lorem ipsum is a dummy data simply used for type within and type setting."
        }
    ];

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
            <div className="max-w-7xl w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Left Content */}
                    <div className="space-y-6 sm:space-y-12">
                        <div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                                One App{' '}
                                <span className="text-primary">Thousands</span>
                                <br />
                                Of Features
                            </h1>
                        </div>
                        <div className="space-y-4 sm:space-y-8">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                        {feature.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Right Content - Fitness Trackers */}
                    <div className="relative flex justify-center items-center">
                        <img src={FeaturesImage} alt={'Feature'} className={'w-64 sm:w-96'} />
                    </div>
                </div>
            </div>
        </div>
    );
};
