import Cardsimg from "@/components/Affiliate/Cardsimg";
import ProductShowcase from "@/components/Affiliate/ProductShowcase";
import UniqueFeatures from "@/components/business/UniqueFeatures";
import { MeditationSection } from "@/components/landing";
import AffiliateHero from "@/components/Affiliate/AffiliateHero.tsx";

export default function Affiliate() {
  return (
  <>
  < AffiliateHero />
  < MeditationSection/>
  < Cardsimg />
  < UniqueFeatures />
  < ProductShowcase/>
  </>
  
  )
}