import React from "react";

const Input = ({
  label,
  type = "text",
  id,
  name,
  value,
  onChange,
  placeholder = "",
  error = "",
  required = false,
  disabled = false,
}) => {
  const inputId = id || name;

  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-zinc-300"
        >
          {label}
          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>
      )}

      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        autoComplete={name}
        className={`w-full rounded-lg border bg-zinc-900 px-4 py-3 text-white placeholder-zinc-500 transition focus:outline-none focus:ring-2 focus:ring-red-500 ${
          error
            ? "border-red-500"
            : "border-zinc-700 focus:border-red-500"
        } ${
          disabled
            ? "cursor-not-allowed opacity-60"
            : ""
        }`}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;