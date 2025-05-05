import { useState } from 'react';
import { CiCirclePlus } from "react-icons/ci";
import { TbPencilMinus } from "react-icons/tb";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import AddExpense from "./AddExpense"

function Expenses() {
    const [selectedRows, setSelectedRows] = useState([]);
    const customers = [
        { id: "001", expense: "GreenMart", amount: "23455", date: "11/1/2025" },
        { id: "002", expense: "LocalMart", amount: "64576", date: "11/1/2025" },
        { id: "003", expense: "GreenMart", amount: "64576", date: "11/1/2025" },
        { id: "004", expense: "LocalMart", amount: "64576", date: "11/1/2025" },
    ];
    const [popup,setPopup]=useState(false)
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
        <>
        <div className={`p-4 rounded-lg shadow-sm h-[800px] bg-white mt-5 ${popup ? 'backdrop-blur-xl':''}`}>
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500 mb-2 mt-10">
            <span>Master</span>
  <span className="mx-1">
    <FaChevronRight className="inline-block" />
  </span>
  <span className="text-gray-700">Customer</span>
            </nav>

            {/* Header & Buttons */}
           <div className="flex justify-between items-center ">
                          {/* Title */}
                          <h1 className="text-2xl font-bold text-gray-900">Customer</h1>
                          {/* Buttons */}
                          <div className="flex space-x-3 -mt-10  mr-10 "  onClick={()=>setPopup(true)}>
                              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-lg flex items-center gap-2 ">
                                  <CiCirclePlus className="text-xl " /> Add New Customer
                              </button>
                          </div>
                      </div>
                     

            {/* Table */}
            <div className="mt-20 bg-white">
                <table className="w-full border-collapse text-gray-900">
                    <thead>
                        <tr className="text-left text-gray-900 font-bold border-b-2 border-gray-200 bg-[#F9FAFB]">
                            <th className="p-3">
                                <button onClick={toggleAllRows} className="text-blue-600">
                                    {selectedRows.length === customers.length ? <FaCheckSquare size={20} /> : <FaRegSquare size={20} />}
                                </button>
                            </th>
                            <th className="p-3">No.</th>
                            <th className="p-3">Expense Type</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Date</th>
                            <th className="p-3"></th>
                            <th className="p-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.id} className="border-b border-gray-200 hover:bg-gray-50 bg-white">
                                <td className="p-3">
                                    <button onClick={() => toggleRowSelection(customer.id)} className="text-blue-600">
                                        {selectedRows.includes(customer.id) ? <FaCheckSquare size={20} /> : <FaRegSquare size={20} />}
                                    </button>
                                </td>
                                <td className="p-3">{customer.id}</td>
                                <td className="p-3">{customer.expense}</td>
                                <td className="p-3">{customer.amount}</td>
                                <td className="p-3">{customer.date}</td>
                                <td className="p-3 text-blue-800 cursor-pointer">
                                    <TbPencilMinus size={20} />
                                </td>
                                <td className="p-3 text-red-600 cursor-pointer">
                                    <FaRegTrashCan size={18} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-10 text-gray-600 ml-10">
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
        {popup && <AddExpense setPopup={setPopup}/>}
        </>
    );
}
export default Expenses