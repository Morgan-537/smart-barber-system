import React from "react";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-red-600"
        aria-hidden="true"
      />

      <p className="mt-4 text-sm text-zinc-400">
        {text}
      </p>
    </div>
  );
};

export default Loader;