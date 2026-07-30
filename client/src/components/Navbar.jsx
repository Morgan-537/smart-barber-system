import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Scissors, Bell } from "lucide-react";

import useAuth from "../hooks/useAuth";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, logout, token, isAuthenticated } = useAuth();

  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) {
      setUnreadCount(0);
      return;
    }

    const fetchNotifications = async () => {
      try {
        const authToken =
          token || localStorage.getItem("access_token");

        const response = await fetch(
          `${API_BASE}/api/notifications`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (!response.ok) return;

        const data = await response.json();

        const unread =
          (data.notifications || []).filter(
            (notification) => !notification.is_read
          ).length;

        setUnreadCount(unread);
      } catch (error) {
        console.error("Notification error:", error);
      }
    };

    fetchNotifications();

    const interval = setInterval(fetchNotifications, 10000);

    return () => clearInterval(interval);
  }, [isAuthenticated, token]);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const dashboardPath =
    user?.role === "admin"
      ? "/admin/dashboard"
      : user?.role === "barber"
      ? "/barber/dashboard"
      : "/customer/dashboard";

  return (
    <nav className="sticky top-0 z-50 border-b border-orange-100 bg-[#FFF8F3]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="rounded-full bg-red-100 p-2">
            <Scissors
              size={20}
              className="text-red-600"
            />
          </div>

          <h1 className="text-3xl font-black tracking-tight">
            <span className="text-red-600">
              SMART
            </span>

            <span className="text-zinc-900">
              BARBER
            </span>
          </h1>
        </Link>

        <div className="flex items-center gap-8 font-medium text-zinc-700">

          <Link
            to="/"
            className="transition hover:text-violet-700"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="transition hover:text-violet-700"
          >
            About
          </Link>

          <Link
            to="/reviews"
            className="transition hover:text-violet-700"
          >
            Reviews
          </Link>

          <Link
            to="/contact"
            className="transition hover:text-violet-700"
          >
            Contact
          </Link>

        </div>

        {isAuthenticated ? (

          <div className="flex items-center gap-6">

            <Link
              to={
                user?.role === "admin"
                  ? "/admin/notifications"
                  : "/customer/notifications"
              }
              className="relative text-zinc-700 transition hover:text-violet-700"
            >
              <Bell size={24} />

              {unreadCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </Link>

            <Link
              to={dashboardPath}
              className="font-semibold text-violet-700 transition hover:text-violet-900"
            >
              {user?.full_name || "Dashboard"}
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-xl bg-violet-700 px-6 py-3 text-white transition hover:bg-violet-800"
            >
              Logout
            </button>

          </div>

        ) : (

          <div className="flex gap-4">

            <Link
              to="/login"
              className="rounded-xl border border-violet-300 px-6 py-3 text-violet-700 transition hover:bg-violet-50"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-xl bg-gradient-to-r from-orange-300 to-amber-400 px-6 py-3 font-semibold text-zinc-900 shadow-md transition hover:scale-105"
            >
              Register
            </Link>

          </div>

        )}

      </div>
    </nav>
  );
};

export default Navbar;