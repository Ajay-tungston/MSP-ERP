
import React, { useState } from 'react';
import { XCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import validator from 'validator';

function AddSupplier () {
    // State to manage form values
    const [formData, setFormData] = useState({
        supplierCode: '',
        supplierName: '',
        phone: '',
        address: '',
        whatsapp: '',
        advance: '',
        advanceDeducted: '',
        commission: '',
    });

    // State to manage errors
    const [errors, setErrors] = useState({
        supplierCode: '',
        supplierName: '',
        phone: '',
        whatsapp: '',
        requiredFields: '',
    });

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
                whatsapp: formData.phone, // Auto-fill WhatsApp with phone number
            });
        } else {
            setFormData({
                ...formData,
                whatsapp: '', // Clear WhatsApp when unchecked
            });
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Reset errors
        setErrors({
            supplierCode: '',
            supplierName: '',
            phone: '',
            whatsapp: '',
            requiredFields: '',
        });

        // Validation
        const newErrors = {};

        // Check for required fields (Supplier Code, Supplier Name, Phone)
        if (!formData.supplierCode.trim()) {
            newErrors.supplierCode = 'Supplier Code is required.';
        }
        if (!formData.supplierName.trim()) {
            newErrors.supplierName = 'Supplier Name is required.';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required.';
        }


        // Validate Supplier Code
        if (
            formData.supplierCode &&
            (!validator.isAlphanumeric(formData.supplierCode) ||
                formData.supplierCode.length < 3 ||
                formData.supplierCode.length > 10)
        ) {
            newErrors.supplierCode =
                'Supplier code must be alphanumeric and between 3 and 10 characters long.';
        }

        // Validate Supplier Name
        if (formData.supplierName && (formData.supplierName.length < 3 || formData.supplierName.length > 100)) {
            newErrors.supplierName = 'Supplier name must be between 3 and 100 characters long.';
        }

        // Validate Address
        if (formData.address && (formData.address.length < 5 || formData.address.length > 200)) {
            newErrors.address = 'Address must be between 5 and 200 characters long.';
        }

        // Validate Phone Number (exactly 10 digits)
        if (formData.phone && formData.phone.length !== 10) {
            newErrors.phone = 'Phone number must be exactly 10 digits.';
        }

        // Validate WhatsApp Number (exactly 10 digits)
        if (formData.whatsapp && formData.whatsapp.length !== 10) {
            newErrors.whatsapp = 'WhatsApp number must be exactly 10 digits.';
        }

        // Validate Advance and Advance Deducted (must be greater than 0)
        if (formData.advance <= 0) {
            newErrors.advance = 'Advance must be greater than 0.';
        }
        if (formData.advanceDeducted <= 0) {
            newErrors.advanceDeducted = 'Advance Deducted must be greater than 0.';
        }

        // Validate Commission (between 0 and 100)
        if (formData.commission < 0 || formData.commission > 100) {
            newErrors.commission = 'Commission must be between 0 and 100.';
        }

        // Check if there are errors
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Submit form data (you can send this data to an API or handle it accordingly)
        console.log('Form submitted successfully!', formData);
    };
    // Reset form function to clear all fields
    const handleCancel = () => {
        setFormData({
            supplierCode: '',
            supplierName: '',
            phone: '',
            address: '',
            whatsapp: '',
            advance: '',           // Clear advance
            advanceDeducted: '',   // Clear advance deducted
            commission: '',        // Clear commission
        });

        setErrors({
            supplierCode: '',
            supplierName: '',
            phone: '',
            whatsapp: '',
            requiredFields: '',
            advance: '',
            advanceDeducted: '',
            commission: '',
        });
        setSameAsPhone(false); // Reset "Same as Phone" checkbox
    };
    return (
        <div className="w-full h-full p-4 md:p-8 lg:p-12 bg-white rounded-3xl flex flex-col justify-start items-start gap-12 overflow-hidden">
            <div className="w-full pb-6 border-b border-[#a1a5b6] flex justify-start items-center gap-2.5">
                <div className="text-[#151d48] text-[24px] sm:text-[28px] md:text-[32px] font-bold font-['Urbanist'] leading-[44.80px]">
                    Add New Supplier
                </div>
            </div>

            <form onSubmit={handleSubmit} className="w-full flex flex-wrap justify-between items-start gap-12 md:px-8 lg:px-40">
                {/* No. */}
                <div className="flex justify-start items-center gap-6 sm:gap-12 w-full sm:w-[570px]">
                    <label className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']" htmlFor="customer-number">
                        No.
                    </label>
                    <div className="w-[77px] text-center text-[#05004e] text-xl font-bold font-['Urbanist']">001</div>
                </div>


                {/* Supplier Code */}
                <div className="flex flex-col w-full sm:w-[570px]">
                    {/* Display Error Message Above Label if any */}
                    {errors.supplierCode && (
                        <p className="text-red-500 text-sm">{errors.supplierCode}</p>
                    )}

                    {/* Label and Input on the same line */}
                    <div className="flex justify-start items-center gap-6 sm:gap-12">
                        <label className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']" htmlFor="supplier-code">
                            Supplier Code <span className="text-red-500 text-xl">*</span>
                        </label>
                        <input
                            id="supplier-code"
                            name="supplierCode"
                            type="text"
                            placeholder="Enter here"
                            className={`w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl text-xl font-normal font-['Urbanist'] ${errors.supplierCode ? 'border-red-500' : ''}`}
                            value={formData.supplierCode}
                            onChange={handleChange}
                        />
                    </div>
                </div>



                {/* Supplier Name */}
                <div className="flex flex-col w-full sm:w-[570px]">
                    {/* Display Error Message Above Label if any */}
                    {errors.supplierName && (
                        <p className="text-red-500 text-sm">{errors.supplierName}</p>
                    )}

                    {/* Label and Input on the same line */}
                    <div className="flex justify-start items-center gap-6 sm:gap-12">
                        <label className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']" htmlFor="supplier-name">
                            Supplier Name <span className="text-red-500 text-xl">*</span>
                        </label>
                        <input
                            id="supplier-name"
                            name="supplierName"
                            type="text"
                            placeholder="Enter here"
                            className={`w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl text-xl font-normal font-['Urbanist'] ${errors.supplierName ? 'border-red-500' : ''}`}
                            value={formData.supplierName}
                            onChange={handleChange}
                        />
                    </div>
                </div>





                {/* Address */}
                <div className="flex flex-col w-full sm:w-[570px]">
                    {/* Display Error Message Above Label if any */}
                    {errors.address && (
                        <p className="text-red-500 text-sm">{errors.address}</p>
                    )}

                    {/* Label and Input on the same line */}
                    <div className="flex justify-start items-center gap-6 sm:gap-12">
                        <label className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']" htmlFor="address">
                            Address
                        </label>
                        <input
                            id="address"
                            name="address"
                            type="text"
                            placeholder="Enter here"
                            className={`w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl text-xl font-normal font-['Urbanist'] ${errors.address ? 'border-red-500' : ''}`}
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>
                </div>




                {/* Phone */}
                <div className="flex flex-col w-full sm:w-[570px]">
                    {/* Display Error Message Above Label if any */}
                    {errors.phone && (
                        <p className="text-red-500 text-sm">{errors.phone}</p>
                    )}

                    {/* Label and Input on the same line */}
                    <div className="flex justify-start items-center gap-6 sm:gap-12">
                        <label className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']" htmlFor="phone">
                            Phone <span className="text-red-500 text-xl">*</span>
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="text"
                            placeholder="Enter here"
                            className={`w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl text-xl font-normal font-['Urbanist'] ${errors.phone ? 'border-red-500' : ''}`}
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                </div>


                {/* WhatsApp */}
                <div className="flex flex-col w-full sm:w-[570px]">
                    {/* Display Error Message Above Label if any */}
                    {errors.whatsapp && (
                        <p className="text-red-500 text-sm">{errors.whatsapp}</p>
                    )}

                    {/* Label and Input on the same line */}
                    <div className="flex justify-start items-center gap-6 sm:gap-12">
                        <label className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']" htmlFor="whatsapp">
                            WhatsApp
                        </label>
                        <input
                            id="whatsapp"
                            name="whatsapp"
                            type="text"
                            placeholder="Enter here"
                            className={`w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl text-xl font-normal font-['Urbanist'] ${errors.whatsapp ? 'border-red-500' : ''}`}
                            value={formData.whatsapp}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Checkbox for "Same as Phone" */}
                    <div className="inline-flex justify-start items-center gap-2">
                        <input
                            id="sameAsPhone"
                            type="checkbox"
                            checked={sameAsPhone}
                            onChange={handleSameAsPhoneChange}
                            className="checkbox w-4 h-4 rounded border-2 border-gray-300 focus:ring-0 checked:border-blue-500 checked:bg-blue-500"
                        />
                        <label htmlFor="sameAsPhone" className="text-[#a1a5b6] text-base font-normal font-['Urbanist']">
                            Same as Phone
                        </label>
                    </div>
                </div>



                {/* Advance */}
                <div className="flex flex-col w-full sm:w-[570px]">
                    {/* Display Error Message Above Label if any */}
                    {errors.advance && (
                        <p className="text-red-500 text-sm">{errors.advance}</p>
                    )}

                    {/* Label and Input on the same line */}
                    <div className="flex justify-start items-center gap-6 sm:gap-12">
                        <label className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']" htmlFor="advance">
                            Advance
                        </label>
                        <input
                            id="advance"
                            name="advance"
                            type="number"
                            className={`w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl text-xl font-normal font-['Urbanist'] ${errors.advance ? 'border-red-500' : ''}`}
                            value={formData.advance}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Advance Deducted */}
                <div className="flex flex-col w-full sm:w-[570px]">
                    {/* Display Error Message Above Label if any */}
                    {errors.advanceDeducted && (
                        <p className="text-red-500 text-sm">{errors.advanceDeducted}</p>
                    )}

                    {/* Label and Input on the same line */}
                    <div className="flex justify-start items-center gap-6 sm:gap-12">
                        <label className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']" htmlFor="advance-deducted">
                            Advance Deducted
                        </label>
                        <input
                            id="advance-deducted"
                            name="advanceDeducted"
                            type="number"
                            className={`w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl text-xl font-normal font-['Urbanist'] ${errors.advanceDeducted ? 'border-red-500' : ''}`}
                            value={formData.advanceDeducted}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Commission */}
                <div className="flex flex-col w-full sm:w-[570px]">
                    {/* Display Error Message Above Label if any */}
                    {errors.commission && (
                        <p className="text-red-500 text-sm">{errors.commission}</p>
                    )}

                    {/* Label and Input on the same line */}
                    <div className="flex justify-start items-center gap-6 sm:gap-12">
                        <label className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']" htmlFor="commission">
                            Commission Type
                        </label>
                        <input
                            id="commission"
                            name="commission"
                            type="number"
                            className={`w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl text-xl font-normal font-['Urbanist'] ${errors.commission ? 'border-red-500' : ''}`}
                            value={formData.commission}
                            onChange={handleChange}
                        />
                    </div>
                </div>


                {/* Error for Required Fields */}
                {errors.requiredFields && <p className="text-red-500 text-sm mt-4">{errors.requiredFields}</p>}

                {/* Action Buttons */}
                <div className="self-stretch flex justify-end items-center gap-4 mt-8 md:mr-25">
                    <div className="flex gap-4">


                        <button
                            type="button"
                            className="flex items-center gap-2 border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-100 transition"
                            onClick={handleCancel}
                        >
                            <XCircleIcon className="w-5 h-5" />
                            Cancel
                        </button>




                        {/* Save Button */}
                        <button type="submit"
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">


                            <PlusCircleIcon className="w-5 h-5" />
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}


export default AddSupplier