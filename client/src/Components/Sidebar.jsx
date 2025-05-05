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

} from "react-icons/fi";
import { IoCube } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { BiBarChartSquare } from "react-icons/bi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiSignOutFill } from "react-icons/pi";
import { RiPieChartFill } from "react-icons/ri";

export default function Sidebar() {
  const [isMasterOpen, setIsMasterOpen] = useState(true);
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const [isPrintOpen, setIsPrintOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState();
  const [selectedMainItem, setSelectedMainItem] = useState("Dashboard");

  const masterItemRoutes = {
    "Customer": "/mastercustomer",
    "Route Customer": "/route-customer",
    "Supplier": "/supplier",
    "Employee": "/employee",
    "Item": "/item",
    "Expenses": "/expenses",
    "Company expenses": "/company-expenses",
    "Other expenses": "/other-expenses",
    "Commission": "/commission",
    "Company": "/company"
  };

  const transactionItemRoutes = {
    "Purchase": "/purchase-transaction",
    "Sales": "/sales-transaction",
    "Payment In": "/payment/in",
    "Payment Out": "/payment/out",
    "Route": "/transactions/returns",
    "Cashbook": "/cashbook"
  };

  const reportItemRoutes = {
    "Purchase Report": "/purchase-report",
    "Ind.Purchase Report": "/individual-report",
    "Local Sales Report": "/localsales-report",
    "Individual Sales Report":"/individualsales",
    "Route Sales Report": "/reports/expense",
    "Trial Sales Report": "/trail"
  };

  const printItemRoutes = {
    "Individual Sales": "/print/invoice",
    "Route Sales": "/print/daily-summary",
    "Weekly Route Sales": "/print/customer-copy",
  };

  const navigate = useNavigate();
  const menuItems = [
    { label: "WhatsApp", icon: <FaWhatsapp />, path: "/whatsapp" },
    {
      label: (
        <span className="text-red-600">
          Sign Out
        </span>
      ),
      noHover: true,
      icon: <PiSignOutFill className="text-red-600" />,
      onClick: () => { /* logout logic */ }
    }
  ];

  const masterItems = Object.keys(masterItemRoutes);

  return (
    <div className="flex h-screen bg-[#F9FAFB]">
      <div className="flex flex-col min-h-screen w-full lg:w-[313px] bg-white shadow-lg rounded-[24px] p-4 lg:p-6 overflow-hidden">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
            <img src="/images/logo.jpg" alt="Company Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-lg font-semibold">Company Name</span>
        </div>

        {/* Dashboard */}
        <div
          className={`rounded-lg p-3 mb-4 flex items-center cursor-pointer transition ${selectedMainItem === "Dashboard" ? "bg-indigo-500 text-white" : "text-gray-500 hover:bg-indigo-500 hover:text-white"}`}
          onClick={() => {
            setSelectedMainItem("Dashboard");
            setIsMasterOpen(false);
            setIsTransactionOpen(false);
            setIsReportsOpen(false);
            setIsPrintOpen(false);
            navigate("/");
          }}
        >
          <span className="flex items-center gap-3">
          <RiPieChartFill /> Dashboard
          </span>
        </div>

        {/* Sidebar Sections */}
        <div className="flex flex-col gap-3 scrollbar-hide">
          {/* Master */}
          <div
            className={`rounded-lg p-3 flex items-center justify-between cursor-pointer transition ${selectedMainItem === "Master" ? "bg-indigo-500 text-white" : "text-gray-500 hover:bg-indigo-500 hover:text-white"}`}
            onClick={() => {
              setSelectedMainItem("Master");
              setIsMasterOpen(!isMasterOpen);
              setIsTransactionOpen(false);
              setIsReportsOpen(false);
              setIsPrintOpen(false);
            }}
          >
            <span className="flex items-center gap-3">
            <IoCube /> Master
            </span>
            {isMasterOpen ? <FiChevronDown /> : <FiChevronRight />}
          </div>
          {isMasterOpen && (
            <div className="flex flex-col pl-6 gap-3 text-gray-500">
              {masterItems.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 cursor-pointer transition ${selectedItem === item ? "text-indigo-500 font-bold" : "hover:text-indigo-500 hover:font-bold"}`}
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

          {/* Transactions */}
          <div
            className={`rounded-lg p-3 flex items-center justify-between cursor-pointer transition ${selectedMainItem === "Transactions" ? "bg-indigo-500 text-white" : "text-gray-500 hover:bg-indigo-500 hover:text-white"}`}
            onClick={() => {
              setSelectedMainItem("Transactions");
              setIsTransactionOpen(!isTransactionOpen);
              setIsMasterOpen(false);
              setIsReportsOpen(false);
              setIsPrintOpen(false);
            }}
          >
            <span className="flex items-center gap-3">
            <BiBarChartSquare /> Transactions
            </span>
            {isTransactionOpen ? <FiChevronDown /> : <FiChevronRight />}
          </div>
          {isTransactionOpen && (
            <div className="flex flex-col pl-6 gap-3 text-gray-500">
              {Object.keys(transactionItemRoutes).map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 cursor-pointer transition ${selectedItem === item ? "text-indigo-500 font-bold" : "hover:text-indigo-500 hover:font-bold"}`}
                  onClick={() => {
                    setSelectedItem(item);
                    navigate(transactionItemRoutes[item]);
                  }}
                >
                  <span className={`w-2.5 h-2.5 border rounded-full ${selectedItem === item ? "bg-indigo-500 border-indigo-500" : "border-gray-500"}`}></span>
                  {item}
                </div>
              ))}
            </div>
          )}

          {/* Reports */}
          <div
            className={`rounded-lg p-3 flex items-center justify-between cursor-pointer transition ${selectedMainItem === "Reports" ? "bg-indigo-500 text-white" : "text-gray-500 hover:bg-indigo-500 hover:text-white"}`}
            onClick={() => {
              setSelectedMainItem("Reports");
              setIsReportsOpen(!isReportsOpen);
              setIsMasterOpen(false);
              setIsTransactionOpen(false);
              setIsPrintOpen(false);
            }}
          >
            <span className="flex items-center gap-3">
            <IoDocumentTextOutline />Reports
            </span>
            {isReportsOpen ? <FiChevronDown /> : <FiChevronRight />}
          </div>
          {isReportsOpen && (
            <div className="flex flex-col pl-6 gap-3 text-gray-500">
              {Object.keys(reportItemRoutes).map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 cursor-pointer transition ${selectedItem === item ? "text-indigo-500 font-bold" : "hover:text-indigo-500 hover:font-bold"}`}
                  onClick={() => {
                    setSelectedItem(item);
                    navigate(reportItemRoutes[item]);
                  }}
                >
                  <span className={`w-2.5 h-2.5 border rounded-full ${selectedItem === item ? "bg-indigo-500 border-indigo-500" : "border-gray-500"}`}></span>
                  {item}
                </div>
              ))}
            </div>
          )}

          {/* Print */}
          <div
            className={`rounded-lg p-3 flex items-center justify-between cursor-pointer transition ${selectedMainItem === "Print" ? "bg-indigo-500 text-white" : "text-gray-500 hover:bg-indigo-500 hover:text-white"}`}
            onClick={() => {
              setSelectedMainItem("Print");
              setIsPrintOpen(!isPrintOpen);
              setIsMasterOpen(false);
              setIsTransactionOpen(false);
              setIsReportsOpen(false);
            }}
          >
            <span className="flex items-center gap-3">
              <FiPrinter /> Print
            </span>
            {isPrintOpen ? <FiChevronDown /> : <FiChevronRight />}
          </div>
          {isPrintOpen && (
            <div className="flex flex-col pl-6 gap-3 text-gray-500">
              {Object.keys(printItemRoutes).map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 cursor-pointer transition ${selectedItem === item ? "text-indigo-500 font-bold" : "hover:text-indigo-500 hover:font-bold"}`}
                  onClick={() => {
                    setSelectedItem(item);
                    navigate(printItemRoutes[item]);
                  }}
                >
                  <span className={`w-2.5 h-2.5 border rounded-full ${selectedItem === item ? "bg-indigo-500 border-indigo-500" : "border-gray-500"}`}></span>
                  {item}
                </div>
              ))}
            </div>
          )}

          {/* Bottom Items */}
          <div className="flex flex-col gap-3 text-gray-500">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-between cursor-pointer transition p-3 rounded-lg ${
                  selectedMainItem === item.label
                    ? "bg-indigo-500 text-white"
                    : item.noHover
                    ? ""
                    : "hover:bg-indigo-500 hover:text-white"
                }`}
                onClick={() => {
                  if (item.onClick) {
                    item.onClick();
                  } else {
                    setSelectedMainItem(item.label);
                    navigate(item.path);
                  }
                }}
              >
                <span className="flex items-center gap-3">
                  {item.icon} {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Content Goes Here */}
      </main>
    </div>
  );
}
