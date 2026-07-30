import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#F9ECE8] text-zinc-900 flex flex-col">

      <Navbar />

      <main
        className="mx-auto w-full max-w-7xl flex-1 px-6 py-8"
        role="main"
      >
        <Outlet />
      </main>

      <Footer />

    </div>
  );
};

export default MainLayout;