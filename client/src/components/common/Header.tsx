// done
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
                className="bg-gradient-to-r from-primary-400 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white font-semibold px-4 py-2 sm:px-6 sm:py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-sm sm:text-base"
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
            <Menu className="w-6 h-6" />
            {/*{isMenuOpen ? (*/}
            {/*  <X className="w-6 h-6" />*/}
            {/*) : (*/}
            {/*  <Menu className="w-6 h-6" />*/}
            {/*)}*/}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`} onClick={() => setIsMenuOpen(false)} />

        {/* Mobile Menu */}
        <div className={`lg:hidden fixed inset-y-0 left-0 w-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <Link to="/" className="flex items-center space-x-3" onClick={() => setIsMenuOpen(false)}>
                <img src={"/logo.svg"} alt="Lifeline Logo" className="w-12 h-12"/>
              </Link>
              <button
                className="text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col flex-grow overflow-y-auto">
              <div className="px-4 py-2">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block text-gray-700 hover:text-teal-500 hover:bg-teal-50 font-medium py-4 px-4 rounded-lg my-1 transform transition-transform ${
                      isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className={`p-4 border-t border-gray-100 transform transition-all duration-300 ${
              isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
            }`} style={{ transitionDelay: `${navigation.length * 50}ms` }}>
              <Link to="/signup" className="w-full block" onClick={() => setIsMenuOpen(false)}>
                <Button
                  className="w-full bg-gradient-to-r from-primary-400 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white font-semibold rounded-full py-3 text-base transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  Try for Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}