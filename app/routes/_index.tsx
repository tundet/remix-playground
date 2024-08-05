import { LoaderFunction, json } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const loader: LoaderFunction = async () => {
  return json({});
};

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-t from-yellow to-green flex items-center justify-center">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Animal Generator</h1>
        <p className="mb-6 text-lg">
          Please log in to access the generator.
        </p>
        <Link to="/auth/login">
          <button className="bg-green text-white py-2 px-4 rounded hover:bg-yellow">
            Log In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
