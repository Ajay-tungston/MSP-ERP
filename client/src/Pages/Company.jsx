import React, { useState, useEffect } from 'react';
import { CiCirclePlus } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import AddCompanyForm from './AddCompany';
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { FaChevronRight } from "react-icons/fa6";

function Company() {

  const [popup, setPopup] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const companiesPerPage = 6; 
const [totalPages, setTotalPages] = useState("")
 const limit=6; 
const axiosInstense = useAxiosPrivate()
  useEffect(() => {
    const fetchCompany = async () => {

      try {
        const response = await axiosInstense.get(`/admin/company/get?page=${currentPage}&limit=${limit}`)
        console.log(response?.data);
        setCompanies(response?.data?.companies);
        setTotalPages(response?.data?.totalPages);
        const reversed = [...response.data.companies].reverse();
      setCompanies(reversed);
      } catch (error) {
        console.log(error);


      }
    }
    fetchCompany()
  },
    [currentPage]
  )



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
      <div className=" h-screen relative bg-gray-50  outline-1 outline-offset-[-1px] outline-white overflow-hidden mt-10">

        <div className={`w-[1511px] h-[1095px] absolute bg-white rounded-3xl overflow-hidden ${popup ? 'backdrop-blur-sm' : ''}`}>
          <div className="left-[48px] top-[86px] absolute inline-flex justify-start items-center gap-3">
          <div className="flex items-center text-slate-500 text-xl font-bold font-['Urbanist']">
  Master <FaChevronRight className="mx-2" /> Employee
</div>

          </div>
          <div className="w-80 h-[64px] px-6 py-4 left-[1143px] top-[32px] absolute bg-indigo-500 rounded-2xl inline-flex justify-center items-center gap-3" onClick={() => { setPopup(true) }}>
            <div className="w-8 h-8 relative">
              <CiCirclePlus className="w-7 h-7 left-[2.67px] top-[2.67px] absolute text-white" />
              <div className="w-8 h-8 left-[32px] top-[32px] absolute origin-top-left -rotate-180 opacity-0" />
            </div>
            <div className="justify-start text-white text-xl font-bold font-['Urbanist']">Add New Company</div>
          </div>
          <div className="w-36 h-[64px] px-6 py-4 left-[1303px] top-[120px] absolute bg-white hover:bg-gray-100 rounded-2xl  outline-1 outline-offset-[-1px] outline-gray-300/30 inline-flex justify-center items-center gap-3">
            <button className=" text-[#4079ED] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100">
              <CiFilter className="text-lg" /> Filter
            </button>

          </div>
          <div className="w-36 h-[64px] px-6 py-4 left-[1150px] top-[120px] absolute bg-white hover:bg-red-100 rounded-2xl  outline-1 outline-offset-[-1px] outline-red-500 inline-flex justify-center items-center gap-3">
            <button className=" border-red-500 text-red-500 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-100 font-Urbanist">
              <GoTrash className="text-lg" /> Delete
            </button>
          </div>

          <div className="left-[48px] top-[108px] absolute justify-start text-indigo-950 text-4xl font-bold font-['Urbanist'] leading-[50.40px]">Company</div>
          <div className="w-[1445px] left-[34px] top-[206px] absolute grid grid-cols-3 gap-6">
            {companies.map((company, index) => (
              <div key={index} className="flex-1 p-8 bg-gray-50 rounded-3xl inline-flex flex-col justify-start items-start gap-6 overflow-hidden mr-5">
                <table className="w-full table-fixed text-left font-['Urbanist']">
                  <thead>
                    <tr>
                      <th colSpan="2" className="pb-4 border-b border-gray-300/30 text-blue-500 text-xl font-bold">
                      {company.companyName}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-xl">
                    <tr className="border-t ">
                      <td className="text-slate-500/40 font-normal py-3">Date</td>
                      <td className="text-indigo-950 font-bold py-3">{company.date}</td>
                    </tr>
                    <tr className="">
                      <td className="text-slate-500/40 font-normal py-3">Capital</td>
                      <td className="text-indigo-950 font-bold py-3">{company.companyCapital}</td>
                    </tr>
                    <tr className="">
                      <td className="text-slate-500/40 font-normal py-3">Opening Cash</td>
                      <td className="text-indigo-950 font-bold py-3">{company.openingCash}</td>
                    </tr>
                    {/* <tr className="">
                      <td className="text-slate-500/40 font-normal py-3">Company Name</td>
                      <td className="text-indigo-950 font-bold py-3">{company.companyName}</td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
           {/* Pagination Controls */}
           <div className="flex justify-between items-center mt-[890px] text-gray-600 ml-10 mr-30">
          <span>Page {currentPage} of {totalPages}</span>
          <div className="flex space-x-2">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`w-36 h-[64px] px-4 py-2 border border-gray-300 rounded-lg ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`w-36 h-[64px] px-4 py-2 border border-gray-300 rounded-lg ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
            >
              Next
            </button>
          </div>
        </div>

        </div>
      </div>
      {popup && <AddCompanyForm setPopup={setPopup} />}
    </>
  )
}

export default Company
