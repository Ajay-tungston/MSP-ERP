import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { XCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const EditCustomerModal = ({ onClose, setPopup, customerId }) => {
  const axiosInstance = useAxiosPrivate();
  const safeOnClose = typeof onClose === "function" ? onClose : () => {};

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    whatsapp: "",
    discount: "",
    discountType: "Manual",
    discountFrequency: "Weekly",
    balance: "",
    route: "No",
    routeName: "",
  });

  useEffect(() => {
    if (customerId) {
      axiosInstance
        .get(`/admin/supplier/singlesupplier/${customerId}`)
        .then((res) => {
          const data = res.data;
          setFormData({
            name: data.customerName || "",
            address: data.address || "",
            phone: data.phone || "",
            whatsapp: data.whatsapp || "",
            discount: data.discount || "",
            discountType: data.discountType || "Manual",
            discountFrequency: data.discountApplied || "Weekly",
            balance: data.openingBalance || "",
            route: data.routeCustomer ? "Yes" : "No",
            routeName: data.routeAddress || "",
          });
        })
        .catch((err) => {
          console.error("Fetch customer failed:", err);
          Swal.fire("Error", "Failed to load customer data", "error");
        });
    }
  }, [customerId]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCancel = () => {
    setPopup(false);
    safeOnClose();
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        customerName: formData.name,
        address: formData.address,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        discount: formData.discount,
        discountType: formData.discountType,
        discountApplied: formData.discountFrequency,
        openingBalance: formData.balance,
        routeCustomer: formData.route === "Yes",
        routeAddress: formData.route === "Yes" ? formData.routeName : "",
      };

      await axiosInstance.put(`/admin/supplier/update/${customerId}`, payload);

      Swal.fire("Updated!", "Customer details have been updated.", "success");
      setPopup(false);
    } catch (error) {
      console.error("Update failed:", error);
      Swal.fire("Error", "Failed to update customer", "error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 ">
      <div className="w-full sm:w-[640px] lg:w-[1000px] xl:w-[1200px] bg-white rounded-[24px] p-8 sm:p-10 shadow-xl relative">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-300">
          <h2 className="text-2xl font-bold text-gray-900">
            Edit New Customer
          </h2>
          <button onClick={handleCancel}>
            <XCircleIcon className="w-6 h-6 text-gray-500 hover:text-red-500" />
          </button>
        </div>

        {/* Form */}
        <div className="grid grid-cols-2 gap-x-20 gap-y-6 mt-6 text-[#05004e] text-xl">
          <div className="flex items-center">
            <label className="w-[172px] text-[#737791]">No.</label>
            <span className="font-bold">Auto Generated</span>
          </div>

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

          <div className="flex items-center">
            <label className="w-[172px] text-[#737791]">Address</label>
            <input
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Enter here"
              className="w-[300px] px-4 py-3 bg-gray-50 rounded-xl outline-none"
            />
          </div>

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

          <div className="flex items-center">
            <label className="w-[172px] text-[#737791]">Discount %</label>
            <input
              value={formData.discount}
              onChange={(e) => handleChange("discount", e.target.value)}
              placeholder="Enter here"
              className="w-[300px] px-4 py-3 bg-gray-50 rounded-xl outline-none"
            />
          </div>

          <div className="flex items-start">
            <label className="w-[172px] text-[#737791] mt-8">
              Discount Applied
            </label>
            <div className="flex flex-col gap-3">
              <div className="flex">
                {["Weekly", "Monthly", "Yearly"].map((freq, idx) => (
                  <button
                    key={freq}
                    onClick={() => handleChange("discountFrequency", freq)}
                    className={`px-6 py-3 ${
                      formData.discountFrequency === freq
                        ? "bg-blue-100 text-blue-700 border border-blue-500"
                        : "bg-gray-100 text-gray-500 border border-gray-300"
                    } ${
                      idx === 0
                        ? "rounded-l-2xl"
                        : idx === 2
                        ? "rounded-r-2xl"
                        : "rounded-none"
                    }`}
                  >
                    {freq}
                  </button>
                ))}
              </div>
              <div className="flex">
                {["Manual", "Auto"].map((method, idx) => (
                  <button
                    key={method}
                    onClick={() => handleChange("discountType", method)}
                    className={`px-6 py-3 ${
                      formData.discountType === method
                        ? "bg-blue-100 text-blue-700 border border-blue-500"
                        : "bg-gray-100 text-gray-500 border border-gray-300"
                    } ${
                      idx === 0
                        ? "rounded-l-xl border-r-0"
                        : "rounded-r-xl border-l-0"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-[172px] text-[#737791]">
              Opening Balance
            </label>
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

export default EditCustomerModal;
