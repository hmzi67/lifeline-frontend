import { AppDownload } from "@/components/content/AppDownload";
import MissionVision from "@/components/business/MissionVision";
import UniqueFeatures from "@/components/business/UniqueFeatures";
import {TestimonialsSection} from "@/components/landing";
import {FAQSection} from "@/components/landing" ;
import EmployeeWellbeingLanding from "@/components/business/EmployeeWellbeingLanding";


export default function Business() {
  return (
  <>
  <EmployeeWellbeingLanding/>
  <UniqueFeatures />
  <MissionVision />
  <AppDownload isLandingPage={undefined} />
  <TestimonialsSection />
  <FAQSection />
  </>

  )
}
