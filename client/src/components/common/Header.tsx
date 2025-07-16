import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  // Routes that should have a transparent header
  const transparentRoutes = [
    '/',
    '/business',
    '/affiliate',
    '/pricing',
  ];

  // Check if current route should have transparent header
  const shouldBeTransparent = transparentRoutes.includes(location.pathname);

  // Handle scroll event
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 30);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'For Business', href: '/business' },
    { name: 'Fitness Band', href: '/analytics' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Blogs', href: '/blog' },
    { name: 'Affiliate Program', href: '/affiliate' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  // Dynamic classes based on page and scroll
  const getHeaderClasses = () => {
    if (shouldBeTransparent) {
      return `transition delay-150 duration-200 ease-in-out fixed w-full top-0 z-50 ${isVisible ? "bg-white shadow-sm" : "bg-transparent"}`;
    } else {
      return "fixed w-full top-0 z-50 bg-white shadow-sm";
    }
  };

  const getNavLinkClasses = (href: string) => {
    const baseClasses = "hover:text-teal-500 transition-colors duration-200 font-medium text-sm";
    const activeClasses = isActive(href) ? 'text-teal-500 font-semibold' : '';
    if (shouldBeTransparent && !isVisible) {
      return `${baseClasses} text-gray-200 hover:text-white ${activeClasses}`;
    }
    return `${baseClasses} text-gray-600 ${activeClasses}`;
  };

  const getMobileButtonClasses = () => {
    if (shouldBeTransparent && !isVisible) {
      return "lg:hidden text-gray-200 p-2";
    }
    return "lg:hidden text-gray-600 p-2";
  };

  return (
      <header className={getHeaderClasses()}>
        <nav className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img src={"/logo.svg"} alt="Lifeline Logo" className="w-16 h-16 sm:w-20 sm:h-20"/>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 ms-auto me-8">
              {navigation.map((item) => (
                  <Link
                      key={item.name}
                      to={item.href}
                      className={getNavLinkClasses(item.href)}
                  >
                    {item.name}
                  </Link>
              ))}
            </div>

            {/* CTA Button for Desktop */}
            <div className="hidden lg:flex items-center">
              <Link to="/signup">
                <Button
                    className="bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-white font-semibold px-4 py-2 sm:px-6 sm:py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-sm sm:text-base"
                >
                  Try for Free
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
                className={getMobileButtonClasses()}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                  <X className="w-6 h-6" />
              ) : (
                  <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
              <div className="lg:hidden fixed inset-0 bg-white shadow-lg z-50">
                <div className="container mx-auto px-4 sm:px-6 py-4 flex flex-col h-full">
                  <div className="flex justify-between items-center mb-4">
                    <Link to="/" className="flex items-center space-x-3">
                      <img src={"/logo.svg"} alt="Lifeline Logo" className="w-16 h-16"/>
                    </Link>
                    <button
                        className="text-gray-600 p-2"
                        onClick={() => setIsMenuOpen(false)}
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="flex flex-col space-y-3 flex-grow items-start">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            className="text-gray-600 hover:text-teal-500 transition-colors duration-200 font-medium py-2 text-lg"
                            onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                    ))}
                  </div>
                  <div className="w-full pt-3">
                    <Link to="/signup" className="w-full" onClick={() => setIsMenuOpen(false)}>
                      <Button
                          className="w-full bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-white font-semibold rounded-full py-3 text-base"
                      >
                        Try for Free
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
          )}
        </nav>
      </header>
  );
}
