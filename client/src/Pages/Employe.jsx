import React from 'react'
import { XCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

function Employe() {
  return (
    <div className="w-full h-full p-4 md:p-8 lg:p-12 bg-white rounded-3xl flex flex-col justify-start items-start gap-12 overflow-hidden">
    <div className="w-full pb-6 border-b border-[#a1a5b6] flex justify-start items-center gap-2.5">
      <div className="text-[#151d48] text-[24px] sm:text-[28px] md:text-[32px] font-bold font-['Urbanist'] leading-[44.80px]">
        Add New Customer
      </div>
    </div>
    <div className="w-full flex flex-wrap justify-between items-start gap-12 md:px-8 lg:px-40">

      {/* No. */}
      <div className="flex justify-start items-center gap-6 sm:gap-12 w-full sm:w-[570px]">
        <label className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']" htmlFor="customer-number">No.</label>
        <div className="w-[77px] text-center text-[#05004e] text-xl font-bold font-['Urbanist']">001</div>
      </div>

      {/* Employee Name */}
      <div className="flex justify-start items-center gap-6 sm:gap-12 w-full sm:w-[570px]">
        <label className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']" htmlFor="employee-name">
          Employee Name <span className="text-red-500 text-xl">*</span>
        </label>
        <input
          id="employee-name"
          type="text"
          placeholder="Enter here"
          className="w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl text-[#a1a5b6] text-xl font-normal font-['Urbanist']"
        />
      </div>

      {/* Address */}
      <div className="flex justify-start items-center gap-6 sm:gap-12 w-full sm:w-[570px]">
        <label className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']" htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          placeholder="Enter here"
          className="w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl text-[#a1a5b6] text-xl font-normal font-['Urbanist']"
        />
      </div>

      {/* Phone */}
      <div className="flex justify-start items-center gap-6 sm:gap-12 w-full sm:w-[570px]">
        <label className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']" htmlFor="phone">
          Phone <span className="text-red-500 text-xl">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="Enter here"
          className="w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl text-[#a1a5b6] text-xl font-normal font-['Urbanist']"
        />
      </div>

      {/* WhatsApp */}
      <div className="flex justify-start items-center gap-6 sm:gap-12 w-full sm:w-[570px]">
        <div className="w-[172px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']">
          <label htmlFor="whatsapp" className="block">WhatsApp</label>
        </div>
        <div className="flex flex-col gap-3">
          <div className="w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-2">
            <input
              id="whatsapp"
              type="text"
              className="w-full bg-transparent text-[#a1a5b6] text-xl font-normal font-['Urbanist'] placeholder-[#a1a5b6]"
              placeholder="Enter here"
            />
          </div>
 <div className="inline-flex justify-start items-center gap-2">
  <input
    id="sameAsPhone"
    type="checkbox"
    className="checkbox w-4 h-4 rounded border-2 border-gray-300 focus:ring-0 checked:border-blue-500 checked:bg-blue-500"
  />
  <label htmlFor="sameAsPhone" className="text-[#a1a5b6] text-base font-normal font-['Urbanist']">
    Same as Phone
  </label>
</div>
        </div>
      </div>
     {/* Opening Balance */}
     <div className="flex justify-start items-center gap-6 sm:gap-12 w-full sm:w-[570px]">
        <label className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']" htmlFor="opening-balance">Opening Balance</label>
        <div className="w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-3">
          <span className="text-[#05004e] text-xl font-bold">$</span>
          <input
            id="opening-balance"
            type="number"
            placeholder="Enter here"
            className="w-full text-[#a1a5b6] text-xl font-normal font-['Urbanist']"
          />
        </div>
      </div>

      {/* Joining date */}
      <div className="flex justify-start items-center gap-6 sm:gap-12 w-full sm:w-[570px]">
        <label className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']" htmlFor="joining-date">Joining Date
        <span className="text-red-500 text-xl">*</span>
        </label>
        <input
          id="date"
          type="date"
          className="w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl text-[#a1a5b6] text-xl font-normal font-['Urbanist']"
        />
      </div>

      {/* Salary*/}
      <div className="flex justify-start items-center gap-6 sm:gap-12 w-full sm:w-[570px]">
        <label className="min-w-[120px] sm:min-w-[172px] text-[#737791] text-xl font-normal font-['Urbanist']" htmlFor="salary">Salary</label>
        <div className="w-full sm:w-[350px] px-6 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-3">
          <span className="text-[#05004e] text-xl font-bold">$</span>
          <input
            id="salary"
            type="number"
            placeholder="Enter here"
            className="w-full text-[#a1a5b6] text-xl font-normal font-['Urbanist']"
          />
        </div>
      </div>

     </div>

<div className="w-full h-full p-4 md:p-8 lg:p-12 bg-white rounded-3xl flex flex-col justify-start items-start gap-12 overflow-hidden"> 
    {/* Other content here */}
    
    {/* Action buttons */}
    <div className="self-stretch flex justify-end items-center gap-4 mt-8 md:mr-25">
      <div className="flex gap-4">
        {/* Cancel Button */}
        <button className="flex items-center gap-2 border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-100 transition">
          <XCircleIcon className="w-5 h-5" />
          Cancel
        </button>

        {/* Save Button */}
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          <PlusCircleIcon className="w-5 h-5" />
          Save
        </button>
      </div>
    </div>
  </div>
  </div>
 
);
};
 

export default Employe