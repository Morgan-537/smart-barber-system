import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ user, logout }) => {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-white">
      <Navbar user={user} logout={logout} />

      <main
        className="mx-auto flex-1 w-full max-w-7xl px-6 py-8"
        role="main"
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;