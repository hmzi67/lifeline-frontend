import {FitnessBandProduct} from "@/components/fitness/FitnessBandProduct.tsx";
import {FitnessBandFeatures} from "@/components/fitness/FitnessBandFeatures.tsx";
import {TestimonialsSection} from "@/components/landing";

export default function Analytics() {
  return (
    <>
      <FitnessBandProduct />
      <FitnessBandFeatures />
      {/* Testimonials */}
      {/*  text-cyan-400 */}
      <div className={''}>
          <TestimonialsSection />
      </div>
    </>
  )
}
