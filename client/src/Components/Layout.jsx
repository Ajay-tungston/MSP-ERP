import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Search from "./Search";

const LayOut = () => {
  return (
    <div className="flex w-screen h-screen">
      {/* Sidebar with fixed width */}
      <Sidebar />

      {/* Content area */}
      <div className="flex flex-col w-full h-full bg-[#F9FAFB]">
        {/* Searchbar with fixed height */}
        <Search />

        {/* The Outlet should take up the remaining space */}
        <div className="flex-grow overflow-auto mt-5 h-fit">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayOut;
