import { AppDownload } from "@/components/content/AppDownload";
import MissionVision from "@/components/business/MissionVision";
import UniqueFeatures from "@/components/business/UniqueFeatures";
import {TestimonialsSection} from "@/components/landing";
import {FAQSection} from "@/components/landing" ;
import AffiliateHero from "@/components/Affiliate/AffiliateHero";

export default function Business() {
  return (
  <>
  <AffiliateHero />
  <UniqueFeatures />
  <MissionVision />
  <AppDownload isLandingPage={undefined} />
  <TestimonialsSection />
  <FAQSection />
  </>

  )
}
