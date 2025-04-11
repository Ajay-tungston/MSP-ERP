import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  FiSearch,
  FiBell,
  FiGrid,
  FiChevronDown,
  FiChevronRight,
  FiClock,
  FiPrinter,
  FiSettings,
} from "react-icons/fi";

export default function Dashboard() {
  const [isMasterOpen, setIsMasterOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState("Route Customer");
  const [selectedMainItem, setSelectedMainItem] = useState("Master");

  const masterItemRoutes = {
    "Customer": "/mastercustomer",
    "Route Customer": "/route-customer",
    "Supplier": "/supplier",
    "Employee": "/employee",
    "Item": "/item",
    "Route expenses": "/route-expense",
    "Company expenses": "/company-expenses",
    "Other expenses": "/other-expenses",
    "Commission": "/commission",
    "Company": "/company"
  };
  
  const navigate = useNavigate();
  const menuItems = [
    { label: "Transactions", icon: <FiClock /> },
    { label: "Reports", icon: <FiPrinter /> },
    { label: "Print", icon: <FiPrinter /> },
    { label: "WhatsApp", icon: <FiGrid /> },
    { label: "Settings", icon: <FiSettings /> }
  ];
  const masterItems = Object.keys(masterItemRoutes);

  return (
    <div className="flex h-screen bg-[#F9FAFB]">
      {/* Sidebar */}
      <div className="flex flex-col min-h-screen w-full lg:w-[313px] bg-white shadow-lg rounded-[24px] p-4 lg:p-6 overflow-hidden">
        {/* Company Logo */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
            <img src="/images/logo.jpg" alt="Company Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-lg font-semibold">Company Name</span>
        </div>

        {/* Dashboard Item with Extra Space */}
        <div
          className={`rounded-lg p-3 mb-4 flex items-center cursor-pointer transition ${
            selectedMainItem === "Dashboard" ? "bg-indigo-500 text-white" : "text-gray-500 hover:bg-indigo-500 hover:text-white"
          }`}
          onClick={() => setSelectedMainItem("Dashboard")}
        >
          <span className="flex items-center gap-3">
            <FiGrid /> Dashboard
          </span>
        </div>

        {/* Sidebar Content */}
        <div className="flex flex-col gap-3 overflow-y-auto scrollbar-hide h-full">
          {/* Master Section */}
          <div
            className={`rounded-lg p-3 flex items-center justify-between cursor-pointer transition ${
              selectedMainItem === "Master" ? "bg-indigo-500 text-white" : "text-gray-500 hover:bg-indigo-500 hover:text-white"
            }`}
            onClick={() => setIsMasterOpen(!isMasterOpen)}
          >
            <span className="flex items-center gap-3">
              <FiGrid /> Master
            </span>
            {isMasterOpen ? <FiChevronDown /> : <FiChevronRight />}
          </div>

          {/* Master Items */}
          {isMasterOpen && (
            <div className="flex flex-col pl-6 gap-3 text-gray-500">
              {masterItems.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 cursor-pointer transition ${
                    selectedItem === item ? "text-indigo-500 font-bold" : "hover:text-indigo-500 hover:font-bold"
                  }`}
                  onClick={() => {
                    setSelectedItem(item);
                    navigate(masterItemRoutes[item]);
                  }}
                >
                  <span className={`w-2.5 h-2.5 border rounded-full ${selectedItem === item ? "bg-indigo-500 border-indigo-500" : "border-gray-500"}`}></span>
                  {item}
                </div>
              ))}
            </div>
          )}

          {/* Sidebar Menu */}
          <div className="flex flex-col gap-3 text-gray-500 mt-6">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-between cursor-pointer transition ${
                  selectedMainItem === item.label ? "bg-indigo-500 text-white p-3 rounded-lg" : "hover:bg-indigo-500 hover:text-white p-3 rounded-lg"
                }`}
              >
                <span className="flex items-center gap-3">{item.icon} {item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Table Section */}
        
      </main>
    </div>
  );
}