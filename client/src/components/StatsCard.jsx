import React from "react";

const StatsCard = ({ title, value, description, icon: Icon, className = "" }) => {
  return (
    <div
      className={`rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-lg ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-zinc-400">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-white">{value}</h3>
          {description && (
            <p className="mt-2 text-sm text-zinc-500">{description}</p>
          )}
        </div>

        {Icon && (
          <div className="rounded-xl bg-zinc-800 p-3 text-red-500">
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;