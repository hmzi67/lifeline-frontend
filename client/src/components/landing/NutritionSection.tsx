import React, {
  useState,
  useEffect,
  useRef,
  type RefObject,
  useMemo,
} from "react";
import { Button } from '../ui/button';
import { Check } from 'lucide-react';
import nutritionImage from "@/assets/images/landing/nutrition-1.webp";
import { Link } from "react-router-dom";

// Optimized count-up hook with custom ref
const useCountUp = (end: number, duration: number = 2000, elementRef: RefObject<HTMLElement | null>) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          let startTime: number;

          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const value = Math.floor(easeOutQuart * end);

            setCount(prev => (prev !== value ? value : prev));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    const ref = elementRef.current;
    if (ref) observer.observe(ref);

    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [end, duration, hasStarted, elementRef]);

  return count;
};

// Reusable feature list
const FeatureList: React.FC = () => {
  const features = useMemo(() => [
    "Traditional Diet Plan",
    "Vegetarian Diet Plan",
    "Non Vegetarian Diet Plan",
  ], []);

  return (
    <>
      {features.map((feature) => (
        <div className="flex items-center space-x-3" key={feature}>
          <div className="bg-primary rounded-full p-1.5 ">
            <Check className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm md:text-base text-gray-700">{feature}</span>
        </div>
      ))}
    </>
  );
};

export const NutritionSection: React.FC = () => {
  const mobileRef = useRef<HTMLDivElement | null>(null);
  const desktopRef = useRef<HTMLDivElement | null>(null);

  const mobileCount = useCountUp(2345, 2000, mobileRef);
  const desktopCount = useCountUp(2345, 2000, desktopRef);

  return (
    <section className="pb-0 pt-8 md:pb-0 md:pt-20 ">
      <div className="container mx-auto px-4 md:px-6 py-10">
        {/* Mobile Layout */}
        <div className="block md:hidden">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 leading-tight">
              <span className="text-primary">Treating</span> Your Nutrition Like It's<br />
              Your Secret <span className="text-primary">Weapon</span>
            </h2>
          </div>

          <div className="relative mb-6">
            <img
              loading="lazy"
              src={nutritionImage}
              alt="Healthy salad bowl with fresh vegetables"
              className="w-full h-auto"
            />

            <div className="absolute left-5 top-[90%] bg-white/90 backdrop-blur-sm rounded p-4 max-w-[200px] shadow-lg">
              <h3 className="text-xs font-semibold text-black leading-tight mb-3">
                "That's The Thing About<br />
                Weight Loss:<br />
                Eat For The Body You Want,<br />
                Not For The Body You<br />
                Have."
              </h3>
              <p className="text-primary font-semibold text-xs">
                Lisa Lieberman-Wang
              </p>
            </div>

            <div className="absolute right-7 top-full transform -translate-y-1/2">
              <div ref={mobileRef} className="bg-primary px-2 text-white rounded-md text-center min-w-[100px]">
                <div className="text-3xl font-bold">
                  +{mobileCount.toLocaleString()}
                </div>
                <p className="text-sm font-medium text-center">
                  Active Users
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm mt-24 text-gray-600 leading-relaxed text-left">
              You can follow every routine, take all the right supplements, and eat on time — but if your diet habits are inconsistent, unbalanced, or filled with processed junk, your goals will always stay out of reach.
            </p>
          </div>

          <div className="space-y-3 mb-6">
            <FeatureList />
          </div>

          <div className="flex gap-3 justify-start">
            <Link to="/signup">
              <Button
                size="sm"
                className="bg-primary hover:bg-primary-600 text-white font-semibold rounded-full px-6 py-2 text-sm transition-all duration-300 transform hover:scale-105"
              >
                Try Now
              </Button>
            </Link>
            
            <Button
              size="sm"
              variant="ghost"
              className="text-primary hover:text-primary-600 font-semibold px-6 py-2 text-sm rounded-full transition-all duration-300"
            >
              Contact us
            </Button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-[240px_400px_1fr] gap-8 items-center">
          <div className="space-y-8">
            <div className="bg-transparent rounded-3xl p-4 shadow-lg">
              <h3 className="text-md font-semibold text-black leading-relaxed mt-12 mb-12">
                "That's The Thing About<br />
                Weight Loss:<br />
                Eat For The Body You Want,<br />
                Not For The Body You<br />
                Have."
              </h3>
              <p className="text-primary font-semibold text-lg mb-16">
                Lisa Lieberman-Wang
              </p>
            </div>
            <div className="bg-primary rounded-2xl">
              <div ref={desktopRef} className="text-white rounded-2xl p-4 text-center">
                <div className="text-5xl font-bold mb-1">
                  +{desktopCount.toLocaleString()}
                </div>
                <p className="text-2xl font-medium">
                  Active Users
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              loading="lazy"
              src={nutritionImage}
              alt="Healthy salad bowl with fresh vegetables"
              className="w-full h-auto"
            />
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                <span className="text-primary">Treating</span> your nutrition<br />
                like it's your <span className="text-primary">secret</span><br />
                <span className="text-primary">weapon</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                You can follow every routine, take all the right supplements,<br />
                and eat on time — but if your diet habits are inconsistent,<br />
                unbalanced, or filled with processed junk,<br /> your goals will
                always stay out of reach.
              </p>
            </div>

            <div className="space-y-3">
              <FeatureList />
            </div>

            <div className="flex gap-3">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary-600 text-white font-semibold px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105"
              >
                Try Now
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="text-primary hover:text-primary-600 font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300"
              >
                Contact us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
