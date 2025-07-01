import { AppDownload } from '@/components/content/AppDownload';
import {
  HeroSection,
  ReasonsSection,
  MeditationSection,
  NutritionSection,
  SleepSection,
  TestimonialsSection,
  BlogSection,
  FAQSection
} from '@/components/landing';



export default function Landing() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <div id="features">
        <ReasonsSection />
        <MeditationSection />
        <NutritionSection />
        <AppDownload isLandingPage={true} />
      </div>
      <SleepSection />
      <TestimonialsSection />
      <BlogSection />
      <FAQSection />
      
    </div>
  );
}
