import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, logout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout?.();
    navigate("/login", { replace: true });
  };

  const dashboardPath =
    user?.role === "admin"
      ? "/admin/dashboard"
      : "/customer/dashboard";

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-900 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="text-xl font-bold tracking-wider text-red-500"
        >
          SMART<span className="text-white">BARBER</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="transition hover:text-red-400">
            Home
          </Link>

          <Link to="/about" className="transition hover:text-red-400">
            About
          </Link>

          <Link to="/reviews" className="transition hover:text-red-400">
            Reviews
          </Link>

          <Link to="/contact" className="transition hover:text-red-400">
            Contact
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              <Link
                to={dashboardPath}
                className="font-semibold text-zinc-300 transition hover:text-white"
              >
                {user.full_name || "Dashboard"}
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md bg-red-600 px-4 py-2 text-sm text-white transition hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3 text-sm">
              <Link
                to="/login"
                className="rounded-md border border-zinc-700 px-4 py-2 transition hover:bg-zinc-800"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-md bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;