import React from "react";
import OvalSpinner from "../Components/spinners/OvalSpinner";

const TransactionTable = ({ 
  transactions, 
  pagination, 
  page, 
  setPage, 
  isLoading ,
  summary
}) => {
  const { 
    sales = [], 
    purchases = [], 
    paymentIns = [], 
    paymentOuts = [], 
    expenses = [] 
  } = transactions;

  // Calculate opening balance from props or default to 0
  const openingBalance = transactions?.openingBalance || 0;
  let runningBalance = openingBalance;

  // Normalize all transactions into a single array
  const allTransactions = [
    ...sales.map((item) => ({
      id: `sale_${item._id}`,
      date: item.dateOfSale,
      description: `Sale bill ${item.transactionNumber || ''}`,
      debit: 0,
      credit: item.totalAmount
      || 0,
      type: 'sale'
    })),
    ...purchases.map((item) => ({
      id: `purchase_${item._id}`,
      date: item.dateOfPurchase,
      description: `Purchase from ${item.supplier?.supplierName || "Unknown Supplier"}`,
      debit: item.grossTotalAmount || 0,
      credit: 0,
      type: 'purchase'
    })),
    ...paymentIns.map((item) => ({
      id: `paymentIn_${item._id}`,
      date: item.date,
      description: `Payment In from ${getPartyName(item)}`,
      debit: 0,
      credit: item.amount || 0,
      type: 'paymentIn'
    })),
    ...paymentOuts.map((item) => ({
      id: `paymentOut_${item._id}`,
      date: item.date,
      description: `Payment Out to ${getPartyName(item)}`,
      debit: item.amount || 0,
      credit: 0,
      type: 'paymentOut'
    })),
    ...expenses.map((item) => ({
      id: `expense_${item._id}`,
      date: item.date,
      description: `Expense for ${item.expenseType || item.description || "Unknown Expense"}`,
      debit: item.amount || 0,
      credit: 0,
      type: 'expense'
    }))
  ];

  // Helper function to get party name
  function getPartyName(item) {
    return item.customer?.customerName ||
           item.supplier?.supplierName ||
           item.company?.companyName ||
           item.employee?.employeeName ||
           item.otherPartyName ||
           "Unknown Party";
  }

  // Sort by date
  allTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Calculate running balance for each transaction
  const transactionsWithBalance = allTransactions.map(item => {
    runningBalance += (item.credit - item.debit);
    return {
      ...item,
      balance: runningBalance,
      formattedDate: new Date(item.date).toLocaleDateString('en-GB'),
      formattedDebit: item.debit ? `₹${item.debit.toFixed(2)}` : '-',
      formattedCredit: item.credit ? `₹${item.credit.toFixed(2)}` : '-',
      formattedBalance: `₹${runningBalance.toFixed(2)}`
    };
  });

  // Calculate totals
  const totalDebit = allTransactions.reduce((sum, item) => sum + item.debit, 0);
  const totalCredit = allTransactions.reduce((sum, item) => sum + item.credit, 0);
  const closingBalance = openingBalance + totalCredit - totalDebit;

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-left text-gray-700 font-semibold">
            <tr>
              <th className="p-4">Date</th>
              <th className="p-4">Description</th>
              <th className="p-4 text-right">Debit (₹)</th>
              <th className="p-4 text-right">Credit (₹)</th>
              <th className="p-4 text-right">Balance (₹)</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-500">
                  <OvalSpinner />
                </td>
              </tr>
            ) : transactionsWithBalance.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-500">
                  No transactions found for the selected period
                </td>
              </tr>
            ) : (
              <>
                {/* Opening Balance Row */}
                <tr className="bg-blue-50 font-medium">
                  <td className="p-4">{new Date().toLocaleDateString('en-GB')}</td>
                  <td className="p-4">Opening Balance</td>
                  <td className="p-4 text-right">-</td>
                  <td className="p-4 text-right">-</td>
                  <td className="p-4 text-right">₹{openingBalance.toFixed(2)}</td>
                </tr>
                
                {/* Transaction Rows */}
                {transactionsWithBalance.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-4">{item.formattedDate}</td>
                    <td className="p-4">{item.description}</td>
                    <td className="p-4 text-right">{item.formattedDebit}</td>
                    <td className="p-4 text-right">{item.formattedCredit}</td>
                    <td className="p-4 text-right">{item.formattedBalance}</td>
                  </tr>
                ))}
                
                {/* Totals Row */}
                <tr className="bg-green-50 font-semibold text-gray-700">
  <td className="p-4" colSpan="2">Period Totals</td>
  <td className="p-4 text-right">₹{summary.totalDebit.toFixed(2)}</td>
  <td className="p-4 text-right">₹{summary.totalCredit.toFixed(2)}</td>
  <td className="p-4 text-right">₹{summary.closingBalance.toFixed(2)}</td>
</tr>

              </>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        {!isLoading && transactionsWithBalance.length > 0 && (
          <div className="flex justify-between items-center mt-4 text-sm text-gray-700">
            <div>
              Page {page} of {pagination.totalPages} 
              {pagination.totalTransactions && (
                <span className="ml-2">({pagination.totalTransactions} total transactions)</span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-4 py-1 rounded-md bg-gray-100 text-gray-400 border border-gray-200 disabled:cursor-not-allowed hover:bg-gray-200"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, pagination.totalPages))}
                disabled={page === pagination.totalPages}
                className="px-4 py-1 rounded-md bg-white border border-gray-300 text-blue-600 font-medium hover:bg-blue-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionTable;