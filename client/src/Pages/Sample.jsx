// import React, { useState } from "react";
// import { XCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
// import validator from "validator";

// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import useAxiosPrivate from "../hooks/useAxiosPrivate";
// function AddSupplier() {
//   const axiosPrivate = useAxiosPrivate();


//   // State to manage form values
//   const [formData, setFormData] = useState({
//     supplierCode: "",
//     supplierName: "",
//     phone: "",
//     address: "",
//     whatsapp: "",
//     advance: "",
//     advanceDeducted: "",
//     commission: "",
//   });

//   // State to manage errors
//   const [errors, setErrors] = useState({
//     supplierCode: "",
//     supplierName: "",
//     phone: "",
//     whatsapp: "",
//     requiredFields: "",
//   });

//   const [responseError, setResponseError] = useState("");

//   // State to manage "Same as Phone" checkbox
//   const [sameAsPhone, setSameAsPhone] = useState(false);

//   // Handle change for form inputs
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // Handle checkbox change for "Same as Phone"
//   const handleSameAsPhoneChange = () => {
//     setSameAsPhone(!sameAsPhone);
//     if (!sameAsPhone) {
//       setFormData({
//         ...formData,
//         whatsapp: formData.phone,
//       });
//     } else {
//       setFormData({
//         ...formData,
//         whatsapp: "",
//       });
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Reset errors
//     setErrors({
//       supplierCode: "",
//       supplierName: "",
//       phone: "",
//       whatsapp: "",
//       requiredFields: "",
//     });

//     // Validation logic (unchanged from your original code)
//     const newErrors = {};
//     if (!formData.supplierCode.trim()) {
//       newErrors.supplierCode = "Supplier Code is required.";
//     }
//     // ... (rest of your validation logic)

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     try {
//       const response = await axiosPrivate.post("/admin/supplier/add", formData);
//       if (response.status === 201) {
//         setFormData({
//           supplierCode: "",
//           supplierName: "",
//           phone: "",
//           address: "",
//           whatsapp: "",
//           advance: "",
//           advanceDeducted: "",
//           commission: "",
//         });
//         setResponseError("");
//         Swal.fire({
//           title: "Supplier Added Successfully!",
//           icon: "success",
//           draggable: true,
//         });
//         navigate("/supplier"); // Navigate after successful submission
//       }
//     } catch (error) {
//       console.log(error);
//       if (error?.response?.status === 400) {
//         setResponseError(error?.response?.data?.message);
//       } else {
//         Swal.fire({
//           title: "Something went wrong!",
//           icon: "error",
//           draggable: true,
//         });
//       }
//     }
//   };

//   // Updated handleCancel with navigation
//   const handleCancel = () => {
//     setFormData({
//       supplierCode: "",
//       supplierName: "",
//       phone: "",
//       address: "",
//       whatsapp: "",
//       advance: "",
//       advanceDeducted: "",
//       commission: "",
//     });
//     setErrors({
//       supplierCode: "",
//       supplierName: "",
//       phone: "",
//       whatsapp: "",
//       requiredFields: "",
//     });
//     setSameAsPhone(false);
//     setResponseError("");
//     navigate("/supplier"); // Navigate to suppliers list
//   };



//   return (
   
//       <div className="w-[1280px] p-12 relative bg-white rounded-3xl inline-flex flex-col justify-start items-start gap-12">
//     <div className="w-[1184px] pb-6 border-b border-zinc-100 inline-flex justify-start items-center gap-2.5">
//         <div className="justify-start text-indigo-950 text-3xl font-bold font-['Urbanist'] leading-10">Add New Supplier</div>
//     </div>
//     {responseError && <p className="text-red-500"> {responseError}</p>}

//       <form
//         onSubmit={handleSubmit}
//         className="w-full flex flex-wrap justify-between items-start gap-12 md:px-8 lg:px-40"
//       >

//     <div className="self-stretch inline-flex justify-between items-start flex-wrap content-start">
//         <div className="w-[570px] h-14 flex justify-start items-center gap-12">
//             <div className="min-w-44 justify-start text-slate-500/40 text-xl font-normal font-['Urbanist']">No.</div>
//             <div className="w-20 text-center justify-start text-indigo-950 text-xl font-bold font-['Urbanist']">001</div>
//         </div>
        



//         <div className="w-[570px] h-14 flex justify-start items-center gap-12 mt-5">
//         {errors.supplierCode && (
//             <p className="text-red-500 text-sm">{errors.supplierCode}</p>
//           )}
//   <label htmlFor="supplierCode" className="min-w-44 justify-start">
//     <span className="text-slate-500/40 text-xl font-normal font-['Urbanist']">Supplier Code </span>
//     <span className="text-red-500 text-xl font-normal font-['Urbanist']">*</span>
//   </label>
//   <div className="w-80 px-6 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-2 ml-6">
//     <input
//       type="text"
//       id="supplierCode"
//       name="supplierCode"
//       placeholder="Enter here"
//       className={`bg-transparent w-full outline-none text-zinc-100 text-xl font-normal font-['Urbanist'] placeholder-zinc-300  ${errors.supplierCode ? "border-red-500" : ""
//                 }`}
//                 value={formData.supplierCode}
//                 onChange={handleChange}
//     />
//   </div>
// </div>
//      {/* Supplier Name */}
// <div className="flex justify-start items-center gap-12 mt-5">
// {errors.supplierName && (
//             <p className="text-red-500 text-sm">{errors.supplierName}</p>
//           )}
//   <label htmlFor="supplierName" className="min-w-44 justify-start">
//     <span className="text-slate-500/40 text-xl font-normal font-['Urbanist']">Supplier Name </span>
//     <span className="text-red-500 text-xl font-normal font-['Urbanist']">*</span>
//   </label>
//   <div className="w-80 px-6 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-2">
//     <input
//       type="text"
//       id="supplierName"
//       name="supplierName"
//       placeholder="Enter here"
//       className={`bg-transparent w-full outline-none text-zinc-100 text-xl font-normal font-['Urbanist'] placeholder-zinc-300 ${errors.supplierName ? "border-red-500" : ""
//                 }`}
//       value={formData.supplierName}
//       onChange={handleChange}
//    />
//   </div>
// </div>

// <div className="flex justify-start items-center gap-12 mt-5">
// {errors.address && (
//             <p className="text-red-500 text-sm">{errors.address}</p>
//           )}
//   <label htmlFor="address" className="min-w-44 justify-start text-slate-500/40 text-xl font-normal font-['Urbanist']">
//     Address
//   </label>
//   <div className="w-80 px-6 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-2">
//     <input
//       type="text"
//       id="address"
//       name="address"
//       placeholder="Enter here"
//       className={`bg-transparent w-full outline-none text-zinc-100 text-xl font-normal font-['Urbanist'] placeholder-zinc-300 ${errors.address ? "border-red-500" : ""
//       }`}
//         value={formData.address}
//       onChange={handleChange}
//    />
//   </div>
// </div>

// <div className="flex justify-start items-center gap-12 mt-5">
// {errors.phone && (
//             <p className="text-red-500 text-sm">{errors.phone}</p>
//           )}

//   <label htmlFor="phone" className="min-w-44 justify-start">
//     <span className="text-slate-500/40 text-xl font-normal font-['Urbanist']">Phone </span>
//     <span className="text-red-500 text-xl font-normal font-['Urbanist']">*</span>
//   </label>
//   <div className="w-80 px-6 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-2">
//     <input
//       type="text"
//       id="phone"
//       name="phone"
//       placeholder="Enter here"
//       className={`bg-transparent w-full outline-none text-zinc-100 text-xl font-normal font-['Urbanist'] placeholder-zinc-300 ${errors.phone ? "border-red-500" : ""
//       }`} 
//       required
//       value={formData.phone}
//       onChange={handleChange}
//   />
//   </div>
// </div>

// <div className="flex justify-start items-center gap-12 mt-5">
//   <label htmlFor="whatsapp" className="w-44 min-w-44 justify-start text-slate-500/40 text-xl font-normal font-['Urbanist']">
//     WhatsApp
//   </label>
//   <div className="inline-flex flex-col justify-center items-start gap-3">
//     <div className="w-80 px-6 py-4 bg-gray-50 rounded-xl inline-flex justify-start items-center gap-2">
//       <input
//         type="text"
//         id="whatsapp"
//         name="whatsapp"
//         placeholder="Enter here"
//         className="bg-transparent w-full outline-none text-zinc-100 text-xl font-normal font-['Urbanist'] placeholder-zinc-300"
//       />
//     </div>
//     <label className="inline-flex justify-start items-center gap-2 cursor-pointer">
//       <input
//         type="checkbox"
//         name="sameAsPhone"
//         className="accent-blue-500 w-4 h-4 rounded opacity-0 absolute"
//         style={{ zIndex: 2 }}
//       />
//       <div className="w-4 h-4 relative">
//         <div className="w-3.5 h-3.5 left-[1.33px] top-[1.33px] absolute  outline-1 outline-offset-[-0.50px] outline-blue-500" />
//         <div className="w-1.5 h-1 left-[5.17px] top-[6.11px] absolute  outline-1 outline-offset-[-0.50px] outline-blue-500" />
//         <div className="w-4 h-4 left-0 top-0 absolute opacity-0" />
//       </div>
//       <span className="justify-start text-zinc-100 text-base font-normal font-['Urbanist']">Same as Phone</span>
//     </label>
//   </div>
// </div>

// <div className="flex flex-col w-full sm:w-[570px] mt-5">
//   {/* Display Error Message Above Input if any */}
//   {errors.advance && (
//     <p className="text-red-500 text-sm mb-1">{errors.advance}</p>
//   )}

//   {/* Label and Input aligned as per your design */}
//   <div className="flex justify-start items-center gap-12">
//     <label
//       htmlFor="advance"
//       className="w-44 min-w-44 justify-start text-slate-500/40 text-xl font-normal font-['Urbanist']"
//     >
//       Advance
//     </label>
//     <div className="w-80 px-6 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-3">
//       <span className="text-indigo-950 text-xl font-bold font-['Urbanist']">$</span>
//       <input
//         type="text"
//         id="advance"
//         name="advance"
//         inputMode="decimal"
//         placeholder="Enter here"
//         className={`bg-transparent w-full outline-none text-zinc-100 text-xl font-normal font-['Urbanist'] placeholder-zinc-300 ${errors.advance ? "border-b border-red-500" : ""
//           }`}
//         value={formData.advance}
//         onChange={handleChange}
//       />
//     </div>
//   </div>
// </div>


// <div className="flex flex-col w-full sm:w-[570px] mt-5">
//   {/* Display Error Message Above Input if any */}
//   {errors.advanceDeducted && (
//     <p className="text-red-500 text-sm mb-1">{errors.advanceDeducted}</p>
//   )}

//   {/* Label and Input aligned as per your design */}
//   <div className="flex justify-start items-center gap-12">
//     <label
//       htmlFor="advanceDeducted"
//       className="w-44 min-w-44 justify-start text-slate-500/40 text-xl font-normal font-['Urbanist']"
//     >
//       Advance Deducted
//     </label>
//     <div className="w-80 px-6 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-3">
//       <span className="text-indigo-950 text-xl font-bold font-['Urbanist']">$</span>
//       <input
//         type="text"
//         id="advanceDeducted"
//         name="advanceDeducted"
//         placeholder="Enter here"
//         inputMode="decimal"
//         className={`bg-transparent w-full outline-none text-zinc-100 text-xl font-normal font-['Urbanist'] placeholder-zinc-300 ${errors.advanceDeducted ? "border-b border-red-500" : ""
//           }`}
//         value={formData.advanceDeducted}
//         onChange={handleChange}
//       />
//     </div>
//   </div>
// </div>


// <div className="flex flex-col w-full sm:w-[570px] mt-5">
//   {/* Display Error Message Above Input if any */}
//   {errors.commission && (
//     <p className="text-red-500 text-sm mb-1">{errors.commission}</p>
//   )}

//   {/* Label and Styled Input */}
//   <div className="flex justify-start items-center gap-12">
//     <label
//       htmlFor="commissionType"
//       className="min-w-44 justify-start text-slate-500/40 text-xl font-normal font-['Urbanist']"
//     >
//       Commission Type
//     </label>

//     <div className="w-80 px-6 py-4 bg-gray-50 rounded-tl-xl rounded-tr-xl flex justify-between items-center">
//       <input
//         type="text"
//         id="commissionType"
//         name="commission"
//         placeholder="Enter"
//         className={`bg-transparent w-full outline-none text-zinc-100 text-xl font-normal font-['Urbanist'] placeholder-zinc-300 ${
//           errors.commission ? "border-b border-red-500" : ""
//         }`}
//         value={formData.commission}
//         onChange={handleChange}
//       />
//       <div className="w-6 h-6 relative pointer-events-none -ml-6">
//         <div className="w-4 h-2 left-[4.08px] top-[7.95px] absolute outline-[1.5px] outline-offset-[-0.75px] outline-zinc-100" />
//         <div className="w-6 h-6 left-[24px] top-[24px] absolute origin-top-left -rotate-180 opacity-0" />
//       </div>
//     </div>
//   </div>

//   {/* Optional: Global required field error */}
//   {errors.requiredFields && (
//     <p className="text-red-500 text-sm mt-4">{errors.requiredFields}</p>
//   )}
// </div>


//     </div>
//     <div className="self-stretch inline-flex justify-end items-center gap-4">
//         <div className="w-40 px-6 py-4 bg-white rounded-2xl  outline-1 outline-offset-[-1px] outline-red-500 flex justify-center items-center gap-3">
//             <div className="w-8 h-8 relative">
//                 <div className="w-2 h-2 left-[12.23px] top-[12.23px] absolute  outline-2 outline-offset-[-1px] outline-red-500" />
//                 <div className="w-2 h-2 left-[12.23px] top-[12.23px] absolute  outline-2 outline-offset-[-1px] outline-red-500" />
//                 <div className="w-7 h-7 left-[2.67px] top-[2.67px] absolute  outline-2 outline-offset-[-1px] outline-red-500" />
//                 <div className="w-8 h-8 left-0 top-0 absolute opacity-0" />
//             </div>
//             <div className="justify-start text-red-500 text-xl font-bold font-['Urbanist']">Cancel</div>
//         </div>
//         <div className="w-40 px-6 py-4 bg-blue-500 rounded-2xl flex justify-center items-center gap-3">
//             <div className="w-8 h-8 relative">
//                 <div className="w-7 h-7 left-[2.67px] top-[2.67px] absolute  outline-2 outline-offset-[-1px] outline-white" />
//                 <div className="w-2.5 h-0 left-[10.67px] top-[16px] absolute  outline-2 outline-offset-[-1px] outline-white" />
//                 <div className="w-0 h-2.5 left-[16px] top-[10.67px] absolute  outline-2 outline-offset-[-1px] outline-white" />
//                 <div className="w-8 h-8 left-0 top-0 absolute opacity-0" />
//             </div>
//             <div className="justify-start text-white text-xl font-bold font-['Urbanist']">Save</div>
//         </div>
//     </div>
//    </form>
// </div>
 
//   )
// }

// export default AddSupplier;
 import React from 'react'
 
 function Sample() {
   return (
     <div>
       
     </div>
   )
 }
 
 export default Sample
 