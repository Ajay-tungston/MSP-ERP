// import { useState } from "react";
import { Bookmark, X } from "lucide-react";
import { useState } from "react";

const NewSaleTableModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const salesData = [
    { name: 'Pranav kumar', customer: '1254551236', address: 'dummy at fortkochigfg', date: '01/12/2024' },
    { name: 'Ajay kumar ys', customer: '6362565245', address: 'dummy at fortkochiafaf', date: '01/12/2024' },
    { name: 'Pranav kumar', customer: '1254551236', address: 'dummy at fortkochigfg', date: '01/12/2024' },
    { name: 'Ajay kumar ys', customer: '6362565245', address: 'dummy at fortkochiafaf', date: '01/12/2024' },
    { name: 'Ajay kumar ys', customer: '6362565245', address: 'dummy at fortkochiafaf', date: '01/12/2024' },
  ];

  return (
    <div className="p-6">
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Add New Sale
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
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
                        <button className="text-purple-500 hover:text-purple-700">
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

export default NewSaleTableModal;
