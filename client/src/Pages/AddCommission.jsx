import { useState } from "react";
import { XCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

export default function CommissionForm() {
  const [commType, setCommType] = useState("fixed");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div
        className="bg-white shadow-lg"
        style={{
          width: "100%",   // Width is set to 100% for responsiveness
          maxWidth: "1280px", // Max width is 1280px to prevent it from getting too wide on larger screens
          height: "auto",  // Auto height to adjust to the content
          padding: "48px",   // Padding inside the form
          borderRadius: "24px", // Border radius of 24px
        }}
      >
         <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">Add New Item</h2>
         <hr className="my-3 border-gray-300" />
        <div className="grid gap-[44px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 ">
          <div className="flex items-center gap-4">
            <label className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']">Comm. Code <span className="text-red-500">*</span></label>
            <input
 className="w-[350px] h-[56px] gap-2 rounded-[12px] pt-4 pr-6 pb-4 pl-6 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Auto-generated"
              disabled
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']">Comm. Type <span className="text-red-500">*</span></label>
            <div className="flex gap-2 mt-1">
              <button
                className={`px-4 py-2 rounded-md border ${commType === "fixed" ? "bg-blue-500 text-white" : "border-gray-300"}`}
                onClick={() => setCommType("fixed")}
              >
                Fixed
              </button>
              <button
                className={`px-4 py-2 rounded-md border ${commType === "variable" ? "bg-blue-500 text-white" : "border-gray-300"}`}
                onClick={() => setCommType("variable")}
              >
                Variable
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <label className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']">Commission <span className="text-red-500">*</span></label>
            <input
 className="w-[350px] h-[56px] gap-2 rounded-[12px] pt-4 pr-6 pb-4 pl-6 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter here"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']">Market Fee <span className="text-red-500">*</span></label>
            <input
 className="w-[350px] h-[56px] gap-2 rounded-[12px] pt-4 pr-6 pb-4 pl-6 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="$ Enter here"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']">Coolie/Logistics <span className="text-red-500">*</span></label>
            <input
              className="w-[350px] h-[56px] gap-2 rounded-[12px] pt-4 pr-6 pb-4 pl-6 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="$ Enter here"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']">Avg. KG/Box <span className="text-red-500">*</span></label>
            <input
              className="w-[350px] h-[56px] gap-2 rounded-[12px] pt-4 pr-6 pb-4 pl-6 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter here"
            />
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button className="flex items-center gap-2 border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-100 transition">
            <XCircleIcon className="w-5 h-5" />
            Cancel
          </button>

          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            <PlusCircleIcon className="w-5 h-5" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
