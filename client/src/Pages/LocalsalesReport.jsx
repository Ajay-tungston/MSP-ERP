import React, { useEffect, useState } from "react";
import { BsPrinter } from "react-icons/bs";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import OvalSpinner from "../Components/spinners/OvalSpinner";
import { openSalesRegisterPrintPage } from "../utils/totalSaleReport";
import Swal from "sweetalert2";
import { FaChevronRight } from "react-icons/fa6";

function LocalsalesReport() {
  const getToday = () => new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
  const [salesData, setSalesData] = useState([]);
  const [startDate, setStartDate] = useState(getToday());
  const [endDate, setEndDate] = useState(getToday());
  const [loading, setLoading] = useState(false);
  const limit = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [garndTotal, setGrandTotal] = useState(0);
  const [printLoading, setPrintLoading] = useState(false);
  const axiosInstance = useAxiosPrivate();

  useEffect(() => {
    const fetchSalesData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/admin/sales/getAllsaleByDate?startDate=${startDate}&endDate=${endDate}&limit=${limit}&page=${currentPage}&paginate=${true}`
        );
        setSalesData(response?.data?.data);
        setTotalPages(response?.data?.totalPages);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, [currentPage, startDate, endDate]);

  useEffect(() => {
    const fetchSalesData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/admin/sales/getAllsaleByDate?startDate=${startDate}&endDate=${endDate}&limit=${limit}&page=${currentPage}&paginate=${false}`
        );
        setGrandTotal(response?.data?.grandTotalAmount);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, [startDate, endDate]);

  const fetchPrintData = async () => {
    setPrintLoading(true);
    try {
      const response = await axiosInstance.get(
        `/admin/sales/getAllsaleByDate?startDate=${startDate}&endDate=${endDate}&limit=${limit}&page=${currentPage}&paginate=${false}`
      );
      openSalesRegisterPrintPage(
        response?.data?.data,
        response?.data?.grandTotalAmount,
        startDate,
        endDate
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
      <div className="p-6 bg-white rounded-3xl  shadow-md h-full">
        <div className="flex items-center text-md text-[#737791] mb-1">
          Report
          <FaChevronRight className="mx-2" />
          <span className="font-medium ">Local Sales Report</span>
        </div>

        <h1 className="text-3xl font-bold text-[#151D48] mb-4  p-2">
          Local Sales Report
        </h1>
        {salesData?.length > 0 &&
          <div className="flex items-center justify-between mb-4 float-right -mt-[5%] mr-[5%]">
            <button
              onClick={fetchPrintData}
              className="bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-xl flex items-center gap-3"
            >
              <BsPrinter className="text-2xl text-indigo-950" />
              <span className="text-indigo-950 text-xl font-bold">Print</span>
            </button>
          </div>}
        <div className="flex items-center gap-2 text-xl text-gray-500 float-right">
          <span className="text-[#73779166] text-xl">Date Range</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value || getToday())}
            placeholder="DD/MM/YYYY"
            className="w-52 px-4 py-3 bg-gray-50 rounded-xl text-zinc-700 text-xl outline-none"

          />
          <span className=" text-[#73779166] text-xl">To</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value || getToday())}
            placeholder="DD/MM/YYYY"
            className="w-52 px-4 py-3 bg-gray-50 rounded-xl text-zinc-700 text-xl outline-none"
          />

        </div>

        <table className="w-full text-sm border rounded-md overflow-hidden mt-[6%] ">
          <thead className="bg-[#F9FAFB] border-b border-gray-200">
            <tr className="text-indigo-950 text-lg font-bold ">
              <th className="text-start p-3">No.</th>
              <th className="text-start p-3">Customer</th>
              <th className="text-start  p-3">Qty (KG)</th>
              <th className="text-start p-3">Qty (Box)</th>
              <th className="text-start  p-3">Total</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center">
                  <OvalSpinner />
                </td>
              </tr>
            ) : salesData?.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-10 text-gray-400 text-lg">
                  No more reports available for the selected date range.
                </td>
              </tr>
            ) : (
              salesData?.map((i, index) => (
                <tr key={i.id} className="border-b border-gray-200 text-xl text-slate-900">
                  <td className=" p-3 ">
                    {index + 1 + (currentPage - 1) * limit}
                  </td>
                  <td className=" p-3">{i?.customerName}</td>
                  <td className=" p-3">{i?.totalKg}</td>
                  <td className=" p-3">{i?.totalBox}</td>
                  <td className=" p-3">₹{i?.totalAmount?.toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {salesData?.length > 0 && (
          <>
            <div className="flex justify-between items-center pt-6">
              <span className="text-xl text-slate-900">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex gap-4">
                <button
                  className={`px-6 py-3 rounded-xl border ${currentPage === 1
                    ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-100"}`}
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                >
                  <span className="text-gray-600 text-lg font-semibold">Previous</span>
                </button>
                <button
                  className={`px-6 py-3 rounded-xl border border-gray-400 ${currentPage === totalPages ? " cursor-not-allowed" : "hover:bg-gray-100"}`}
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                >
                  <span className="text-blue-500 text-lg font-semibold">Next</span>
                </button>
              </div>
            </div>

            <div className="bg-[#F0FDFA] px-6 py-4  flex flex-wrap justify-between mt-8 border border-gray-200">
              Grand Total: ₹{garndTotal?.toFixed(2)}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default LocalsalesReport;
