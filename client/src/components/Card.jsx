import React from "react";

const Card = ({
  title,
  subtitle,
  children,
  className = "",
}) => {
  return (
    <section
      className={`rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl ${className}`}
    >
      {title && (
        <h3 className="text-xl font-bold text-white">
          {title}
        </h3>
      )}

      {subtitle && (
        <p className="mt-2 text-sm text-zinc-400">
          {subtitle}
        </p>
      )}

      <div className={title || subtitle ? "mt-5" : ""}>
        {children}
      </div>
    </section>
  );
};

export default Card;