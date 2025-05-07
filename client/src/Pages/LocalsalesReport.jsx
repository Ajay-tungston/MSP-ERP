import React, { useEffect, useState } from "react";
import { Printer } from "lucide-react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import OvalSpinner from "../Components/spinners/OvalSpinner";
import { openSalesRegisterPrintPage } from "../utils/totalSaleReport";
import Swal from "sweetalert2";

function LocalsalesReport() {
  const [salesData, setSalesData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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
      <div className="p-6 bg-white rounded-md mt-10">
        <div className="text-[20px] text-gray-500 mb-1">
          Reports &gt; <span className=" font-medium">Local Sales Report</span>
        </div>
        <h1 className="text-3xl font-bold text-[#0E0F3C] mb-4 mt-8 p-2">
          Local Sales Report
        </h1>
        {salesData?.length > 0 &&
        <div className="flex items-center justify-between mb-4 float-right -mt-[5%] mr-[5%]">
          <button
            className="flex items-center gap-1 px-4 py-2  rounded-md bg-[#F9FAFB] "
            onClick={fetchPrintData}
          >
            <Printer size={16} />
            <span className="font-medium text-[#0E0F3C]">Print</span>
          </button>
        </div>}
        <div className="flex items-center gap-2 text-sm text-gray-500 float-right ">
          <span>Date Range</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="DD/MM/YYYY"
            className="px-5 py-3  rounded-md text-sm text-gray-500  bg-[#F9FAFB]"
          />
          <span>to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="DD/MM/YYYY"
            className="px-5 py-3 rounded-md text-sm text-gray-500  bg-[#F9FAFB]"
          />
        </div>

        <table className="w-full text-sm border rounded-md overflow-hidden mt-[7%]  ">
          <thead className="bg-[#F9FAFB] text-[#0E0F3C] text-left ">
            <tr>
              <th className="p-2 py-3">No.</th>
              <th className="p-2 py-3">Customer</th>
              <th className="p-2 py-3">Qty (KG)</th>
              <th className="p-2 py-3">Qty (Box)</th>
              <th className="p-2 py-3">Total</th>
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
                  className="text-center py-10 text-xl font-bold text-gray-400"
                >
                  No more reports available for the selected date range.
                </td>
              </tr>
            ) : (
              salesData?.map((i, index) => (
                <tr key={i.id} className="border-t border-t-[#E8E8ED] ">
                  <td className="p-2 py-3 ">
                    {index + 1 + (currentPage - 1) * limit}
                  </td>
                  <td className="p-2 py-3">{i?.customerName}</td>
                  <td className="p-2 py-3">{i?.totalKg}</td>
                  <td className="p-2 py-3">{i?.totalBox}</td>
                  <td className="p-2 py-3">{i?.totalAmount?.toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {salesData?.length > 0 && (
          <>
            <div className="flex items-center justify-between mt-4 text-sm">
              <span className="text-[#0E0F3C]">
                Page {currentPage} of {totalPages}
              </span>
              <div className="space-x-4 mr-[7%]">
                <button
                  className={`${
                    currentPage === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-[#4079ED]"
                  } px-4 py-3 rounded border bg-gray-100`}
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  className={`${
                    currentPage === totalPages
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-[#4079ED]"
                  } px-4 py-3 rounded border bg-gray-100`}
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>

            <div className="mt-4 text-right bg-green-50 text-[#0E0F3C] px-6 py-3 rounded-md font-semibold text-lg">
              Grand Total: {garndTotal?.toFixed(2)}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default LocalsalesReport;
