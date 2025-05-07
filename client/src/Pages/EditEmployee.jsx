import React, { useState } from "react";
import { XCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


function EditEmploye() {
  const [employeeName, setEmployeeName] = useState("");
  const [phone, setPhone] = useState("");
  const [salary, setSalary] = useState("");
  const [address, setAddress] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [sameAsPhone, setSameAsPhone] = useState(false);
  const [joiningDate, setJoiningDate] = useState("");
  const [openingBalance, setOpeningBalance] = useState("");
  const [salaryType, setSalaryType] = useState("monthly");

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    employeeName: "",
    phone: "",
    salary: "",
    joiningDate: "",
  });
  const [responseError, setResponseError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formValid = true;
    const newErrors = {
      employeeName: "",
      phone: "",
      salary: "",
      address: "",
      whatsapp: "",
    };

    // Validate Employee Name
    if (!employeeName) {
      newErrors.employeeName = "Employee Name is required";
      formValid = false;
    } else if (employeeName.length < 3 || employeeName.length > 100) {
      newErrors.employeeName =
        "Employee Name should be between 3 to 100 characters";
      formValid = false;
    }

    // Validate Phone
    if (!phone) {
      newErrors.phone = "Phone Number is required";
      formValid = false;
    } else if (phone.length !== 10 || isNaN(phone)) {
      newErrors.phone = "Phone Number should be exactly 10 digits";
      formValid = false;
    }

    // Validate Salary
    if (!salary) {
      newErrors.salary = "Salary is required";
      formValid = false;
    } else if (parseFloat(salary) < 0) {
      newErrors.salary = "Salary should be above 0";
      formValid = false;
    }

    // Validate Address (Optional but with length restriction)
    if (address && (address.length < 5 || address.length > 200)) {
      newErrors.address =
        "Address should be between 5 to 200 characters if provided";
      formValid = false;
    }

    // Validate WhatsApp
    if (sameAsPhone && (whatsapp !== phone || whatsapp.length !== 10)) {
      newErrors.whatsapp = "WhatsApp number should be exactly 10 digits";
      formValid = false;
    }
    // Validate Joining Date
    const today = new Date();
    const selectedDate = new Date(joiningDate);
    if (!joiningDate) {
      newErrors.joiningDate = "Joining Date is required";
      formValid = false;
    } else if (selectedDate > today) {
      newErrors.joiningDate =
        "Joining Date must be a valid date and cannot be in the future.";
      formValid = false;
    }

    setErrors(newErrors);

    if (formValid) {
      // Handle form submission
      console.log("Form Submitted");
      try {
        const response = await axiosPrivate.post("/admin/employee/add", {
          employeeName,
          phone,
          salary,
          address,
          whatsapp,
          joiningDate,
          openingBalance,
          salaryType,
        });
        Swal.fire({
          title: "Employee Added Successfully!",
          icon: "success",
          draggable: true,
        });
        setEmployeeName("");
        setPhone("");
        setSalary("");
        setAddress("");
        setWhatsapp("");
        setJoiningDate("");
        setOpeningBalance("");
        setResponseError("");
        navigate("/employee")
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
    }
  };
  // Update WhatsApp number automatically when "Same as Phone" is checked
  const handleSameAsPhoneChange = () => {
    setSameAsPhone(!sameAsPhone);
    if (!sameAsPhone) {
      setWhatsapp(phone); // Set WhatsApp to the phone number if checkbox is checked
    } else {
      setWhatsapp(""); // Clear WhatsApp number when unchecked
    }
  };

  // Function to reset all form fields
  const resetFields = () => {
    setEmployeeName("");
    setPhone("");
    setSalary("");
    setAddress("");
    setWhatsapp("");
    setSameAsPhone(false);
    setJoiningDate("");
    setOpeningBalance("");
    setErrors({
      employeeName: "",
      phone: "",
      salary: "",
      address: "",
      whatsapp: "",
      joiningDate: "",
    });
  };

  const handleCancel = () => {
    resetFields(); // ✅ Clear all fields
    navigate("/employee"); // ✅ Redirect to the target route
  };
  return (
    <div
      className="w-full h-full p-4 md:p-8 lg:p-12 bg-white
      rounded-3xl flex flex-col justify-start items-start gap-12 overflow-hidden fixed inset-0">
      <div className="w-full pb-6 border-b border-[#a1a5b6] flex justify-start items-center gap-2.5">
        <div className="text-[#151d48] text-[24px] sm:text-[28px] md:text-[32px] font-bold font-['Urbanist'] leading-[44.80px]">
          Edit New Employee
        </div>
      </div>
      {responseError && <p className="text-red-500"> {responseError} </p>}
      <div className="w-full flex flex-wrap justify-between items-start gap-12 md:px-8 lg:px-40">
        {/* No. */}
        <div className="flex justify-start items-center gap-6 sm:gap-12 w-full sm:w-[570px]">
          <label
            className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']"
            htmlFor="customer-number"
          >
            No.
          </label>
          <div className="w-[77px] text-center text-[#05004e] text-xl font-bold font-['Urbanist']">
            001
          </div>
        </div>

        {/* Employee Name */}
        <div className="w-full sm:w-[570px] flex flex-col gap-1">
          {errors.employeeName && (
            <p className="text-red-500 text-sm mb-2">{errors.employeeName}</p>
          )}
          <div className="flex items-center gap-6 sm:gap-12 w-full">
            <label
              className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']"
              htmlFor="employee-name"
            >
              Employee Name <span className="text-red-500 text-xl">*</span>
            </label>
            <input
              id="employee-name"
              type="text"
              required
              placeholder="Enter here"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              className="w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl text-[#a1a5b6] text-xl font-normal font-['Urbanist']"
            />
          </div>
        </div>

        {/* Address */}
        <div className="w-full sm:w-[570px] flex flex-col gap-1">
          {/* Show validation error message for address if it exists */}
          {errors.address && (
            <p className="text-red-500 text-sm mb-2">{errors.address}</p>
          )}

          <div className="flex justify-start items-center gap-6 sm:gap-12 w-full">
            {/* Label for Address */}
            <label
              className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']"
              htmlFor="address"
            >
              Address
            </label>

            {/* Address Input Field */}
            <input
              id="address"
              type="text"
              placeholder="Enter here"
              value={address}
              onChange={(e) => setAddress(e.target.value)} // Update the address state on input change
              className="w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl text-[#a1a5b6] text-xl font-normal font-['Urbanist']"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="w-full sm:w-[570px] flex flex-col gap-1">
          {errors.phone && (
            <p className="text-red-500 text-sm mb-2">{errors.phone}</p>
          )}
          <div className="flex items-center gap-6 sm:gap-12 w-full">
            <label
              className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']"
              htmlFor="phone"
            >
              Phone <span className="text-red-500 text-xl">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="Enter here"
              value={phone}
              required
              onChange={(e) => setPhone(e.target.value)}
              className="w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl text-[#a1a5b6] text-xl font-normal font-['Urbanist']"
            />
          </div>
        </div>

        {/* WhatsApp */}

        <div className="w-full sm:w-[570px] flex flex-col gap-1">
          {/* Show validation error message for WhatsApp if it exists */}
          {errors.whatsapp && (
            <p className="text-red-500 text-sm mb-2">{errors.whatsapp}</p>
          )}

          <div className="flex justify-start items-center gap-6 sm:gap-12 w-full">
            {/* Label for WhatsApp */}
            <label
              className="w-[172px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']"
              htmlFor="whatsapp"
            >
              WhatsApp
            </label>
            <div className="flex flex-col gap-3">
              {/* WhatsApp Input Field */}
              <input
                id="whatsapp"
                type="text"
                className="w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl text-[#a1a5b6] text-xl font-normal font-['Urbanist']"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)} // Update the whatsapp state on input change
                placeholder="Enter here"
              />

              {/* Same as Phone Checkbox */}
              <div className="inline-flex justify-start items-center gap-2">
                <input
                  id="sameAsPhone"
                  type="checkbox"
                  checked={sameAsPhone}
                  onChange={handleSameAsPhoneChange}
                  className="checkbox w-4 h-4 rounded border-2 border-gray-300 focus:ring-0 checked:border-blue-500 checked:bg-blue-500"
                />
                <label
                  htmlFor="sameAsPhone"
                  className="text-[#a1a5b6] text-base font-normal font-['Urbanist']"
                >
                  Same as Phone
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Opening Balance */}

        <div className="w-full sm:w-[570px] flex flex-col gap-1">
          {errors.openingBalance && (
            <p className="text-red-500 text-sm mb-2">{errors.openingBalance}</p>
          )}
          <div className="flex justify-start items-center gap-6 sm:gap-12 w-full">
            <label
              className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']"
              htmlFor="opening-balance"
            >
              Opening Balance
            </label>
            <div className="w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-3">
              <span className="text-[#05004e] text-xl font-bold">$</span>
              <input
                id="opening-balance"
                type="number"
                placeholder="Enter here"
                value={openingBalance}
                onChange={(e) => setOpeningBalance(e.target.value)}
                className="w-full sm:w-[350px] px-6 outline-0 bg-gray-50 rounded-xl text-[#a1a5b6] text-xl font-normal font-['Urbanist']"
              />
            </div>
          </div>
        </div>

        {/* Joining date */}

        <div className="w-full sm:w-[570px] flex flex-col gap-1">
          {errors.joiningDate && (
            <p className="text-red-500 text-sm mb-2">{errors.joiningDate}</p>
          )}
          <div className="flex justify-start items-center gap-6 sm:gap-12 w-full">
            <label
              className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']"
              htmlFor="joining-date"
            >
              Joining Date <span className="text-red-500 text-xl">*</span>
            </label>
            <input
              id="date"
              type="date"
              value={joiningDate}
              onChange={(e) => setJoiningDate(e.target.value)}
              className="w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl text-[#a1a5b6] text-xl font-normal font-['Urbanist']"
            />
          </div>
        </div>

        {/* Salary*/}

        <div className="w-full sm:w-[570px] flex flex-col gap-1">
          {errors.salary && (
            <p className="text-red-500 text-sm mb-2">{errors.salary}</p>
          )}
          <div className="flex items-center gap-6 sm:gap-12 w-full">
            <label
              className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']"
              htmlFor="salary"
            >
              Salary <span className="text-red-500 text-xl">*</span>
            </label>
            <div className="w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-3 relative">
              <span className="text-[#05004e] text-xl font-bold">$</span>
              <input
                id="salary"
                type="number"
                required
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="Enter here"
                className="w-full text-[#a1a5b6] text-xl font-normal font-['Urbanist'] outline-0"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-start sm:justify-end items-center ml-auto">
          <button
            className={`${salaryType === "daily" ? "bg-blue-100" : ""
              } w-full sm:w-[175px] text-[#4078ec] text-center py-4 rounded-l-xl 
           hover:text-blue-700 hover:scale-105 cursor-pointer transition-all duration-200`}
            onClick={() => setSalaryType("daily")}
          >
            Daily
          </button>
          <button
            className={`${salaryType === "monthly" ? "bg-blue-100" : ""
              } w-full sm:w-[175px] text-[#4078ec] text-center py-4 rounded-r-xl 
       hover:text-blue-700 hover:scale-105 cursor-pointer transition-all duration-200`}
            onClick={() => setSalaryType("monthly")}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="w-full h-full p-4 md:p-8 lg:p-12 bg-white rounded-3xl flex flex-col justify-start items-start gap-12 overflow-hidden">
        {/* Other content here */}

        {/* Action buttons */}
        <div className="w-full h-full p-2 md:p-8 lg:p-12 bg-white rounded-3xl flex flex-col justify-start items-start gap-12 overflow-hidden ">
          <div className="bg-white self-stretch flex justify-end items-center gap-4 -mt-12 md:mr-25">
            <div className="flex gap-4">
              {/* Cancel Button */}
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-100 transition">
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

export default EditEmploye;