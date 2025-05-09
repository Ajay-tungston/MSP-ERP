import React, { useState, useEffect } from "react";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import {  useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Swal from "sweetalert2";


const EditSupplier=({ supplierId,setEditPopup }) => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    supplierCode: "",
    supplierName: "",
    phone: "",
    address: "",
    whatsapp: "",
    advance: "",
    advanceDeducted: "",
    commission: "",
    marketFee: "",
  });

  const [sameAsPhone, setSameAsPhone] = useState(false);
  const [responseError, setResponseError] = useState("");

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const res = await axiosPrivate.get(`/admin/supplier/singlesupplier/${supplierId}`);
        setFormData(res.data);
        if (res.data.phone === res.data.whatsapp) setSameAsPhone(true);
      } catch (error) {
        console.error("Error fetching supplier:", error);
        Swal.fire("Error", "Failed to load supplier data", "error");
        navigate("/suppliers");
      }
    };

    fetchSupplier();
  }, [supplierId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSameAsPhoneChange = () => {
    const isChecked = !sameAsPhone;
    setSameAsPhone(isChecked);
    setFormData((prev) => ({
      ...prev,
      whatsapp: isChecked ? prev.phone : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosPrivate.put(`/admin/supplier/update/${supplierId}`, formData);
      Swal.fire("Updated!", "Supplier updated successfully.", "success");

    } catch (error) {
      console.error("Update error:", error);
      setResponseError("Failed to update supplier.");
      Swal.fire("Error", "Update failed", "error");
    }
  };

  const handleCancel = () => {
    setFormData({
      supplierCode: "",
      supplierName: "",
      phone: "",
      address: "",
      whatsapp: "",
      advance: "",
      advanceDeducted: "",
      commission: "",
      marketFee: "",
    });
    setSameAsPhone(false);
    setResponseError("");
    setEditPopup(false); // Close modal
  };
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75">
      <div className="w-full sm:w-[640px] lg:w-[1000px] xl:w-[1200px] bg-white rounded-[24px] p-8 sm:p-10 shadow-xl relative">

        <div className="flex justify-between items-center pb-4 border-b border-gray-300">
          <h2 className="text-[28px] font-bold text-[#151d48]">Edit Supplier</h2>
          <button onClick={handleCancel}>
            <XCircleIcon className="w-6 h-6 text-gray-500 hover:text-red-500" />
          </button>
        </div>

        {responseError && <p className="text-red-500 mt-2">{responseError}</p>}

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-20 gap-y-6 mt-6 text-[#05004e] text-xl font-['Urbanist']">
          {/* Supplier Code (Disabled) */}
          <div className="flex items-center">
            <label className="w-[172px] text-[#737791]">Supplier Code</label>
            <input
              name="supplierCode"
              value={formData.supplierCode}
              disabled
              className="w-full sm:w-[350px] px-6 py-4 bg-gray-100 rounded-xl outline-none"
            />
          </div>

          {/* Supplier Name */}
          <div className="flex items-center">
            <label className="w-[172px] text-[#737791]">Supplier Name</label>
            <input
              name="supplierName"
              value={formData.supplierName}
              onChange={handleChange}
              className="w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl outline-none"
            />
          </div>

          {/* Phone */}
          <div className="flex items-center">
            <label className="w-[172px] text-[#737791]">Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl outline-none"
            />
          </div>

          {/* WhatsApp */}
          <div className="flex flex-col">
            <div className="flex items-center">
              <label className="w-[172px] text-[#737791]">WhatsApp</label>
              <input
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                className="w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl outline-none"
              />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={sameAsPhone}
                onChange={handleSameAsPhoneChange}
                className="w-4 h-4 rounded border-2 border-gray-300"
              />
              <label className="text-[#a1a5b6]">Same as Phone</label>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center">
            <label className="w-[172px] text-[#737791]">Address</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl outline-none"
            />
          </div>

          {/* Advance */}
          <div className="flex items-center">
            <label className="w-[172px] text-[#737791]">Advance</label>
            <input
              type="number"
              name="advance"
              value={formData.advance}
              onChange={handleChange}
              className="w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl outline-none"
            />
          </div>

          {/* Advance Deducted */}
          <div className="flex items-center">
            <label className="w-[172px] text-[#737791]">Advance Deducted</label>
            <input
              type="number"
              name="advanceDeducted"
              value={formData.advanceDeducted}
              onChange={handleChange}
              className="w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl outline-none"
            />
          </div>

          {/* Commission */}
          <div className="flex items-center">
            <label className="w-[172px] text-[#737791]">Commission</label>
            <input
              type="text"
              name="commission"
              value={formData.commission}
              onChange={handleChange}
              className="w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl outline-none"
            />
          </div>

          {/* Market Fee */}
          <div className="flex items-center">
            <label className="w-[172px] text-[#737791]">Market Fee</label>
            <input
              type="number"
              name="marketFee"
              value={formData.marketFee}
              onChange={handleChange}
              className="w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl outline-none"
            />
          </div>
        </form>

        {/* Footer */}
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
            <CheckCircleIcon className="w-5 h-5" />
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditSupplier;
