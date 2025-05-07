import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CiCirclePlus, CiFilter } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import { LuPencilLine } from "react-icons/lu"; // <--- Added here
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import AddCustomerModal from "./AddCustomer";
import EditCustomerModal from "./EditCustomer";

export default function CustomerHeader() {
  const [customers, setCustomers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const axiosInstance = useAxiosPrivate();
  const navigate = useNavigate();
  console.log(customers);
  const fetchCustomers = async (page = 1) => {
    setLoading(true);
    try {
      const limit = 10;
      const response = await axiosInstance.get(
        `/admin/customer/get?page=${page}&limit=${limit}`
      );
      const data = response.data;
      setCustomers(data.customers);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers(currentPage);
  }, [currentPage]);

  const toggleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleAllRows = () => {
    if (selectedRows.length === customers.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(
        customers.map((customer) => customer._id || customer.customerNumber)
      );
    }
  };

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
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  return (
    <>
      <div className="p-4 rounded-lg shadow-sm h-[800px] bg-white mt-5">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-2 mt-10">
          <span>Master</span> <span className="mx-1">›</span>{" "}
          <span className="text-gray-700">Customer</span>
        </nav>

        {/* Header & Buttons */}
        <div className="flex justify-between items-center ">
          <h1 className="text-2xl font-bold text-gray-900">Customer</h1>

          <div className="flex space-x-3 -mt-10  mr-10 ">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-lg flex items-center gap-2"
              onClick={() => setPopup(true)}
            >
              <CiCirclePlus className="text-xl " /> Add New Customer
            </button>
          </div>
        </div>

        <div className="flex space-x-3 float-right mt-5 mr-10">
          <button className="border border-red-500 text-red-500 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-100 font-Urbanist">
            <GoTrash className="text-lg" /> Delete
          </button>
          <button className="border border-gray-300 text-[#4079ED] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100">
            <CiFilter className="text-lg" /> Filter
          </button>
        </div>

        {/* Dynamic Table */}
        <div className="mt-20 bg-white">
          <table className="w-full border-collapse text-gray-900">
            <thead>
              <tr className="text-left text-gray-900 font-bold border-b-2 border-gray-200 bg-[#F9FAFB]">
                <th className="p-3">
                  <button onClick={toggleAllRows} className="text-blue-600">
                    {selectedRows.length === customers.length ? (
                      <FaCheckSquare size={20} />
                    ) : (
                      <FaRegSquare size={20} />
                    )}
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

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="10" className="text-center p-5">
                    Loading...
                  </td>
                </tr>
              ) : customers.length > 0 ? (
                customers.map((customer) => (
                  <tr
                    key={customer._id || customer.customerNumber}
                    className="border-b border-gray-200 hover:bg-gray-50 bg-white"
                  >
                    <td className="p-3">
                      <button
                        onClick={() =>
                          toggleRowSelection(
                            customer._id || customer.customerNumber
                          )
                        }
                        className="text-blue-600"
                      >
                        {selectedRows.includes(
                          customer._id || customer.customerNumber
                        ) ? (
                          <FaCheckSquare size={20} />
                        ) : (
                          <FaRegSquare size={20} />
                        )}
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
                        ? customer.discountApplied.charAt(0).toUpperCase() +
                          customer.discountApplied.slice(1)
                        : ""}
                    </td>
                    <td className="p-3">
                      ${customer.openingBalance.toFixed(2)}
                    </td>
                    <td className="p-3 flex items-center gap-2">
                      {customer.routeCustomer ? "Yes" : "No"}
                      <LuPencilLine
                        className="text-[#6A5AE0] w-4 h-4 cursor-pointer"
                        onClick={() => {
                          setSelectedCustomerId(customer._id);
                          setPopup(true);
                        }}
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
              className={`px-4 py-2 border border-gray-300 rounded-lg ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
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
                  ? "text-gray-400 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {popup && <AddCustomerModal setPopup={setPopup} />};
      {popup && selectedCustomerId && (
        <EditCustomerModal
          customerId={selectedCustomerId}
          setPopup={setPopup}
        />
      )}
    </>
  );
}
