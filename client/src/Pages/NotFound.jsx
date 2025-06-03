import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center bg-gray-100 px-4">
      <h1 className="text-7xl font-bold text-[#5D5FEF]">404</h1>
      <p className="text-2xl mt-4 text-gray-700">Page Not Found</p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-[#5D5FEF] text-white rounded-lg shadow hover:bg-[#6667cc] transition duration-300"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
