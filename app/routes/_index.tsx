import { useState } from 'react';
import { LoaderFunction, json } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const loader: LoaderFunction = async () => {
  return json({});
};

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginClick = () => {
    setIsLoading(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-yellow to-green flex items-center justify-center">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Animal Generator</h1>
        <p className="mb-6 text-lg">
          Please log in to access the generator.
        </p>
        <Link to="/auth/login">
          <button 
            className="bg-green text-white py-2 px-4 rounded hover:bg-yellow"
            onClick={handleLoginClick}
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
            ) : (
              'Log In'
            )}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
