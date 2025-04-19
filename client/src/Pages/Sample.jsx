import React from "react";
import { Calendar } from "lucide-react";

const transactions = [
  {
    date: "01/12/2024",
    description: "Opening Cash Balance",
    debit: "",
    credit: "",
    balance: "$5,000.00",
  },
  {
    date: "01/12/2024",
    description: "Purchase from Farm Fresh",
    debit: "$1,250.00",
    credit: "",
    balance: "$3,750.00",
  },
  {
    date: "01/12/2024",
    description: "Sales to GreenMart",
    debit: "",
    credit: "$510.00",
    balance: "$4,260.00",
  },
  {
    date: "01/12/2024",
    description: "Fuel Expense for Route 1",
    debit: "$120.00",
    credit: "",
    balance: "$4,140.00",
  },
];

const Sample = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="text-sm text-gray-500 mb-2">Transactions &gt; Cashbook</div>
      <h1 className="text-2xl font-bold mb-6">Cashbook</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="bg-white rounded-md shadow px-4 py-2">
          <p className="text-sm text-gray-400">Opening Cash Balance</p>
          <p className="text-blue-600 font-semibold">$ 5,000.00</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="text-gray-400" />
          <input
            type="date"
            className="border rounded px-2 py-1 text-sm"
            placeholder="Date Range"
          />
        </div>
        <div className="ml-auto flex gap-2">
          <button variant="outline">Export as</button>
          <button variant="outline">Print</button>
        </div>
      </div>

      <div className="bg-white rounded-md shadow overflow-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2"><input type="checkbox" checked readOnly /></th>
              <th className="px-4 py-2 font-semibold">Date</th>
              <th className="px-4 py-2 font-semibold">Description</th>
              <th className="px-4 py-2 font-semibold">Debit ($)</th>
              <th className="px-4 py-2 font-semibold">Credit ($)</th>
              <th className="px-4 py-2 font-semibold">Balance ($)</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((item, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-4 py-2"><input type="checkbox" checked readOnly /></td>
                <td className="px-4 py-2">{item.date}</td>
                <td className="px-4 py-2">{item.description}</td>
                <td className="px-4 py-2">{item.debit}</td>
                <td className="px-4 py-2">{item.credit}</td>
                <td className="px-4 py-2">{item.balance}</td>
              </tr>
            ))}
            <tr className="bg-green-50 font-semibold border-t">
              <td colSpan="3" className="px-4 py-2 text-gray-500">Total</td>
              <td className="px-4 py-2">$1,370.00</td>
              <td className="px-4 py-2">$510.00</td>
              <td className="px-4 py-2">$4,140.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between text-sm text-gray-500">
        <span>Page 1 of 10</span>
        <div className="flex gap-2">
          <button variant="outline" disabled>Previous</button>
          <button variant="default">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Sample;
