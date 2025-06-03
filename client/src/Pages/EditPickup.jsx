import React, { useEffect, useState } from "react";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Swal from "sweetalert2";

function EditPickup({ setPopup, fetchPickups, pickupToEdit }) {
  const axiosPrivate = useAxiosPrivate();

  const [formData, setFormData] = useState({
    vehicleName: "",
    vehicleNo: "",
    rcNo: "",
  });

  const [errors, setErrors] = useState({});
  const [responseError, setResponseError] = useState("");

  useEffect(() => {
    if (pickupToEdit) {
      setFormData({
        vehicleName: pickupToEdit.vehicleName || "",
        vehicleNo: pickupToEdit.vehicleNo || "",
        rcNo: pickupToEdit.rcNo || "",
      });
    }
  }, [pickupToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setErrors({});
    setResponseError("");
    setPopup(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.vehicleName.trim()) newErrors.vehicleName = "Vehicle Name is required.";
    if (!formData.vehicleNo.trim()) newErrors.vehicleNo = "Vehicle No. is required.";
    if (!formData.rcNo.trim()) newErrors.rcNo = "RC No. is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axiosPrivate.put(
        `/admin/pickup/update/${pickupToEdit._id}`,
        formData
      );
      if (response.status === 200) {
        Swal.fire("Success", "Pickup updated successfully", "success");
        fetchPickups();
        setPopup(false);
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        setResponseError(error.response.data.message);
      } else {
        Swal.fire("Error", "Failed to update pickup", "error");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75">
      <div
        className="bg-white shadow-lg"
        style={{
          width: "100%",
          maxWidth: "600px",
          padding: "40px",
          borderRadius: "20px",
        }}
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Edit Pickup
        </h2>
        <hr className="mb-4 border-gray-300" />

        {responseError && (
          <p className="text-red-600 font-semibold mb-4">{responseError}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 grid-cols-1">
            {[
              { label: "Vehicle Name", name: "vehicleName" },
              { label: "Vehicle No.", name: "vehicleNo" },
              { label: "RC No.", name: "rcNo" },
            ].map((field) => (
              <div className="flex items-center gap-4" key={field.name}>
                <label className="min-w-[140px] text-[#737791] text-base font-medium">
                  {field.label} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name={field.name}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={`w-full h-[50px] rounded-lg px-4 border ${
                    errors[field.name] ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-end items-center gap-4 mt-10">
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center gap-2 border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-100"
            >
              <XCircleIcon className="w-5 h-5" />
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <CheckCircleIcon className="w-5 h-5" />
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPickup;
