import React, { useState } from 'react';
import { Link, useLocation } from '@remix-run/react';

interface NavBarProps {
  locale?: string;
}

const NavBar: React.FC<NavBarProps> = ({ locale = "en-US" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const changeLocale = (newLocale: string) => {
    const newPath = location.pathname.replace(locale, newLocale);
    return newPath;
  };

  return (
    <nav className="bg-gray-900 p-4 text-white shadow-md relative">
      <div className="container mx-auto flex justify-between items-center">
        <Link to={`/postlist/${locale}`} className="text-white text-2xl font-bold">
          Demo
        </Link>
        <button
          className="text-white lg:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
        <div className="hidden lg:flex lg:items-center lg:space-x-6">
          <Link to={`/postlist/${locale}`} className="text-gray-300 hover:text-white transition-colors">
            Posts
          </Link>
          <Link to={`/about`} className="text-gray-300 hover:text-white transition-colors">
            About
          </Link>
          <Link to={`/generate-animal/${locale}`} className="text-gray-300 hover:text-white transition-colors">
            Generate Animal
          </Link>
          <div className="flex space-x-4">
            {locale !== 'en-US' && (
              <Link to={changeLocale('en-US')} className="text-gray-300 hover:text-white transition-colors flex items-center">
                <span className="text-xl">🇺🇸</span>
                <span className="sr-only">EN</span>
              </Link>
            )}
            {locale !== 'fi-FI' && (
              <Link to={changeLocale('fi-FI')} className="text-gray-300 hover:text-white transition-colors flex items-center">
                <span className="text-xl">🇫🇮</span>
                <span className="sr-only">FI</span>
              </Link>
            )}
          </div>
        </div>
        {isMenuOpen && (
          <div className="absolute top-16 right-0 bg-gray-800 text-white w-48 z-50">
            <div className="flex flex-col p-4 space-y-2">
              <Link to={`/postlist/${locale}`} className="text-gray-300 hover:text-white transition-colors">
                Posts
              </Link>
              <Link to={`/about`} className="text-gray-300 hover:text-white transition-colors">
                About
              </Link>
              <Link to={`/generate-animal/${locale}`} className="text-gray-300 hover:text-white transition-colors">
                Generate Animal
              </Link>
              <div className="flex flex-col mt-4">
                {locale !== 'en-US' && (
                  <Link to={changeLocale('en-US')} className="text-gray-300 hover:text-white transition-colors flex items-center">
                    <span className="text-xl">🇺🇸</span>
                    <span className="sr-only">EN</span>
                  </Link>
                )}
                {locale !== 'fi-FI' && (
                  <Link to={changeLocale('fi-FI')} className="text-gray-300 hover:text-white transition-colors flex items-center">
                    <span className="text-xl">🇫🇮</span>
                    <span className="sr-only">FI</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
