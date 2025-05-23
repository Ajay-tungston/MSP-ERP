import React, { useEffect, useState } from "react";
import { PiPrinterLight } from "react-icons/pi";
import { CiCirclePlus } from "react-icons/ci";
import { FaChevronRight } from "react-icons/fa6";
import AddPayment from "./AddPayment";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { format } from "date-fns";
import OvalSpinner from "../../Components/spinners/OvalSpinner";
import { openPaymentPrintPage } from "../../utils/openPaymentPrintPage";
import { FaWhatsapp } from "react-icons/fa";
import { useParams } from "react-router-dom";

function Payment() {
  const [popup, setPopup] = useState(false);
  const [paymentIndata, SetPaymentInData] = useState([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const axiosInstance = useAxiosPrivate();

  const { type } = useParams();

  const paymentType = type === "in" ? "PaymentIn" : "PaymentOut";

  const fetchPaymentData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `/admin/payment?page=${currentPage}&limit=${itemsPerPage}&paymentType=${paymentType}`
      );
      SetPaymentInData(response?.data?.payments);
      setTotalPages(response?.data?.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentData();
  }, [currentPage, paymentType]);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const fetchInduvidualPayment = async (id) => {
    try {
      const response = await axiosInstance.get(`/admin/payment/get/${id}`);
      console.log(response);
      openPaymentPrintPage(response?.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
    <div className="p-4 rounded-lg shadow-sm bg-white mt-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-x-2 text-[20px] text-gray-500 mb-4">
        <span>Transactions</span>
        <FaChevronRight />
        <span className="text-gray-700">
          {paymentType === "PaymentIn" ? "Payment In" : "Payment Out"}
        </span>
      </nav>
  
      {/* Header & Add Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {paymentType === "PaymentIn" ? "Payment In" : "Payment Out"}
        </h1>
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-lg flex items-center gap-2"
          onClick={() => setPopup(true)}
        >
          <CiCirclePlus className="text-xl" />
          Add {paymentType === "PaymentIn" ? "Payment In" : "Payment Out"}
        </button>
      </div>
  
      {/* Table Header */}
      <div className="mt-4 bg-white">
        <table className="w-full border-collapse text-gray-900">
          <thead>
            <tr className="text-left text-gray-900 font-bold border-b-2 border-gray-200 bg-[#F9FAFB] text-lg">
              <th className="p-3">Category</th>
              <th className="p-3">Name</th>
              <th className="p-3">Date</th>
              <th className="p-3">Amount</th>
          <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="text-center py-10">
                  <OvalSpinner />
                </td>
              </tr>
            ) : paymentIndata?.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-500">
                  No payments found.
                </td>
              </tr>
            ) : (
              paymentIndata?.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50 bg-white text-lg"
                >
                  <td className="p-3">{row.category}</td>
                  <td className="p-3">
                    {row.category === "Other"
                      ? row?.otherPartyName
                      : row.category === "supplier"
                      ? row?.supplier?.supplierName
                      : row.category === "customer"
                      ? row?.customer?.customerName
                      : row.category === "employee"
                      ? row?.employee?.employeeName
                      : row.category === "company"
                      ? row?.company?.companyName
                      : row.category === "lender"
                      ? row?.lender?.name
                      : row.category === "vehicle"
                      ? row?.vehicle?.vehicleName  // or vehicleName if applicable
                      : "N/A"}
                  </td>
                  <td className="p-3">
                    {format(new Date(row.date), "dd/MM/yyyy")}
                  </td>
                  <td className="p-3">₹{row.amount}</td>
                  <td className="p-3 text-indigo-600">
                    <PiPrinterLight
                      className="w-5 h-5 cursor-pointer"
                      onClick={() => fetchInduvidualPayment(row?._id)}
                    />
                  </td>
                </tr>


              ))
            )}
          </tbody>
        </table>
      </div>
  
      {/* Pagination */}
      {paymentIndata?.length > 0 && (
        <div className="flex justify-between items-center mt-8 text-gray-600">
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`px-4 py-2 border border-gray-300 rounded-lg ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border border-gray-300 rounded-lg ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  
    {/* Popup */}
    {popup && (
      <AddPayment
        setPopup={setPopup}
        fetchData={fetchPaymentData}
        type={paymentType}
      />
    )}
  </>
  
  );
}

export default Payment;
