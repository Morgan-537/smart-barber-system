import React from "react";
import clsx from "clsx";

const Button = ({
  children,
  variant = "primary",
  type = "button",
  className = "",
  ...props
}) => {
  const styles = {
    primary:
      "bg-violet-700 text-white hover:bg-violet-800 shadow-lg shadow-violet-300/40",

    outline:
      "border border-violet-700 text-violet-700 hover:bg-violet-50",

    secondary:
      "bg-amber-300 text-zinc-900 hover:bg-amber-400",

    danger:
      "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      className={clsx(
        "rounded-xl px-8 py-3 font-semibold transition-all duration-300",
        "hover:scale-105",
        "active:scale-95",
        styles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;