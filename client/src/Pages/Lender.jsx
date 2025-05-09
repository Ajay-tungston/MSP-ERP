import { useState,useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import AddLenderForm from "./AddLender";


export default function Lender() {
    const [recentTransactions, setRecentTransactions] = useState([]);
    const [lenders, setLenders] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [popup, setPopup] = useState(false);

    useEffect(() => {
        fetchLenders();
      }, []);
    
 const fetchLenders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/lender");
      setLenders(res.data);
    } catch (err) {
      console.error("Failed to fetch lenders", err);
    }
  };

  const deleteLender = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/lender/${id}`);
      fetchLenders();
    } catch (err) {
      console.error("Failed to delete lender", err);
    }
  };


    const toggleRowSelection = (id) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        );
    };

    const toggleAllRows = () => {
        if (selectedRows.length === lenders.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(lenders.map((lender) => lender.id));
        }
    };

    return (
        <>
        <div className="py-4 rounded-lg shadow-sm h-[800px] bg-white mt-5">
            {/* Breadcrumb */}
            <nav className="flex items-center text-[20px] text-gray-500 mb-2 px-4 mt-10 space-x-2">
  <span>Master</span>
  <FaChevronRight className="text-xs" />
  <span className="text-gray-700 font-semibold ">Lender</span>
</nav>
            {/* Header */}
       
                <h1 className="text-3xl font-bold text-gray-900 ml-5">Lender</h1>
                <div className="relative max-w-md mt-5 ml-5">
        <input
  type="text"
  placeholder="Search here..."
  

     // Always start from page 1 when searching

  className="px-4   py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
/>
        </div>
        <div className="flex space-x-3 -mt-10 float-right">
        <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-lg flex items-center gap-2"
            onClick={() => setPopup(true)}
          >
            <CiCirclePlus className="text-xl " /> Add New Lender
          </button>
        </div>

         
             {/* Table */}
             <div className="mt-10 px-4">
          <table className="w-full border-collapse text-gray-900">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-200 text-left">
                <th className="p-3">No.</th>
                <th className="p-3">Lender Name</th>
                <th className="p-3">Phone Number</th>
                <th className="p-3">Address</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {lenders.map((lender, index) => (
                <tr
                  key={lender._id}
                  className={`border-b border-gray-200 hover:bg-gray-50 ${
                    selectedRows.includes(lender._id) ? "bg-gray-50" : ""
                  }`}
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{lender.name}</td>
                  <td className="p-3">{lender.phone}</td>
                  <td className="p-3">{lender.address}</td>
                  <td className="p-3 text-red-600 cursor-pointer">
                    <FaTrashAlt onClick={() => deleteLender(lender._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-10 text-gray-600 px-4">
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
        {popup && <AddLenderForm setPopup={setPopup} />}
</>
    );
}
