import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { XCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Swal from "sweetalert2";

const AddExpenseForm=({setPopup})=> {

  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState("");

  const navigate = useNavigate(); // For navigation
  const axiosInstance = useAxiosPrivate();
  const handleCancel = () => {
    // Clear all form values
 
    setExpense("");
    setAmount("");
setPopup("");
    // Navigate to another page
    navigate("/expenses"); // Replace with your target path
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75">
      <div
        className="bg-white shadow-lg"
        style={{
          width: "100%",
          maxWidth: "1280px",
          padding: "48px",
          borderRadius: "24px",
        }}
      >
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
          Add New Expense
        </h2>
        <hr className="my-3 border-gray-300" />

        <div className="grid gap-[44px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
          {/* No. Field */}
          <div className="flex items-center gap-4">
            <label className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal">No.</label>
            <div className="font-bold text-gray-800">001</div>
          </div>

          {/* Description */}
          <div className="flex items-center gap-4">
            <label className="min-w-[120px] sm:min-w-[150px] text-[#737791] text-xl font-normal">
              Expense type <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter here"
              value={expense}
              onChange={(e) => setExpense(e.target.value)}
              className="w-full sm:w-[350px] h-[56px] rounded-[12px] pt-4 pr-6 pb-4 pl-6 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Transaction Type */}
          <div className="flex items-center gap-4">
            <label className="min-w-[120px] sm:min-w-[150px] text-[#737791] text-xl font-normal">
             Amount<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Enter here"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full sm:w-[350px] h-[56px] rounded-[12px] pt-4 pr-6 pb-4 pl-6 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Amount */}
          <div className="flex items-center gap-4">
            <label className="min-w-[120px] sm:min-w-[150px] text-[#737791] text-xl font-normal">
           Date
            </label>
            <div className="relative w-full sm:w-[350px]">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="date"
                placeholder="Enter here"
                
                className="w-full h-[56px] rounded-[12px] pt-4 pr-6 pb-4 pl-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="w-full h-full p-4 md:p-8 lg:p-12 bg-white rounded-3xl flex flex-col justify-start items-start gap-12 overflow-hidden">
          <div className="self-stretch flex justify-end items-center gap-4 mt-8 md:mr-25">
            <div className="flex gap-4">
              {/* Cancel Button */}
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-100 transition"
              >
                <XCircleIcon className="w-5 h-5" />
                Cancel
              </button>

              {/* Save Button */}
              <button
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <PlusCircleIcon className="w-5 h-5" />
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 export default AddExpenseForm;