import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const EditEmployeeModal = ({ employeeId, setEditPopup,fetchEmployee }) => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [employeeName, setEmployeeName] = useState("");
  const [phone, setPhone] = useState("");
  const [salary, setSalary] = useState("");
  const [address, setAddress] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [sameAsPhone, setSameAsPhone] = useState(false);
  const [joiningDate, setJoiningDate] = useState("");
  const [openingBalance, setOpeningBalance] = useState("");
  const [salaryType, setSalaryType] = useState("monthly");
  const [errors, setErrors] = useState({});
  const [responseError, setResponseError] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axiosPrivate.get(`/admin/employee/get/${employeeId}`);
        const emp = res.data;
        setEmployeeName(emp.employeeName);
        setPhone(emp.phone);
        setWhatsapp(emp.whatsapp);
        setSalary(emp.salary);
        setAddress(emp.address || "");
        setJoiningDate(emp.joiningDate?.substring(0, 10) || "");
        setOpeningBalance(emp.openingBalance || "");
        setSalaryType(emp.salaryType || "monthly");
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    if (employeeId) {
      fetchEmployee();
    }
  }, [employeeId]);

  const resetFields = () => {
    setEmployeeName("");
    setPhone("");
    setSalary("");
    setAddress("");
    setWhatsapp("");
    setSameAsPhone(false);
    setJoiningDate("");
    setOpeningBalance("");
    setSalaryType("monthly");
    setErrors({});
    setResponseError("");
  };

  const handleCancel = () => {
    resetFields();
    setEditPopup(false);
    navigate("/employee");
  };

  const handleSameAsPhoneChange = () => {
    setSameAsPhone(prev => !prev);
    if (!sameAsPhone) setWhatsapp(phone);
    else setWhatsapp("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    const newErrors = {};
    if (!employeeName) {
      newErrors.employeeName = "Employee Name is required"; valid = false;
    } else if (employeeName.length < 3 || employeeName.length > 100) {
      newErrors.employeeName = "Employee Name should be between 3 and 100 characters"; valid = false;
    }
    if (!phone) {
      newErrors.phone = "Phone Number is required"; valid = false;
    } else if (phone.length !== 10 || isNaN(phone)) {
      newErrors.phone = "Phone Number should be exactly 10 digits"; valid = false;
    }
    if (!salary) {
      newErrors.salary = "Salary is required"; valid = false;
    } else if (parseFloat(salary) < 0) {
      newErrors.salary = "Salary should be above 0"; valid = false;
    }
    if (address && (address.length < 5 || address.length > 200)) {
      newErrors.address = "Address should be between 5 to 200 characters"; valid = false;
    }
    if (sameAsPhone && (whatsapp !== phone || whatsapp.length !== 10)) {
      newErrors.whatsapp = "WhatsApp number should be exactly 10 digits"; valid = false;
    }
    const today = new Date();
    const sel = new Date(joiningDate);
    if (!joiningDate) {
      newErrors.joiningDate = "Joining Date is required"; valid = false;
    } else if (sel > today) {
      newErrors.joiningDate = "Joining Date cannot be in the future"; valid = false;
    }
    setErrors(newErrors);
    if (!valid) return;

    try {
      await axiosPrivate.put(`/admin/employee/update/${employeeId}`, {
        employeeName,
        phone,
        salary,
        address,
        whatsapp,
        joiningDate,
        openingBalance,
        salaryType,
      });
      fetchEmployee()
      handleCancel();
      await Swal.fire({
        title: "Employee Updated Successfully!",
        icon: "success",
        confirmButtonColor: "#2563EB",
      });
      
    } catch (error) {
      if (error?.response?.status === 400) {
        setResponseError(error.response.data.message);
      } else {
        await Swal.fire({
          title: "Something went wrong!",
          icon: "error",
          confirmButtonColor: "#DC2626",
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75">
      <div className="w-full sm:w-[640px] lg:w-[1000px] xl:w-[1200px] bg-white rounded-[24px] p-8 sm:p-10 shadow-xl relative overflow-y-auto max-h-full">
        <div className="flex justify-between items-center pb-4 border-b border-gray-300">
          <h2 className="text-2xl font-bold text-gray-900">Edit Employee</h2>
          <button onClick={handleCancel}>
            <XCircleIcon className="w-6 h-6 text-gray-500 hover:text-red-500" />
          </button>
        </div>

        {responseError && <p className="text-red-500 mt-4">{responseError}</p>}

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-20 gap-y-6 mt-6 text-[#05004e] text-xl">
          {/* <div className="flex items-center">
            <label className="w-[172px] text-[#737791]">No.</label>
            <span className="font-bold">Auto Generated</span>
          </div> */}

          <div className="flex flex-col">
            {errors.employeeName && <p className="text-red-500 text-sm mb-2">{errors.employeeName}</p>}
            <div className="flex items-center">
              <label className="w-[172px] text-[#737791]">Employee Name <span className="text-red-500">*</span></label>
              <input
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                placeholder="Enter here"
                className="w-[300px] px-4 py-3 bg-gray-50 rounded-xl outline-none "
              />
            </div>
          </div>

          <div className="flex flex-col">
            {errors.address && <p className="text-red-500 text-sm mb-2">{errors.address}</p>}
            <div className="flex items-center">
              <label className="w-[172px] text-[#737791]">Address</label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter here"
                className="w-[300px] px-4 py-3 bg-gray-50 rounded-xl outline-none "
              />
            </div>
          </div>

          <div className="flex flex-col">
            {errors.phone && <p className="text-red-500 text-sm mb-2">{errors.phone}</p>}
            <div className="flex items-center">
              <label className="w-[172px] text-[#737791]">Phone <span className="text-red-500">*</span></label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter here"
                className="w-[300px] px-4 py-3 bg-gray-50 rounded-xl outline-none "
              />
            </div>
          </div>

          <div className="flex flex-col">
            {errors.whatsapp && <p className="text-red-500 text-sm mb-2">{errors.whatsapp}</p>}
            <div className="flex items-start">
              <label className="w-[172px] text-[#737791]">WhatsApp</label>
              <div className="flex flex-col gap-3">
                <input
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="Enter here"
                  className="w-[300px] px-4 py-3 bg-gray-50 rounded-xl outline-none "
                />
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={sameAsPhone}
                    onChange={handleSameAsPhoneChange}
                    className="checkbox w-4 h-4 rounded border-2 border-gray-300 focus:ring-0 checked:border-blue-500 checked:bg-blue-500"
                  />
                  <label className=" text-base">Same as Phone</label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-[172px] text-[#737791]">Opening Balance</label>
            <div className="w-[300px] flex items-center px-4 py-3 bg-gray-50 rounded-xl">
              <span className="mr-2 font-bold text-[#05004e]"> ₹</span>
              <input
                value={openingBalance}
                onChange={(e) => setOpeningBalance(e.target.value)}
                placeholder="Enter here"
                className="w-full bg-transparent outline-none "
              />
            </div>
          </div>

          <div className="flex flex-col">
            {errors.joiningDate && <p className="text-red-500 text-sm mb-2">{errors.joiningDate}</p>}
            <div className="flex items-center">
              <label className="w-[172px] text-[#737791]">Joining Date <span className="text-red-500">*</span></label>
              <input
                type="date"
                value={joiningDate}
                onChange={(e) => setJoiningDate(e.target.value)}
                className="w-[300px] px-4 py-3 bg-gray-50 rounded-xl outline-none "
              />
            </div>
          </div>

          <div className="flex flex-col">
            {errors.salary && <p className="text-red-500 text-sm mb-2">{errors.salary}</p>}
            <div className="flex items-center">
              <label className="w-[172px] text-[#737791]">Salary <span className="text-red-500">*</span></label>
              <div className="w-[300px] flex items-center px-4 py-3 bg-gray-50 rounded-xl gap-3">
                <span className="font-bold text-[#05004e]"> ₹</span>
                <input
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="Enter here"
                  className="w-full outline-none "
                />
              </div>
            </div>
          </div>

          <div className="col-span-2 flex justify-end gap-1 mt-4">
            {["daily", "monthly"].map((type, idx) => (
              <button
                key={type}
                type="button"
                onClick={() => setSalaryType(type)}
                className={`${salaryType === type ? "bg-blue-100 text-blue-700 border-blue-500" : "bg-gray-100 text-gray-500 border-gray-300"} 
                px-6 py-3 border ${idx === 0 ? "rounded-l-xl border-r-0" : "rounded-r-xl border-l-0"} focus:outline-none`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </form>

        <div className="mt-10 flex justify-end gap-4">
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-100 transition"
          >
            <XCircleIcon className="w-5 h-5" /> Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <CheckCircleIcon className="w-5 h-5" /> Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
