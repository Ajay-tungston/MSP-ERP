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
  <div
    className="bg-white shadow-lg"
    style={{
      width: "100%",
      maxWidth: "1280px",
      padding: "48px",
      borderRadius: "24px",
    }}
  >
    <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Edit Lender</h2>
    <hr className="my-3 border-gray-300" />

    <div className="grid gap-[32px] grid-cols-1 sm:grid-cols-2">
      {/* Lender Name */}
      <div className="flex items-center gap-4">
        <label className="w-[150px] text-[#737791] text-xl">
          Lender Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={validateName}
          className="w-full sm:w-[350px] h-[48px] rounded-lg px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Phone Number */}
      <div className="flex items-center gap-4">
        <label className="w-[150px] text-[#737791] text-xl">
          Phone <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          placeholder="Enter phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onBlur={validatePhone}
          className="w-full sm:w-[350px] h-[48px] rounded-lg px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Address */}
      <div className="flex items-center gap-4">
        <label className="w-[150px] text-[#737791] text-xl">Address</label>
        <input
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full sm:w-[350px] h-[48px] rounded-lg px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Opening Balance */}
      <div className="flex items-center gap-4">
        <label className="w-[150px] text-[#737791] text-xl">Opening Balance</label>
        <input
          type="number"
          placeholder="Enter opening balance"
          value={openingBalance}
          onChange={(e) => setOpeningBalance(e.target.value)}
          className="w-full sm:w-[350px] h-[48px] rounded-lg px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    {/* Buttons */}
    <div className="flex justify-end gap-4 mt-10">
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

  );
};

export default EditLenderForm;
