  
import React from 'react';
import { ArrowRight } from 'lucide-react';
import uniqueFeaturesImage from '../../assets/images/business/UF-1.svg'
import uniqueFeaturesImage2 from '../../assets/images/business/UF-2.svg'
import uniqueFeaturesImage3 from '../../assets/images/business/UF-3.svg'

const UniqueFeatures: React.FC = () => {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto bg-gray-50">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          More <span className="text-cyan-500">Unique</span> Features
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Motivate users with benefits and positive reinforcement, and offer 
          modifications and progress tracking.
        </p>
      </div>

      {/* Features Container with Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-300 h-full hidden lg:block">
          {/* Timeline dots */}
          <div className="absolute top-0 w-4 h-4 bg-gray-300 rounded-full -translate-x-1"></div>
          <div className="absolute left-0 top-32 -translate-y-1/2">
            <div className="w-20 h-1 bg-gray-300"></div>
           </div>

          <div className="absolute right-0 top-64 -translate-y-1/2">
            <div className="absolute right-0 top-96 w-20 h-1 bg-gray-300"></div>
           </div>
           
           <div className="absolute left-0 bottom-80 -translate-y-1/2">
            <div className="w-20 h-1 bg-gray-300"></div>
           </div>

          
          <div className="absolute bottom-0 w-4 h-4 bg-gray-400 rounded-full -translate-x-1/2"></div>
        </div>

        {/* Feature 1 - Work out at home */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mb-24">
          {/* Text Content */}
          <div className="flex-1 space-y-6 lg:pr-8">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Work out at home for free.
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed max-w-md">
              We believe fitness should be accessible to everyone, everywhere, regardless of income 
              or access to a gym. With hundreds of professional workouts, healthy recipes and 
              informative articles, as well as one of the most positive communities on the web, you'll 
              have everything you need to reach your personal fitness goals – for free!
            </p>
            <button className="text-cyan-500 hover:text-cyan-600 font-semibold text-base flex items-center gap-2 transition-colors">
              See More <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Phone Mockup with Background */}
          <div className="flex-1 relative">
           
              <img src={uniqueFeaturesImage}  alt="" />
              
          </div>
        </div>

        {/* Feature 2 - Get more with low-cost */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-12 mb-24">
          {/* Text Content */}
          <div className="flex-1 space-y-6 lg:pl-8">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Get more with low-cost challenge and advanced features.
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed max-w-md">
              We believe fitness should be accessible to everyone, everywhere, regardless of income 
              or access to a gym. With hundreds of professional workouts, healthy recipes and informative articles, 
              as well as one of the most positive communities on the web, you'll have everything you need to 
              reach your personal fitness goals – for free!
            </p>
            <button className="text-cyan-500 hover:text-cyan-600 font-semibold text-base flex items-center gap-2 transition-colors">
              See More <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Phone Mockup with Background */}
          <div className="flex-1 relative">
           
              {/* Background people working out */}
              <img src={uniqueFeaturesImage2}  alt="" />
            
          </div>
        </div>

        {/* Feature 3 - Training that matches */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Text Content */}
          <div className="flex-1 space-y-6 lg:pr-8">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Training that matches your pace.
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed max-w-md">
              With flexible Training Plans, Guided Workouts and advanced Insights, we'll help you reach 
              your goals on your schedule. You let us know where you're at and we'll provide the 
              coaching to take you the rest of the way.
            </p>
            <button className="text-cyan-500 hover:text-cyan-600 font-semibold text-base flex items-center gap-2 transition-colors">
              See More <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Phone Mockup with Background */}
          <div className="flex-1 relative">
            <img src={uniqueFeaturesImage3}  alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniqueFeatures;
