import { useState } from "react";
import { XCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export default function CommissionForm() {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    commType: "fixed",
    commission: "",
    marketFee: "",
    logistics: "",
    avgKgBox: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle commission type toggle
  const handleCommTypeChange = (type) => {
    setFormData({
      ...formData,
      commType: type,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    // Optional: Add validation before submission
    navigate('/commission'); // Redirect after submission
  };

  // Handle cancel (already defined)
  const handleCancel = () => {
    // Reset form (optional)
    setFormData({
      commType: "fixed",
      commission: "",
      marketFee: "",
      logistics: "",
      avgKgBox: "",
    });
    navigate('/commission');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div
        className="bg-white shadow-lg"
        style={{
          width: "100%",
          maxWidth: "1280px",
          height: "auto",
          padding: "48px",
          borderRadius: "24px",
        }}
      >
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">Add New Item</h2>
        <hr className="my-3 border-gray-300" />
        
        <div className="grid gap-[44px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
          {/* Commission Code (Auto-generated) */}
          <div className="flex items-center gap-4">
            <label className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']">
              Comm. Code <span className="text-red-500">*</span>
            </label>
            <input
              className="w-[350px] h-[56px] gap-2 rounded-[12px] pt-4 pr-6 pb-4 pl-6 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Auto-generated"
              disabled
            />
          </div>

          {/* Commission Type */}
          <div className="flex items-center gap-4">
            <label className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']">
              Comm. Type <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2 mt-1">
              <button
                type="button"
                className={`px-4 py-2 rounded-md border ${
                  formData.commType === "fixed" ? "bg-blue-500 text-white" : "border-gray-300"
                }`}
                onClick={() => handleCommTypeChange("fixed")}
              >
                Fixed
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-md border ${
                  formData.commType === "variable" ? "bg-blue-500 text-white" : "border-gray-300"
                }`}
                onClick={() => handleCommTypeChange("variable")}
              >
                Variable
              </button>
            </div>
          </div>

          {/* Commission */}
          <div className="flex items-center gap-4">
            <label className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']">
              Commission <span className="text-red-500">*</span>
            </label>
            <input
              name="commission"
              value={formData.commission}
              onChange={handleInputChange}
              className="w-[350px] h-[56px] gap-2 rounded-[12px] pt-4 pr-6 pb-4 pl-6 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter here"
            />
          </div>

          {/* Market Fee */}
          <div className="flex items-center gap-4">
            <label className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']">
              Market Fee <span className="text-red-500">*</span>
            </label>
            <input
              name="marketFee"
              value={formData.marketFee}
              onChange={handleInputChange}
              className="w-[350px] h-[56px] gap-2 rounded-[12px] pt-4 pr-6 pb-4 pl-6 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="$ Enter here"
            />
          </div>

          {/* Logistics */}
          <div className="flex items-center gap-4">
            <label className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']">
              Coolie/Logistics <span className="text-red-500">*</span>
            </label>
            <input
              name="logistics"
              value={formData.logistics}
              onChange={handleInputChange}
              className="w-[350px] h-[56px] gap-2 rounded-[12px] pt-4 pr-6 pb-4 pl-6 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="$ Enter here"
            />
          </div>

          {/* Avg. KG/Box */}
          <div className="flex items-center gap-4">
            <label className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']">
              Avg. KG/Box <span className="text-red-500">*</span>
            </label>
            <input
              name="avgKgBox"
              value={formData.avgKgBox}
              onChange={handleInputChange}
              className="w-[350px] h-[56px] gap-2 rounded-[12px] pt-4 pr-6 pb-4 pl-6 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter here"
            />
          </div>
        </div>

        {/* Action Buttons */}
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
                onClick={handleSubmit}
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