import { Search, Bell, ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";
import { HiMiniUser } from "react-icons/hi2";
import { useSelector } from "react-redux";
export default function Navbar() {
  const location = useLocation();
// const userName = useSelector((state) =>state.auth.userName);
const userName = localStorage.getItem("userName")
  // Custom titles for specific routes
  const routeTitles = {
    "/": "Dashboard",
    "/mastercustomer": "Master",
    "/route-customer": "Master",
    "/supplier":"Master",
    "/expenses":"Master",
    "/commission":"Master",
    "/company":"Master",
    "/lender":"Master",
    "/pickup":"Master",
    "/purchase-transaction": "Transaction",      
    "/sales-transaction":"Transaction",                                                                                                                          
     "/sales": "Transaction",
    "/cashbook": "Transaction",
    "/purchase-report": "Reports",
    "/localsales-report": "Reports",
    "/trialsales-report":"Reports",
    "/individualsales":"Reports",
    "/trail": "Reports",
    "/individual-print":"Print",
    "/routeprint":"Print",
    "weeklyprint":"Print",
    "/item":"Master",
    "/employee":"Master",
    "/individual-report":"Reports",
    "/whatsapp":"Whatsapp",
    "/payment/in":"Transaction",
    "/payment/out":"Transaction",
    "/paymentout":"Transaction",
    "/vehicle":"Vehicle",
    "/report":"Vehicle",
    
 
  };          
console.log(location.pathname)
  const pageTitle = routeTitles[location.pathname] || "Page";

  return (
    <div className="bg-shadow-md px-6 py-4 flex items-center justify-between rounded-2xl bg-white mt-10">
      {/* Dynamic Page Title */}
      <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>

     
      {/* Notification + Profile */}
      <div className="flex items-center gap-6">
        {/* <div className="relative">
          <Bell className="text-yellow-500 w-6 h-6" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
        </div> */}

        <div className="flex items-center gap-2 ">
          <div className="bg-gray-200 rounded-full"><HiMiniUser 
            className="w-10 h-10 rounded-full text-gray-400 "
          /></div>
          
          <div>
            <p className="text-gray-900 font-medium">{userName ? userName : "User Name"}</p>
            <p className="text-gray-500 text-sm">Admin</p>
          </div>
        
        </div>
      </div>
    </div>
  );
}
