import { AppDownload } from '@/components/content/AppDownload';
import {
  HeroSection,
  ReasonsSection,
  MeditationSection,
  NutritionSection,
  ChallengeSection,
  SleepSection,
  TestimonialsSection,
  ProgressSection,
  BlogSection,
  FAQSection
} from '../../components/landing';


export default function Landing() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <div id="features">
        <ReasonsSection />
        <MeditationSection />
        <NutritionSection />
        <AppDownload />
        <ProgressSection />
      </div>
      <ChallengeSection />
      <SleepSection />
      <TestimonialsSection />
      <BlogSection />
      <FAQSection />
      
    </div>
  );
}
