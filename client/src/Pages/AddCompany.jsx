import { useState } from "react";
import { XCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function AddCompanyForm({ setPopup }) {
    const [date, setDate] = useState("");
    const axiosInstance = useAxiosPrivate();  
    const [companyCapital, setCompanyCapital] = useState("");
    const [openingCash, setOpeningCash] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [errors, setErrors] = useState({
        date: "",
        companyCapital: "",
        openingCash: "",
        companyName:""
    });

    // ✅ Updated: Date validation with DD/MM/YYYY logic
    const validateDate = () => {
        if (!date) {
            return 'Date is required.';
        }

        // Convert YYYY-MM-DD to DD/MM/YYYY
        const parts = date.split('-'); // [YYYY, MM, DD]
        if (parts.length !== 3) {
            return 'Invalid date format.';
        }

        const [year, month, day] = parts;
        const formattedDate = `${day}/${month}/${year}`;

        // Validate DD/MM/YYYY format
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        if (!dateRegex.test(formattedDate)) {
            return 'Date must be in DD/MM/YYYY format.';
        }

        // Check if it's a real calendar date
        const parsed = new Date(`${year}-${month}-${day}`);
        if (
            parsed.getFullYear() !== Number(year) ||
            parsed.getMonth() + 1 !== Number(month) ||
            parsed.getDate() !== Number(day)
        ) {
            return 'Invalid calendar date.';
        }
          // Prevent future dates
          const today = new Date();
          if (parsed > today) return 'Date cannot be in the future.';
  
          return '';
    };

    const validateCompanyCapital = () => {
        if (!companyCapital) return 'Company capital is required.';
        if (Number(companyCapital) < 0) return 'Company capital cannot be negative.';
        return '';
    };

    const validateOpeningCash = () => {
        if (!openingCash) return 'Opening cash is required.';
        if (Number(openingCash) < 0) return 'Opening cash cannot be negative.';
        return '';
    };

    const validateCompanyName = () => {
        if (!companyName) {
            return 'Company Name is required.';
        }
        return '';
    };
    const navigate = useNavigate();

    const handleCancel = () => {
        setPopup(false);
        navigate('/company'); // Replace with your desired path
    };

    // ✅ Updated: Submit with formatted date output
    const handleSubmit = async (e) => {
        e.preventDefault();

        const dateError = validateDate();
        const capitalError = validateCompanyCapital();
        const cashError = validateOpeningCash();
        const companyError = validateCompanyName();

        setErrors({
            date: dateError,
            companyCapital: capitalError,
            openingCash: cashError,
            companyName: companyError,
        });

        if (dateError || capitalError || cashError || companyError) {
            return;
        }

        // Convert to DD/MM/YYYY format to use in backend/API/display
        const [year, month, day] = date.split('-');
        const formattedDate = `${day}/${month}/${year}`;

        const payload = {
    date: formattedDate,
    companyCapital,
    openingCash,
    companyName,
};

try {
    const response = await axiosInstance.post('/admin/company/add', payload);
    alert(`✅ Company added successfully: ${response.data.message || 'Success'}`);
    setDate('');
    setCompanyCapital('');
    setOpeningCash('');
    setCompanyName('');
    setPopup(false);
    navigate('/company');
} catch (error) {
    console.error("❌ Error submitting form:", error);
    alert("❌ Failed to add company. Please try again.");
}

    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75">
            <div
                className="bg-white shadow-lg"
                style={{
                    width: "100%",
                    maxWidth: "1280px",
                    padding: "48px",
                    borderRadius: "24px",
                }}
            >
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                    Add New Company
                </h2>
                <hr className="my-3 border-gray-300" />

                <div className="grid gap-[44px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 ">
                    {/* Date Field */}
                    <div className="flex flex-col gap-2">
                        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}

                        <div className="flex items-center gap-4">
                            <label className="min-w-[120px] sm:min-w-[150px] text-[#737791] text-xl font-normal">
                                Date <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center p-2 rounded w-full">
                                <input
                                    type="date"
                                    placeholder="DD/MM/YYYY"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full h-[56px] gap-2 rounded-[12px] pt-4 pr-6 pb-4 pl-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Company Capital Field */}
                    <div className="flex flex-col gap-2">
                        {errors.companyCapital && (
                            <p className="text-red-500 text-sm">{errors.companyCapital}</p>
                        )}

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
                        {errors.openingCash && (
                            <p className="text-red-500 text-sm">{errors.openingCash}</p>
                        )}

                        <div className="flex items-center gap-4">
                            <label className="w-[120px] sm:min-w-[150px] text-[#737791] text-xl font-normal">
                                Opening Cash <span className="text-red-500">*</span>
                            </label>
                            <div className="relative w-full sm:w-[350px] ml-5">
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

{/*  company name */}
                    <div className="flex flex-col gap-2">
                        {errors.companyCompanyName && (
                            <p className="text-red-500 text-sm">{errors.companyCompanyName}</p>
                        )}

                        <div className="flex items-center gap-4">
                            <label className="min-w-[120px] sm:min-w-[150px] text-[#737791] text-xl font-normal">
                                Company Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative w-full sm:w-[350px]">
                            
                                <input
                                    type="text"
                                    placeholder="Enter here"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    className="w-full h-[56px] gap-2 rounded-[12px] pt-4 pr-6 pb-4 pl-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                    {/* Action buttons */}
                    <div className="w-full ml-[600px] h-full p-4 md:p-8 lg:p-12 bg-white rounded-3xl flex flex-col justify-start items-start gap-12 overflow-hidden">
                        <div className="self-stretch flex justify-end items-center gap-4 mt-8 md:mr-25">
                            <div className="flex gap-4">
                                <button
                                    onClick={handleCancel}
                                    className="flex items-center gap-2 border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-100 transition"
                                >
                                    <XCircleIcon className="w-5 h-5" />
                                    Cancel
                                </button>

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
