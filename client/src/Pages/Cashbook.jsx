import { useState, useEffect } from "react";
import { FaPrint } from "react-icons/fa";
import Cashbooktable from "../Components/Cashbooktable";
import { FaChevronRight } from "react-icons/fa6";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { BsPrinter } from "react-icons/bs";
import OvalSpinner from "../Components/spinners/OvalSpinner";
const CashbookHeader = () => {
  const getToday = () => new Date().toISOString().split("T")[0]; 
  const [startDate, setStartDate] = useState(getToday());
  const [endDate, setEndDate] = useState(getToday());
  const [transactions, setTransactions] = useState({
    sales: [],
    purchases: [],
    paymentIns: [],
    paymentOuts: [],
    expenses: []
  });
  console.log("transactions=",transactions)
  const [openingBalance, setOpeningBalance] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalTransactions: 0,
    currentPage: 1
  });

  const axiosInstance = useAxiosPrivate();
  const [printLoading, setPrintLoading] = useState(false);
  const fetchCashbookData = async () => {
    if (!startDate || !endDate) return;

    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/admin/cashbook/report", {
        params: { startDate, endDate, page, limit },
      });
      
      setTransactions({
        sales: response.data.sales || [],
        purchases: response.data.purchases || [],
        paymentIns: response.data.paymentIns || [],
        paymentOuts: response.data.paymentOuts || [],
        expenses: response.data.expenses || []

      });
      console.log(response)
      setOpeningBalance(response.data.openingBalance || 0);
      
      setPaginationInfo({
        totalPages: response.data.pagination?.totalPages || 1,
        totalTransactions: response.data.pagination?.totalTransactions || 0,
        currentPage: page
      });
      
    } catch (error) {
      console.error("Failed to fetch cashbook:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const [summary, setSummary] = useState({
    totalCredit: 0,
    totalDebit: 0,
    closingBalance: 0
  });
  const fetchCashbookSummary = async () => {
    if (!startDate || !endDate) return;
  
    try {
      const response = await axiosInstance.get("/admin/cashbook/summary", {
        params: { startDate, endDate }
      });
  
      setSummary({
        totalCredit: response.data.totalCredit || 0,
        totalDebit: response.data.totalDebit || 0,
        closingBalance: response.data.closingBalance || 0
      });
    } catch (error) {
      console.error("Failed to fetch cashbook summary:", error);
    }
  };
    
  useEffect(() => {
    fetchCashbookData();
    fetchCashbookSummary();
  }, [startDate, endDate, page]);

  const handlePrint = async () => {
    setPrintLoading(true);
    try {
      const response = await axiosInstance.get("/admin/cashbook/report", {
        params: { startDate, endDate, page: 1, limit: 100000 }, // no pagination
      });
  
      const allTransactions = {
        sales: response.data.sales || [],
        purchases: response.data.purchases || [],
        paymentIns: response.data.paymentIns || [],
        paymentOuts: response.data.paymentOuts || [],
        expenses: response.data.expenses || [],
        openingBalance: response.data.openingBalance || 0
      };
  
      const summaryResponse = await axiosInstance.get("/admin/cashbook/summary", {
        params: { startDate, endDate }
      });
  
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
        <html>
          <head>
            <title>Cashbook Report</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ccc; padding: 8px; text-align: right; }
              th { background: #f0f0f0; text-align: left; }
              .text-left { text-align: left; }
              .highlight { background-color: #f9f9f9; font-weight: bold; }
              .totals { background-color: #e6f7ff; font-weight: bold; }
            </style>
          </head>
          <body>
            <h2>Cashbook Report</h2>
            <p><strong>Date Range:</strong> ${startDate} to ${endDate}</p>
            <p><strong>Opening Balance:</strong> ₹${allTransactions.openingBalance.toFixed(2)}</p>
  
            <table>
              <thead>
                <tr>
                  <th class="text-left">Date</th>
                  <th class="text-left">Description</th>
                  <th>Debit (₹)</th>
                  <th>Credit (₹)</th>
                  <th>Balance (₹)</th>
                </tr>
              </thead>
              <tbody>
      `);
  
      let runningBalance = allTransactions.openingBalance;
      let all = [];
  
      const format = (dateStr) => new Date(dateStr).toLocaleDateString("en-GB");
      const push = (item) => all.push(item);
  
      allTransactions.sales.forEach(item =>
        push({ date: item.dateOfSale, desc: `Sale bill ${item.transactionNumber || ''}`, debit: 0, credit: item.totalAmount || 0 })
      );
      allTransactions.purchases.forEach(item =>
        push({ date: item.dateOfPurchase, desc: `Purchase from ${item.supplier?.supplierName || 'Unknown Supplier'}`, debit: item.grossTotalAmount || 0, credit: 0 })
      );
      allTransactions.paymentIns.forEach(item =>
        push({ date: item.date, desc: `Payment In from ${getPartyName(item)}`, debit: 0, credit: item.amount || 0 })
      );
      allTransactions.paymentOuts.forEach(item =>
        push({ date: item.date, desc: `Payment Out to ${getPartyName(item)}`, debit: item.amount || 0, credit: 0 })
      );
      allTransactions.expenses.forEach(item =>
        push({ date: item.date, desc: `Expense for ${item.expenseType || item.description || 'Unknown'}`, debit: item.amount || 0, credit: 0 })
      );
  
      all.sort((a, b) => new Date(a.date) - new Date(b.date));
  
      // Opening Balance row
      printWindow.document.write(`
        <tr class="highlight">
          <td>${format(new Date())}</td>
          <td class="text-left">Opening Balance</td>
          <td>-</td>
          <td>-</td>
          <td>₹${runningBalance.toFixed(2)}</td>
        </tr>
      `);
  
      all.forEach((t) => {
        runningBalance += (t.credit - t.debit);
        printWindow.document.write(`
          <tr>
            <td>${format(t.date)}</td>
            <td class="text-left">${t.desc}</td>
            <td>${t.debit ? `₹${t.debit.toFixed(2)}` : '-'}</td>
            <td>${t.credit ? `₹${t.credit.toFixed(2)}` : '-'}</td>
            <td>₹${runningBalance.toFixed(2)}</td>
          </tr>
        `);
      });
  
      printWindow.document.write(`
        <tr class="totals">
          <td colspan="2" class="text-left">Totals</td>
          <td>₹${summaryResponse.data.totalDebit.toFixed(2)}</td>
          <td>₹${summaryResponse.data.totalCredit.toFixed(2)}</td>
          <td>₹${summaryResponse.data.closingBalance.toFixed(2)}</td>
        </tr>
      `);
  
      printWindow.document.write(`
              </tbody>
            </table>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    } catch (err) {
      console.error("Print error:", err);
    }finally{
      setPrintLoading(false);
    }
  };
  
  // Helper function
  const getPartyName = (item) => {
    return item.customer?.customerName ||
      item.supplier?.supplierName ||
      item.company?.companyName ||
      item.employee?.employeeName ||
      item.vehicle?.vehicleName ||
      item.expense?.expense ||
      item.lender?.name ||
      item.otherPartyName ||
      "Unknown Party";
  };
  

  return (
    <>
    {printLoading && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm">
        <OvalSpinner />
      </div>
    )}
    <div className="p-6 bg-white rounded-md shadow-sm h-full">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <p className="text-md text-[#737791] flex items-center gap-1">
            Transactions <FaChevronRight /> Cashbook
          </p>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Cashbook</h1>
          <div className="flex items-center gap-3">
            <span className="text-gray-400">Opening Cash Balance</span>
            <div className="bg-blue-50 text-blue-600 font-medium px-4 py-2 rounded-md">
             ₹ {openingBalance.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Print + Date */}
        <div className="flex flex-col items-center gap-8">
          <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-medium rounded-md shadow border border-gray-200">
            <BsPrinter className="text-lg" />
            Print
          </button>
          <div className="flex items-center gap-2">
      <label className="mb-1">Date Range</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => {
          setStartDate(e.target.value || getToday());
          setPage(1); // Reset to first page when date changes
        }}
        className="px-3 py-2 rounded-md border border-gray-200 text-gray-700 bg-gray-50 focus:outline-none"
      />
      <span className="text-gray-500">to</span>
      <input
        type="date"
        value={endDate}
        onChange={(e) => {
          setEndDate(e.target.value || getToday());
          setPage(1); // Reset to first page when date changes
        }}
        className="px-3 py-2 rounded-md border border-gray-200 text-gray-700 bg-gray-50 focus:outline-none"
      />
    </div>
        </div>
      </div>

      {/* 📊 Cashbook Table */}
      <Cashbooktable
        transactions={transactions}
        pagination={paginationInfo}
        page={page}
        setPage={setPage}
        limit={limit}
        isLoading={isLoading}
        summary={summary}
      />
    </div>
    </>
  );
};

export default CashbookHeader;