// src/Pages/IndividualSales.jsx
import React, { useState, useEffect, useRef } from "react";
import { CalendarIcon, PrinterIcon } from "lucide-react";
import { LuPencilLine } from "react-icons/lu";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import debounce from "lodash/debounce";
import { IndividualsalesReport } from "../utils/individualSalesReport";
import { TbBrandWhatsappFilled } from "react-icons/tb";
import { generateSalesPdfBlob } from "../utils/generateSalePdf";
import Swal from "sweetalert2";
import { FaChevronRight } from "react-icons/fa6";
export default function IndividualSales() {
  const axiosInstance = useAxiosPrivate();

  // Customer search + selection
  const [customerName, setCustomerName] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggRef = useRef(null);

  const [entries, setEntries] = useState([]);
  const [whatsapp, setWhatsapp] = useState("");
  const [reportData, setReportData] = useState({});
  // Date filter (optional)
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  // Close suggestions on outside click
  useEffect(() => {
    const handler = (e) => {
      if (suggRef.current && !suggRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // 1) Fetch customer name suggestions
  useEffect(() => {
    if (!customerName.trim()) {
      setSuggestions([]);
      return;
    }
    const fetch = debounce(async (q) => {
      try {
        const res = await axiosInstance.get(
          `/admin/customer/getname?q=${encodeURIComponent(q)}`
        );
        setSuggestions(
          res.data.customers.map((c) => ({
            id: c.id,
            name: c.name,
            whatsapp: c?.whatsapp,
            openingBalance: c?.openingBalance,
          }))
        );
        setShowSuggestions(true);
      } catch {
        /* swallow */
      }
    }, 300);
    fetch(customerName);
    return () => fetch.cancel();
  }, [customerName, axiosInstance]);

  // 2) Fetch individual sales for selected customer & page
  const fetchSalesByDate = async (custId, dateStr) => {
    if (!custId || !dateStr) return;
    try {
      const res = await axiosInstance.get("/admin/sales/getbydate", {
        params: { customerId: custId, date: dateStr },
      });
      console.log("result=", res);

      const {
        dailyReceipts = [],
        dailyTotal = 0,
        grossTotal = 0,
        previousBalance = 0,
      } = res?.data || {};

      setReportData({ dailyReceipts, dailyTotal, grossTotal, previousBalance });

      const normalized = res.data?.report?.map((entry, idx) => ({
        transactionNumber: entry["No"] || `TX-${idx + 1}`,
        dateOfSale: entry["Date"],
        item: { itemName: entry["Item"] },
        supplier: {
          supplierName: entry["Supplier"],
          supplierCode: entry["supplierCode"],
        },
        quantityKg: entry["Qty (KG)"] === "-" ? 0 : entry["Qty (KG)"],
        quantityBox: entry["Qty (Box)"] === "-" ? 0 : entry["Qty (Box)"],
        unitPrice: entry["Price"],
        totalCost: entry["Total"],
      }));

      setEntries(normalized);
    } catch (err) {
      console.error("Failed to load individual sales:", err);
      setEntries([]);
    }
  };

  // When customerId or page changes, reload sales
  useEffect(() => {
    if (customerId && date) {
      fetchSalesByDate(customerId, date);
    } else {
      setEntries([]);
    }
  }, [customerId, date]);

  // Handler for selecting suggestion
  const selectCustomer = (c) => {
    setCustomerName(c.name);
    setCustomerId(c.id);
    setWhatsapp(c?.whatsapp);
    setShowSuggestions(false);
  };

  const grandTotal = entries.reduce(
    (sum, row) => sum + Number(row.totalCost || 0),
    0
  );

  const tableRows = (entries || []).map((row, idx) => ({
    key: `${row.transactionNumber}-${idx}`,
    code: row.transactionNumber,
    date: new Date(row.dateOfSale).toLocaleDateString("en-GB"),
    item: row.item?.itemName || "-",
    supplier: row.supplier?.supplierName || "-",
    qtyKg: row.quantityKg,
    qtyBox: row.quantityBox,
    price: row.unitPrice,
    total: row.totalCost,
  }));

  const [watsappLoading, setWatsappLoading] = useState(false);
  const handleSendViaWhatsApp = async (entries, customerName, date) => {
    try {
      if (!whatsapp) {
        Swal.fire({
          title: "WhatsApp Not Available",
          text: "This customer doesn't have a WhatsApp number linked. Please update their contact information.",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }
      setWatsappLoading(true);
      const pdfBlob = await generateSalesPdfBlob(
        entries,
        customerName,
        date,
        reportData?.previousBalance,
        reportData?.dailyReceipts
        // prvBalance,
        // dailyReceipt
      );
      const formData = new FormData();
      formData.append("pdf", pdfBlob, "purchase.pdf");
      formData.append("billType", "sale");
      formData.append("customerName", customerName);
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

      const whatsappUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
        `Your purchase bill:\n${data.fileUrl}`
      )}`;
      window.open(whatsappUrl, "_blank");
    } catch (err) {
      console.error("Failed to send PDF:", err);
    } finally {
      setWatsappLoading(false);
    }
  };
  return (
    <>
    {watsappLoading && (
      <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-gray-700 text-sm font-medium">Sending via WhatsApp...</p>
        </div>
      </div>
    )}
  
    <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-md relative h-full">
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center gap-2 text-[#737791] text-base sm:text-md font-normal mb-4">
        <span>Reports</span>
        <FaChevronRight />
        <span>Individual Sales</span>
      </div>
  
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6 w-full">
        <div className="flex flex-col gap-4 w-full lg:max-w-2xl">
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight text-[#151D48]">Individual Sales</h1>
  
          <div className="relative flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4" ref={suggRef}>
            <label className="text-base sm:text-[18px] text-gray-500 min-w-fit">Customer:</label>
            <div className="relative  w-64 bg-gray-50 rounded-2xl px-3 flex items-center h-14">
              <input
                type="text"
                          className="w-full bg-transparent pl-2 text-xl text-slate-500 outline-none"
                value={customerName}
                onChange={(e) => {
                  setCustomerName(e.target.value);
                  setCustomerId("");
                }}
                placeholder="Enter customer name"
              />
              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute top-full left-0 w-full bg-white border shadow z-10 max-h-48 overflow-y-auto">
                  {suggestions.map((c) => (
                    <li
                      key={c.id}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => selectCustomer(c)}
                    >
                      {c.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
  
        <div className="flex flex-col gap-4 items-start lg:items-end w-full lg:w-auto">
          {tableRows.length > 0 && (
            <div className="flex flex-wrap gap-4 w-full sm:w-auto">
              <button
                className="bg-[#F9FAFB] hover:bg-gray-200 text-sm font-medium rounded-xl px-6 py-3 flex items-center gap-2"
                onClick={() => handleSendViaWhatsApp(entries, customerName, date)}
              >
                <TbBrandWhatsappFilled className="w-4 h-4 text-green-500" />
                Send via WhatsApp
              </button>
  
              <button
                className="bg-[#F9FAFB] hover:bg-gray-200 text-sm font-medium rounded-xl px-6 py-3 flex items-center gap-2"
                onClick={() =>
                  IndividualsalesReport(
                    entries,
                    customerName,
                    date,
                    reportData?.previousBalance,
                    reportData?.dailyReceipts
                  )
                }
              >
                <PrinterIcon className="w-4 h-4" />
                Print
              </button>
            </div>
          )}
  
          <div className="flex flex-wrap items-center gap-3 text-base sm:text-xl text-[#73779166]">
            <label>Date</label>
            <input
              type="date"
              className="w-full sm:w-52 px-4 py-3 bg-gray-50 rounded-xl text-zinc-700 outline-none"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
      </div>
  
      {/* Customer Info */}
      {customerId && (
        <div className="bg-[#F0F9FF] px-4 py-2 sm:px-6 font-semibold text-lg sm:text-xl text-gray-700 flex gap-4 mb-2">
          <span>Customer:</span>
          <span className="font-bold text-black">{customerName}</span>
        </div>
      )}
  
      {/* Table */}
      <div className="overflow-x-auto px-4 sm:px-8 min-w-[700px]">
  <table className="w-full text-sm sm:text-lg border-collapse bg-white">
    {/* Table Header */}
    <thead className="bg-[#F9FAFB] border-b border-gray-200">
      <tr>
        {["No.", "Item", "Supplier", "Qty (KG)", "Qty (Box)", "Unit Price", "Price"].map((h, i) => (
          <th
            key={i}
            className="text-black font-semibold text-left py-3 px-4 min-w-[120px] sm:min-w-[152px]"
          >
            {h}
          </th>
        ))}
      </tr>
    </thead>

    {/* Table Body */}
    <tbody>
      {tableRows.map((row, index) => (
        <tr key={row.key} className="border-b last:border-none border-gray-200">
          <td className="py-3">{index + 1}</td>
          <td className="py-3">{row.item}</td>
          <td className="py-3">{row.supplier}</td>
          <td className="py-3">{row.qtyKg}</td>
          <td className="py-3">{row.qtyBox}</td>
          <td className="py-3">₹{row.price.toFixed(2)}</td>
          <td className="py-3 font-semibold">₹{row.total.toFixed(2)}</td>
        </tr>
      ))}

      {/* Grand Total Row */}
      {tableRows.length > 0 && (
        <tr className="bg-[#F0FDFA] font-semibold border-t border-gray-300 text-black">
          <td colSpan="4"></td>
          <td className="py-3">Grand Total:</td>
          <td className="py-3">₹{grandTotal.toFixed(2)}</td>
          <td></td>
        </tr>
      )}
    </tbody>
  </table>

  {/* Empty State Message */}
  {tableRows.length === 0 && (
    <div className="text-center py-10 text-gray-400 text-lg">
      {customerId ? "No sales found." : "Please select a customer."}
    </div>
  )}
</div>

    </div>
  </>
  

  );
}
