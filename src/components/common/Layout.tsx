import Header from './Header'
import Footer from './Footer'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

const Layout = ({ children }: { children: ReactNode }) => {
    const location = useLocation();
    const isLandingPage = location.pathname === '/';

    // Define auth pages where header and footer should be hidden
    const authPages = ['/login', '/signup'];
    const isAuthPage = authPages.includes(location.pathname);

    return (
        <div className="min-h-screen flex flex-col">
            {!isAuthPage && <Header />}
            <main className={`flex-1 ${!isLandingPage && !isAuthPage ? 'pt-20' : ''}`}>
                {children}
            </main>
            {!isAuthPage && <Footer />}
        </div>
    )
}

export default Layout