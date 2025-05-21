import { useState, useEffect } from "react";
import { FaPrint } from "react-icons/fa";
import Cashbooktable from "../Components/Cashbooktable";
import { FaChevronRight } from "react-icons/fa6";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

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

  return (
    <div className="p-6 bg-white rounded-md shadow-sm mt-10">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <p className="text-sm text-gray-400 flex items-center gap-1">
            Transactions <FaChevronRight /> Cashbook
          </p>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Cashbook</h1>
          <div className="flex items-center gap-3">
            <span className="text-gray-400">Opening Cash Balance</span>
            <div className="bg-blue-50 text-blue-600 font-medium px-4 py-2 rounded-md">
              $ {openingBalance.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Print + Date */}
        <div className="flex flex-col items-center gap-8">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-medium rounded-md shadow border border-gray-200">
            <FaPrint className="text-lg" />
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
  );
};

export default CashbookHeader;