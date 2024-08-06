import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from '@remix-run/react';

interface NavBarProps {
  locale?: string;
}

const NavBar: React.FC<NavBarProps> = ({ locale = "en-US" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const changeLocale = (newLocale: string) => {
    const newPath = location.pathname.replace(locale, newLocale);
    return newPath;
  };

  const handleLogoutClick = () => {
    setIsLoggingOut(true);
    navigate('/auth/logout');
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isMenuOpen]);

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
          <Link to={`/generate-animal/${locale}`} className="text-gray-300 hover:text-white transition-colors">
            Generate Animal
          </Link>
          <button
            onClick={handleLogoutClick}
            className="text-gray-300 hover:text-white transition-colors flex items-center"
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
            ) : (
              'Logout'
            )}
          </button>
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
          <div ref={menuRef} className="absolute top-16 right-0 bg-gray-800 text-white w-48 z-50">
            <div className="flex flex-col p-4 space-y-2">
              <Link to={`/postlist/${locale}`} className="text-gray-300 hover:text-white transition-colors">
                Posts
              </Link>
              <Link to={`/generate-animal/${locale}`} className="text-gray-300 hover:text-white transition-colors">
                Generate Animal
              </Link>
              <button
                onClick={handleLogoutClick}
                className="text-gray-300 hover:text-white transition-colors flex items-center"
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                ) : (
                  'Logout'
                )}
              </button>
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
