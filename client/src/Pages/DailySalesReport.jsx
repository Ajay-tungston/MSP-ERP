import { useState, useRef, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { BsPrinter } from "react-icons/bs";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { printMultipleCustomerSalesReport } from "../utils/dailySalesReports";

export default function DailySaleReport() {
  const [date, setDate] = useState('');
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const printRef = useRef();
  const axiosInstance = useAxiosPrivate();

  const fetchData = async () => {
  if (!date) return;
  try {
    setLoading(true);
    const response = await axiosInstance.get("/admin/sales/getAllCustomerSalesByDate", {
      params: { date },
    });
    setSalesData(response.data?.customers || []);
  } catch (error) {
    console.error("Error fetching daily sales:", error);
    setSalesData([]); // Clear data on failure
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    if (date) fetchData();
  }, [date]);

  const handlePrint = () => {
    printMultipleCustomerSalesReport(salesData, date);
  };

  const calculateQuantities = (items) => {
    let totalBox = 0;
    let totalKg = 0;

    items.forEach((item) => {
      if (item["Qty (Box)"] !== "-" && item["Qty (Box)"] != null) {
        totalBox += parseFloat(item["Qty (Box)"]) || 0;
      }
      if (item["Qty (KG)"] !== "-" && item["Qty (KG)"] != null) {
        totalKg += parseFloat(item["Qty (KG)"]) || 0;
      }
    });

    return { totalBox, totalKg };
  };

  return (
    <div className="p-6 rounded-3xl shadow-md h-[800px] bg-white">
      {/* Breadcrumb */}
      <nav className="flex items-center text-md text-[#737791] gap-2 mb-2">
        <span>Report</span>
        <FaChevronRight />
        <span className="text-[#737791]">Daily sales Report</span>
      </nav>

      <h1 className="text-3xl font-bold text-[#151D48] mb-6">Daily sales Report</h1>

      <div className="flex space-x-3 -mt-10 float-right">
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-lg flex items-center gap-2"
          onClick={handlePrint}
        >
          <BsPrinter className="text-xl font-bold" /> Print
        </button>
      </div>

      {/* Date Picker */}
      <div className="relative max-w-md mt-4">
        <input
          type="date"
          value={date}
          autoComplete="off"
          onChange={(e) => setDate(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Loading */}
      {loading && <div className="mt-4 text-blue-600 font-medium">Loading...</div>}

      {/* Table */}
      {!loading && salesData.length > 0 && (
        <div className="bg-white mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-gray-900">
            <thead>
              <tr className="text-left text-gray-900 font-bold border-b-2 border-gray-200 bg-[#F9FAFB]">
                <th className="p-3">No.</th>
                <th className="p-3">Customer Name</th>
                <th className="p-3">Qty (Box)</th>
                <th className="p-3">Qty (KG)</th>
                <th className="p-3">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((cust, index) => {
                const { totalBox, totalKg } = calculateQuantities(cust.items || []);
                return (
                  <tr key={cust.customerId} className="border-b border-gray-200 hover:bg-gray-50 bg-white">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{cust.customerName}</td>
                    <td className="p-3">{totalBox.toFixed(2)}</td>
                    <td className="p-3">{totalKg.toFixed(2)}</td>
                    <td className="p-3 font-semibold text-indigo-600">₹{cust.dailyTotal.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {!loading && salesData.length === 0 && date && (
        <div className="mt-6 text-gray-500 text-center">No sales data found for the selected date.</div>
      )}
    </div>
  );
}
