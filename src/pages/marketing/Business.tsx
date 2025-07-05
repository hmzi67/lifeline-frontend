import { AppDownload } from "@/components/content/AppDownload";
import MissionVision from "@/components/business/MissionVision";
import UniqueFeatures from "@/components/business/UniqueFeatures";
import {TestimonialsSection} from "@/components/landing";
import {FAQSection} from "@/components/landing" ;
import { MeditationSection } from "@/components/landing/MeditationSection";

export default function Business() {
  return (
  <>
  <MeditationSection />
  <UniqueFeatures />
  <MissionVision />
  <AppDownload isLandingPage={undefined} />
  <TestimonialsSection />
  <FAQSection />
  </>

  )
}
