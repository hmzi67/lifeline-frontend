import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import './App.css';
import Layout from './components/common/Layout';
import ScrollToTop from './components/common/ScrollToTop';
import Loading from "@/components/common/Loading.tsx";
import Verify from "@/pages/auth/Verify.tsx";
import ResetPassword from "@/pages/auth/ResetPassword.tsx";

// Lazy-loaded page components
const Landing = lazy(() => import('./pages/marketing/Landing'));
const Business = lazy(() => import('./pages/marketing/Business'));
const Blog = lazy(() => import('./pages/content/Blog'));
const BlogReading = lazy(() => import('./pages/content/BlogReading'));
const Login = lazy(() => import('./pages/auth/Login'));
const Signup = lazy(() => import('./pages/auth/Signup'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const Goals = lazy(() => import('./pages/fitness/Goals'));
const Analytics = lazy(() => import('./pages/fitness/Analytics'));
const Pricing = lazy(() => import('./pages/marketing/Pricing'));
const Affiliate = lazy(() => import('./pages/marketing/Affiliate'));
const Contact = lazy(() => import('./pages/marketing/Contact'));
const Checkout = lazy(() => import('@/pages/marketing/Checkout'));
const Questions = lazy(() => import('@/pages/marketing/Questions'));
const Error = lazy(() => import('./pages/utility/Error'));
const PrivacyPolicy = lazy(() => import('./pages/legal/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/legal/TermsAndConditions'));
const CommingSoon = lazy(() => import('./pages/utility/CommingSoon'));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/business" element={<Business />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogReading />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/affiliate" element={<Affiliate />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/error" element={<Error type="error4" />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/coming-soon" element={<CommingSoon />} />
            <Route path="*" element={<Error type="error2" />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
