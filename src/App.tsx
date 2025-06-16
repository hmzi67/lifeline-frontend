import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/common/Layout'
import Landing from './pages/marketing/Landing'
import Business from './pages/marketing/Business'
import Blog from './pages/content/Blog'
import BlogReading from './pages/content/BlogReading'
import Login from './pages/auth/Login'
import Dashboard from './pages/dashboard/Dashboard'
import Goals from './pages/fitness/Goals'
import Analytics from './pages/fitness/Analytics'
import Pricing from './pages/marketing/Pricing'
import Contact from './pages/marketing/Contact'
import Error from './pages/utility/Error'
import Signup from './pages/auth/Signup'
import Checkout from "@/pages/marketing/Checkout.tsx";

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path={"/checkout"} element={<Checkout />} />
          <Route path="/error" element={<Error type={'error4'} />} />
          <Route path="*" element={<Error type={'error2'} />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
