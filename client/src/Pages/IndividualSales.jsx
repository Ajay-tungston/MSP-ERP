// src/Pages/IndividualSales.jsx
import React, { useState, useEffect, useRef } from "react";
import { CalendarIcon, PrinterIcon } from 'lucide-react';
import { LuPencilLine } from "react-icons/lu";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import debounce from "lodash/debounce";

export default function IndividualSales() {
  const axios = useAxiosPrivate();

  // Customer search + selection
  const [customerName, setCustomerName] = useState("");
  const [customerId, setCustomerId]     = useState("");
  const [suggestions, setSuggestions]   = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggRef = useRef(null);

  // Pagination & data
  const [page, setPage]         = useState(1);
  const [limit]                 = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [entries, setEntries]   = useState([]);

  // Date filter (optional)
  const [date, setDate]         = useState("");

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
        const res = await axios.get(`/admin/customer/getname?q=${encodeURIComponent(q)}`);
        setSuggestions(res.data.customers.map(c => ({
          id: c.id, name: c.name
        })));
        setShowSuggestions(true);
      } catch { /* swallow */ }
    }, 300);
    fetch(customerName);
    return () => fetch.cancel();
  }, [customerName, axios]);

  // 2) Fetch individual sales for selected customer & page
  const fetchSales = async (custId, pg=1) => {
    if (!custId) return;
    try {
      const res = await axios.get("/admin/sales/salesindividual", {
        params: { customerId: custId, page: pg, limit }
      });
      setEntries(res.data.entries);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Failed to load individual sales:", err);
      setEntries([]);
      setTotalPages(1);
    }
  };

  // When customerId or page changes, reload sales
  useEffect(() => {
    fetchSales(customerId, page);
  }, [customerId, page]);

  // Handler for selecting suggestion
  const selectCustomer = (c) => {
    setCustomerName(c.name);
    setCustomerId(c.id);
    setShowSuggestions(false);
    setPage(1);
  };

  // Flatten entries → table rows
// Instead of flatMap on entry.items, just map entries directly:
const tableRows = (entries || []).map((row, idx) => ({
  key: `${row.transactionNumber}-${idx}`,
  code: row.transactionNumber,
  supplier: row.supplier.supplierName,
  date: new Date(row.dateOfSale).toLocaleDateString("en-GB"),
  qty: row.quantity,
  price: row.unitPrice,
  total: row.totalCost    // or row.quantity * row.unitPrice
}));

  return (
    <div className="p-6 bg-[#F9FAFB] min-h-screen font-[Urbanist]">
      <div className="bg-[#FFFFFF] rounded-2xl p-12 shadow-md relative">

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 flex gap-3 mb-4">
          <span className="text-gray-500">Print</span> &gt; <span>Individual Sales</span>
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
                onChange={e => {
                  setCustomerName(e.target.value);
                  setCustomerId("");  // clear previous selection
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
            <button className="bg-[#F9FAFB] hover:bg-gray-200 text-sm font-medium rounded-[12px] px-8 py-4 flex items-center gap-3 mt-2">
              <PrinterIcon className="w-4 h-4" /> Print All
            </button>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <label className="text-sm text-gray-500">Date</label>
              <div className="flex items-center bg-gray-50 rounded-md px-4 py-2 text-sm text-gray-700 w-[200px]">
                <input
                  type="date"
                  className="bg-transparent outline-none w-full"
                  value={date}
                  onChange={e => setDate(e.target.value)}
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
          {['No.','Date', 'Supplier', 'Qty (KG)', 'Price ($/KG)', 'Total'].map((h,i) => (
            <div key={i} className="text-black font-semibold text-[20px] min-w-[152px] flex items-center">
              {h}
            </div>
          ))}
          <div className="w-6"></div>
        </div>

        {/* Table Body */}
        <div className="bg-[#FFFFFF] px-12">
          {tableRows.map(row => (
            <div
              key={row.key}
              className="flex items-center text-sm py-3 border-b last:border-none border-gray-200"
            >
              <div className="min-w-[152px]">{row.code}</div>
              <div className="min-w-[152px]">{row.date}</div>
              <div className="min-w-[152px]">{row.supplier}</div>
              <div className="min-w-[152px]">{row.qty}</div>
              <div className="min-w-[152px]">{row.price.toFixed(2)}</div>
              <div className="min-w-[152px] font-semibold">
                ${row.total.toFixed(2)}
              </div>
              <div className="w-6 flex items-center justify-center">
                <LuPencilLine className="text-[#6A5AE0] w-4 h-4 cursor-pointer" />
              </div>
            </div>
          ))}
          {tableRows.length === 0 && (
            <div className="py-6 text-center text-gray-500">
              {customerId ? "No sales found." : "Please select a customer."}
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 py-4">
          <button
            onClick={() => page > 1 && setPage(p => p - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => page < totalPages && setPage(p => p + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
}
