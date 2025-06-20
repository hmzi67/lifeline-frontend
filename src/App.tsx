import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/common/Layout'
import Landing from './pages/marketing/Landing'
import Business from './pages/marketing/Business'
import { Blog } from './pages/content/Blog'
import { BlogReading } from './pages/content/BlogReading'
import Login from './pages/auth/Login'
import Dashboard from './pages/dashboard/Dashboard'
import Goals from './pages/fitness/Goals'
import Analytics from './pages/fitness/Analytics'
import Pricing from './pages/marketing/Pricing'
import Affiliate from './pages/marketing/Affiliate'
import Contact from './pages/marketing/Contact'
import Error from './pages/utility/Error'
import Signup from './pages/auth/Signup'
import Checkout from "@/pages/marketing/Checkout.tsx";
import PrivacyPolicy from './pages/legal/PrivacyPolicy'
import TermsAndConditions from './pages/legal/TermsAndConditions'
import CommingSoon from './pages/utility/CommingSoon'
import Questions from "@/pages/marketing/Questions.tsx";

function App() {

  return (

    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/business" element={<Business />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogReading />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Questions Screen */}
          <Route path={"/questions"} element={<Questions />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/analytics" element={<Analytics />} />
           <Route path="/affiliate" element={<Affiliate />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path={"/checkout"} element={<Checkout />} />
          <Route path="/error" element={<Error type={'error4'} />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/coming-soon" element={<CommingSoon />} />
          <Route path="*" element={<Error type={'error2'} />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
