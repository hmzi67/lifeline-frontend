import { AppDownload } from "@/components/content/AppDownload";
import MissionVision from "@/components/business/MissionVision";
import UniqueFeatures from "@/components/business/UniqueFeatures"
import {TestimonialsSection} from "@/components/landing";
import {FAQSection} from "@/components/landing" ;

export default function Business() {
  return (
  <>

  <UniqueFeatures/>
  <MissionVision />
  <AppDownload />
  <TestimonialsSection />
  <FAQSection />
  </>

  )
}
