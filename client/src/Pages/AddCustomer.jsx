import React, { useState, useEffect } from "react";
import axios from "axios";
import { XCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import useAxiosPrivate from '../hooks/useAxiosPrivate'
const AddCustomerModal = ({ onClose }) => {
  // Form state; note that we use keys that differ from backend names.
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    whatsapp: "",
    discount: "",
    discountType: "",      // For discount method (Manual/Auto)
    discountFrequency: "", // For discount frequency (Weekly/Monthly/Yearly)
    balance: "",
    route: "",             // "Yes" or "No"
    routeName: "",
  });

  // State for next customer number; you can fetch from your backend if available.
  const [customerNumber, setCustomerNumber] = useState("Auto Generated");

  // Optional: Fetch the next customer number if your backend provides an endpoint.
  useEffect(() => {
    const fetchNextNumber = async () => {
      try {
        // Replace with your actual endpoint if available
        const response = await axiosInstance.get("/admin/customer/next");
        // Assume the backend returns { nextNumber: "002" } or similar
        setCustomerNumber(response.data.nextNumber);
      } catch (error) {
        console.error("Error fetching next customer number:", error);
        // Fallback remains "Auto Generated"
      }
    };

    fetchNextNumber();
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
const axiosInstance = useAxiosPrivate()
  // Submit handler to call backend API for adding the customer.
  const handleSubmit = async () => {
    // Prepare payload mapping UI fields to backend expected fields.
    const payload = {
      customerName: formData.name.trim(),
      address: formData.address.trim(),
      phone: formData.phone.trim(),
      whatsapp: formData.whatsapp.trim(),
      discount: parseFloat(formData.discount) || 0,
      // discountApplied will be taken from discountFrequency (converted to lowercase).
      discountApplied: formData.discountFrequency.toLowerCase() || "manual",
      // discountType as extra field from discountMethod (converted to lowercase)
      discountType: formData.discountType.toLowerCase() || "manual",
      openingBalance: parseFloat(formData.balance) || 0,
      // routeCustomer is true if route is "Yes"
      routeCustomer: formData.route === "Yes",
      // Use routeName only if routeCustomer is true
      routeAddress: formData.route === "Yes" ? formData.routeName.trim() : "",
    };

    try {
      const response = await axiosInstance.post(
        "/admin/customer/add",
        payload
      );
      console.log("Customer added successfully:", response.data);
      onClose();
    } catch (error) {
      console.error("Error adding customer:", error.response || error);
      // Optionally display error feedback to the user (e.g., using a toast or alert)
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="w-full sm:w-[640px] lg:w-[1000px] xl:w-[1200px] bg-white rounded-[24px] p-8 sm:p-10 shadow-xl relative">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-300">
          <h2 className="text-2xl font-bold text-gray-900">Add New Customer</h2>
          <button onClick={handleCancel}>
            <XCircleIcon className="w-6 h-6 text-gray-500 hover:text-red-500" />
          </button>
        </div>

        {/* Form */}
        <div className="grid grid-cols-2 gap-x-20 gap-y-6 mt-6 text-[#05004e] text-xl">
          {/* No. */}
          <div className="flex items-center">
            <label className="w-[172px] text-[#737791]">No.</label>
            <span className="font-bold">{customerNumber}</span>
          </div>

          {/* Customer Name */}
          <div className="flex items-center">
            <label className="w-[172px] text-[#737791]">
              Customer Name <span className="text-red-500">*</span>
            </label>
            <input
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter here"
              className="w-[300px] px-4 py-3 bg-gray-50 rounded-xl outline-none"
            />
          </div>

          {/* Address */}
          <div className="flex items-center">
            <label className="w-[172px] text-[#737791]">Address</label>
            <input
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Enter here"
              className="w-[300px] px-4 py-3 bg-gray-50 rounded-xl outline-none"
            />
          </div>

          {/* Phone */}
          <div className="flex items-center">
            <label className="w-[172px] text-[#737791]">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="Enter here"
              className="w-[300px] px-4 py-3 bg-gray-50 rounded-xl outline-none"
            />
          </div>

          {/* WhatsApp */}
          <div className="flex items-start">
            <label className="w-[172px] text-[#737791]">WhatsApp</label>
            <div className="flex flex-col gap-3">
              <input
                value={formData.whatsapp}
                onChange={(e) => handleChange("whatsapp", e.target.value)}
                placeholder="Enter here"
                className="w-[300px] px-4 py-3 bg-gray-50 rounded-xl outline-none"
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    handleChange(
                      "whatsapp",
                      e.target.checked ? formData.phone : ""
                    )
                  }
                  className="checkbox w-4 h-4 rounded border-2 border-gray-300 focus:ring-0 checked:border-blue-500 checked:bg-blue-500"
                />
                <label className="text-[#a1a5b6] text-base">
                  Same as Phone
                </label>
              </div>
            </div>
          </div>

          {/* Discount % */}
          <div className="flex items-center">
            <label className="w-[172px] text-[#737791]">Discount %</label>
            <input
              value={formData.discount}
              onChange={(e) => handleChange("discount", e.target.value)}
              placeholder="Enter here"
              className="w-[300px] px-4 py-3 bg-gray-50 rounded-xl outline-none"
            />
          </div>

          {/* Discount Frequency */}
          <div className="flex items-center">
            <label className="w-[172px] text-[#737791]">Discount Applied</label>
            <div className="flex">
              {["Weekly", "Monthly", "Yearly"].map((freq, index) => (
                <button
                  key={freq}
                  onClick={() => handleChange("discountFrequency", freq)}
                  className={`px-6 py-3 ${
                    formData.discountFrequency === freq
                      ? "bg-blue-100 text-blue-700 border border-blue-500"
                      : "bg-gray-100 text-gray-500 border border-gray-300"
                  } ${
                    index === 0
                      ? "rounded-l-2xl"
                      : index === 2
                      ? "rounded-r-2xl"
                      : "rounded-none"
                  }`}
                >
                  {freq}
                </button>
              ))}
            </div>
          </div>

          {/* Opening Balance */}
          <div className="flex items-center">
            <label className="w-[172px] text-[#737791]">Opening Balance</label>
            <div className="w-[300px] flex items-center px-4 py-3 bg-gray-50 rounded-xl">
              <span className="mr-2 font-bold">$</span>
              <input
                value={formData.balance}
                onChange={(e) => handleChange("balance", e.target.value)}
                placeholder="Enter here"
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Discount Method */}
          <div className="flex items-center">
            <label className="w-[172px] text-[#737791]">Discount Method</label>
            <div className="flex">
              {["Manual", "Auto"].map((method, index) => (
                <button
                  key={method}
                  onClick={() => handleChange("discountType", method)}
                  className={`px-6 py-3 ${
                    formData.discountType === method
                      ? "bg-blue-100 text-blue-700 border border-blue-500"
                      : "bg-gray-100 text-gray-500 border border-gray-300"
                  } ${
                    index === 0
                      ? "rounded-l-xl border-r-0"
                      : "rounded-r-xl border-l-0"
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* Route Name */}
          <div className="flex items-center">
            <label className="w-[172px] text-[#737791]">Route</label>
            <input
              value={formData.routeName}
              onChange={(e) => handleChange("routeName", e.target.value)}
              placeholder="Enter here"
              className="w-[300px] px-4 py-3 bg-gray-50 rounded-xl outline-none"
            />
          </div>
        </div>

        {/* Route Yes/No */}
        <div className="flex items-center col-span-2 mt-6">
          <label className="w-[172px] text-[#737791]">Route</label>
          <div className="flex">
            {["Yes", "No"].map((val, index) => (
              <button
                key={val}
                onClick={() => handleChange("route", val)}
                className={`px-6 py-3 ${
                  formData.route === val
                    ? "bg-blue-100 text-blue-700 border border-blue-500"
                    : "bg-gray-100 text-gray-500 border border-gray-300"
                } ${
                  index === 0
                    ? "rounded-l-xl border-r-0"
                    : "rounded-r-xl border-l-0"
                }`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="mt-10 flex justify-end gap-4">
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-100"
          >
            <XCircleIcon className="w-5 h-5" />
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <PlusCircleIcon className="w-5 h-5" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerModal;
