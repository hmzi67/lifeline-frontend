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
  FAQSection,
  CTASection
} from '../../components/landing';

export default function Landing() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <div id="features">
        <ReasonsSection />
        <MeditationSection />
        <NutritionSection />
        <ProgressSection />
      </div>
      <ChallengeSection />
      <SleepSection />
      <TestimonialsSection />
      <BlogSection />
      <FAQSection />
      <div id="download">
        <CTASection />
      </div>
    </div>
  );
}
