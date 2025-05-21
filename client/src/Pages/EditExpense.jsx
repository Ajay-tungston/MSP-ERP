import { useState, useEffect } from "react";
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Swal from "sweetalert2";

const EditExpenseForm = ({ setPopup, initialData, refreshExpenses }) => {
  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const axiosInstance = useAxiosPrivate();

  useEffect(() => {
    if (initialData) {
      setExpense(initialData.expense || "");
      setAmount(initialData.amount || "");
      setDate(initialData.date ? new Date(initialData.date).toISOString().split("T")[0] : "");
    }
  }, [initialData]);

  const handleCancel = () => {
    setPopup(false);
  };

  const handleSave = async () => {
    if (expense.trim().length < 3) {
      Swal.fire("Validation Error", "Expense type must be at least 3 characters.", "warning");
      return;
    }
    if (!amount || Number(amount) <= 0) {
      Swal.fire("Validation Error", "Amount must be greater than 0.", "warning");
      return;
    }
    const selectedDate = new Date(date);
    const today = new Date();
    if (!date || selectedDate > today) {
      Swal.fire("Validation Error", "Date cannot be in the future.", "warning");
      return;
    }

    try {
      await axiosInstance.put(`/admin/expense/${initialData._id}`, {
        expense,
        amount,
        date
      });

      Swal.fire("Success", "Expense updated successfully.", "success");
      setPopup(false);
      refreshExpenses();
    } catch (error) {
      Swal.fire("Error", "Failed to update expense.", "error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75">
      <div className="bg-white shadow-lg w-full max-w-5xl p-12 rounded-3xl">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Edit Expense</h2>
        <hr className="mb-8 border-gray-300" />

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
          <div className="flex items-center gap-4">
            <label className="w-40 text-xl text-gray-600">No.</label>
            <div className="font-bold text-gray-800">{initialData?._id?.slice(-3).toUpperCase()}</div>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40 text-xl text-gray-600">Expense type <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={expense}
              onChange={(e) => setExpense(e.target.value)}
              className="w-full sm:w-[350px] h-14 px-6 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40 text-xl text-gray-600">Amount <span className="text-red-500">*</span></label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full sm:w-[350px] h-14 px-6 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40 text-xl text-gray-600">Date <span className="text-red-500">*</span></label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full sm:w-[350px] h-14 px-6 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-12">
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-100 transition"
          >
            <XCircleIcon className="w-5 h-5" />
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <CheckCircleIcon className="w-5 h-5" />
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditExpenseForm;
