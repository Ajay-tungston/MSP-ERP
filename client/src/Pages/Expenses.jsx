import { useState, useEffect } from 'react';
import { CiCirclePlus } from "react-icons/ci";
import { TbPencilMinus } from "react-icons/tb";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import AddExpense from "./AddExpense";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import EditExpenseForm from './EditExpense';

function Expenses() {
    const axiosInstance = useAxiosPrivate();

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
            const response = await axiosInstance.get(`/admin/expense?page=${currentPage}&limit=${itemsPerPage}`);
            setExpenses(response.data.data || []);
            setTotalPages(response.data.totalPages);
            console.log(response)
        } catch (error) {
            console.error("Failed to fetch expenses:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, [axiosInstance, currentPage]);

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

    return (
        <>
            <div className={`p-4 rounded-lg shadow-sm h-[800px] bg-white mt-5 ${popup ? 'backdrop-blur-xl' : ''}`}>
                {/* Breadcrumb */}
                <nav className="text-[20px] text-gray-500 mb-2 mt-10">
                    <span>Master</span>
                    <span className="mx-1"><FaChevronRight className="inline-block" /></span>
                    <span className="text-gray-500">Expense</span>
                </nav>

                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900">Expense</h1>
                    <div className="flex space-x-3 -mt-10 mr-10" onClick={() => { setPopup(true);; }}>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-lg flex items-center gap-2">
                            <CiCirclePlus className="text-xl" /> Add New Expense
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="mt-20 bg-white overflow-x-auto">
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
                                <tr><td colSpan="6" className="p-3 text-center">Loading...</td></tr>
                            ) : expenses.length === 0 ? (
                                <tr><td colSpan="6" className="p-3 text-center">No expenses found.</td></tr>
                            ) : (
                                expenses.map((expense, index) => (
                                    <tr key={expense._id} className="border-b border-gray-200 hover:bg-gray-50 text-lg">
                                        <td className="p-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                        <td className="p-3">{expense.expense}</td>
                                        <td className="p-3">{expense.amount}</td>
                                        {/* <td className="p-3">{new Date(expense.date).toLocaleDateString()}</td> */}
                                        <td className="p-3 text-blue-800 cursor-pointer" >
                                            <TbPencilMinus
                                                size={20}
                                                onClick={() => {
                                                    setSelectedExpense(expense);
                                                    setEditPopup(true);
                                                }}
                                            />
                                        </td>
                                        <td className="p-3 text-red-600 cursor-pointer">
                                            <FaRegTrashCan size={18} />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-10 text-gray-600 ml-10 mr-10">
                    <span>Page {currentPage} of {totalPages}</span>
                    <div className="flex space-x-2">
                        <button
                            className={`px-4 py-2 border border-gray-300 rounded-lg ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <button
                            className={`px-4 py-2 border border-gray-300 rounded-lg ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
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
