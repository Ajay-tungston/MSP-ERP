import { useState } from "react";
import { XCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Swal from "sweetalert2";

const AddLenderForm = ({ setPopup, refreshLenders }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [openingBalance, setOpeningBalance] = useState("");

  const axiosInstance = useAxiosPrivate();

  const handleCancel = () => {
    setName("");
    setPhone("");
    setAddress("");
    setOpeningBalance("");
    setPopup(false);
  };

  const handleSave = async () => {
    if (name.trim().length < 3) {
      Swal.fire("Validation Error", "Lender name must be at least 3 characters.", "warning");
      return;
    }
    if (!phone || phone.length < 7) {
      Swal.fire("Validation Error", "Phone number is invalid.", "warning");
      return;
    }
const parsedBalance = parseFloat(openingBalance);
    try {
      await axiosInstance.post("/admin/lender/add", {
        name,
        phone,
        address,
        openingBalance: isNaN(parsedBalance) ? 0 : parsedBalance,
      });

      Swal.fire("Success", "Lender added successfully.", "success");
      refreshLenders?.();
      setPopup(false);
    } catch (error) {
      console.log(error)
      Swal.fire("Error", "Failed to add lender.", "error");
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
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Add New Lender</h2>
        <hr className="my-3 border-gray-300" />

        <div className="grid gap-[32px] grid-cols-1 sm:grid-cols-2">
          {/* Lender Name */}
          <div className="flex items-center gap-4">
            <label className="w-[150px] text-[#737791] text-xl">Lender Name<span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full sm:w-[350px] h-[48px] rounded-lg px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone Number */}
          <div className="flex items-center gap-4">
            <label className="w-[150px] text-[#737791] text-xl">Phone<span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Enter phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full sm:w-[350px] h-[48px] rounded-lg px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* WhatsApp */}
        

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
            onClick={handleSave}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <PlusCircleIcon className="w-5 h-5" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLenderForm;
