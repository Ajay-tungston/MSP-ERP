import {useState, useEffect} from "react";
import { FaPrint } from "react-icons/fa";
import Cashbooktable from "../Components/Cashbooktable"
import { FaChevronRight } from "react-icons/fa6";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const CashbookHeader = () => {
    const [startDate, setStartDate] = useState(""); // YYYY-MM-DD
    const [endDate, setEndDate] = useState("");
    const [transactions, setTransactions] = useState([]);
const axiosInstance = useAxiosPrivate()
const [page, setPage] = useState(1); // ✅ Pagination state
  const [limit] = useState(5); 
    const fetchCashbookData = async () => {
        if (!startDate || !endDate) return;
        try {
          const response = await axiosInstance.get("/admin/cashbook/report", {
            params: {
              startDate,
              endDate,
            },
          });
      

          setTransactions(response.data)
     
        } catch (error) {
          console.error("Failed to fetch cashbook:", error);
        }
      };
    
      useEffect(() => {
        fetchCashbookData();
      }, [startDate, endDate]);

        // You can calculate totals here if needed; for now, provide dummy pagination data
  const totalSales = transactions?.sales?.length || 0;
  const totalPurchases = transactions?.purchases?.length || 0;
  const totalPayments =
    (transactions?.paymentIns?.length || 0) +
    (transactions?.paymentOuts?.length || 0);

      const pagination = {
        currentPage: page,
        totalSales,
        totalPurchases,
        totalPayments,
      };
    return (
        <div className="p-6 bg-white rounded-md shadow-sm  mt-10">
            <div className="flex justify-between items-start flex-wrap gap-4">
                {/* Left: Title and balance */}
                <div>
                    <p className="text-sm text-gray-400 flex items-center gap-1">
                        Transactions <FaChevronRight /> Cashbook
                    </p>

                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Cashbook</h1>
                    <div className="flex items-center gap-3">
                        <span className="text-gray-400">Opening Cash Balance</span>
                        <div className="bg-blue-50 text-blue-600 font-medium px-4 py-2 rounded-md">
                            $ 5,000.00
                        </div>
                    </div>
                </div>

                {/* Right: Print + Date Range */}
                <div className="flex flex-col items-center gap-8 ">
                    {/* Print button */}
                    {/* <div className="pb-10 bg-green-800"> */}
                        <button className="flex items-center gap-2 px-4 py-2  bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-medium rounded-md shadow border border-gray-200">
                            <FaPrint className="text-lg" />
                            Print
                        </button>
                    {/* </div> */}
                    {/* Date range inputs */}
                    <div className="flex items-center gap-2 pr-20">
                        <div className="flex flex-col text-sm text-gray-400  ">
                            <div className="flex items-center gap-2">
                            <label className="mb-1">Date Range</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="px-3 py-2 rounded-md border border-gray-200 text-gray-700 bg-gray-50 focus:outline-none"
                                />
                                <span className="text-gray-500">to</span>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="px-3 py-2 rounded-md border border-gray-200 text-gray-700 bg-gray-50 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Cashbooktable transactions={transactions}
            pagination={pagination}
            page={page}
            setPage={setPage}
            limit={limit}/>
        </div>
    );
};

export default CashbookHeader;
