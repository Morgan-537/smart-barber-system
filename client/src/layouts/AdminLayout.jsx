import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const adminNavLinks = [
  { label: "Overview", path: "/admin/dashboard" },
  { label: "Appointments", path: "/admin/appointments" },
  { label: "Inventory", path: "/admin/inventory" },
  { label: "Staff Management", path: "/admin/staff" },
  { label: "Reports", path: "/admin/reports" },
];

const AdminLayout = ({ user, logout }) => {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-white">
      <Navbar user={user} logout={logout} />

      <div className="flex flex-1">
        <Sidebar links={adminNavLinks} />

        <main
          className="flex-1 p-8"
          role="main"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;