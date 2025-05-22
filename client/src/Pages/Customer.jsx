import { useState, useEffect } from "react";
import { CiCirclePlus, CiFilter } from "react-icons/ci";
import { LuPencilLine } from "react-icons/lu"; // <--- Added here
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import AddCustomerModal from "./AddCustomer";
import EditCustomerModal from "./EditCustomer";
import { FaTrashAlt } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import Swal from "sweetalert2";
import { debounce } from "lodash";
import OvalSpinner from "../Components/spinners/OvalSpinner";


export default function CustomerHeader() {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const axiosInstance = useAxiosPrivate();
  const [search, setSearch] = useState("");
  const limit = 10;

  const fetchCustomersDebounced = debounce((page, searchTerm) => {
    setLoading(true);
    try {
   axiosInstance   
        .get(`/admin/customer/get?page=${page}&limit=${limit}&search=${searchTerm}`)
        .then((response) => {
          const data = response.data;
          setCustomers(data.customers);
          setCurrentPage(data.currentPage);
          setTotalPages(data.totalPages);
        })
        .catch((error) => {
          console.error("Error fetching customers:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error("Error fetching customers:", error);
      setLoading(false);
    }
  }, 300); // 500ms debounce time
  

  useEffect(() => {
    fetchCustomersDebounced(currentPage, search);

    // Cleanup the debounce function when component unmounts
    return () => {
      fetchCustomersDebounced.cancel();
    };
  }, [currentPage, search]);

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

  const [popup, setPopup] = useState(false);
  const [editpopup, setEditPopup] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  
  const handleDeleteCustomer = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the customer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });
  
    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.delete(`/admin/customer/delete/${id}`);
  
        // Remove from state
        setCustomers((prev) => prev.filter((cust) => cust._id !== id));
  
        Swal.fire({
          title: 'Deleted!',
          text: response.data.message,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: error?.response?.data?.message || 'Failed to delete customer.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    }
  };
  
  
  return (
    <>
      <div className="p-4 rounded-lg shadow-sm h-[800px] bg-white mt-5">
        {/* Breadcrumb */}
        <nav className="flex items-center text-[20px] text-gray-500 gap-2 mb-2 mt-10">
          <span>Master</span>
          <FaChevronRight />
          <span className="text-gray-700">Customer</span>
        </nav>


        <h1 className="text-3xl font-bold text-gray-800 mb-6">Customer</h1>

        {/* Search Input */}
        <div className="relative max-w-md">
        <input
  type="text"
  placeholder="Search here..."
  value={search}
    autoComplete="off"
  onChange={(e) => {
    const value = e.target.value;
    setSearch(value);
    // fetchCustomers(1, value); // Always start from page 1 when searching
    setCurrentPage(1)
  }}
  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
/>
        </div>
        <div className="flex space-x-3 -mt-10 float-right">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-lg flex items-center gap-2"
            onClick={() => setPopup(true)}
          >
            <CiCirclePlus className="text-xl " /> Add New Customer
          </button>
        </div>

        {/* Dynamic Table */}
        <div className="mt-10 bg-white ">
          <table className="w-full border-collapse text-gray-900 ">
            <thead>
              <tr className="text-left text-gray-900 font-bold border-b-2 border-gray-200 bg-[#F9FAFB] ">

                <th className="p-2 w-[5%] ">No.</th>
                <th className="p-2 w-[10%] ">Name</th>
                <th className="p-2 w-[15%] ">Address</th>
                <th className="p-2 w-[10%] ">Phone</th>
                <th className="p-2 w-[10%]">WhatsApp</th>
                <th className="p-2 w-[10%] ">Discount %</th>

                <th className="p-2 w-[10%] ">Opening Bal.</th>
                <th className="p-2 w-[10%] ">Route</th>
                <th className="p-2 w-[10%]" ></th>
                <th className="p-2 w-[10%]"></th>

              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="10" className="text-center p-5">
             <OvalSpinner/>
                  </td>
                </tr>
              ) : customers.length > 0 ? (
                customers.map((customer,index) => (
                  <tr
                    key={customer._id || customer.customerNumber}
                    className="border-b border-gray-200 hover:bg-gray-50 bg-white"
                  >

                    <td className="p-2">{index + 1 + (currentPage - 1) * limit}</td>
                    <td className="p-2">{customer.customerName}</td>
                    <td className="p-2">{customer.address}</td>
                    <td className="p-2">{customer.phone}</td>
                    <td className="p-2">{customer.whatsapp}</td>
                    <td className="p-2">{customer.discount}%</td>

                    <td className="p-2">
                    ₹{customer.openingBalance.toFixed(2)}
                    </td>
                    <td className="p-2 flex items-center gap-8 ">
                      {customer.routeCustomer ? "Yes" : "No"}
                    </td>
                    <td>
                      <LuPencilLine
                        className="text-[#6A5AE0] w-4 h-4 cursor-pointer"
                        onClick={() => {
                          setSelectedCustomerId(customer._id);
                          setEditPopup(true);
                        }}
                      />
                    </td>
                    <td className="p-2 text-red-500">
  <FaTrashAlt
    className="cursor-pointer hover:text-red-700"
    onClick={() => handleDeleteCustomer(customer._id)}
  />
</td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center p-5">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-8 text-gray-600 ml-10">
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`px-4 py-2 border border-gray-300 rounded-lg ${currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "hover:bg-gray-100"
                }`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border border-gray-300 rounded-lg ${currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "hover:bg-gray-100"
                }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {popup && <AddCustomerModal setPopup={setPopup} />}
      {editpopup && selectedCustomerId && (
        <EditCustomerModal
          customerId={selectedCustomerId}
          setEditPopup={setEditPopup}
        />
      )}
    </>
  );
}
