// src/Pages/IndividualSales.jsx
import React, { useState, useEffect, useRef } from "react";
import { CalendarIcon, PrinterIcon } from "lucide-react";
import { LuPencilLine } from "react-icons/lu";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import debounce from "lodash/debounce";
import { IndividualsalesReport } from "../utils/individualSalesReport";
export default function IndividualSales() {
  const axiosInstance = useAxiosPrivate();

  // Customer search + selection
  const [customerName, setCustomerName] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggRef = useRef(null);

  const [entries, setEntries] = useState([]);

  // Date filter (optional)
  const [date, setDate] = useState("");

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

      console.log("Raw response from backend:", res.data);

      const normalized = res.data.map((entry, idx) => ({
        transactionNumber: entry["No"] || `TX-${idx + 1}`,
        dateOfSale: entry["Date"],
        item: { itemName: entry["Item"] },
        supplier: { supplierName: entry["Supplier"] },
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
    setShowSuggestions(false);
    console.log("Selected customerId:", c.id);
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

  console.log("tabledata", tableRows);
  return (
    <div className="p-6 bg-[#F9FAFB] min-h-screen font-[Urbanist]">
      <div className="bg-[#FFFFFF] rounded-2xl p-12 shadow-md relative">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 flex gap-3 mb-4">
          <span className="text-gray-500">Print </span> &gt;{" "}
          <span>Individual Sales</span>
        </div>

        {/* Header */}
        <div className="flex justify-between items-start mb-10">
          <div className="flex flex-col gap-6">
            <h1 className="text-[36px] leading-[140%] font-bold tracking-[0px]">
              Individual Sales
            </h1>
            <div className="flex items-center gap-4 relative" ref={suggRef}>
              <label className="text-sm text-gray-500">Customer</label>
              <input
                type="text"
                className="w-[300px] rounded-md px-4 py-2 bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={customerName}
                onChange={(e) => {
                  setCustomerName(e.target.value);
                  setCustomerId(""); // clear previous selection
                }}
                placeholder="Enter customer name"
              />
              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute top-full left-0 w-[300px] bg-white border shadow z-10 max-h-48 overflow-y-auto">
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
          <div className="flex flex-col items-end gap-4">
            <button
              className="bg-[#F9FAFB] hover:bg-gray-200 text-sm font-medium rounded-[12px] px-8 py-4 flex items-center gap-3 mt-2"
              onClick={() => IndividualsalesReport(entries, customerName, date)}
            >
              <PrinterIcon className="w-4 h-4" /> Print All
            </button>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <label className="text-sm text-gray-500">Date</label>
              <div className="flex items-center bg-gray-50 rounded-md px-4 py-2 text-sm text-gray-700 w-[200px]">
                <input
                  type="date"
                  className="bg-transparent outline-none w-full"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Customer Label */}
        {customerId && (
          <div className="bg-[#F0F9FF] px-12 py-2 font-semibold text-sm text-gray-700 flex gap-6 mb-0">
            <span>Customer</span>
            <span className="font-bold text-black">{customerName}</span>
          </div>
        )}

        {/* Table Header */}
        <div className="bg-[#F9FAFB] px-12 py-2 flex items-center border-b border-gray-200">
          {[
            "No.",
            "Item",
            "Supplier",
            "Qty (KG)",
            "Qty (Box)",
            "unitPrice",
            "Price",
          ].map((h, i) => (
            <div
              key={i}
              className="text-black font-semibold text-[20px] min-w-[152px] flex items-center"
            >
              {h}
            </div>
          ))}
          <div className="w-6"></div>
        </div>

        {/* Table Body */}
        <div className="bg-[#FFFFFF] px-12">
          {tableRows.map((row) => (
            <div
              key={row.key}
              className="flex items-center text-sm py-3 border-b last:border-none border-gray-200"
            >
              <div className="min-w-[152px]">{row.code}</div>

              <div className="min-w-[152px]">{row.item}</div>
              <div className="min-w-[152px]">{row.supplier}</div>
              <div className="min-w-[152px]">{row.qtyKg}</div>
              <div className="min-w-[152px]">{row.qtyBox}</div>
              <div className="min-w-[152px]">{row.price.toFixed(2)}</div>
              <div className="min-w-[152px] font-semibold">
                ${row.total.toFixed(2)}
              </div>
            </div>
          ))}
          {/* Grand Total Row */}
          {tableRows.length > 0 && (
            <div className="flex items-center text-sm py-3 border-t border-gray-300 font-semibold">
              <div className="min-w-[152px]"></div>
              <div className="min-w-[152px]"></div>
              <div className="min-w-[152px]"></div>
              <div className="min-w-[152px] text-black">Grand Total</div>
              <div className="min-w-[152px] text-black">
                ${grandTotal.toFixed(2)}
              </div>
            </div>
          )}
          {tableRows.length === 0 && (
            <div className="py-6 text-center text-gray-500">
              {customerId ? "No sales found." : "Please select a customer."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
