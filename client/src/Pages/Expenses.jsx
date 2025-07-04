import { useState, useEffect } from 'react';
import { CiCirclePlus } from "react-icons/ci";
import { TbPencilMinus } from "react-icons/tb";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import AddExpense from "./AddExpense";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import EditExpenseForm from './EditExpense';
import Swal from "sweetalert2";
import OvalSpinner from "../Components/spinners/OvalSpinner";

function Expenses() {
    const axiosInstance = useAxiosPrivate();
    const [search, setSearch] = useState("");
    const [expenses, setExpenses] = useState([]);
    const [popup, setPopup] = useState(false);

    const [editData, setEditData] = useState(null); 
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);

    const itemsPerPage = 8;

    const fetchExpenses = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get(`/admin/expense?page=${currentPage}&limit=${itemsPerPage}&search=${search}`);
            setExpenses(response.data.data || []);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Failed to fetch expenses:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, [axiosInstance, currentPage,search]);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    // const handleEditClick = (expense) => {
    //     setEditData(expense); // set the expense to be edited
    //     setPopup(true);
    // };

    const handleDeleteExpense = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This will permanently delete the expense",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });
    
        if (result.isConfirmed) {
            try {
                await axiosInstance.delete(`/admin/expense/${id}`);
                
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Expense has been deleted.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
    
                fetchExpenses();
            } catch (error) {
                console.error("Delete failed:", error);
    
                Swal.fire({
                    title: 'Error!',
                    text: error?.response?.data?.message || 'An error occurred while deleting.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    };
    
    
    return (
        <>
            <div className={`p-6 rounded-3xl shadow-md h-[800px] bg-white  ${popup ? 'backdrop-blur-xl' : ''}`}>
                {/* Breadcrumb */}
                <nav className="text-md text-[#737791] mb-2 ">
                    <span>Master</span>
                    <span className="mx-1"><FaChevronRight className="inline-block " /></span>
                    <span className="text-[#737791]">Expense</span>
                </nav>

                {/* Header */}
                <h1 className="text-3xl font-bold text-[#151D48] mb-6">Expense</h1>
        <div className="relative max-w-md">
          <input
            type="text"
            value={search}
              autoComplete="off"
            onChange={(e)=>{
              setCurrentPage(1)
              setSearch(e.target.value)}}
            placeholder="Search here..."
            className=" px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex space-x-3 -mt-10  float-end ">
                   
                        <button 
                     
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-lg flex items-center gap-2"
                                        onClick={() =>  setPopup(true) }
                                        >
                            <CiCirclePlus className="text-xl font-bold" /> Add New Expense
                        </button>
                    </div>


                {/* Table */}
                <div className="mt-8 bg-white overflow-x-auto">
                    <table className="w-full border-collapse text-gray-900">
                        <thead>
                            <tr className="text-left font-bold border-b-2 border-gray-200 bg-[#F9FAFB] text-lg">
                                <th className="p-3">No.</th>
                                <th className="p-3">Expense Type</th>
                                <th className="p-3">Amount</th>
                                {/* <th className="p-3">Date</th> */}
                                <th className="p-3"></th>
                                <th className="p-3"></th>
                            </tr>
                        </thead>
                        <tbody>
  {isLoading ? (
    <tr>
      <td colSpan="6" className="text-center p-5">
        <OvalSpinner />
      </td>
    </tr>
  ) : expenses.length > 0 ? (
    expenses.map((expense, index) => (
      <tr key={expense._id} className="border-b border-gray-200 hover:bg-gray-50 text-lg">
        <td className="p-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
        <td className="p-2">{expense.expense || '--'}</td>
        <td className="p-2">{expense.amount ||'--'}</td>
        {/* <td className="p-2">{new Date(expense.date).toLocaleDateString()}</td> */}
        <td className="p-2 text-blue-800 cursor-pointer">
          <TbPencilMinus
            size={20}
            onClick={() => {
              setSelectedExpense(expense);
              setEditPopup(true);
            }}
          />
        </td>
        <td className="p-2 text-red-600 cursor-pointer">
          <FaRegTrashCan size={18} onClick={() => handleDeleteExpense(expense._id)} />
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6" className="text-center p-5">
        No expenses found.
      </td>
    </tr>
  )}
</tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-10 text-gray-600 ml-10 mr-10">
                    <span>Page {currentPage} of {totalPages}</span>
                    <div className="flex space-x-2">
                        <button
                            className={`px-4 py-2 border border-gray-300 rounded-lg ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <button
                            className={`px-4 py-2 border border-gray-300 rounded-lg ${currentPage === totalPages ? 'text-[#4079ED] cursor-not-allowed' : 'hover:bg-gray-100'}`}
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* AddExpense acts as both Add & Edit form */}
            {popup && (
                <AddExpense
                    setPopup={setPopup}
                    refreshExpenses={fetchExpenses}

                    initialData={editData} // 👈 pass the selected data to edit
                />

            )}
            {editPopup && selectedExpense && (
                <EditExpenseForm
                    setPopup={setEditPopup}
                    initialData={selectedExpense}
                    refreshExpenses={fetchExpenses}
                />
            )}
        </>
    );
}

export default Expenses;
