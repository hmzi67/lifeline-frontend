import React from 'react';

import { CheckCircle } from "lucide-react";
import progressTrackerImage from "../../assets/images/landing/trackerSectionBoth.svg"
// import mobilePhoneImage from '../../assets/images/fitness/phone.svg'

import { Button } from '../ui/button';

export const ProgressSection: React.FC = () => {
    return (
        <div className={'flex items-center justify-end py-16'}>
            <div className={'me-24'}>
                <div className="max-w-lg text-center lg:text-left mb-10 lg:mb-0">
                             <h1 className="text-4xl font-bold mb-4">
                                 <span className="text-primary">Track</span> Your Fitness,
                                 <span className="text-primary">See</span> Your Progress
                             </h1>

                             <ul className="mt-6 space-y-3">
                                 {[
                                     "Heart Rate Tracker",
                                     "Steps Counter",
                                     "Sleep Tracking",
                                     "Water Intake",
                                     "Calories Counter"
                                 ].map((item) => (
                                     <li key={item} className="flex items-center text-lg">
                                         <CheckCircle className="text-primary w-5 h-5 mr-2" />
                                         {item}
                                     </li>
                                 ))}
                             </ul>

                             <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                                 <Button className="bg-primary hover:bg-primary-600 text-white px-6 py-2 rounded-2xl text-lg shadow-lg">
                                     Buy Now
                                 </Button>
                                 <button className="text-sm font-semibold hover:text-primary">
                                     Download App
                                 </button>
                             </div>
                         </div>
            </div>
            <div className={'flex items-center justify-start'}>
                {/*<img src={mobilePhoneImage} alt={''} />*/}
                <img src={progressTrackerImage} alt={''} />
            </div>
        </div>
    );
};
