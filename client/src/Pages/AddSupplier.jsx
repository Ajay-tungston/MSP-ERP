import React, { useState } from "react";
import { XCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function AddSupplier({ setPopup, fetchSuppliers }) {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  // const safeOnClose = typeof onClose === "function" ? onClose : () => {};
  // State to manage form values
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

  // State to manage errors
  const [errors, setErrors] = useState({
    supplierCode: "",
    supplierName: "",
    phone: "",
    whatsapp: "",
    requiredFields: "",
  });

  const [responseError, setResponseError] = useState("");

  // State to manage "Same as Phone" checkbox
  const [sameAsPhone, setSameAsPhone] = useState(false);

  // Handle change for form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle checkbox change for "Same as Phone"
  const handleSameAsPhoneChange = () => {
    setSameAsPhone(!sameAsPhone);
    if (!sameAsPhone) {
      setFormData({
        ...formData,
        whatsapp: formData.phone,
      });
    } else {
      setFormData({
        ...formData,
        whatsapp: "",
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({
      supplierCode: "",
      supplierName: "",
      phone: "",
      whatsapp: "",
      requiredFields: "",
    });

    // Validation logic (unchanged from your original code)
    const newErrors = {};
    if (!formData.supplierCode.trim()) {
      newErrors.supplierCode = "Supplier Code is required.";
    }
    if (!formData.supplierName.trim()) {
      newErrors.supplierName = "Supplier Name is required.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required.";
    }
    if (!formData.commission.trim()) {
      newErrors.commission = "Commission is required.";
    }
    if (!formData.marketFee.trim()) {
      newErrors.marketFee = "Market Fee is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axiosPrivate.post("/admin/supplier/add", formData);
      if (response.status === 201) {
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
        setResponseError("");
        Swal.fire({
          title: "Supplier Added Successfully!",
          icon: "success",
          draggable: true,
        });
        fetchSuppliers();
        setPopup(false); // Navigate after successful submission
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 400) {
        setResponseError(error?.response?.data?.message);
      } else {
        Swal.fire({
          title: "Something went wrong!",
          icon: "error",
          draggable: true,
        });
      }
    }
  };

  // Updated handleCancel with navigation
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
    setErrors({
      supplierCode: "",
      supplierName: "",
      phone: "",
      commission: "",
      marketFee: "",
      requiredFields: "",
    });
    setSameAsPhone(false);
    setResponseError("");
    setPopup(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 ">
      <div className="w-full sm:w-[640px] lg:w-[1000px] xl:w-[1200px] bg-white rounded-[24px] p-8 sm:p-10 shadow-xl relative">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-300">
          <button
            onClick={() => navigate("/suppliers")}
            className="text-[#151d48] text-[24px] sm:text-[28px] md:text-[32px] font-bold font-['Urbanist'] leading-[44.80px] hover:opacity-80 transition-opacity text-left"
          >
            Add New Supplier
          </button>
          <button onClick={handleCancel}>
            <XCircleIcon className="w-6 h-6 text-gray-500 hover:text-red-500" />
          </button>
        </div>

        {/* Server-response error */}
        {responseError && (
          <p className="mt-4 text-red-500 font-['Urbanist']">{responseError}</p>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-x-20 gap-y-6 mt-6 text-[#05004e] text-xl font-['Urbanist']"
        >
          {/* No. */}
          {/* <div className="flex items-center">
            <label className="w-[172px] text-[#737791]">No.</label>
            <div className="font-bold">Auto Generated</div>
          </div> */}

          {/* Supplier Code */}
          <div className="flex flex-col">
            {errors.supplierCode && (
              <p className="text-red-500 mb-1">{errors.supplierCode}</p>
            )}
            <div className="flex items-center">
              <label className="w-[172px] text-[#737791]">
                Supplier Code <span className="text-red-500">*</span>
              </label>
              <input
                name="supplierCode"
                value={formData.supplierCode}
                onChange={handleChange}
                placeholder="Enter here"
                className={`w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl outline-none ${
                  errors.supplierCode ? "border border-red-500" : ""
                }`}
              />
            </div>
          </div>

          {/* Supplier Name */}
          <div className="flex flex-col">
            {errors.supplierName && (
              <p className="text-red-500 mb-1">{errors.supplierName}</p>
            )}
            <div className="flex items-center">
              <label className="w-[172px] text-[#737791]">
                Supplier Name <span className="text-red-500">*</span>
              </label>
              <input
                name="supplierName"
                value={formData.supplierName}
                onChange={handleChange}
                placeholder="Enter here"
                className={`w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl outline-none ${
                  errors.supplierName ? "border border-red-500" : ""
                }`}
              />
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center">
            <label className="w-[172px] text-[#737791]">Address</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter here"
              className="w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl outline-none"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            {errors.phone && (
              <p className="text-red-500 mb-1">{errors.phone}</p>
            )}
            <div className="flex items-center">
              <label className="w-[172px] text-[#737791]">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter here"
                className={`w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl outline-none ${
                  errors.phone ? "border border-red-500" : ""
                }`}
              />
            </div>
          </div>

          {/* WhatsApp */}
          <div className="flex flex-col">
            {errors.whatsapp && (
              <p className="text-red-500 mb-1">{errors.whatsapp}</p>
            )}
            <div className="flex items-center">
              <label className="w-[172px] text-[#737791]">WhatsApp</label>
              <input
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="Enter here"
                className={`w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl outline-none ${
                  errors.whatsapp ? "border border-red-500" : ""
                }`}
              />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input
                id="sameAsPhone"
                type="checkbox"
                checked={sameAsPhone}
                onChange={handleSameAsPhoneChange}
                className="w-4 h-4 rounded border-2 border-gray-300 focus:ring-0 checked:border-blue-500 checked:bg-blue-500"
              />
              <label htmlFor="sameAsPhone" className="text-[#a1a5b6]">
                Same as Phone
              </label>
            </div>
          </div>

          {/* Advance */}
          {/* <div className="flex items-center">
            <label className="w-[172px] text-[#737791]">Advance</label>
            <input
              name="advance"
              type="number"
              value={formData.advance}
              onChange={handleChange}
              className="w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl outline-none"
            />
          </div> */}

          {/* Commission */}
          <div className="flex flex-col">
            {errors.commission && (
              <p className="text-red-500 mb-1">{errors.commission}</p>
            )}
            <div className="flex items-center">
              <label className="w-[172px] text-[#737791]">
                Commission <span className="text-red-500">*</span>
              </label>
              <input
                name="commission"
                type="number"
                placeholder="0%"
                value={formData.commission}
                onChange={handleChange}
                className={`w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl outline-none ${
                  errors.commission ? "border border-red-500" : ""
                }`}
              />
            </div>
          </div>

          {/* marketfee */}
          <div className="flex flex-col">
            {errors.marketFee && (
              <p className="text-red-500 mb-1">{errors.marketFee}</p>
            )}
            <div className="flex items-center">
              <label className="w-[172px] text-[#737791]" htmlFor="marketFee">
                Market Fee <span className="text-red-500">*</span>
              </label>
              <input
                id="marketFee"
                name="marketFee"
                placeholder="for 1 box"
                type="number"
                className={`w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl outline-none ${
                  errors.marketFee ? "border border-red-500" : ""
                }`}
                value={formData.marketFee}
                onChange={handleChange}
              />
            </div>
          </div>
          
          {/* Advance Deducted */}
           <div className="flex items-center">
            <label className="w-[172px] text-[#737791]">
              Advance Deducted
            </label>
            <input
              name="advanceDeducted"
              type="number"
              value={formData.advanceDeducted}
              onChange={handleChange}
              className="w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl outline-none"
            />
          </div>

          {/* Required-fields error */}
          {errors.requiredFields && (
            <p className="col-span-2 text-red-500 mt-4">
              {errors.requiredFields}
            </p>
          )}
        </form>

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
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={handleSubmit}
          >
            <PlusCircleIcon className="w-5 h-5" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddSupplier;
