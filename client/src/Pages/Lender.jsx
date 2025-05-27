import { useState, useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import AddLenderForm from "./AddLender";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import debounce from "lodash/debounce";
import OvalSpinner from "../Components/spinners/OvalSpinner";
import { LuPencilLine } from "react-icons/lu";
import EditLenderForm from "./EditLender";
import {  CheckCircleIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

export default function Lender() {
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [lenders, setLenders] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [popup, setPopup] = useState(false);
  const axiosInstance = useAxiosPrivate();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedLender, setSelectedLender] = useState(null);

  useEffect(() => {
    fetchLenders();
  }, []);

  const fetchLenders = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(
        `/admin/lender/get?page=${currentPage}&limit=${limit}&search=${search}`
      );
      console.log("Get from backend",)
      setLenders(res.data?.lenders || []);

      setCurrentPage(res.data.currentPage || 1);
      setTotalPages(res.data.totalPages || 1);

      setTotalPages(res.data?.totalPages || 1);

    }
    catch (err) {
      console.error("Failed to fetch lenders", err);
    } finally {
      setIsLoading(false);
    }

  };
  useEffect(() => {
    const debouncedFetch = debounce(fetchLenders, 300);
    debouncedFetch();
    return () => debouncedFetch.cancel();
  }, [search, currentPage]);



  useEffect(() => {
    fetchLenders();
  }, []);

  const handleEditClick = (lender) => {
    setSelectedLender(lender);
    setShowEditPopup(true);
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
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  const deleteLender = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the lender.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });
  
    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.delete(`/admin/lender/delete/${id}`);
  
        // Refresh data
        fetchLenders();
  
        Swal.fire({
          title: 'Deleted!',
          text: response.data.message || 'Lender deleted successfully.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: error?.response?.data?.message || 'Failed to delete lender.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
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
            value={search}
            autoComplete="off"
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // reset to first page on new search
            }}
            placeholder="Search lenders..."
            className=" px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

        </div>
        <div className="flex space-x-3 -mt-10 float-right">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-lg flex items-center gap-2 mr-8"
            onClick={() => setPopup(true)}
          >
            <CiCirclePlus className="text-xl " /> Add New Lender
          </button>
        </div>


        {/* Table */}
        <div className="mt-10 px-4">
          <table className="w-full border-collapse text-gray-900">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-200 text-left text-lg">
                <th className="p-3">No.</th>
                <th className="p-3">Lender Name</th>
                <th className="p-3">Phone Number</th>
                <th className="p-3">Address</th>
                <th  className="p-3">Opening Bal. </th>
                <th  className="p-3"></th>
                <th className="p-3"></th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="text-center py-10">
                    <OvalSpinner />
                  </td>
                </tr>
              ) : lenders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-500">
                    No lenders available
                  </td>
                </tr>
              ) : (
                lenders.map((lender, index) => (
                  <tr
                    key={lender._id}
                    className={`border-b border-gray-200 hover:bg-gray-50 text-lg ${selectedRows.includes(lender._id) ? "bg-gray-50" : ""
                      }`}
                  >
                    <td className="p-3">{index + 1 + (currentPage - 1) * limit}</td>
                    <td className="p-3">{lender.name}</td>
                    <td className="p-3">{lender.phone}</td>
                    <td className="p-3">{lender.address}</td>
           
                    <td className="p-3">
  ₹{(lender.openingBalance ?? 0).toFixed(2)}
</td>

                    <td className="p-3 text-blue-800 cursor-pointer">
                      < LuPencilLine   onClick={() => handleEditClick(lender)}/></td>
                    <td className="p-3 text-red-600 cursor-pointer">
                      <FaTrashAlt onClick={() => deleteLender(lender._id)} />
                    </td>
                    <td className="p-3"></td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-10 text-gray-600 px-4">
          <span>Page {currentPage} of {totalPages}</span>
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 border border-gray-300 rounded-lg ${currentPage === 1 ? "cursor-not-allowed text-gray-400" : ""
                }`}
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            <button
              className={`px-4 py-2 border border-gray-300 rounded-lg ${currentPage === totalPages ? "cursor-not-allowed text-gray-400" : ""
                }`}
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {popup && <AddLenderForm setPopup={setPopup} />}
      {showEditPopup && selectedLender && (
        <EditLenderForm
          setPopup={setShowEditPopup}
          refreshLenders={fetchLenders}
          lender={selectedLender}
        />
      )}
    </>
  );
}
