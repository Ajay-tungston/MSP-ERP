import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { XCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Swal from "sweetalert2";

const AddItem = ({setPopup,fetchItemData}) => {
  const [itemCode, setItemCode] = useState("");
  const [itemName, setItemName] = useState("");

  const [itemCodeError, setItemCodeError] = useState("");
  const [itemNameError, setItemNameError] = useState("");

  const navigate = useNavigate(); // <-- initialize navigation
  const axiosInstance = useAxiosPrivate();

  const itemNameRegex = /^[a-zA-Z0-9\s]+$/;

  const validateItemCode = () => {
    if (!itemCode) {
      setItemCodeError("Item code is required.");
      return false;
    }
    if (!/^[a-zA-Z0-9]+$/.test(itemCode)) {
      setItemCodeError("Item code must be alphanumeric.");
      return false;
    }
    if (itemCode.length < 3 || itemCode.length > 10) {
      setItemCodeError("Item code must be between 3 and 10 characters.");
      return false;
    }
    setItemCodeError("");
    return true;
  };

  const validateItemName = () => {
    if (!itemName.match(itemNameRegex)) {
      setItemNameError(
        "Item name can only contain letters, numbers, and spaces."
      );
      return false;
    }
    setItemNameError("");
    return true;
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !validateItemCode() ||
      !validateItemName() 
     
    )
      return;

    try {
      const response = await axiosInstance.post("/admin/item/add", {
        itemCode,
        itemName,
     
      });
      Swal.fire({
        title: "New Item Added Successfully!",
        icon: "success",
        draggable: true,
      });
      setItemCode("");

      setItemName("");
      // setConversionRatio(30);
      fetchItemData()
      setPopup(false)
    } catch (error) {
      console.log(error)
      if (error?.response?.status === 400) {
        Swal.fire({
          title: error?.response?.data?.message,
          icon: "error",
          draggable: true,
        });
      } else {
        Swal.fire({
          title: "Something went wrong!",
          icon: "error",
          draggable: true,
        });
      }
    }
  };

  const handleCancel = () => {
    setItemCode("");
    setPopup(false)
    setItemName("");
    setItemCodeError("");
    setItemNameError("");

    navigate("/item"); // <-- change route to your desired page
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75">
      <div className="w-full sm:w-[480px] md:w-[640px] lg:w-[800px] xl:w-[1280px] h-auto bg-white rounded-[24px] p-[24px] sm:p-[32px] md:p-[48px] shadow-lg gap-12 absolute top-[170px] left-1/2 transform -translate-x-1/2">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
          Add New Item
        </h2>
        <hr className="my-3 border-gray-300" />

        <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
          {/* Item Code */}
          <div className="flex flex-col w-full">
            {itemCodeError && (
              <p className="text-red-500 text-sm mb-2">{itemCodeError}</p>
            )}
            <div className="flex items-center gap-x-4">
              <label className="text-gray-600">Item code</label>
              <input
                type="text"
                placeholder="Enter here"
                value={itemCode}
                onChange={(e) => setItemCode(e.target.value)}
                onBlur={validateItemCode}
                className="w-[350px] h-[56px] gap-2 rounded-[12px] pt-4 pr-6 pb-4 pl-6 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Item Name */}
          <div className="flex flex-col">
            {itemNameError && (
              <p className="text-red-500 text-sm mb-2">{itemNameError}</p>
            )}
            <div className="flex items-center gap-4">
              <label className="text-gray-600">
                Item Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter here"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                onBlur={validateItemName}
                className="w-[350px] h-[56px] gap-2 rounded-[12px] pt-4 pr-6 pb-4 pl-6 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        

        {/* Buttons */}
        <div className="w-full h-full p-4 md:p-8 lg:p-12 bg-white rounded-3xl flex flex-col justify-start items-start gap-12 overflow-hidden">
          <div className="self-stretch flex justify-end items-center gap-4 mt-8 md:mr-25">
            <div className="flex gap-4">
              {/* Cancel */}
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-100 transition"
              >
                <XCircleIcon className="w-5 h-5" />
                Cancel
              </button>

              {/* Save */}
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
};

export default AddItem;
