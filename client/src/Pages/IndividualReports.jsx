import React, { useState, useEffect } from "react";
import { BsPrinter, BsSearch } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa6";
import { TbPencilMinus } from "react-icons/tb";
import { FaWhatsapp } from "react-icons/fa";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import OvalSpinner from "../Components/spinners/OvalSpinner";
import { useNavigate } from "react-router-dom";
import { handlePurchasePrint } from "../utils/purchaseBill";
import { generatePurchasePdfBlob } from "../utils/generatePurchasePdf";
import Swal from "sweetalert2";

const IndividualReports = () => {
  const axiosInstance = useAxiosPrivate();

  const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
  const [supplierName, setSupplierName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalStats, setTotalStats] = useState({});
  const [reportsData, setReportsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const [searchTerm, setSearchTeam] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [suppliers, setSuppliers] = useState([]);

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [printLoading, setPrintLoading] = useState(false);
  const navigate = useNavigate();
  const limit = 5;
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await axiosInstance.get(
          `/admin/supplier/list?search=${searchTerm}`
        );
        setSuggestions(res.data);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    if (searchTerm) {
      fetchSuppliers();
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    const fetchPurchases = async () => {
      if (selectedSupplier) {
        try {
          const response = await axiosInstance.get(
            `admin/purchase/totalStats?startDate=${startDate}&endDate=${endDate}&supplierId=${selectedSupplier?._id}`
          );

          setTotalStats(response?.data);
        } catch (error) {
          console.log(error);
        } finally {
          // setIsLoading(false);
        }
      } else {
        setTotalStats([]);
      }
    };
    fetchPurchases();
  }, [startDate, endDate, selectedSupplier]);

  useEffect(() => {
    if (selectedSupplier && startDate && endDate) {
      fetchReportsData();
    }
  }, [selectedSupplier, startDate, endDate, currentPage]);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const fetchReportsData = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/admin/purchase/supplier/report", {
        params: {
          page: currentPage,
          limit,
          supplierId: selectedSupplier?._id,
          startDate,
          endDate,
        },
      });
      setReportsData(res.data.purchaseEntries || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching report data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPrintData = async () => {
    if (!selectedSupplier?._id) {
      alert("Please select a supplier before printing.");
      return;
    }
    setPrintLoading(true);
    try {
      const response = await axiosInstance.get(
        `admin/purchase/supplier/report?startDate=${startDate}&endDate=${endDate}&supplierId=${selectedSupplier._id}&noPagination=true`
      );

      openPurchaseRegisterPrintPage(
        response?.data?.purchaseEntries || [],
        totalStats,
        startDate,
        endDate,
        searchTerm,
        selectedSupplier.supplierName
      );
    } catch (error) {
      Swal.fire({
        title: "Something went wrong!",
        icon: "error",
        draggable: true,
      });
      console.error("Error fetching print data", error);
      console.error("Error details:", error.response?.data || error.message);
    } finally {
      setPrintLoading(false);
    }
  };
  const openPurchaseRegisterPrintPage = (
    purchaseEntries,
    totalStats,
    startDate,
    endDate,
    supplierName
  ) => {
    const printWindow = window.open("", "_blank");

    const style = `
            <style>
                body { font-family: sans-serif; padding: 20px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
                th { background-color: #f0f0f0; }
                .header { text-align: center; font-size: 20px; font-weight: bold; margin-bottom: 20px; }
            </style>
        `;

    let html = `
            <html>
            <head>
                <title>Purchase Report</title>
                ${style}
            </head>
            <body>
                <div class="header">
                    <h1>Purchase Report</h1>
                    <p><strong>Supplier:</strong> ${supplierName}</p>
                    <p><strong>Date Range:</strong> ${startDate} to ${endDate}</p>
                 
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Qty (KG)</th>
                            <th>Qty (Box)</th>
                            <th>Commission</th>
                            <th>Gross Total</th>
                            <th>Market Fee</th>
                            <th>Net Total</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

    // Loop through purchaseEntries to display the data
    purchaseEntries.forEach((entry) => {
      html += `
                <tr>
                    <td>${new Date(entry.dateOfPurchase).toLocaleDateString(
                      "en-GB"
                    )}</td>
                    <td>${entry.totalKg}</td>
                    <td>${entry.totalBox}</td>
                    <td>${entry.commissionPaid?.toFixed(2)}</td>
                    <td>${entry.grossTotalAmount?.toFixed(2)}</td>
                     <td>${entry.marketFee?.toFixed(2) || "0.00"}</td>
                    <td>${entry.netTotalAmount?.toFixed(2)}</td>
                </tr>
            `;
    });

    html += `
            </tbody>
        </table>
    
        <div>
            <strong>Total Net Amount:</strong> ${
              totalStats?.netTotalAmount?.toFixed(2) || "0.00"
            }<br>
            <strong>Total Commission:</strong> ${
              totalStats?.totalCommission?.toFixed(2) || "0.00"
            }<br>
            <strong>Total Qty (KG):</strong> ${totalStats?.totalKg || 0}<br>
            <strong>Total Qty (Box):</strong> ${totalStats?.totalBox || 0}<br>
            <strong>Total Gross Amount:</strong> ${
              totalStats?.grossTotalAmount?.toFixed(2) || "0.00"
            }<br>
                   <strong>Total Expense:</strong> ${
                     totalStats?.totalMarketFee?.toFixed(2) || "0.00"
                   }<br>
        </div>
    
        <script>
            window.onload = function() {
                window.print();
                setTimeout(() => window.close(), 1000);
            };
        </script>
    
        </body>
        </html>
        `;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  const [watsappLoading, setWatsappLoading] = useState(false);
  const handleSendViaWhatsApp = async (purchaseData, supplier, date) => {
    try {
      if (!supplier?.whatsapp) {
        Swal.fire({
          title: "WhatsApp Not Available",
          text: "This Supplier doesn't have a WhatsApp number linked. Please update their contact information.",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }
      setWatsappLoading(true);
      const pdfBlob = await generatePurchasePdfBlob(purchaseData);
      const formData = new FormData();
      formData.append("pdf", pdfBlob, "purchase.pdf");
      formData.append("billType", "Purchase");
      formData.append("customerName", supplier?.supplierName);
      formData.append("date", date);

      const { data } = await axiosInstance.post(
        "/admin/file/upload-pdf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const whatsappUrl = `https://wa.me/${
        supplier?.whatsapp
      }?text=${encodeURIComponent(`Your purchase bill:\n${data.fileUrl}`)}`;
      window.open(whatsappUrl, "_blank");
    } catch (err) {
      console.error("Failed to send PDF:", err);
    } finally {
      setWatsappLoading(false);
    }
  };

  const Stat = ({ label, value }) => (
    <div className="flex items-center gap-3 min-w-[150px] my-2">
      <span className="text-slate-500 text-xl">{label}</span>
      <span className="text-slate-900 text-xl font-bold">
        {value || "0.00"}
      </span>
    </div>
  );

  return (
    <>
      {/* Loading Overlays */}
      {watsappLoading && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-gray-700 text-sm font-medium">
              Sending via WhatsApp...
            </p>
          </div>
        </div>
      )}
      {printLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm">
          <OvalSpinner />
        </div>
      )}

      <div className="p-6 bg-white rounded-3xl  shadow-md space-y-6 h-full">
        {/* Breadcrumb & Heading */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#737791] text-md ">
            Reports <FaChevronRight /> Individual Purchase Report
          </div>
          <div className="  text-3xl font-bold text-[#151D48]">
            Individual Purchase Report
          </div>
        </div>

        {/* Actions */}

        {/* Filters */}
        <div className="flex flex-wrap  justify-between  ">
          {/* Supplier Search */}
          <Combobox
            value={selectedSupplier}
            autoComplete="off"
            onChange={(value) => {
              setSearchTeam(value.supplierName);
              setSelectedSupplier(value);
              setCurrentPage(1);
            }}
          >
            <div className="relative w-64 bg-gray-50 rounded-2xl px-3 flex items-center h-14">
              <BsSearch className="text-gray-500" />
              <ComboboxInput
                displayValue={(supplier) =>
                  supplier?.supplierName || searchTerm
                }
                autoComplete="off"
                onChange={(e) => {
                  setSearchTeam(e.target.value);
                  setSelectedSupplier(null);
                }}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
                placeholder="Search Supplier..."
                className="w-full bg-transparent pl-2 text-xl text-slate-500 outline-none"
              />
              {showDropdown && suggestions.length > 0 && (
                <ComboboxOptions className="absolute z-10 top-full left-0 w-full bg-white rounded-b-2xl shadow max-h-60 overflow-y-auto">
                  {suggestions.map((supplier) => (
                    <ComboboxOption
                      key={supplier._id}
                      value={supplier}
                      className={({ active }) =>
                        `px-4 py-2 text-base cursor-pointer text-slate-600 ${
                          active ? "bg-gray-100" : ""
                        }`
                      }
                    >
                      {supplier.supplierName}
                    </ComboboxOption>
                  ))}
                </ComboboxOptions>
              )}
            </div>
          </Combobox>

          {/* Date Pickers */}
          <div className="flex gap-4 items-center">
            {reportsData?.length > 0 && (
              <div className="flex justify-end">
                <button
                  onClick={fetchPrintData}
                  className="bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-xl flex items-center gap-3"
                >
                  <BsPrinter className="text-2xl text-indigo-950" />
                  <span className="text-indigo-950 text-xl font-bold">
                    Print
                  </span>
                </button>
              </div>
            )}

            <label className="text-[#73779166] text-xl">Date Range</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setCurrentPage(1);
              }}
              className="w-52 px-4 py-3 bg-gray-50 rounded-xl text-zinc-700 text-xl outline-none"
            />
            <label className="text-[#73779166] text-xl">To</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setCurrentPage(1);
              }}
              className="w-52 px-4 py-3 bg-gray-50 rounded-xl text-zinc-700 text-xl outline-none"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-['Urbanist']">
            <thead className="bg-[#F9FAFB] border-b border-gray-200">
              <tr className="text-indigo-950 text-lg font-bold">
                <th className="py-3 px-4">No.</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Qty (KG)</th>
                <th className="py-3 px-4">Qty (Box)</th>
                <th className="py-3 px-4">Commission</th>
                <th className="py-3 px-4">Gross</th>
                <th className="py-3 px-4">Expenses</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4 "></th>
                <th className="py-3 px-4"></th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="11" className="text-center py-10">
                    <OvalSpinner />
                  </td>
                </tr>
              ) : reportsData?.length === 0 ? (
                <tr>
                  <td
                    colSpan="11"
                    className="text-center py-10 text-gray-400 text-lg"
                  >
                    No reports available for the selected date range.
                  </td>
                </tr>
              ) : (
                reportsData?.map((entry, index) => {
                  const transaction = {
                    selectedSupplier,
                    purchaseCount: entry?.purchaseNumber,
                    dateOfPurchase: entry?.dateOfPurchase,
                    items: entry?.items?.map((i) => ({
                      name: "name1",
                      price: i?.unitPrice,
                      kg: i?.quantityType === "kg" ? i?.quantity : "",
                      box: i?.quantityType === "box" ? i?.quantity : "",
                      total: i.totalCost,
                    })),
                    totalQuantityInBox: entry?.totalBox,
                    totalQuantityInKg: entry?.totalKg,
                    totalPrice: entry?.grossTotalAmount,
                    commission: entry?.commissionPaid,
                    marketFee: entry?.marketFee,
                    totalDeduction: entry?.commissionPaid + entry?.marketFee,
                  };

                  return (
                    <tr
                      key={entry._id}
                      className="border-b border-gray-200 text-xl text-slate-900"
                    >
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4">
                        {new Date(entry.dateOfPurchase).toLocaleDateString(
                          "en-GB"
                        )}
                      </td>
                      <td className="py-3 px-4">{entry.totalKg}</td>
                      <td className="py-3 px-4">{entry.totalBox}</td>
                      <td className="py-3 px-4">
                        ₹{entry.commissionPaid?.toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        ₹{entry.grossTotalAmount?.toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        ₹{entry.marketFee?.toFixed(2) || "0.00"}
                      </td>
                      <td className="py-3 px-4">
                        ₹{entry.netTotalAmount?.toFixed(2)}
                      </td>
                      <td
                        className="py-3 px-4 cursor-pointer "
                        onClick={() => handlePurchasePrint(transaction)}
                      >
                        <BsPrinter />
                      </td>
                      <td
                        className="py-3 px-4 cursor-pointer text-blue-700"
                        onClick={() => navigate(`/edit-puchase/${entry?._id}`)}
                      >
                        <TbPencilMinus />
                      </td>
                      <td
                        className="py-3 px-4 cursor-pointer text-green-600"
                        onClick={() =>
                          handleSendViaWhatsApp(
                            transaction,
                            selectedSupplier,
                            entry?.dateOfPurchase
                          )
                        }
                      >
                        <FaWhatsapp />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {reportsData?.length > 0 && (
          <>
            <div className="flex justify-between items-center pt-6">
              <span className="text-xl text-slate-900">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex gap-4">
                <button
                  onClick={goToPreviousPage}
                  className={`px-6 py-3 rounded-xl border ${
                    currentPage === 1
                      ? "border-gray-200 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                  disabled={currentPage === 1}
                >
                  <span className="text-gray-400 text-lg font-semibold">
                    Previous
                  </span>
                </button>
                <button
                  onClick={goToNextPage}
                  className={`px-6 py-3 rounded-xl border ${
                    currentPage === totalPages
                      ? "border-gray-200 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                  disabled={currentPage === totalPages}
                >
                  <span className="text-blue-500 text-lg font-semibold">
                    Next
                  </span>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-[#F0FDFA] px-6 py-4  flex flex-wrap justify-between mt-8 border border-gray-200">
              <Stat
                label="Total"
                value={totalStats?.netTotalAmount?.toFixed(2)}
              />
              <Stat
                label="Commission"
                value={totalStats?.totalCommission?.toFixed(2)}
              />
              <Stat label="Qty (Kg)" value={totalStats?.totalKg} />
              <Stat label="Qty (Box)" value={totalStats?.totalBox} />
              <Stat
                label="Expenses"
                value={totalStats?.totalMarketFee?.toFixed(2)}
              />
              <Stat
                label="Gross Total"
                value={totalStats?.grossTotalAmount?.toFixed(2)}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default IndividualReports;
