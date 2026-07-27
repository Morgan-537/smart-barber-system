import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-zinc-800 bg-zinc-950 px-6 py-8 text-zinc-400">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <div>
          <h3 className="text-lg font-bold text-white">
            Smart Barber System
          </h3>

          <p className="mt-1 text-sm">
            Premium grooming & effortless scheduling.
          </p>
        </div>

        <nav className="flex gap-6 text-sm" aria-label="Footer Navigation">
          <Link to="/about" className="transition hover:text-white">
            About
          </Link>

          <Link to="/reviews" className="transition hover:text-white">
            Reviews
          </Link>

          <Link to="/contact" className="transition hover:text-white">
            Contact
          </Link>
        </nav>

        <p className="text-center text-xs text-zinc-500">
          &copy; {new Date().getFullYear()} Smart Barber System. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;