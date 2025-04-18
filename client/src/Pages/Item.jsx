import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiCirclePlus, CiFilter } from 'react-icons/ci';
import { GoTrash } from 'react-icons/go';
import { FaCheckSquare, FaRegSquare } from 'react-icons/fa';

export default function Commission() {
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();

  const commissions = [
    { id: '001', type: 'Banana',  },
    { id: '002', type: 'Apple',  },
    { id: '003', type: 'Banana',  },
    { id: '004', type: 'Apple',  },
    { id: '005', type: 'Apple', },
    { id: '006', type: 'Apple', },
    { id: '007', type: 'Apple',  },
    { id: '008', type: 'Apple', },
  ];

  const toggleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleAllRows = () => {
    if (selectedRows.length === commissions.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(commissions.map((item) => item.id));
    }
  };

  return (
    <div className="p-4 rounded-lg shadow-sm bg-white mt-5">
      <nav className="text-sm text-gray-500 mb-2 mt-10">
        <span>Master </span><span className="mx-1">›</span> Item<span className="text-gray-700"></span>
      </nav>

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Item</h1>
        <div className="flex space-x-3 -mt-10 mr-10">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-4 rounded-lg flex items-center gap-1"
            onClick={() => navigate('/add-item')}
          >
            <CiCirclePlus className="text-xl" /> Add New Item
          </button>
        </div>
      </div>

      <div className="flex space-x-3 float-right mt-5 mr-10">
        <button className="border border-red-500 text-red-500 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-100">
          <GoTrash className="text-lg" /> Delete
        </button>
        <button className="border border-gray-300 text-[#4079ED] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100">
          <CiFilter className="text-lg" /> Filter
        </button>
      </div>

      <div className="mt-20 bg-white">
        <table className="w-full border-collapse text-gray-900">
          <thead>
            <tr className="text-left text-gray-900 font-bold border-b-2 border-gray-200 bg-[#F9FAFB]">
              <th className="p-3">
                <button onClick={toggleAllRows} className="text-blue-600">
                  {selectedRows.length === commissions.length ? <FaCheckSquare size={20} /> : <FaRegSquare size={20} />}
                </button>
              </th>
              <th className="p-3">No.</th>
              <th className="p-3">Item Name</th>
              {/* <th className="p-3">Trxn. Type</th>
              <th className="p-3">Amount</th> */}
            </tr>
          </thead>
          <tbody>
            {commissions.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50 bg-white">
                <td className="p-3">
                  <button onClick={() => toggleRowSelection(item.id)} className="text-blue-600">
                    {selectedRows.includes(item.id) ? <FaCheckSquare size={20} /> : <FaRegSquare size={20} />}
                  </button>
                </td>
                <td className="p-3">{item.id}</td>
                <td className="p-3">{item.type}</td>
                <td className="p-3">{item.percentage}</td>
                <td className="p-3">{item.marketFee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}