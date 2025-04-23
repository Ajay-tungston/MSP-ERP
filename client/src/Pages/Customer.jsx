import { useState, useEffect } from 'react';
import { CiCirclePlus, CiFilter } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { FaChevronRight } from "react-icons/fa6";
import AddCustomerModal from './AddCustomer';


const CustomHeader=()=>{
    // State for dynamic customers list and selected rows
    const [customers, setCustomers] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
  
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
  const axiosInstance=useAxiosPrivate();
    // Fetch customers from the backend API with pagination
    const fetchCustomers = async (page = 1) => {
      setLoading(true);
      try {
        // Set limit as 8 per page (adjust if needed)
        const limit = 8;
        const response = await axiosInstance.get(`/admin/customer/get?page=${page}&limit=${limit}`);
        // Expected response: { customers, total, totalPages, currentPage }
        const data = response.data;
        setCustomers(data.customers);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching customers:", error);
        // Optionally, display an error message to the user
      } finally {
        setLoading(false);
      }
    };

    // Call fetchCustomers when the component mounts or when currentPage changes.
    useEffect(() => {
      fetchCustomers(currentPage);
    }, [currentPage]);
  
    // Function to toggle individual row selection based on customer id or customerNumber
    const toggleRowSelection = (id) => {
      setSelectedRows((prev) =>
        prev.includes(id)
          ? prev.filter((rowId) => rowId !== id)
          : [...prev, id]
      );
    };
  
    // Function to select or deselect all rows (the customers currently displayed)
    const toggleAllRows = () => {
      if (selectedRows.length === customers.length) {
        setSelectedRows([]);
      } else {
        setSelectedRows(customers.map((customer) => customer._id || customer.customerNumber));
      }
    };
  
    // Pagination handlers
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
    const [popup, setPopup]=useState(false)
  
  return (
  <>
  
          <div className=" h-full relative bg-gray-50 outline-1 outline-offset-[-1px] outline-white overflow-hidden mt-10">
          <div className={`w-[1511px] h-[1095px] bg-white rounded-3xl overflow-hidden relative ${popup ? 'backdrop-blur-[100px]' : ''}`}>
            <div className="left-[48px] top-[86px] absolute inline-flex justify-start items-center gap-3">
        <div className="inline-flex items-center text-slate-500 text-xl font-normal     font-['Urbanist']">
  <span>Master</span>
  <span className="mx-2">
      <FaChevronRight />
    </span>
    <span>Customer</span>
     </div>
       <div className=" top-[25px] absolute justify-start text-indigo-950 text-4xl font-bold font-['Urbanist'] leading-[50.40px]">Customer</div>
          </div>
          <div className="w-80 h-[64px] px-6 py-4 left-[1143px] top-[32px] absolute bg-indigo-500 rounded-2xl inline-flex justify-center items-center gap-3"  onClick={()=>setPopup(true)}>
            <div className="w-8 h-8 relative">
                <CiCirclePlus className="w-7 h-7 left-[2.67px] top-[2.67px] absolute text-white" />
                <div className="w-8 h-8 left-[32px] top-[32px] absolute origin-top-left -rotate-180 opacity-0" />
            </div>
            <div className="justify-start text-white text-xl font-bold font-['Urbanist']">Add New Customer</div>
        </div>
        <div className="w-36 h-[64px] px-6 py-4 left-[1303px] top-[144px] absolute bg-white hover:bg-gray-100 rounded-2xl  outline-1 outline-offset-[-1px] outline-gray-300/30 inline-flex justify-center items-center gap-3">
          <button className=" text-[#4079ED] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100">
            <CiFilter className="text-lg" /> Filter
          </button>

        </div>
        <div className="w-36 h-[64px] px-6 py-4 left-[1150px] top-[144px] absolute bg-white hover:bg-red-100 rounded-2xl  outline-1 outline-offset-[-1px] outline-red-500 inline-flex justify-center items-center gap-3">
          <button className=" border-red-500 text-red-500 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-100 font-Urbanist">
            <GoTrash className="text-lg" /> Delete
          </button>
        </div>
        
        <div className="w-[1511px] left-0 top-[256px] absolute inline-flex flex-col justify-start items-start">

          <table className="w-full border-collapse text-gray-900">
            {/* Table Header */}
            <thead>
              <tr className="text-left text-gray-900 font-bold border-b-2 border-gray-200 bg-[#F9FAFB]">
                <th className="p-3">
                  <button onClick={toggleAllRows} className="text-blue-600">
                    {selectedRows.length === customers.length ? <FaCheckSquare size={20} /> : <FaRegSquare size={20} />}
                  </button>
                </th>
                <th className="p-3">No.</th>
                <th className="p-3">Name</th>
                <th className="p-3">Address</th>
                <th className="p-3">Phone</th>
                <th className="p-3">WhatsApp</th>
                <th className="p-3">Discount %</th>
                <th className="p-3">Discount Freq.</th>
                <th className="p-3">Opening Bal.</th>
                <th className="p-3">Route</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="10" className="text-center p-5">Loading...</td>
                </tr>
              ) : customers.length > 0 ? (
                customers.map((customer) => (
                  <tr key={customer._id || customer.customerNumber} className="border-b border-gray-200 hover:bg-gray-50 bg-white">
                    <td className="p-3">
                      <button onClick={() => toggleRowSelection(customer._id || customer.customerNumber)} className="text-blue-600">
                        {selectedRows.includes(customer._id || customer.customerNumber) ? <FaCheckSquare size={20} /> : <FaRegSquare size={20} />}
                      </button>
                    </td>
                    <td className="p-3">{customer.customerNumber}</td>
                    <td className="p-3">{customer.customerName}</td>
                    <td className="p-3">{customer.address}</td>
                    <td className="p-3">{customer.phone}</td>
                    <td className="p-3">{customer.whatsapp}</td>
                    <td className="p-3">{customer.discount}%</td>
                    <td className="p-3">
                      {customer.discountApplied
                        ? customer.discountApplied.charAt(0).toUpperCase() + customer.discountApplied.slice(1)
                        : ''}
                    </td>
                    <td className="p-3">${customer.openingBalance.toFixed(2)}</td>
                    <td className="p-3">{customer.routeCustomer ? "Yes" : "No"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center p-5">No customers found.</td>
                </tr>
              )}
            </tbody>
          </table>

        </div>

        <div className="flex justify-between items-center mt-[730px] text-gray-600 ml-10 mr-30">
          <span>Page {currentPage} of {totalPages}</span>
          <div className="flex space-x-2">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`w-36 h-[64px] px-4 py-2 border border-gray-300 rounded-lg ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`w-36 h-[64px] px-4 py-2 border border-gray-300 rounded-lg ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
</div>

    {popup && <AddCustomerModal  setPopup={setPopup}/>}

    </>
  )
}

export default CustomHeader
