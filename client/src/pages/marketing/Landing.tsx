import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppDownload } from '@/components/content/AppDownload';
import {
    HeroSection,
    ReasonsSection,
    MeditationSection,
    NutritionSection,
    SleepSection,
    TestimonialsSection,
    BlogSection,
    FAQSection, ProgressSection
} from '@/components/landing';
import PaymentSuccessModal from '@/components/payment/PaymentSuccessModal';

export default function Landing() {
  const location = useLocation();
  const navigate = useNavigate();
  const locationState = location.state as { paymentSuccess?: boolean; planTitle?: string } | null;
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(!!locationState?.paymentSuccess);

  const closePaymentSuccess = () => {
    setShowPaymentSuccess(false);
    // Clear the navigation state so a refresh/back doesn't reopen the popup
    navigate(location.pathname, { replace: true, state: null });
  };

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
      <ProgressSection />
      <BlogSection />
      <FAQSection />

      <PaymentSuccessModal
        open={showPaymentSuccess}
        onClose={closePaymentSuccess}
        planTitle={locationState?.planTitle}
      />
    </div>
  );
}
