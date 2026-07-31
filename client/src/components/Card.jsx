import React from "react";

const Card = ({
  title,
  subtitle,
  children,
  className = "",
}) => {
  return (
    <div
      className={`
        rounded-3xl
        border border-violet-100
        bg-[#FFFDFC]
        p-8
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-2xl
        hover:border-violet-200
        ${className}
      `}
    >
      <h3 className="text-3xl font-bold text-zinc-900">
        {title}
      </h3>

      {subtitle && (
        <p className="mt-2 text-lg text-violet-700 font-medium">
          {subtitle}
        </p>
      )}

      <div className="mt-6 text-zinc-600 leading-8">
        {children}
      </div>
    </div>
  );
};

export default Card;