import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
}) => {
  const baseStyles =
    "rounded-lg px-4 py-2 font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary: "bg-red-600 text-white hover:bg-red-700",
    secondary: "bg-zinc-800 text-zinc-200 hover:bg-zinc-700",
    danger: "bg-rose-700 text-white hover:bg-rose-800",
    outline: "border border-zinc-700 text-zinc-300 hover:bg-zinc-800",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
     className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

/* This is button.jsx */