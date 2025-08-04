import React from 'react'
import { Button } from '../ui/button';
import heroimg1 from "@/assets/images/affiliatehero/affilatehero.svg";
import heroimg2 from "@/assets/images/affiliatehero/heroimg 2.svg";



export const Herosection: React.FC = () => {

    return (
      <section className="h-[50vh] lg:h-[100vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div className="w-full h-[50vh] lg:h-[100vh] aspect-[1/1] lg:aspect-[16/9]">
            <img
              src={heroimg1}
              alt="Woman meditating with mountain view"
              className="w-full h-[50vh] lg:h-[100vh] object-cover"
            />
          </div>
          {/* Dark overlay */}
          <div className="absolute inset-0 h-[50vh] lg:h-[100vh] bg-black opacity-40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-[40vh] lg:h-[100vh] flex items-center justify-center">
          <div className="container mx-auto lg:px-12 mb-0 lg:mb-96">
            <div className="max-w-2xl">
              <h1 className="text-2xl lg:text-5xl uppercase font-bold text-white mb-4 lg:mb-6 leading-tight lg:leading-[2.5]">
                join lifeline's <span className='text-primary font-semibold'>affiliate</span><br /> <span className='text-primary font-semibold'> Business</span> program
              </h1>
              <p className="text-white text-lg lg:text-2xl mb-6 lg:mb-8">
                Cultivate a healthy, thriving, and unstoppable workforce with BetterMe's health transformation ecosystem
              </p>
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary-600 text-white font-semibold px-6 py-4 lg:px-8 lg:py-6 text-base lg:text-lg transition-all duration-300 transform hover:scale-105"
                >
                  Start Earning
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-primary hover:text-primary-600 font-semibold px-6 py-4 lg:px-8 lg:py-6 text-base lg:text-lg transition-all duration-300"
                >
                  Contact us
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Cards with Invisible Slider - Bottom Right */}
        <div className="absolute bottom-0 right-8 w-[750px] overflow-hidden z-10 hidden lg:block">
          <img src={heroimg2} alt="" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-white bg-opacity-30 rounded-full animate-pulse z-10"></div>
        <div className="absolute top-1/3 right-20 w-1.5 h-1.5 bg-white bg-opacity-40 rounded-full animate-pulse delay-75 z-10"></div>
        <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-white bg-opacity-30 rounded-full animate-pulse delay-150 z-10"></div>
      </section>


    );
};