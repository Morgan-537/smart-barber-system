import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ links = [] }) => {
  return (
    <aside className="sticky top-0 flex h-screen w-72 flex-col border-r border-purple-900/40 bg-zinc-950 text-white shadow-2xl">
      {/* Logo */}
      <div className="border-b border-zinc-800 px-6 py-6">
        <h1 className="text-2xl font-extrabold tracking-wide">
          <span className="text-purple-400">Smart</span>{" "}
          <span className="text-amber-300">Barber</span>
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          Administration Panel
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-4 py-6">
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-amber-300"
                }`
              }
            >
              {Icon && (
                <Icon
                  size={20}
                  className="transition-transform group-hover:scale-110"
                />
              )}

              <span className="font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-zinc-800 p-5 text-center">
        <p className="text-xs text-zinc-500">
          Smart Barber System
        </p>

        <p className="mt-1 text-xs text-purple-400">
          Admin v1.0
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;