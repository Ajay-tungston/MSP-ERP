import React, { useState, useEffect } from "react";
import { Printer } from "lucide-react";
import { FaChevronRight } from "react-icons/fa6";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import OvalSpinner from "../Components/spinners/OvalSpinner";
import Swal from "sweetalert2";

function VehicleReport() {
  const today = new Date().toISOString().split("T")[0];
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);
  const [vehiclePayments, setVehiclePayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(8);
  const axiosPrivate = useAxiosPrivate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = {
        from: fromDate,
        to: toDate,
        page: currentPage,
        limit,
      };

      const response = await axiosPrivate.get("/admin/vehicle/payment", { params });

      const mappedData = response.data.data.map((item) => ({
        id: item._id,
        name: item.vehicle?.vehicleName || "N/A",
        number: item.vehicle?.vehicleNo || "N/A",
        rcNo: item.vehicle?.rcNo || "N/A",
        paymentType: item.paymentType === "PaymentIn" ? "payment in" : "payment out",
        amount: item.amount,
        date: item.date,
      }));

      setVehiclePayments(mappedData);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch vehicle payments:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Fetch Data",
        text: error.response?.data?.message || "Something went wrong while fetching vehicle payments.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [fromDate, toDate, currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="p-6 bg-white rounded-md mt-10">
      {/* Breadcrumbs */}
      <div className="flex items-center text-[20px] text-gray-500 mb-1">
        Vehicle
        <FaChevronRight className="mx-2" />
        <span className="font-medium">Vehicle Report</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-[#0E0F3C] mb-4 p-2">Vehicle Report</h1>

      {/* Print Button */}
      {/* <div className="flex items-center justify-between mb-4 float-right -mt-[5%] mr-[5%]">
        <button className="flex items-center gap-1 px-4 py-2 rounded-md bg-[#F9FAFB]">
          <Printer size={16} />
          <span className="font-medium text-[#0E0F3C]">Print</span>
        </button>
      </div> */}

      {/* Date Range Inputs */}
      <div className="flex items-center gap-2 text-sm text-gray-500 float-right">
        <span>Date Range</span>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => {
            setCurrentPage(1); // reset to first page
            setFromDate(e.target.value);
          }}
          className="w-52 px-4 py-3 bg-gray-50 rounded-xl text-zinc-700 text-xl outline-none"
          max={today}
        />
        <span>to</span>
        <input
          type="date"
          value={toDate}
          onChange={(e) => {
            setCurrentPage(1); // reset to first page
            setToDate(e.target.value);
          }}
          className="w-52 px-4 py-3 bg-gray-50 rounded-xl text-zinc-700 text-xl outline-none"
          max={today}
        />
      </div>

      {/* Table */}
      <table className="w-full text-sm border rounded-md overflow-hidden mt-[6%]">
        <thead className="bg-[#F9FAFB] border-b border-gray-200">
          <tr className="text-indigo-950 text-lg font-bold">
            <th className="text-start p-3">No.</th>
            <th className="text-start p-3">Vehicle Name</th>
            <th className="text-start p-3">Vehicle No.</th>
            <th className="text-start p-3">RC No</th>
            <th className="text-start p-3">Payment type</th>
            <th className="text-start p-3">Amount</th>
          </tr>
        </thead>
        <tbody>
  {loading ? (
    <tr>
      <td colSpan="6" className="text-center p-5">
        <OvalSpinner />
      </td>
    </tr>
  ) : vehiclePayments.length > 0 ? (
    vehiclePayments.map((item, index) => (
      <tr key={item.id} className="border-b border-gray-200 text-lg text-slate-900">
        <td className="p-3">{(currentPage - 1) * limit + index + 1}</td>
        <td className="p-3">{item.name}</td>
        <td className="p-3">{item.number}</td>
        <td className="p-3">{item.rcNo}</td>
        <td className="p-3">{item.paymentType}</td>
        <td className="p-3">₹{item.amount.toFixed(2)}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6" className="text-center p-4 text-lg text-gray-500">
        No vehicle payments found.
      </td>
    </tr>
  )}
</tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center pt-6">
        <span className="text-xl text-slate-900">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex gap-4">
          <button
            className="px-6 py-2 rounded-xl border border-gray-300 disabled:opacity-50"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            <span className="text-gray-600 text-lg font-semibold">Previous</span>
          </button>
          <button
            className="px-6 py-2 rounded-xl border border-gray-300 hover:bg-gray-100"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            <span className=" text-[#4079ED] font-semibold">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default VehicleReport;
