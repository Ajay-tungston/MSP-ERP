import { useState } from 'react'
import { CiCirclePlus } from "react-icons/ci";
import { CiFilter } from 'react-icons/ci';
import { GoTrash } from "react-icons/go";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa"; // For styled checkboxes
export default function CustomerHeader() {
    const [selectedRows, setSelectedRows] = useState([]);
    const customers = [
        { id: "001", name: "GreenMart", route: "123 Main St", phone: "987654321", whatsapp: "987654321", discount: "5%", freq: "Monthly/Auto", balance: "$200.00",  },
        { id: "002", name: "LocalMart", route: "123 Main St", phone: "987654321", whatsapp: "987654321", discount: "5%", freq: "Monthly/Auto", balance: "$200.00",  },
        { id: "003", name: "GreenMart", route: "123 Main St", phone: "987654321", whatsapp: "987654321", discount: "5%", freq: "Monthly/Auto", balance: "$200.00",  },
        { id: "004", name: "LocalMart", route: "123 Main St", phone: "987654321", whatsapp: "987654321", discount: "5%", freq: "Monthly/Auto", balance: "$200.00",  },
    ];
    const toggleRowSelection = (id) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        );
    };

    const toggleAllRows = () => {
        if (selectedRows.length === customers.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(customers.map((customer) => customer.id));
        }
    };

    return (
        <div className=" p-4 rounded-lg shadow-sm h-[800px] bg-white mt-5">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500 mb-2  mt-10">
                <span>Master</span> <span className="mx-1">›</span> <span className="text-gray-700">Customer</span>
            </nav>

            {/* Header & Buttons */}
            <div className="flex justify-between items-center ">
                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-900">Customer</h1>
                {/* Buttons */}
                <div className="flex space-x-3 -mt-10  mr-10 ">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-lg flex items-center gap-2 ">
                        <CiCirclePlus className="text-xl " /> Add New Customer
                    </button>
                </div>
            </div>
            <div className="flex space-x-3 float-right mt-5 mr-10">
                <button className="border border-red-500 text-red-500 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-100 font-Urbanist">
                    <GoTrash className="text-lg" /> Delete
                </button>
                <button className="border border-gray-300 text-[#4079ED] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100">
                    <CiFilter classname="text-lg " /> Filter
                </button>
            </div>
  <div className=" mt-20 bg-white ">
      <table className="w-full border-collapse text-gray-900">
        {/* Table Header */}
        <thead>
          <tr className="text-left text-gray-900 font-bold border-b-2 border-gray-200 bg-[#F9FAFB] ">
            <th className="p-3">
              <button onClick={toggleAllRows} className="text-blue-600">
                {selectedRows.length === customers.length ? <FaCheckSquare size={20} /> : <FaRegSquare size={20} />}
              </button>
            </th>
            <th className="p-3">No.</th>
            <th className="p-3">Name</th>
            <th className="p-3">Route</th>
            <th className="p-3">Phone</th>
            <th className="p-3">WhatsApp</th>
            <th className="p-3">Discount %</th>
            <th className="p-3">Discount Freq.</th>
            <th className="p-3">Opening Bal.</th>
      
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="border-b border-gray-200 hover:bg-gray-50 bg-white">
              <td className="p-3">
                <button onClick={() => toggleRowSelection(customer.id)} className="text-blue-600">
                  {selectedRows.includes(customer.id) ? <FaCheckSquare size={20} /> : <FaRegSquare size={20} />}
                </button>
              </td>
              <td className="p-3">{customer.id}</td>
              <td className="p-3">{customer.name}</td>
              <td className="p-3">{customer.route}</td>
              <td className="p-3">{customer.phone}</td>
              <td className="p-3">{customer.whatsapp}</td>
              <td className="p-3">{customer.discount}</td>
              <td className="p-3">{customer.freq}</td>
              <td className="p-3">{customer.balance}</td>
            
            </tr>
          ))}
        </tbody>
      </table>
    </div>
          
            {/* Pagination */}
            <div className="flex justify-between items-center mt-68 text-gray-600 ml-10">
                <span>Page 1 of 10</span>
                <div className="flex space-x-2">
                    <button className="px-4 py-2 text-gray-400 border border-gray-300 rounded-lg cursor-not-allowed">
                        Previous
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
                        Next
                    </button>
                </div>

            </div>
        </div>

       




    );
}
