import { Link } from "@remix-run/react";
import NavBar from "~/components/NavBar";

export default function NotFound() {
  return (
    <div className="container">
      <NavBar locale="en-US"/>
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-600 hover:underline">
        Go to Home
      </Link>
    </div>
  );
}
