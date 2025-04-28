import React, { useEffect } from "react";
import { useState } from "react";
import { BsPrinter } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa6";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { format } from "date-fns";
import OvalSpinner from "../Components/spinners/OvalSpinner";
import { openPurchaseRegisterPrintPage } from "../utils/printPurchaseRegister";

function PurchaseReport() {
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );

  const [toDate, setToDate] = useState(new Date().toLocaleDateString("en-CA"));
  const [purchaseData, setPurchaseData] = useState([]);
  const [totalStats, setTotalStats] = useState([]);
  const axiosInstance = useAxiosPrivate();

  useEffect(() => {
    const fetchPurchases = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(
          `admin/purchase?page=${currentPage}&limit=${limit}&startDate=${startDate}&endDate=${toDate}`
        );
        console.log(response);
        setPurchaseData(response?.data);
        setTotalPages(response?.data?.totalPages);
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
      console.error("Error fetching print data", error);
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
    <div className="h-full overflow-hidden ">
      <div className=" h-auto bg-gray-50  outline-1 outline-offset-[-1px] outline-white mt-10 overflow-hidden"></div>
      <div className="w-[1495px] h-fit mb-0 left-[359px]  absolute bg-black rounded-3xl ">
        <table className="w-[1491px] left-0 top-[108px] absolute inline-table">
          <thead>
            <tr className="px-12 py-3 bg-gray-50 border-b border-gray-200 inline-flex justify-start items-center gap-16 w-full">
              <th className="min-w-16 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">
                No.
              </th>
              <th className="min-w-32 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">
                Date
              </th>
              <th className="min-w-36 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">
                Supplier
              </th>
              <th className="min-w-24 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">
                Qty (KG)
              </th>
              <th className="min-w-24 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">
                Qty (Box)
              </th>
              <th className="min-w-24 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">
                Commision
              </th>
              <th className="min-w-32 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">
                Gross
              </th>
              <th className="min-w-32 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <OvalSpinner />
            ) : (
              purchaseData?.purchaseEntries?.map((i, index) => (
                <tr
                  key={i?._id}
                  className="px-12 py-2 bg-white border-b border-gray-200 inline-flex justify-start items-center gap-16 w-full"
                >
                  <td className="min-w-16 text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">
                    {index + 1 + (currentPage - 1) * limit}
                  </td>
                  <td className="min-w-32 text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">
                    {i?.dateOfPurchase
                      ? format(new Date(i.dateOfPurchase), "dd/MM/yyyy")
                      : "-"}
                  </td>
                  <td className="max-w-80 min-w-36 text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">
                    {i?.supplier?.supplierName}
                  </td>
                  <td className="min-w-24 text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">
                    {i?.totalKg}
                  </td>
                  <td className="min-w-24 text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">
                    {i?.totalBox}
                  </td>
                  <td className="min-w-24 text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">
                    {i?.commissionPaid?.toFixed(2)}
                  </td>
                  <td className="min-w-32 text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">
                    {i?.grossTotalAmount?.toFixed(2)}
                  </td>
                  <td className="min-w-32 text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">
                    {i?.netTotalAmount?.toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="w-[1491px] px-12 py-4 left-0 top-[722px] absolute bg-teal-50 border-b border-gray-200 inline-flex justify-start items-center gap-16">
          <div className="w-[1104px] min-w-32 justify-center text-slate-500/40 text-xl font-normal font-['Urbanist'] tracking-wide">
            Total
          </div>
          <div className="min-w-32 justify-center text-slate-900 text-xl font-bold font-['Urbanist'] tracking-wide">
            {totalStats?.netTotalAmount?.toFixed(2)}
          </div>
        </div>
        <div className="w-[1495px] px-12 py-2 left-0 top-[650px] absolute bg-white border-b border-gray-200 inline-flex justify-between items-center">
          <div className="flex justify-start items-center gap-32">
            <div className="justify-center text-slate-500/40 text-xl font-normal font-['Urbanist'] tracking-wide">
              Commission
            </div>
            <div className="justify-center text-slate-900 text-xl font-bold font-['Urbanist'] tracking-wide">
              {totalStats?.totalCommission?.toFixed(2)}
            </div>
          </div>
          <div className="flex justify-start items-center gap-32">
            <div className="justify-center text-slate-500/40 text-xl font-normal font-['Urbanist'] tracking-wide">
              Qty(kg)
            </div>
            <div className="justify-center text-slate-900 text-xl font-bold font-['Urbanist'] tracking-wide">
              {totalStats?.totalKg}
            </div>
          </div>
          <div className="flex justify-start items-center gap-32">
            <div className="justify-center text-slate-500/40 text-xl font-normal font-['Urbanist'] tracking-wide">
              Qty(Box)
            </div>
            <div className="justify-center text-slate-900 text-xl font-bold font-['Urbanist'] tracking-wide">
              {totalStats?.totalBox}
            </div>
          </div>
          <div className="flex justify-start items-center gap-32">
            <div className="justify-center text-slate-500/40 text-xl font-normal font-['Urbanist'] tracking-wide">
              Expenses
            </div>
            <div className="justify-center text-slate-900 text-xl font-bold font-['Urbanist'] tracking-wide">
              {totalStats?.totalMarketFee?.toFixed(2)}
            </div>
          </div>
          <div className="flex justify-start items-center gap-32">
            <div className="justify-center text-slate-500/40 text-xl font-normal font-['Urbanist'] tracking-wide">
              Gross Total
            </div>
            <div className="justify-center text-slate-900 text-xl font-bold font-['Urbanist'] tracking-wide">
              {totalStats?.grossTotalAmount?.toFixed(2)}
            </div>
          </div>
        </div>
        <div className="w-[1495px] px-12 py-3 left-0 top-[546px] absolute border-b border-gray-200 inline-flex justify-between items-center">
          <div className="flex justify-start items-center gap-4">
            <div className="text-center justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">
              Page {currentPage} of {totalPages}
            </div>
          </div>
          <div className="flex justify-end items-center gap-6">
            <button
              className={`w-40 px-6 py-4 bg-white rounded-2xl outline-1 outline-offset-[-1px] outline-gray-300/30 
                               flex justify-center items-center gap-3
                            ${
                              currentPage === 1
                                ? "text-gray-300 cursor-not-allowed "
                                : "text-blue-500 cursor-pointer "
                            } 
                           transition-all duration-200`}
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              <span className="text-xl font-bold font-['Urbanist']">
                Previous
              </span>
            </button>

            {/* Next Button */}
            <button
              className={`w-40 px-6 py-4 bg-white rounded-2xl outline-1 outline-offset-[-1px] outline-gray-300/30 
                              flex justify-center items-center gap-3
                              ${
                                currentPage === totalPages
                                  ? "text-gray-300 cursor-not-allowed "
                                  : "text-blue-500 cursor-pointer "
                              } 
                               transition-all duration-200`}
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              <span className="text-xl font-bold font-['Urbanist']">Next</span>
            </button>
          </div>
        </div>

        <div className="bg-white h-[100px] rounded-tl-2xl rounded-tr-2xl">
          <div className="left-[48px] top-[8px] absolute inline-flex justify-start items-center gap-3 ">
            <div className="flex items-center text-slate-500 text-xl font-normal font-['Urbanist']">
              <span>Reports</span>
              <span className="mx-2">
                <FaChevronRight />
              </span>
              <span>Purchase Report</span>
            </div>
          </div>
          <div className="left-[48px] top-[40px] absolute justify-start text-indigo-950 text-4xl font-bold font-['Urbanist'] leading-[50.40px]">
            Purchase Report
          </div>
          <div className="left-[541px] top-[3px] absolute inline-flex justify-start items-center gap-1.5">
            <div className="flex justify-start items-center gap-12">
              <div className="justify-start text-slate-500/40 text-xl font-normal font-['Urbanist']">
                Date Range
              </div>
              <div className="w-64 px-6 py-4 bg-gray-50 rounded-tl-xl rounded-tr-xl flex justify-between items-center">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-gray-50 text-zinc-700 text-xl font-normal font-['Urbanist'] w-full outline-none"
                />
              </div>

              <div className="justify-start text-slate-500/40 text-xl font-normal font-['Urbanist']">
                to
              </div>
              <div className="w-64 px-6 py-4 bg-gray-50 rounded-tl-xl rounded-tr-xl flex justify-between items-center">
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="bg-gray-50 text-zinc-700 text-xl font-normal font-['Urbanist'] w-full placeholder-zinc-300 outline-none"
                  placeholder="DD/MM/YYYY"
                />
              </div>
            </div>
            <button
              className="px-8 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-3 cursor-pointer"
              onClick={fetchPrintData}
              // disabled={loadingPrint}
            >
              <div className="w-8 h-8 flex items-center justify-center text-xl">
                <BsPrinter />
              </div>
              <div className="w-10 justify-start text-indigo-950 text-xl font-bold font-['Urbanist']">
                Print
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchaseReport;
