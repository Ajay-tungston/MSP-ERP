import { useState, } from "react";
import { XCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { FaCalendarAlt } from "react-icons/fa";  // Import the FaCalendarAlt icon
import { useNavigate } from 'react-router-dom';


export default function AddCompanyForm() {
    const [date, setDate] = useState("");
    const [companyCapital, setCompanyCapital] = useState("");
    const [openingCash, setOpeningCash] = useState("");
    const [errors, setErrors] = useState({
        date: "",
        companyCapital: "",
        openingCash: ""
    });

    // Optional Validation
    const validateDate = () => {
        if (!date) {
            return 'Date is required.';
        }
        // Additional date format validation (optional)
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        if (!dateRegex.test(date)) {
            return 'Date must be in DD/MM/YYYY format.';
        }
        return '';
    };

    const validateCompanyCapital = () => {
        if (!companyCapital) {
            return 'Company capital is required.';
        }
        return '';
    };

    const validateOpeningCash = () => {
        if (!openingCash) {
            return 'Opening cash is required.';
        }
        return '';
    };
    const navigate = useNavigate();

    const handleCancel = () => {

        navigate('/company'); // Replace with your desired path
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate fields
        const dateError = validateDate();
        const capitalError = validateCompanyCapital();
        const cashError = validateOpeningCash();

        // Set errors state
        setErrors({
            date: dateError,
            companyCapital: capitalError,
            openingCash: cashError
        });

        // If any error exists, stop the form submission
        if (dateError || capitalError || cashError) {
            return;
        }

        // If all fields are valid, submit the form (simulated)
        alert('Company added successfully!');
        setDate('');
        setCompanyCapital('');
        setOpeningCash('');
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div
                className="bg-white shadow-lg"
                style={{
                    width: "100%", // Width set to 100% for responsiveness
                    maxWidth: "1280px", // Max width is 1280px
                    padding: "48px", // Padding inside the form
                    borderRadius: "24px", // Border radius
                }}
            >
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                    Add New Company
                </h2>
                <hr className="my-3 border-gray-300" />

                <div className="grid gap-[44px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
                    {/* Date Field */}
                    <div className="flex flex-col gap-2">
                        {/* Error message */}
                        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}

                        {/* Label and Input Container */}
                        <div className="flex items-center gap-4">
                            <label className="min-w-[120px] sm:min-w-[150px] text-[#737791] text-xl font-normal">
                                Date <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center border p-2 rounded w-full bg-gray-100">
                                <input
                                    type="text"
                                    placeholder="DD/MM/YYYY"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full bg-transparent outline-none"
                                />
                                <FaCalendarAlt className="text-gray-500" />
                            </div>
                        </div>
                    </div>


                    {/* Company Capital Field */}
                    <div className="flex flex-col gap-2">
                        {/* Error message */}
                        {errors.companyCapital && (
                            <p className="text-red-500 text-sm">
                                {errors.companyCapital}
                            </p>
                        )}

                        {/* Label and Input Container */}
                        <div className="flex items-center gap-4">
                            <label className="min-w-[120px] sm:min-w-[150px] text-[#737791] text-xl font-normal">
                                Company Capital <span className="text-red-500">*</span>
                            </label>
                            <div className="relative w-full sm:w-[350px]">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                <input
                                    type="number"
                                    placeholder="Enter here"
                                    value={companyCapital}
                                    onChange={(e) => setCompanyCapital(e.target.value)}
                                    className="w-full h-[56px] gap-2 rounded-[12px] pt-4 pr-6 pb-4 pl-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>


                    {/* Opening Cash Field */}

                    <div className="flex flex-col gap-2">
                        {/* Error message */}
                        {errors.openingCash && (
                            <p className="text-red-500 text-sm">
                                {errors.openingCash}
                            </p>
                        )}

                        {/* Label and Input Container */}
                        <div className="flex items-center gap-4">
                            <label className="min-w-[120px] sm:min-w-[150px] text-[#737791] text-xl font-normal">
                                Opening Cash <span className="text-red-500">*</span>
                            </label>
                            <div className="relative w-full sm:w-[350px]">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                <input
                                    type="number"
                                    placeholder="Enter here"
                                    value={openingCash}
                                    onChange={(e) => setOpeningCash(e.target.value)}
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
        </div>
    );
}
