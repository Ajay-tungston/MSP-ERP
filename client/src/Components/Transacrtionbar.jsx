import { Search, Bell, ChevronDown } from "lucide-react";

export default function Navbar() {
  return (

      <div className="bg-shadow-md px-6 py-4 flex items-center justify-between rounded-2xl bg-white mt-10">
        {/* Left Section - Title */}
        <h1 className="text-2xl font-bold text-gray-900">Transaction</h1>

        {/* Middle Section - Search Bar */}
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search here..."
            className="w-full px-4 py-2 pl-10 bg-gray-100 text-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <span className="absolute left-3 top-2.5 text-gray-500">
            <Search className="w-5 h-5" />
          </span>
        </div>

        {/* Right Section - Notification & Profile */}
        <div className="flex items-center gap-6">
          {/* Notification Icon */}
          <div className="relative">
            <Bell className="text-yellow-500 w-6 h-6" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-2">
            <img
              src="https://via.placeholder.com/40"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-gray-900 font-medium">User Name</p>
              <p className="text-gray-500 text-sm">Admin</p>
            </div>
            <ChevronDown className="text-gray-500 w-4 h-4" />
          </div>
        </div>
      </div>

  );
}