import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { BsPrinter } from "react-icons/bs";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import OvalSpinner from "../Components/spinners/OvalSpinner";
import { debounce } from "lodash";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const CustomerReport = () => {
  const [customerSearch, setcustomerSearch] = useState("");
  const [customerLoading, setcustomerLoading] = useState(false);
  const [custmorInputFocused, setcustmorInputFocused] = useState(false);
  const [customerList, setcustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [reportRows, setReportRows] = useState([]);
  const [reportLoading, setReportLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [summary, setSummary] = useState({
    totalDebit: 0,
    totalCredit: 0,
    closingBalance: 0,
  });
  const limit = 20;

  const customerNameRef = useRef(null);
  const axiosInstance = useAxiosPrivate();

  const debouncedFetchCustomer = useCallback(
    debounce(async (searchTerm) => {
      setcustomerLoading(true);
      try {
        const response = await axiosInstance.get(
          `/admin/customer/getname?q=${searchTerm}`
        );
        setcustomerList(response?.data?.customers);
      } catch (error) {
        console.log(error);
      } finally {
        setcustomerLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    if (customerSearch) {
      debouncedFetchCustomer(customerSearch);
    } else {
      setcustomerList([]);
    }
    return () => {
      debouncedFetchCustomer.cancel();
    };
  }, [customerSearch, debouncedFetchCustomer]);

  useEffect(() => {
    if (!selectedCustomer?.id) return;

    const fetchReport = async () => {
      setReportLoading(true);
      try {
        const response = await axiosInstance.get(
          `/admin/customer/getCustomerReport?customerId=${selectedCustomer.id}&startDate=${startDate}&endDate=${endDate}&page=${currentPage}&limit=${limit}`
        );
        const data = response?.data;
        console.log("wfgerhf", response);
        setTotalPages(data?.totalPages);
        setSummary(data?.summaryTotals);
        const mergedEntries = [];

        // Opening Balance row
        mergedEntries.push({
          date: new Date(startDate),
          type: "opening",
          description: "Opening Balance",
          debit: 0,
          credit: 0,
          balance: data.previousBalance || 0,
          formattedDate: new Date(startDate).toLocaleDateString("en-GB"),
        });

        // Iterate over the backend's unified timeline array
        let runningBalance = data.previousBalance || 0;

        data.timeline.forEach((entry) => {
          let debit = 0;
          let credit = 0;
          let description = "";

          if (entry.type === "sale") {
            debit = entry.amount;
            description = `Invoice #${entry.transactionNumber}`;
          } else if (entry.type === "payment") {
            if (entry.paymentType === "PaymentIn") {
              credit = entry.amount;
              description = "Payment Received";
            } else if (entry.paymentType === "PaymentOut") {
              debit = entry.amount;
              description = "Payment Made";
            }
          }

          runningBalance += debit - credit;

          mergedEntries.push({
            date: new Date(entry.date),
            type: entry.type,
            description,
            debit,
            credit,
            balance: runningBalance,
            formattedDate: new Date(entry.date).toLocaleDateString("en-GB"),
          });
        });

        setReportRows(mergedEntries);
      } catch (error) {
        console.error("Error fetching report:", error);
      } finally {
        setReportLoading(false);
      }
    };

    fetchReport();
  }, [startDate, endDate, selectedCustomer, currentPage]);

  return (
    <div className="p-6 bg-white rounded-md shadow-sm min-h-full ">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <p className="text-md text-[#737791] flex items-center gap-1">
            Transactions <FaChevronRight /> Customer Report
          </p>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Customer Report
          </h1>

          {/* Searchable Dropdown */}
          <div className="relative mb-4">
            <div className="flex items-center gap-2">
              <label className="text-lg font-medium text-gray-700 whitespace-nowrap">
                Select Customer:
              </label>
              <div className="relative">
                <Combobox
                  value={selectedCustomer}
                  onChange={setSelectedCustomer}
                  onClose={() => setcustomerSearch("")}
                >
                  <ComboboxInput
                    aria-label="customer"
                    displayValue={(customers) => customers?.name ?? ""}
                    onChange={(e) => {
                      setcustomerSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                    ref={customerNameRef}
                    onFocus={() => setcustmorInputFocused(true)}
                    onBlur={() => setcustmorInputFocused(false)}
                    autoComplete="off"
                    placeholder="Search Customer"
                    className="w-full px-6 py-2 bg-gray-100 rounded-xl text-gray-800 text-lg "
                  />
                  <div className="absolute left-0 right-0 mt-1 z-10">
                    {customerLoading ? (
                      custmorInputFocused && (
                        <div className="w-full border border-gray-200 rounded-xl bg-white max-h-60 overflow-y-auto shadow-lg px-6 py-3 text-gray-700">
                          <OvalSpinner
                            width="w-6"
                            height="h-6"
                            border="border-2"
                          />
                        </div>
                      )
                    ) : customerList?.length > 0 ? (
                      <ComboboxOptions className="w-full border border-gray-200 rounded-xl bg-white max-h-60 overflow-y-auto shadow-lg empty:invisible">
                        {customerList?.map((cus) => (
                          <ComboboxOption
                            key={cus._id}
                            value={cus}
                            className="px-6 py-3 cursor-pointer text-gray-700 hover:bg-gray-100 data-[focus]:bg-blue-100"
                          >
                            {cus.name}
                          </ComboboxOption>
                        ))}
                      </ComboboxOptions>
                    ) : (
                      custmorInputFocused &&
                      !selectedCustomer && (
                        <div className="w-full border border-gray-200 rounded-xl bg-white max-h-60 overflow-y-auto shadow-lg px-6 py-3 text-gray-700">
                          No matching customer
                        </div>
                      )
                    )}
                  </div>
                </Combobox>
              </div>
            </div>
          </div>
        </div>

        {/* Print + Dates */}
        <div className="flex flex-col items-center gap-8">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-medium rounded-md shadow border border-gray-200">
            <BsPrinter className="text-lg" />
            Print
          </button>
          <div className="flex items-center gap-2">
            <label className="mb-1">Date Range</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-100 text-gray-500 bg-gray-100"
            />
            <span className="text-gray-500">to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-100 text-gray-500 bg-gray-100"
            />
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-[#F9FAFB] text-left text-gray-700 font-semibold">
              <tr>
                <th className="p-4">Date</th>
                <th className="p-4">Description</th>
                <th className="p-4 text-right">Debit (₹)</th>
                <th className="p-4 text-right">Credit (₹)</th>
                <th className="p-4 text-right">Balance (₹)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {reportLoading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center p-5 py-20 text-gray-700"
                  >
                    <OvalSpinner />
                  </td>
                </tr>
              ) : reportRows?.length > 0 ? (
                reportRows.map((item, index) => (
                  <tr
                    key={index}
                    className={`${
                      item.type === "opening"
                        ? "bg-blue-50 font-medium"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="p-4">{item.formattedDate}</td>
                    <td className="p-4">{item.description}</td>
                    <td className="p-4 text-right">
                      {item.debit ? `₹${item.debit?.toFixed(2)}` : "-"}
                    </td>
                    <td className="p-4 text-right">
                      {item.credit ? `₹${item.credit?.toFixed(2)}` : "-"}
                    </td>
                    <td className="p-4 text-right">
                      ₹{item.balance?.toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center p-5 py-20 text-lg text-gray-400"
                  >
                    No transactions found for the selected date range.
                  </td>
                </tr>
              )}

              {reportRows?.length > 0 && currentPage === totalPages && (
                <tr className="bg-[#F0FDFA] font-semibold text-gray-700">
                  <td className="p-4" colSpan="2">
                    Period Totals
                  </td>
                  <td className="p-4 text-right">
                    ₹{summary.totalDebit.toFixed(2)}
                  </td>
                  <td className="p-4 text-right">
                    ₹{summary.totalCredit.toFixed(2)}
                  </td>
                  <td className="p-4 text-right">
                    ₹{summary.closingBalance.toFixed(2)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {!reportLoading && reportRows.length > 0 && (
        <div className="flex justify-between items-center mt-4 text-sm text-gray-700">
          <div>
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 border border-gray-300 rounded-lg ${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-[#4079ED] hover:bg-gray-100 cursor-pointer"
              }`}
            >
              Previous
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border border-gray-300 rounded-lg ${
                currentPage === totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-[#4079ED] hover:bg-gray-100 cursor-pointer"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerReport;
