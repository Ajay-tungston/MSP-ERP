import { useState, useEffect } from "react";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Swal from "sweetalert2";

const EditLenderForm = ({ setPopup, refreshLenders, lender }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [openingBalance, setOpeningBalance] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const axiosInstance = useAxiosPrivate();

  useEffect(() => {
    if (lender) {
      setName(lender.name || "");
      setPhone(lender.phone || "");
      setAddress(lender.address || "");
      setOpeningBalance(lender.openingBalance ?? "");
    }
  }, [lender]);

  const validateName = () => {
    if (name.trim().length < 3) {
      setNameError("Lender name must be at least 3 characters.");
      return false;
    }
    setNameError("");
    return true;
  };

  const validatePhone = () => {
    if (!phone || phone.length < 7 || !/^\d+$/.test(phone)) {
      setPhoneError("Phone number is invalid.");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const handleUpdate = async () => {
    if (!validateName() || !validatePhone()) return;

    try {
      await axiosInstance.put(`/admin/lender/update/${lender._id}`, {
        name,
        phone,
        address,
        openingBalance: parseFloat(openingBalance) || 0,
      });

      Swal.fire("Success", "Lender updated successfully.", "success");
      refreshLenders?.();
      handleCancel();
    } catch (error) {
      Swal.fire("Error", "Failed to update lender.", "error");
    }
  };

  const handleCancel = () => {
    setName("");
    setPhone("");
    setAddress("");
    setNameError("");
    setOpeningBalance("");
    setPhoneError("");
    setPopup(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75">
      <div className="w-full sm:w-[480px] md:w-[640px] lg:w-[800px] xl:w-[1280px] h-auto bg-white rounded-[24px] p-[24px] sm:p-[32px] md:p-[48px] shadow-lg gap-12 absolute top-[170px] left-1/2 transform -translate-x-1/2">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
          Edit Lender
        </h2>
        <hr className="my-3 border-gray-300" />

        <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
          {/* Lender Name */}
          <div className="flex flex-col w-full">
            {nameError && (
              <p className="text-red-500 text-sm mb-2">{nameError}</p>
            )}
            <div className="flex items-center gap-x-4">
              <label className="text-gray-600">
                Lender Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={validateName}
                className="w-[350px] h-[56px] gap-2 rounded-[12px] pt-4 pr-6 pb-4 pl-6 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex flex-col w-full">
            {phoneError && (
              <p className="text-red-500 text-sm mb-2">{phoneError}</p>
            )}
            <div className="flex items-center gap-x-4">
              <label className="text-gray-600">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder="Enter phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={validatePhone}
                className="w-[350px] h-[56px] gap-2 rounded-[12px] pt-4 pr-6 pb-4 pl-6 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col w-full ">
            <div className="flex items-center gap-x-4">
              <label className="text-gray-600 pl-12">
                Address
              </label>
              <input
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-[350px] h-[56px] gap-2 rounded-[12px] pt-4 pr-6 pb-4 pl-6 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* OPENINGBALANCE */}
          <div className="flex flex-col w-full">
            <div className="flex items-center gap-x-4">
              <label className="text-gray-600">
                Opening Balance
              </label>
              <input
                type="number"
                placeholder="Enter opening balance"
                value={openingBalance}
                onChange={(e) => setOpeningBalance(e.target.value)}
                className="w-[350px] h-[56px] gap-2 rounded-[12px] pt-4 pr-6 pb-4 pl-6 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        {/* Buttons */}
        <div className="w-full h-full p-4 md:p-8 lg:p-12 bg-white rounded-3xl flex flex-col justify-start items-start gap-12 overflow-hidden">
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
                onClick={handleUpdate}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <CheckCircleIcon className="w-5 h-5" />
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditLenderForm;
