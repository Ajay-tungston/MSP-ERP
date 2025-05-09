// src/pages/EditCustomerPage.jsx
import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { XCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
const EditCustomerPage = ({customerId,setEditPopup}) => {
  const axiosInstance = useAxiosPrivate();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    whatsapp: "",
    discount: "",
    discountType: "",
    discountFrequency: "",
    balance: "",
    route: "No",
    routeName: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const fetchCustomer = async () => {
    try {
      const res = await axiosInstance.get(`/admin/customer/get/${customerId}`);
      const data = res.data;

      setFormData({
        name: data.customerName || "",
        address: data.address || "",
        phone: data.phone || "",
        whatsapp: data.whatsapp || "",
        discount: data.discount || "",
        discountType: data.discountType || "",
        discountFrequency: data.discountApplied || "",
        balance: data.openingBalance || "",
        route: data.routeCustomer ? "Yes" : "No",
        routeName: data.routeAddress || "",
      });
    } catch (err) {
      console.error("Error fetching customer:", err);
      Swal.fire("Error", "Failed to load customer data", "error");
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, [customerId]);

  const handleCancel = () => {

    setEditPopup(false);
  };
  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.phone.trim()) {
      await Swal.fire("Validation Error", "Name and phone are required.", "error");
      return;
    }

    const payload = {
      customerName: formData.name.trim(),
      address: formData.address.trim(),
      phone: formData.phone.trim(),
      whatsapp: formData.whatsapp.trim(),
      discount: parseFloat(formData.discount) || 0,
      discountType: formData.discountType || "manual",
      discountApplied: formData.discountFrequency || "manual",
      openingBalance: parseFloat(formData.balance) || 0,
      routeCustomer: formData.route === "Yes",
      routeAddress: formData.routeName.trim(),
    };

    try {
      await axiosInstance.put(`/admin/customer/update/${customerId}`, payload);

      await Swal.fire("Success", "Customer updated successfully", "success");
      // navigate("/mastercustomer"); // Go back to customer list
      setEditPopup(false)
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update customer", "error");
    }
  };


  return (
     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 ">
          <div className="w-full sm:w-[640px] lg:w-[1000px] xl:w-[1200px] bg-white rounded-[24px] p-8 sm:p-10 shadow-xl relative">
            {/* Header */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-300">
              <h2 className="text-2xl font-bold text-gray-900">
               Edit Customer
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
        type="tel"
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

export default EditCustomerPage;
