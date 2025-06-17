import { Heart, Activity, Moon } from 'lucide-react';
import FeaturesImage from "../../assets/images/fitness/features.svg"

export const FitnessBandFeatures = () => {
    const features = [
        {
            icon: <Activity className="w-8 h-8 text-cyan-400" />,
            title: "Your Daily Step Counter",
            description: "Lorem ipsum is a dummy data simply used for type within and type setting."
        },
        {
            icon: <Heart className="w-8 h-8 text-cyan-400" />,
            title: "Tracking Your Heart Rate",
            description: "Lorem ipsum is a dummy data simply used for type within and type setting.lorem ipsum amet ipsum is dolor"
        },
        {
            icon: <Moon className="w-8 h-8 text-cyan-400" />,
            title: "Tracking Your Sleep",
            description: "Lorem ipsum is a dummy data simply used for type within and type setting."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
            <div className="max-w-7xl w-full">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div className="space-y-12">
                        <div>
                            <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                                One App{' '}
                                <span className="text-cyan-400">Thousands</span>
                                <br />
                                Of Features
                            </h1>
                        </div>

                        <div className="space-y-8">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-start space-x-6">
                                    <div className="flex-shrink-0 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                        {feature.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Content - Fitness Trackers */}
                    <div className="relative flex justify-center items-center">
                        <img src={FeaturesImage} alt={'Feature'} className={'w-96'} />
                    </div>
                </div>
            </div>
        </div>
    );
};




