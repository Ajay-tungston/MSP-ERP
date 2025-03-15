import { useState } from "react";
import { XCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

export default function AddExpenseForm() {
  const [transactionType, setTransactionType] = useState("Credit");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div
        className="bg-white shadow-lg"
        style={{
          width: "100%", // Width is set to 100% for responsiveness
          maxWidth: "1280px", // Max width is 1280px
          padding: "48px", // Padding inside the form
          borderRadius: "24px", // Border radius
        }}
      >
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
          Add New Expense
        </h2>
        <hr className="my-3 border-gray-300" />

        <div className="grid gap-[44px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
          <div className="flex items-center gap-4">
            <label className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal">No.</label>
            <div className="font-bold text-gray-800">001</div>
          </div>

          <div className="flex items-center gap-4">
            <label className="min-w-[120px] sm:min-w-[150px] text-[#737791] text-xl font-normal">Description <span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Enter here"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full sm:w-[350px] h-[56px] gap-2 rounded-[12px] pt-4 pr-6 pb-4 pl-6 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="min-w-[120px] sm:min-w-[150px] text-[#737791] text-xl font-normal">Transaction Type <span className="text-red-500">*</span></label>
            <div className="flex gap-2 mt-1">
              <button
                className={`px-4 py-2 rounded-md border ${transactionType === "Credit" ? "bg-blue-500 text-white" : "border-gray-300"}`}
                onClick={() => setTransactionType("Credit")}
              >
                Credit
              </button>
              <button
                className={`px-4 py-2 rounded-md border ${transactionType === "Debit" ? "bg-blue-500 text-white" : "border-gray-300"}`}
                onClick={() => setTransactionType("Debit")}
              >
                Debit
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="min-w-[120px] sm:min-w-[150px] text-[#737791] text-xl font-normal">Amount <span className="text-red-500">*</span></label>
            <div className="relative w-full sm:w-[350px]">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                placeholder="Enter here"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full h-[56px] gap-2 rounded-[12px] pt-4 pr-6 pb-4 pl-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="w-full h-full p-4 md:p-8 lg:p-12 bg-white rounded-3xl flex flex-col justify-start items-start gap-12 overflow-hidden">
          <div className="self-stretch flex justify-end items-center gap-4 mt-8 md:mr-25">
            <div className="flex gap-4">
              {/* Cancel Button */}
              <button className="flex items-center gap-2 border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-100 transition">
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
