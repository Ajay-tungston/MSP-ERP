// import { Plus, X } from "lucide-react";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Bookmark, X } from "lucide-react";
import { Await, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const SalesRegister = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosInstance = useAxiosPrivate();
  const [purchaseData, setPurchaseData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchIncompletePurchases = async () => {
      try {
        const response = await axiosInstance.get("/admin/purchase/incomplete");
        setPurchaseData(response.data);
      } catch (error) {
        console.log("Error fetching incomplete purchases", error);
      }
    };

    fetchIncompletePurchases();
  }, []);
  useEffect(() => {
    const fetchSales = async (page = 1) => {
      try {
        const limit = 10;
        const res = await axiosInstance.get(`/admin/sales/get?page=${page}&limit=${limit}`);
        const data=res.data
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
        const supplierMap = new Map();
  
        res.data.entries.forEach(({ transactionNumber, dateOfSale, customers }) => {
          const formattedDate = new Date(dateOfSale).toLocaleDateString();
  
          customers.forEach(({ items }) => {
            items.forEach(({ supplier, quantityType, quantity, totalCost }) => {
              const supplierName = supplier.supplierName;
              const key = `${transactionNumber}_${supplierName}_${dateOfSale}`;
  
              if (!supplierMap.has(key)) {
                supplierMap.set(key, {
                  transactionNumber,
                  dateOfSale: formattedDate,
                  supplier: supplierName,
                  qtyKG: 0,
                  qtyBox: 0,
                  totalAmount: 0,
                });
              }
  
              const entry = supplierMap.get(key);
  
              if (quantityType === "kg") {
                entry.qtyKG += quantity;
              } else if (quantityType === "box") {
                entry.qtyBox += quantity;
              }
  
              entry.totalAmount += totalCost;
            });
          });
        });
  
        // Add numbering after flattening
        const formatted = Array.from(supplierMap.values()).map((entry, idx) => ({
          no: idx + 1,
          ...entry,
        }));
  
        setSalesData(formatted);
      } catch (error) {
        console.error("Error fetching sales", error);
      }
    };
  
    fetchSales();
  }, []);
  
  
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  

  const navigate = useNavigate();
  return (
    <div className="p-6 bg-white mt-10 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <div className="text-[20px] text-gray-500 mt-10 ">
            Transactions / Sales
          </div>
          <h1 className="text-[32px] font-semibold">Sales register</h1>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-[20px] flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add new sale
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-[#F9FAFB]">
          <tr>
            <th className="px-6 py-3 text-left text-[16px] font-medium text-gray-500">No.</th>
            <th className="px-6 py-3 text-left text-[16px] font-medium text-gray-500">Transaction No.</th>
            <th className="px-6 py-3 text-left text-[16px] font-medium text-gray-500">Date of Sale</th>
            <th className="px-6 py-3 text-left text-[16px] font-medium text-gray-500">Supplier</th>
            <th className="px-6 py-3 text-left text-[16px] font-medium text-gray-500">Qty (KG)</th>
            <th className="px-6 py-3 text-left text-[16px] font-medium text-gray-500">Qty (Box)</th>
            <th className="px-6 py-3 text-left text-[16px] font-medium text-gray-500">Total Amount</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {salesData.map((sale) => (
            <tr key={sale.no}>
              <td className="px-6 py-4 text-sm text-gray-900">{sale.no}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{sale.transactionNumber}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{sale.dateOfSale}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{sale.supplier}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{sale.qtyKG || "-"}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{sale.qtyBox || "-"}</td>
              <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                ₹ {sale.totalAmount.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
</div>
<div className="flex justify-between items-center mt-[73px] text-gray-600 ml-10 mr-30">
          <span>Page {currentPage} of {totalPages}</span>
          <div className="flex space-x-2">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`px-4 py-2 border border-gray-300 rounded-lg ${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border border-gray-300 rounded-lg ${
                currentPage === totalPages
                  ? "text-[#4079ED] cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </div>
        </div>


      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-white bg-opacity-50 flex items-center justify-center">
          <div className="bg-[white] rounded-lg shadow-xl max-w-4xl w-full p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            ></button>

            <div className="flex  justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">New sale</h1>
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex items-center gap-2 px-4 py-2 border border-blue-500 text-blue-600 rounded-full hover:bg-blue-100 transition"
              >
                <span className="text-lg">←</span> Return
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full rounded-md  overflow-hidden text-sm text-left">
                <thead className="bg-[#EEEEEE] text-black font-semibold">
                  <tr>
                    <th className="px-4 py-2">No</th>
                    <th className="px-4 py-2">Purchase No</th>
                    <th className="px-4 py-2">Supplier Name</th>
                    <th className="px-4 py-2">Supplier Address</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseData.map((item, index) => (
                    <tr
                      key={item._id}
                      style={{ borderBottom: "0.5px solid #73779166" }}
                      className={index % 2 === 0 ? "bg-white" : "bg-[#EEEEEE]"}
                    >
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{item.purchaseNumber}</td>
                      <td className="px-4 py-2">
                        {item.supplier?.supplierName || "N/A"}
                      </td>
                      <td className="px-4 py-2">
                        {item.supplier?.address || "N/A"}
                      </td>
                      <td className="px-4 py-2">
                        {new Date(item.dateOfPurchase).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button
                          className="text-[#ec2626] hover:text-purple-700"
                          onClick={() => navigate(`/sales/${item._id}`)}
                        >
                          <Bookmark size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesRegister;
