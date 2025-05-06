import React from "react";
import OvalSpinner from "../Components/spinners/OvalSpinner";

const TransactionTable = ({ transactions, pagination, page, setPage, limit, isLoading }) => {
  const openingBalance = transactions?.openingBalance || 0;
  let runningBalance = openingBalance;

  // Normalize all transactions, including expenses
  const allTransactions = [
    ...(transactions?.sales || []).map((item) => ({
      date: item.dateOfSale,
      description: "Sale bill",
      debit: 0,
      credit: item.grandTotal,
    })),
    ...(transactions?.purchases || []).map((item) => ({
      date: item.dateOfPurchase,
      description: `Purchase from ${item.supplier?.supplierName || "Unknown Supplier"}`,
      debit: item.grandTotal,
      credit: 0,
    })),
    ...(transactions?.paymentIns || []).map((item) => {
      const name =
        item.customer?.customerName ||
        item.company?.companyName ||
        item.employee?.employeeName ||
        item.otherPartyName ||
        "Unknown Source";
      return {
        date: item.date,
        description: `Payment In from ${name}`,
        debit: 0,
        credit: item.amount,
      };
    }),
    ...(transactions?.paymentOuts || []).map((item) => {
      const name =
        item.supplier?.supplierName ||
        item.company?.companyName ||
        item.employee?.employeeName ||
        item.otherPartyName ||
        "Unknown Receiver";
      return {
        date: item.date,
        description: `Payment Out to ${name}`,
        debit: item.amount,
        credit: 0,
      };
    }),
    ...(transactions?.expenses || []).map((item) => ({
      date: item.date,
      description:` Expense for                                                                                                                                                                                          ${item.expense || "Unknown Expense"}`,
      debit: item.amount || 0,
      credit: 0,
    })),
  ];

  // Sort by date
  allTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Calculate full totals BEFORE pagination
  let fullBalance = openingBalance;
  let fullDebit = 0;
  let fullCredit = 0;

  allTransactions.forEach((item) => {
    fullDebit += item.debit || 0;
    fullCredit += item.credit || 0;
    fullBalance += (item.credit || 0) - (item.debit || 0);
  });

  // Pagination setup
  const totalPages = Math.ceil((allTransactions.length + 1) / limit); // +1 for opening balance row
  const startIdx = (page - 1) * limit;
  const endIdx = page * limit;

  // Build paginated data with running balance
  let paginatedRunningBalance = openingBalance;
  const formattedRows = [];

  // Opening balance row on first page
  if (startIdx === 0) {
    formattedRows.push({
      date: "",
      description: "Opening Balance",
      debit: "",
      credit: "",
      balance: `$${openingBalance.toFixed(2)}`,
      isOpening: true,
    });
  }

  allTransactions.forEach((item, index) => {
    const itemIndex = index + 1; // Offset for opening balance row
    if (itemIndex >= startIdx && itemIndex < endIdx) {
      if (item.debit) paginatedRunningBalance -= item.debit;
      if (item.credit) paginatedRunningBalance += item.credit;

      formattedRows.push({
        ...item,
        date: new Date(item.date).toLocaleDateString("en-GB"),
        debit: item.debit ? `$${item.debit.toFixed(2)}` : "",
        credit: item.credit ? `$${item.credit.toFixed(2)}` : "",
        balance: `$${paginatedRunningBalance.toFixed(2)}`,
      });
    } else {
      // Still calculate balance even for skipped rows to maintain accuracy
      paginatedRunningBalance += (item.credit || 0) - (item.debit || 0);
    }
  });

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-left text-gray-700 font-semibold">
            <tr>
              <th className="p-4"></th>
              <th className="p-4">Date</th>
              <th className="p-4">Description</th>
              <th className="p-4 text-right">Debit ($)</th>
              <th className="p-4 text-right">Credit ($)</th>
              <th className="p-4 text-right">Balance ($)</th>
            </tr>
          </thead>
         <tbody className="bg-white divide-y divide-gray-100">
  {isLoading ? (
    <tr>
      <td colSpan="6" className="text-center py-10 text-gray-500">
        <OvalSpinner />
      </td>
    </tr>
  ) : formattedRows.length === 0 ? (
    <tr>
      <td colSpan="6" className="text-center py-10 text-gray-500">
        No data available
      </td>
    </tr>
  ) : (
    <>
      {formattedRows.map((item, index) => (
        <tr key={index} className={item.isOpening ? "bg-blue-50 font-medium" : ""}>
          <td className="p-4">
            {!item.isOpening && (
              <input
                type="checkbox"
                className="w-5 h-5 text-blue-500 border-blue-500 rounded-sm focus:ring-blue-500"
              />
            )}
          </td>
          <td className="p-4">{item.date}</td>
          <td className="p-4">{item.description}</td>
          <td className="p-4 text-right">{item.debit}</td>
          <td className="p-4 text-right">{item.credit}</td>
          <td className="p-4 text-right">{item.balance}</td>
        </tr>
      ))}
      <tr className="bg-green-50 font-semibold text-gray-700">
        <td className="p-4" colSpan="3">Total (All)</td>
        <td className="p-4 text-right">${fullDebit.toFixed(2)}</td>
        <td className="p-4 text-right">${fullCredit.toFixed(2)}</td>
        <td className="p-4 text-right">${fullBalance.toFixed(2)}</td>
      </tr>
    </>
  )}
</tbody>

        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-700">
          <div>
            Page {page} of {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-1 rounded-md bg-gray-100 text-gray-400 border border-gray-200 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-1 rounded-md bg-white border border-gray-300 text-blue-600 font-medium hover:bg-blue-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
