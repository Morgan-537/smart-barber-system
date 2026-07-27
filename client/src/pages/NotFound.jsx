import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const NotFound = () => {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-8xl font-extrabold text-red-500">
        404
      </h1>

      <h2 className="mt-4 text-3xl font-bold text-white">
        Page Not Found
      </h2>

      <p className="mt-3 max-w-md text-zinc-400">
        Sorry, the page you are looking for doesn't exist or may have been moved.
      </p>

      <Link to="/" className="mt-8">
        <Button variant="primary">
          Return Home
        </Button>
      </Link>
    </section>
  );
};

export default NotFound;