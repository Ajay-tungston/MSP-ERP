import React, { useState } from "react";
import { XCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Swal from "sweetalert2";

function AddVehicle({ setPopup, fetchVehicles }) {
  const axiosPrivate = useAxiosPrivate();

  const [formData, setFormData] = useState({
    vehicleName: "",
    vehicleNo: "",
    rcNo: "",
  });

  const [errors, setErrors] = useState({});
  const [responseError, setResponseError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setFormData({
      vehicleName: "",
      vehicleNo: "",
      rcNo: "",
    });
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
      const response = await axiosPrivate.post("/admin/vehicle/add", formData);
      if (response.status === 201) {
        Swal.fire("Success", "Vehicle added successfully", "success");
        setFormData({
          vehicleName: "",
          vehicleNo: "",
          rcNo: "",
        });
        setResponseError("");
        fetchVehicles();
        setPopup(false);
      }
    } catch (error) {
       
      console.error(error);
      if (error?.response?.status === 400) {
        setResponseError(error.response.data.message);
      } else {
        Swal.fire("Error", "Failed to add vehicle", "error");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75">
      <div
        className="bg-white shadow-lg"
        style={{
          padding: "48px",
          borderRadius: "24px",
        }}
      >
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
          Add New Vehicle
        </h2>
        <hr className="my-3 border-gray-300" />

        {responseError && (
          <p className="text-red-600 font-semibold mb-4">{responseError}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2">
            {[
              { label: "Vehicle Name", name: "vehicleName", required: true },
              { label: "Vehicle No.", name: "vehicleNo", required: true },
              { label: "RC No.", name: "rcNo", required: true },
            ].map((field) => (
              <div className="flex items-center gap-4" key={field.name}>
                <label className="min-w-[150px] text-[#737791] text-xl font-normal">
                  {field.label} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name={field.name}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={`w-full sm:w-[350px] h-[56px] rounded-[12px] pt-4 pr-6 pb-4 pl-6 border ${
                    errors[field.name] ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-end items-center gap-4 mt-12">
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center gap-2 border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-100 transition"
            >
              <XCircleIcon className="w-5 h-5" />
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <PlusCircleIcon className="w-5 h-5" />
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddVehicle;
