import React, { useEffect } from "react";
import { useState } from "react";
import { BsPrinter } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa6";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { format } from "date-fns";
import OvalSpinner from "../Components/spinners/OvalSpinner";
import { openPurchaseRegisterPrintPage } from "../utils/printPurchaseRegister";
import Swal from "sweetalert2";

function PurchaseReport() {
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 15;
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );

  const [toDate, setToDate] = useState(new Date().toLocaleDateString("en-CA"));
  const [purchaseData, setPurchaseData] = useState([]);
  const [totalStats, setTotalStats] = useState([]);
  const [noReports, setNoReports] = useState(false);
  const [printLoading, setPrintLoading] = useState(false);
  const axiosInstance = useAxiosPrivate();

  useEffect(() => {
    const fetchPurchases = async () => {
      setIsLoading(true);
      setNoReports(false);
      try {
        const response = await axiosInstance.get(
          `admin/purchase?page=${currentPage}&limit=${limit}&startDate=${startDate}&endDate=${toDate}`
        );
        if (response?.data?.purchaseEntries?.length === 0) {
          setNoReports(true); // Set "no reports" if no entries are found
        } else {
          setPurchaseData(response?.data);
          setTotalPages(response?.data?.totalPages);
        }
        // console.log(response);
        // setPurchaseData(response?.data);
        // setTotalPages(response?.data?.totalPages);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPurchases();
  }, [currentPage, startDate, toDate]);

  useEffect(() => {
    const fetchPurchases = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(
          `admin/purchase/totalStats?startDate=${startDate}&endDate=${toDate}`
        );
        setTotalStats(response?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPurchases();
  }, [startDate, toDate]);

  // This function fetches the print data
  const fetchPrintData = async () => {
    setPrintLoading(true);
    try {
      const response = await axiosInstance.get(
        `admin/purchase?startDate=${startDate}&endDate=${toDate}&noPagination=true`
      );
      // setPrintEntries(response?.data?.purchaseEntries || []);
      openPurchaseRegisterPrintPage(
        response?.data?.purchaseEntries,
        totalStats,
        startDate,
        toDate
      );
    } catch (error) {
      Swal.fire({
        title: "Something went wrong!",
        icon: "error",
        draggable: true,
      });
      console.error("Error fetching print data", error);
    } finally {
      setPrintLoading(false);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <>
    {printLoading && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm">
        <OvalSpinner />
      </div>
    )}
  

     
      <div className="bg-white h-auto rounded-t-2xl px-6 pt-6 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mt-10">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-slate-500 text-xl font-normal">
              <span>Reports</span>
              <FaChevronRight />
              <span>Purchase Report</span>
            </div>
            <div className="text-indigo-950 text-3xl font-bold leading-[50.40px]">
              Purchase Report
            </div>
          </div>
  
          {/* Date Inputs and Print */}
          <div className="flex flex-wrap gap-6 items-center">
            <div className="flex items-center gap-4">
              <span className="text-[#73779166] text-xl">Date Range</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-50 px-4 py-2 bg-gray-50 rounded-xl outline-none text-zinc-700 text-xl"
              />
              <span className="text-[#73779166] text-xl">to</span>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-50 px-4 py-2 bg-gray-50 rounded-xl outline-none text-zinc-700 text-xl"
              />
            </div>
            {!noReports && (
              <button
                className="px-6 py-3 bg-gray-50 rounded-xl flex items-center gap-2"
                onClick={fetchPrintData}
              >
                <BsPrinter className="w-6 h-6" />
                <span className="text-indigo-950 text-xl font-bold">Print</span>
              </button>
            )}
          </div>
        </div>
      <div className="w-full  mx-auto h-fit mb-0 relative bg-white  overflow-x-auto">
        <div className="overflow-x-auto">
          <table className="min-w-[1000px] w-full table-auto">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-lg">
                {[
                  "No.",
                  "Date",
                  "Supplier",
                  "Qty (KG)",
                  "Qty (Box)",
                  "Commision",
                  "Gross",
                  "Total",
                ].map((heading, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide text-left whitespace-nowrap"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="8" className="text-center py-10">
                    <OvalSpinner />
                  </td>
                </tr>
              ) : noReports ? (
                <tr>
                  <td colSpan="8" className="text-center text-xl font-bold text-gray-400 py-10">
                    No reports available for the selected date range.
                  </td>
                </tr>
              ) : (
                purchaseData?.purchaseEntries?.map((i, index) => (
                  <tr
                    key={i?._id}
                    className="bg-white border-b border-gray-200 text-lg"
                  >
                    <td className="px-4 py-2 text-slate-900 text-xl font-normal font-['Urbanist']">{index + 1 + (currentPage - 1) * limit}</td>
                    <td className="px-4 py-2 text-slate-900 text-xl font-normal font-['Urbanist']">
                      {i?.dateOfPurchase ? format(new Date(i.dateOfPurchase), "dd/MM/yyyy") : "-"}
                    </td>
                    <td className="px-4 py-2 text-slate-900 text-xl font-normal font-['Urbanist']">
                      {i?.supplier?.supplierName}
                    </td>
                    <td className="px-4 py-2 text-slate-900 text-xl font-normal font-['Urbanist']">
                      {i?.totalKg}
                    </td>
                    <td className="px-4 py-2 text-slate-900 text-xl font-normal font-['Urbanist']">
                      {i?.totalBox}
                    </td>
                    <td className="px-4 py-2 text-slate-900 text-xl font-normal font-['Urbanist']">
                    ₹ {i?.commissionPaid?.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-slate-900 text-xl font-normal font-['Urbanist']">
                    ₹{i?.grossTotalAmount?.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-slate-900 text-xl font-normal font-['Urbanist']">
                    ₹{i?.netTotalAmount?.toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
  
        {/* Totals Row */}
        <div className="bg-[#F0FDFA] px-6 py-4 rounded-xl flex flex-wrap justify-between mt-8 border border-gray-200">
          <div className="w-full sm:w-auto font-normal">Total</div>
          <div className="text-slate-900 font-bold"> ₹{totalStats?.netTotalAmount?.toFixed(2)}</div>
        </div>
  
        {/* Summary Info */}
        <div className="w-full px-6 py-2 bg-white border-b border-gray-200 flex flex-wrap gap-y-3 justify-between items-center text-xl font-['Urbanist']">
         {[
            ["Commission", totalStats?.totalCommission?.toFixed(2)],
            ["Qty(kg)", totalStats?.totalKg],
            ["Qty(Box)", totalStats?.totalBox],
            ["Expenses", totalStats?.totalMarketFee?.toFixed(2)],
            ["Gross Total",totalStats?.grossTotalAmount?.toFixed(2)],
          ].map(([label, value], i) => (
            <div key={i} className="flex gap-2 items-center">
              <div className="text-slate-500/40">{label}</div>
              <div className="text-slate-900 font-bold">{value}</div>
            </div>
          ))}
        </div>
  
        {/* Pagination */}
        {!noReports && (
          <div className="w-full px-6 py-3 border-b border-gray-200 flex flex-wrap justify-between items-center text-xl font-['Urbanist']">
            <div className="text-slate-900">Page {currentPage} of {totalPages}</div>
            <div className="flex gap-4">
              <button
                className={`w-40 px-6 py-2 rounded-2xl outline outline-gray-300/30 ${
                  currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-blue-500"
                }`}
                onClick={handlePrevious}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className={`w-40 px-6 py-2 rounded-2xl outline outline-gray-300/30 ${
                  currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-blue-500"
                }`}
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}
  

        
      </div>
  
  </>
  
  );
}

export default PurchaseReport;
