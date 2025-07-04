import React, { useState, useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import AddCompanyForm from "./AddCompany";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { FaChevronRight } from "react-icons/fa6";

function Company() {
  const [popup, setPopup] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const companiesPerPage = 6;
  const [totalPages, setTotalPages] = useState("");
  const limit = 6;
  const axiosInstense = useAxiosPrivate();

  const fetchCompany = async () => {
    try {
      const response = await axiosInstense.get(
        `/admin/company/get?page=${currentPage}&limit=${limit}`
      );
      setCompanies(response?.data?.companies);
      setTotalPages(response?.data?.totalPages);
      const reversed = [...response.data.companies].reverse();
      setCompanies(reversed);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCompany();
  }, [currentPage]);

  // Pagination handlers
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <>
      <div className="p-6 rounded-3xl shadow-md h-[800px] bg-white ">
        {/* Breadcrumb */}
        <nav className="flex items-center text-md text-[#737791] gap-2 mb-2 ">
          <span>Master</span>
          <FaChevronRight />
          <span className="text-[#737791]">Customer</span>
        </nav>

        {/* Header & Actions */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#151D48] ">Company</h1>

          <div className="flex space-x-4">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
              onClick={() => setPopup(true)}
            >
              <CiCirclePlus className="text-xl font-bold " /> Add New Company
            </button>
          </div>
        </div>

        {/* Company Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies?.length > 0 ? (
            companies?.map((company, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-6 shadow border border-gray-100 "
              >
                <table className="w-full table-fixed text-left">
                  <thead>
                    <tr>
                      <th
                        colSpan="2"
                        className="pb-4 border-b border-gray-200 text-blue-500 text-xl font-bold"
                      >
                        {company.companyName}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-md">
                    <tr className="border-t">
                      <td className="text-gray-500 py-2">Date</td>
                      <td className="text-gray-800 font-semibold py-2">
                        {company.date}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray-500 py-2">Capital</td>
                      <td className="text-gray-800 font-semibold py-2">
                        {company.companyCapital}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray-500 py-2">Opening Cash</td>
                      <td className="text-gray-800 font-semibold py-2">
                        {company.openingCash}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center h-64">
              <p className="text-gray-500 text-lg">No company data found.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {companies.length > 0 && (
          <div className="flex justify-between items-center mt-8 text-gray-600">
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`px-6 py-2 border border-gray-300 rounded-lg ${
                  currentPage === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-6 py-2 border border-gray-300 rounded-lg ${
                  currentPage === totalPages
                    ? "text-[#4079ED] cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Popup Form */}
      {popup && (
        <AddCompanyForm setPopup={setPopup} fetchCompany={fetchCompany} />
      )}
    </>
  );
}

export default Company;
