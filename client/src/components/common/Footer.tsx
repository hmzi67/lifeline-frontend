import { Link } from 'react-router-dom';
import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon
} from 'lucide-react';

export default function Footer() {
  const footerLinks = [
    { name: 'About us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Blogs', href: '/blogs' }
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: LinkedinIcon, href: '#' },
    { name: 'Facebook', icon: FacebookIcon, href: '#' },
    { name: 'Twitter', icon: TwitterIcon, href: '#' }
  ];

  return (
    <footer className="bg-primary text-white">
        {/* Main Footer Content */}
        <div className="container mx-auto px-8 py-16">
          <div className={"flex md:flex-row flex-col justify-between items-center gap-x-4 mb-12"}>
            <div className="flex flex-wrap gap-x-16 gap-y-8">
              {footerLinks.map((link) => (
                  <Link
                      key={link.name}
                      to={link.href}
                      className="text-white text-xl font-medium hover:text-white/80 transition-colors"
                  >
                    {link.name}
                  </Link>
              ))}
            </div>

            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                    <a
                        key={social.name}
                        href={social.href}
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-teal-400 hover:bg-gray-100 transition-colors"
                        aria-label={social.name}
                    >
                      <Icon size={20} />
                    </a>
                );
              })}
            </div>

          </div>


          <div className={"flex items-center gap-x-4"}>
            <div className=" max-w-2xl">
              <p className="text-white text-lg leading-relaxed">
                Hello, we are Lift Media. Our goal is to translate the positive effects from
                revolutionizing how companies engage with their clients & their team.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-teal-300/50">
          <div className="container mx-auto px-8 py-6 flex flex-col md:flex-row justify-between items-center">
            {/* Logo with pulse line */}
            <div className="flex items-center mb-4 md:mb-0">
              <div className="relative">
                <img src="/logo-dark.svg" alt="Lift Media" className="w-32 h-32" />
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center mb-4 md:mb-0">
              <p className="text-white">All copyrights reserved 2025</p>
            </div>

            {/* Footer Links */}
            <div className="flex space-x-8">
              <Link to="/terms" className="text-white hover:text-white/80 transition-colors">
                Terms
              </Link>
              <Link to="/privacy" className="text-white hover:text-white/80 transition-colors">
                Privacy
              </Link>
              <Link to="/cookies" className="text-white hover:text-white/80 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
  );
}