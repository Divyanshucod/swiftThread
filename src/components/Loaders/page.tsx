import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      <p className="mt-2 text-gray-600 text-sm font-semibold">Loading...</p>
    </div>
  );
};

export default Loader;
