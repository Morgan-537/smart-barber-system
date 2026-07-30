import React from "react";

const statusClasses = {
  pending: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  cancelled: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  inactive: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
  default: "bg-zinc-500/15 text-zinc-300 border-zinc-500/30",
};

const StatusBadge = ({ status = "" }) => {
  const key = status.toLowerCase();
  const classes = statusClasses[key] || statusClasses.default;

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium capitalize ${classes}`}
    >
      {status || "Unknown"}
    </span>
  );
};

export default StatusBadge;