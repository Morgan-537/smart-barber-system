import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ links = [] }) => {
  return (
    <aside className="min-h-screen w-64 border-r border-zinc-800 bg-zinc-900 p-4 text-white">
      <h2 className="mb-6 px-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
        Navigation
      </h2>

      <nav className="flex flex-col gap-2" aria-label="Sidebar Navigation">
        {links.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-red-600 text-white"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;