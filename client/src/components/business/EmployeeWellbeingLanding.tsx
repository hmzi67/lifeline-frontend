import React from 'react';
import heroImg2 from '../../assets/images/affiliatehero/business hero.jpeg'

const EmployeeWellbeingLanding: React.FC = () => {
  return (
    <div className="h-[90vh] overflow-hidden pb-2">
      {/* Background Image */}
      <div className="absolute inset-0 aspect-[1/1] lg:aspect-[16/9]">
        <img 
          src={heroImg2}
          alt="Background" 
          className="w-full h-full object-cover object-right"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-col lg:flex-row items-center justify-between px-8 py-10 max-w-7xl mx-auto hidden sm:block ">
        {/* Left Content */}
        <div className="lg:w-1/2 text-white mb-12 lg:mb-0">
          <h1 className="text-5xl lg:text-5xl font-semibold leading-tight mt-10">
            RETHINK{' '}
            <span className="text-primary">EMPLOYEE</span>
            <br/>
          </h1>
          <h1 className="text-5xl lg:text-9xl leading-tight text mb-6">
            WELLBEING
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
            Cultivate a healthy, thriving, and unstoppable workforce with BetterMe's health transformation ecosystem
          </p>
          <button className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-600 transition-all duration-300 transform hover:scale-105">
            Get Started
          </button>
        </div>
            {/*mobile view  Content */}
        <div className="sm:hidden flex ">
           <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-8 py-10 max-w-7xl mx-auto">
        {/* Left Content */}
        <div className="lg:w-1/2 text-white mb-12 lg:mb-0">
          <h1 className="text-5xl lg:text-5xl font-semibold leading-tight mt-10">
            RETHINK{' '}
            <span className="text-primary">EMPLOYEE</span>
            <br/>
          </h1>
          <h1 className="text-5xl lg:text-9xl leading-tight text mb-6">
            WELLBEING
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
            Cultivate a healthy, thriving, and unstoppable workforce with BetterMe's health transformation ecosystem
          </p>
          <button className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-600 transition-all duration-300 transform hover:scale-105">
            Get Started
          </button>
        </div>
      </div>

        </div>
      </div>
    </div>
  );
};

export default EmployeeWellbeingLanding;