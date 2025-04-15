import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { format, parseISO } from "date-fns";
import OvalSpinner from "../Components/spinners/OvalSpinner";

export default function Employee() {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 2;
  const axiosInstance = useAxiosPrivate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(
          `/admin/employee?page=${currentPage}&limit=${limit}`
        );
        setEmployee(response?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEmployee();
  }, [currentPage]);

  // First define all functions
  const toggleAllRows = () => {
    if (selectedRows.length === employee?.employees?.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(employee?.employees?.map((i) => i?._id));
    }
  };

  const toggleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-4 rounded-lg shadow-sm h-[800px] bg-white mt-5">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-2 mt-10">
        <span>Master</span> <span className="mx-1">›</span>{" "}
        <span className="text-gray-700">Employee</span>
      </nav>

      {/* Header & Buttons */}
      <div className="flex justify-between items-center">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900">Employee</h1>
        {/* Buttons */}
        <div className="flex space-x-3 -mt-10 mr-10">
          <button
            onClick={() => navigate("/add-employe")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-lg flex items-center gap-2"
          >
            <CiCirclePlus className="text-xl" /> Add New Employee
          </button>
        </div>
      </div>

      <div className="flex space-x-3 float-right mt-5 mr-10">
        <button className="border border-red-500 text-red-500 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-100 font-Urbanist">
          <GoTrash className="text-lg" /> Delete
        </button>
        <button className="border border-gray-300 text-[#4079ED] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100">
          <CiFilter className="text-lg" /> Filter
        </button>
      </div>

      <div className="mt-20 bg-white">
        <table className="w-full border-collapse text-gray-900">
          {/* Table Header */}
          <thead>
            <tr className="text-left text-gray-900 font-bold border-b-2 border-gray-200 bg-[#F9FAFB]">
              <th className="p-3">
                <button onClick={toggleAllRows} className="text-blue-600">
                  {selectedRows.length === employee?.employees?.length ? (
                    <FaCheckSquare size={20} />
                  ) : (
                    <FaRegSquare size={20} />
                  )}
                </button>
              </th>
              <th className="p-3">No.</th>
              <th className="p-3">Name</th>
              <th className="p-3">Address</th>
              <th className="p-3">Phone</th>
              <th className="p-3">WhatsApp</th>
              <th className="p-3">Opening Bal.</th>
              <th className="p-3">Joining Date</th>
              <th className="p-3">Salary</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="10">
                  <OvalSpinner />
                </td>
              </tr>
            ) : !employee?.employees?.length > 0 ? (
              <tr>
                <td colSpan="10" className="text-center py-10 text-gray-500">
                  No data available
                </td>
              </tr>
            ) : (
              employee?.employees?.map((employee, index) => (
                <tr
                  key={employee?._id}
                  className="border-b border-gray-200 hover:bg-gray-50 bg-white"
                >
                  <td className="p-3">
                    <button
                      onClick={() => toggleRowSelection(employee?._id)}
                      className="text-blue-600"
                    >
                      {selectedRows.includes(employee?._id) ? (
                        <FaCheckSquare size={20} />
                      ) : (
                        <FaRegSquare size={20} />
                      )}
                    </button>
                  </td>
                  <td className="p-3">
                    {" "}
                    {index + 1 + (currentPage - 1) * limit}
                  </td>
                  <td className="p-3">{employee?.employeeName}</td>
                  <td className="p-3">{employee?.address}</td>
                  <td className="p-3">{employee?.phone}</td>
                  <td className="p-3">{employee?.whatsapp}</td>
                  <td className="p-3">{employee?.openingBalance}</td>
                  <td className="p-3">
                    {format(parseISO(employee?.joiningDate), "dd/MM/yyyy")}
                  </td>
                  <td className="p-3">{employee?.salary}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-68 text-gray-600 ml-10">
        <span>
          Page {employee?.currentPage}of {employee?.totalPages}
        </span>
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 border border-gray-300 rounded-lg ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>
          <button
            className={`px-4 py-2 border border-gray-300 rounded-lg ${
              currentPage === employee?.totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
            disabled={currentPage === employee?.totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
