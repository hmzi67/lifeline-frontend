import Header from './Header'
import Footer from './Footer'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

const Layout = ({ children }: { children: ReactNode }) => {
    const location = useLocation();
    const isLandingPage = location.pathname === '/';

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className={`flex-1 ${!isLandingPage ? 'pt-20' : ''}`}>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout