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
      <div className="h-fit relative bg-gray-50 outline-1 outline-offset-[-1px] outline-white mt-10">
        <div className="w-[1471px] h-[1095px] absolute bg-white rounded-3xl overflow-hidden">
          <div className="left-[48px] top-[48px] absolute inline-flex justify-start items-center gap-3">
            <div className="flex items-center text-slate-500 text-xl font-normal font-['Urbanist']">
              Transactions <FaChevronRight className="ml-2" />
              {paymentType === "PaymentIn" ? "Payment in" : "Payment out"}
            </div>

            <div
              className="w-80 h-[64px] px-6 py-4 left-[1023px] top-[32px] absolute bg-indigo-500 rounded-2xl inline-flex justify-center items-center gap-3"
              onClick={() => setPopup(true)}
            >
              <div className="w-8 h-8 relative">
                <CiCirclePlus className="w-7 h-7 left-[2.67px] top-[2.67px] absolute text-white" />
                <div className="w-8 h-8 left-[32px] top-[32px] absolute origin-top-left -rotate-180 opacity-0" />
              </div>
              <div className="justify-start text-white text-xl font-bold font-['Urbanist']">
                {paymentType === "PaymentIn" ? "Payment In" : "Payment Out"}
              </div>
            </div>
          </div>

          <div className="left-[48px] top-[80px] absolute justify-start text-indigo-950 text-4xl font-bold font-['Urbanist'] leading-[50.40px]">
            {paymentType === "PaymentIn" ? "Payment In" : "Payment Out"}
          </div>

          <div className="w-[1451px] left-0 top-[202px] absolute inline-flex flex-col justify-start items-start">
            {/* Header */}
            <div className="self-stretch px-12 py-4 bg-gray-50 border-b border-gray-200 inline-flex justify-between items-center">
              <div className="min-w-32 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">
                Category
              </div>
              <div className="w-44 min-w-32 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">
                Names
              </div>
              <div className="min-w-32 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">
                Date
              </div>
              <div className="min-w-36 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">
                Amount
              </div>
              <div className="w-6 h-6 relative" />
              {/* <div className="w-6 h-6 relative" /> */}
            </div>

            {isLoading ? (
              <div className="w-full h-60 flex items-center justify-center">
                <OvalSpinner />
              </div>
            ) : paymentIndata?.length < 0 ? (
              <div className="w-full h-60 flex items-center justify-center text-gray-500 text-lg">
                No payments found.
              </div>
            ) : (
              paymentIndata?.map((row, index) => (
                <div
                  key={index}
                  className="self-stretch px-12 py-4 bg-white border-b border-gray-200 inline-flex justify-between items-center"
                >
                  <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">
                    {row.category}
                  </div>
                  <div className="w-44 min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">
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
                      : "N/A"}
                  </div>
                  <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">
                    {format(new Date(row.date), "dd/MM/yyyy")}
                  </div>
                  <div className="min-w-36 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">
                    {row.amount}
                  </div>
                  <div
                    className="w-6 h-6 flex items-center justify-center text-slate-500 cursor-pointer"
                    onClick={() => fetchInduvidualPayment(row?._id)}
                  >
                    <PiPrinterLight className="w-5 h-5" />
                  </div>
                  {/* <div className="w-6 h-6 flex items-center justify-center text-slate-500 cursor-pointer"
                  onClick={()=>fetchInduvidualPayment(row?._id)}>
                    <FaWhatsapp className="w-5 h-5" />
                  </div> */}
                </div>
              ))
            )}
          </div>

          {/* Pagination Controls */}
          {paymentIndata?.length > 0 && (
            <div className="w-[1511px] px-12 py-6 left-0 top-[976px] absolute border-b border-gray-200 inline-flex justify-between items-center">
              <div className="flex justify-start items-center gap-4">
                <div className="text-center justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">
                  Page {currentPage} of {totalPages}
                </div>
              </div>
              <div className="flex justify-end items-center gap-6">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className="w-40 px-6 py-4 bg-white rounded-2xl outline-1 outline-offset-[-1px] outline-gray-300/30 flex justify-center items-center gap-3"
                >
                  <div
                    className={`text-xl font-bold font-['Urbanist'] ${
                      currentPage === 1 ? "text-gray-300/30" : "text-blue-500"
                    }`}
                  >
                    Previous
                  </div>
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="w-40 px-6 py-4 bg-white rounded-2xl outline-1 outline-offset-[-1px] outline-gray-300/30 flex justify-center items-center gap-3"
                >
                  <div
                    className={`text-xl font-bold font-['Urbanist'] ${
                      currentPage === totalPages
                        ? "text-gray-300/30"
                        : "text-blue-500"
                    }`}
                  >
                    Next
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
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
