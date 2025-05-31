import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { BsPrinter } from "react-icons/bs";

const CustomerReport = () => {
  const openingBalance = 1000;

  const customers = [
    { id: 1, name: "John Traders" },
    { id: 2, name: "Apex Supplies" },
    { id: 3, name: "Bright Enterprises" },
    { id: 4, name: "Metro Hardware" },
  ];

  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const [transactions] = useState([
    {
      id: 1,
      date: "2025-05-01",
      description: "Invoice #123",
      debit: 5000,
      credit: 0,
    },
    {
      id: 2,
      date: "2025-05-02",
      description: "Payment Received",
      debit: 0,
      credit: 3000,
    },
    {
      id: 3,
      date: "2025-05-03",
      description: "Invoice #124",
      debit: 2000,
      credit: 0,
    },
  ]);

  let balance = openingBalance;
  const transactionsWithBalance = transactions.map((t) => {
    balance += t.debit - t.credit;
    return {
      ...t,
      formattedDate: new Date(t.date).toLocaleDateString("en-GB"),
      formattedDebit: t.debit > 0 ? `₹${t.debit.toFixed(2)}` : "-",
      formattedCredit: t.credit > 0 ? `₹${t.credit.toFixed(2)}` : "-",
      formattedBalance: `₹${balance.toFixed(2)}`,
    };
  });

  const summary = {
    totalDebit: transactions.reduce((sum, t) => sum + t.debit, 0),
    totalCredit: transactions.reduce((sum, t) => sum + t.credit, 0),
    closingBalance: balance,
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-sm h-full">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <p className="text-md text-[#737791] flex items-center gap-1">
            Transactions <FaChevronRight /> Customer Report
          </p>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Customer Report</h1>

          {/* Searchable Dropdown */}
          <div className="relative mb-4">
  <div className="flex items-center gap-2">
    <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
      Select Customer:
    </label>
    <input
      type="text"
      value={search}
      onClick={() => setShowDropdown(!showDropdown)}
      onChange={(e) => {
        setSearch(e.target.value);
        setShowDropdown(true);
      }}
      placeholder="Search customer..."
      className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
    />
  </div>

  {showDropdown && (
    <ul className="absolute z-10 bg-white border border-gray-200 mt-1 w-full max-h-40 overflow-y-auto rounded-md shadow">
      {filteredCustomers.length > 0 ? (
        filteredCustomers.map((customer) => (
          <li
            key={customer.id}
            onClick={() => {
              setSelectedCustomer(customer);
              setSearch(customer.name);
              setShowDropdown(false);
            }}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            {customer.name}
          </li>
        ))
      ) : (
        <li className="px-4 py-2 text-gray-500 italic">No match found</li>
      )}
    </ul>
  )}

  {selectedCustomer && (
    <p className="text-sm text-green-600 mt-2">
      Selected: <strong>{selectedCustomer.name}</strong>
    </p>
  )}
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
              value="2025-05-01"
              disabled
              className="px-3 py-2 rounded-md border border-gray-200 text-gray-500 bg-gray-100"
            />
            <span className="text-gray-500">to</span>
            <input
              type="date"
              value="2025-05-31"
              disabled
              className="px-3 py-2 rounded-md border border-gray-200 text-gray-500 bg-gray-100"
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
              <tr className="bg-blue-50 font-medium">
                <td className="p-4">{new Date().toLocaleDateString("en-GB")}</td>
                <td className="p-4">Opening Balance</td>
                <td className="p-4 text-right">-</td>
                <td className="p-4 text-right">-</td>
                <td className="p-4 text-right">₹{openingBalance.toFixed(2)}</td>
              </tr>

              {transactionsWithBalance.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-4">{item.formattedDate}</td>
                  <td className="p-4">{item.description}</td>
                  <td className="p-4 text-right">{item.formattedDebit}</td>
                  <td className="p-4 text-right">{item.formattedCredit}</td>
                  <td className="p-4 text-right">{item.formattedBalance}</td>
                </tr>
              ))}

              <tr className="bg-[#F0FDFA] font-semibold text-gray-700">
                <td className="p-4" colSpan="2">
                  Period Totals
                </td>
                <td className="p-4 text-right">₹{summary.totalDebit.toFixed(2)}</td>
                <td className="p-4 text-right">₹{summary.totalCredit.toFixed(2)}</td>
                <td className="p-4 text-right">₹{summary.closingBalance.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerReport;
