import React from "react";
import { Outlet } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Scissors,
  CreditCard,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const adminNavLinks = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    path: "/admin/users",
    icon: Users,
  },
  {
    label: "Bookings",
    path: "/admin/bookings",
    icon: CalendarDays,
  },
  {
    label: "Services",
    path: "/admin/services",
    icon: Scissors,
  },
  {
    label: "Payments",
    path: "/admin/payments",
    icon: CreditCard,
  },
];

const AdminLayout = ({ user, logout }) => {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar links={adminNavLinks} />

      <div className="flex flex-1 flex-col">
        <Navbar user={user} logout={logout} />

        <main className="flex-1 bg-gradient-to-br from-zinc-950 via-zinc-900 to-purple-950/20 p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;