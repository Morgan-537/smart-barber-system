import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const customerNavLinks = [
  { label: "My Bookings", path: "/customer/dashboard" },
  { label: "Book Appointment", path: "/customer/book" },
  { label: "Profile Settings", path: "/customer/profile" },
  { label: "Loyalty Points", path: "/customer/loyalty" },
];

const CustomerLayout = ({ user, logout }) => {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-white">
      <Navbar user={user} logout={logout} />

      <div className="flex flex-1">
        <Sidebar links={customerNavLinks} />

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

export default CustomerLayout;