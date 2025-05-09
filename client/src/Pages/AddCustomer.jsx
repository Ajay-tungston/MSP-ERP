import React, { useState } from "react";
import Swal from "sweetalert2";
import { XCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const AddCustomerModal = ({ onClose, setPopup }) => {
  const axiosInstance = useAxiosPrivate();
  const safeOnClose = typeof onClose === "function" ? onClose : () => {};

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    whatsapp: "",
    discount: "",
    discountType: "",
    discountFrequency: "",
    balance: "",
    route: "",
    routeName: "",
  });

  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleCancel = () => {
    safeOnClose();
    setPopup(false);
  };

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.phone.trim()) {
      await Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please provide both Customer Name and Mobile number.",
        confirmButtonColor: "#2563EB",
      });
      return;
    }

    const payload = {
      customerName: formData.name.trim(),
      address: formData.address.trim(),
      phone: formData.phone.trim(),
      whatsapp: formData.whatsapp.trim(),
      discount: parseFloat(formData.discount) || 0,
      discountApplied: formData.discountFrequency.toLowerCase() || "manual",
      discountType: formData.discountType.toLowerCase() || "manual",
      openingBalance: parseFloat(formData.balance) || 0,
      routeCustomer: formData.route === "Yes",
      routeAddress: formData.routeName.trim(),
    };

    try {
      await axiosInstance.post("/admin/customer/add", payload);

      await Swal.fire({
        icon: "success",
        title: "Customer Added!",
        text: "The customer has been added successfully.",
        confirmButtonColor: "#2563EB",
      });

      safeOnClose();
      setPopup(false);
    } catch (err) {
      console.error("Error adding customer:", err.response || err);

      let message = "Something went wrong.";
      if (err.response?.data) {
        if (err.response.data.message) {
          message = err.response.data.message;
        } else if (Array.isArray(err.response.data.errors)) {
          message = err.response.data.errors.join("\n");
        }
      }

      await Swal.fire({
        icon: "error",
        title: "Save Failed",
        text: message,
        confirmButtonColor: "#DC2626",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 ">
      <div className="w-full sm:w-[640px] lg:w-[1000px] xl:w-[1200px] bg-white rounded-[24px] p-8 sm:p-10 shadow-xl relative">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-300">
          <h2 className="text-2xl font-bold text-gray-900">
            Add New Customer
          </h2>
          <button onClick={handleCancel}>
            <XCircleIcon className="w-6 h-6 text-gray-500 hover:text-red-500" />
          </button>
        </div>

        {/* Form */}
        <div className="grid grid-cols-2 gap-x-20 gap-y-6 mt-6 text-[#05004e] text-xl">
          {/* No. */}
          <div className="flex items-center">
            <label className="w-[172px] text-[#737791]">No.</label>
            <span className="font-bold">Auto Generated</span>
          </div>

          {/* Customer Name */}
          <div className="flex items-center">
            <label className="w-[172px] text-[#737791]">
              Customer Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
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
              type="text"
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
    type="number"
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
                type="number"
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
              type="number"
              value={formData.discount}
              onChange={(e) => handleChange("discount", e.target.value)}
              placeholder="Enter here"
              className="w-[300px] px-4 py-3 bg-gray-50 rounded-xl outline-none"
            />
          </div>

          {/* Opening Balance */}
          <div className="flex items-center">
            <label className="w-[172px] text-[#737791]">
              Opening Balance
            </label>
            <div className="w-[300px] flex items-center px-4 py-3 bg-gray-50 rounded-xl">
              <span className="mr-2 font-bold">$</span>
              <input
                type="number"
                value={formData.balance}
                onChange={(e) => handleChange("balance", e.target.value)}
                placeholder="Enter here"
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Route Yes/No */}
        <div className="flex items-center col-span-2 mt-6">
          <label className="w-[172px] text-[#737791]">Route</label>
          <div className="flex">
            {["Yes", "No"].map((val, idx) => (
              <button
                key={val}
                onClick={() => handleChange("route", val)}
                className={`px-6 py-3 ${
                  formData.route === val
                    ? "bg-blue-100 text-blue-700 border border-blue-500"
                    : "bg-gray-100 text-gray-500 border border-gray-300"
                } ${
                  idx === 0
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
