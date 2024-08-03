import React from 'react';
import { Link } from '@remix-run/react';


interface NavBarProps {
    locale: string;
}

const NavBar: React.FC<NavBarProps> = ({ locale }) => {
    console.log(locale);
    return (
        <nav className="bg-gray-900 p-4 text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to={`/postlist/${locale}`} className="text-white text-2xl font-bold">
                    Demo
                </Link>
                <div className="flex items-center space-x-6">
                    <Link to={`/postlist/${locale}`} className="text-gray-300 hover:text-white transition-colors">Posts</Link>
                    <Link to={`/about`} className="text-gray-300 hover:text-white transition-colors">About</Link>
                    <Link to={`/contact`} className="text-gray-300 hover:text-white transition-colors">Contact</Link>
                    <div className="flex space-x-4">
                        {locale !== 'en-US' && (
                            <Link to={`/postlist/en-US`} className="text-gray-300 hover:text-white transition-colors flex items-center">
                                <span className="text-xl">🇺🇸</span> {/* US Flag Emoji */}
                                <span className="sr-only">EN</span>
                            </Link>
                        )}
                        {locale !== 'fi-FI' && (
                            <Link to={`/postlist/fi-FI`} className="text-gray-300 hover:text-white transition-colors flex items-center">
                                <span className="text-xl">🇫🇮</span> {/* FI Flag Emoji */}
                                <span className="sr-only">FI</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
