import React from 'react';

interface StepCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const StepCard: React.FC<StepCardProps> = ({ title, description, imageSrc, imageAlt }) => {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg group hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-[4/5] relative">
        <img 
          src={imageSrc} 
          alt={imageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-sm opacity-90 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

const Cardsimg: React.FC = () => {
  const steps = [
    {
      title: "Register",
      description: "Get a commission for every new user you bring",
      imageSrc: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=500&fit=crop&crop=face",
      imageAlt: "Woman in fitness attire smiling"
    },
    {
      title: "Promote",
      description: "Get a commission for every new user you bring",
      imageSrc: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop",
      imageAlt: "People working out in a gym"
    },
    {
      title: "Earn",
      description: "Get a commission for every new user you bring",
      imageSrc: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=500&fit=crop",
      imageAlt: "Person sleeping peacefully"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Let's Get Started
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Follow the following steps to get your reward by referring to a member or your colleague.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <StepCard
            key={index}
            title={step.title}
            description={step.description}
            imageSrc={step.imageSrc}
            imageAlt={step.imageAlt}
          />
        ))}
      </div>

      {/* Optional: Step indicators */}
      <div className="flex justify-center mt-12 space-x-4">
        {steps.map((_, index) => (
          <div key={index} className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className="w-12 h-0.5 bg-gray-300 ml-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cardsimg;