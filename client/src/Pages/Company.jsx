import React from "react";
import { useNavigate } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { CiFilter } from "react-icons/ci";

export default function CompanyCards() {
  const navigate = useNavigate();

  const companies = [
    { date: "01/12/2023", capital: "$100,000.00", cash: "$5,000.00" },
    { date: "01/12/2023", capital: "$100,000.00", cash: "$5,000.00" },
    { date: "01/12/2023", capital: "$100,000.00", cash: "$5,000.00" },
  ];

  return (
    <div className="p-4 rounded-lg shadow-sm h-[800px] bg-white mt-5">
      <div className="bg-white-500 px-6 py-4 rounded-lg">
        <nav className="text-sm text-gray-500 mb-2">
          <span>Master</span> <span className="mx-1">›</span>
          <span className="text-gray-700">Company</span>
        </nav>

        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold text-gray-900">Company</h1>

          <div className="flex flex-col space-y-3">
            {/* 👉 Add New Company navigates to form */}
            <button
              className="bg-[#5D5FEF] text-white px-6 py-2 rounded-lg flex items-center gap-2"
              onClick={() => navigate("/add-company")}
            >
              <CiCirclePlus className="text-xl" /> Add New Company
            </button>

            <div className="flex space-x-3">
              <button className="border border-red-500 text-red-500 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-100 font-Urbanist">
                <GoTrash className="text-lg" /> Delete
              </button>
              <button className="border border-gray-300 text-[#4079ED] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100">
                <CiFilter className="text-lg" /> Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="flex flex-wrap justify-center gap-6 p-6">
        {companies.map((company, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 w-80 border border-gray-100"
          >
            <h2 className="text-blue-600 font-semibold text-lg">Company Name</h2>
            <hr className="my-2 border-gray-200" />

            <div className="text-gray-500 space-y-2">
              <div className="flex justify-between">
                <span>Date</span>
                <span className="font-bold text-gray-900">{company.date}</span>
              </div>
              <div className="flex justify-between">
                <span>Capital</span>
                <span className="font-bold text-gray-900">{company.capital}</span>
              </div>
              <div className="flex justify-between">
                <span>Opening Cash</span>
                <span className="font-bold text-gray-900">{company.cash}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}