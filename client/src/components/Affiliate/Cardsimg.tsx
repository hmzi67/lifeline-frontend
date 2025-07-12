import React from 'react';
import ci1 from "@/assets/images/affiliatehero/cardimg1.svg";
import ci2 from "@/assets/images/affiliatehero/cardimg2.svg";
import ci3 from "@/assets/images/affiliatehero/cardimg3.svg";

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
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl text-center font-bold mb-2">{title}</h3>
          <p className="text-xl opacity-90 leading-relaxed text-center">{description}</p>
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
      imageSrc: ci1,
      imageAlt: "Woman in fitness attire smiling"
    },
    {
      title: "Promote",
      description: "Get a commission for every new user you bring",
      imageSrc: ci2,
      imageAlt: "People working out in a gym"
    },
    {
      title: "Earn",
      description: "Get a commission for every new user you bring",
      imageSrc: ci3,
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
    </div>
  );
};

export default Cardsimg;