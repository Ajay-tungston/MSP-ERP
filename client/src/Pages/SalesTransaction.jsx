// import { Plus, X } from "lucide-react";
import { Plus, } from "lucide-react";
import { useState } from "react";
import { Bookmark, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
const SalesRegister = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const salesData = [
    {
      no: "001",
      supplier: "Farm Fresh",
      qtyKG: "10",
      qtyBox: "-",
      unitPrice: "$1.00",
      subtotal: "$200.00",
    },
    {
      no: "002",
      supplier: "Green Supply",
      qtyKG: "-",
      qtyBox: "2",
      unitPrice: "$100.00",
      subtotal: "$200.00",
    },
  ];
const navigate=useNavigate()
  return (
    <div className="p-6 bg-white mt-10">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <div className="text-[20px] text-gray-500 mt-10 ">Transactions / Sales</div>
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
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-[20px] font-medium text-gray-500">No.</th>
              <th className="px-6 py-3 text-left text-[20px] font-medium text-gray-500">Supplier</th>
              <th className="px-6 py-3 text-left text-[20px] font-medium text-gray-500">Qty (KG)</th>
              <th className="px-6 py-3 text-left text-[20px] font-medium text-gray-500">Qty (Box)</th>
              <th className="px-6 py-3 text-left text-[20px] font-medium text-gray-500">Unit Price</th>
              <th className="px-6 py-3 text-left text-[20px] font-medium text-gray-500">Subtotal</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {salesData.map((sale) => (
              <tr key={sale.no}>
                <td className="px-6 py-4 text-sm text-gray-900">{sale.no}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{sale.supplier}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{sale.qtyKG}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{sale.qtyBox}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{sale.unitPrice}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{sale.subtotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-white bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              
            </button>

            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">New sale</h1>
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex items-center gap-2 px-4 py-2 border border-blue-500 text-blue-600 rounded-full hover:bg-blue-100 transition"
              >
                <span className="text-lg">←</span> Return
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full rounded-md overflow-hidden text-sm text-left">
                <thead className="bg-[#EEEEEE] text-black font-semibold">
                  <tr>
                    <th className="px-4 py-2">No</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Customer C</th>
                    <th className="px-4 py-2">Address</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2 text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.map((item, index) => (
                    <tr
                      key={index}
                      style={{ borderBottom: '0.5px solid #73779166' }}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-[#EEEEEE]'}
                    >
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{item.name}</td>
                      <td className="px-4 py-2">{item.customer}</td>
                      <td className="px-4 py-2">{item.address}</td>
                      <td className="px-4 py-2">{item.date}</td>
                      <td className="px-4 py-2 text-center">
                        <button className="text-[#ec2626] hover:text-purple-700" onClick={()=>navigate('/sales')}>
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
