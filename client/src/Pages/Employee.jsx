import { useState, useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { format, parseISO } from "date-fns";
import OvalSpinner from "../Components/spinners/OvalSpinner";
import Swal from "sweetalert2";
import AddEmployeeModal from "./Addemploye";
import { LuPencilLine } from "react-icons/lu";
import { FaTrashAlt } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import EditEmploye from "./EditEmployee";
import { debounce } from "lodash";

function Employee() {
  const [employee, setEmployee] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [editPopup, setEditPopup] = useState(false);
  const limit = 8;
  const axiosInstance = useAxiosPrivate();
  const [selectedEmployeId, setSelectedEmployeId] = useState(null);
  const [search, setSearch] = useState("");

  const fetchEmployee = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `/admin/employee?page=${currentPage}&limit=${limit}&search=${search}`
      );
      setEmployee(response?.data);
      setTotalPages(response?.data?.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const debouncedFetch = debounce(fetchEmployee, 300);

    debouncedFetch();
    return () => {
      debouncedFetch.cancel();
    };
  }, [search, currentPage]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the Employeee.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.delete(
          `/admin/employee/delete/${id}`
        );
        fetchEmployee();
        Swal.fire({
          title: "Deleted!",
          text: response.data.message,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error?.response?.data?.message || "Failed to delete Employeee.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

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
  const [popup, setPopup] = useState(false);

  return (
    <>
      <div className="p-4 rounded-lg shadow-sm h-[800px] bg-white mt-5">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[20px] text-gray-500 mb-2 mt-10">
          <span>Master</span>
          <FaChevronRight />
          <span className="text-gray-700">Employee</span>
        </nav>

        {/* Header & Buttons */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Employee</h1>
        <div className="relative max-w-md">
          <input
            type="text"
            value={search}
              autoComplete="off"
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search here..."
            className=" px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex space-x-3 -mt-10 float-end">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-lg flex items-center gap-2"
            onClick={() => setPopup(true)}
          >
            <CiCirclePlus className="text-xl " /> Add New Employee
          </button>
        </div>

        {/* Dynamic Table */}
        <div className="mt-10 bg-white">
          <table className="w-full border-collapse text-gray-900">
            <thead>
              <tr className="text-left text-gray-900 font-bold border-b-2 border-gray-200 bg-[#F9FAFB] text-lg">
                <th className="max-w-5 px-4 py-2">No.</th>
                <th className="max-w-20 px-4 py-2">Name</th>
                <th className="max-w-30 px-4 py-2">Address</th>
                <th className="max-w-20 px-4 py-2">Phone</th>
                <th className="max-w-20 px-4 py-2">WhatsApp</th>
                <th className="max-w-20 px-4 py-2">Opening Bal.</th>
                <th className="max-w-32 px-4 py-2">Joining Date</th>
                <th className="max-w-32 px-4 py-2">
                  Salary
                  <br />
                  (Monthly/Daily)
                </th>
                <th className="max-w-4 px-4 py-2"></th>
                <th className="max-w-4 px-4 py-2"></th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="10" className="text-center p-5 text-gray-500">
                    <OvalSpinner />
                  </td>
                </tr>
              ) : !employee?.employees?.length > 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-10 text-gray-500">
                    No data available
                  </td>
                </tr>
              ) : (
                employee?.employees?.map((employee, index) => (
                  <tr
                    key={employee._id}
                    className="bg-white border-b border-gray-200 hover:bg-gray-50 font-['Urbanist'] text-lg "
                  >
                    <td className="max-w-5 px-4 py-3">
                      {index + 1 + (currentPage - 1) * limit}
                    </td>
                    <td className="max-w-20 px-4 py-3 truncate overflow-hidden whitespace-nowrap">
                      {employee?.employeeName}
                    </td>
                    <td className="max-w-30 px-4 py-3 truncate overflow-hidden whitespace-nowrap">
                      {employee?.address}
                    </td>
                    <td className="max-w-20 px-4 py-3 truncate overflow-hidden whitespace-nowrap">
                      {employee?.phone}
                    </td>
                    <td className="max-w-20 px-4 py-3 truncate overflow-hidden whitespace-nowrap">
                      {employee?.whatsapp}
                    </td>
                    <td className="max-w-20 px-4 py-3 truncate overflow-hidden whitespace-nowrap">
                    ₹ {employee?.openingBalance}
                    </td>
                    <td className="max-w-32 px-4 py-3 truncate overflow-hidden whitespace-nowrap">
                      {format(parseISO(employee?.joiningDate), "dd/MM/yyyy")}
                    </td>

                    <td className="min-w-32 px-4 py-3">₹{employee?.salary}</td>

                    <td className="min-w-4 px-4 py-3 text-blue-600">
                      <LuPencilLine
                        className="text-[#6A5AE0] w-4 h-4 cursor-pointer"
                        onClick={() => {
                          setSelectedEmployeId(employee._id);
                          setEditPopup(true);
                        }}
                      />
                    </td>
                    <td
                      className="text-red-600"
                      onClick={() => handleDelete(employee._id)}
                    >
                      {" "}
                      <FaTrashAlt />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-between items-center mt-8 text-gray-600 ml-10">
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`px-4 py-2 border border-gray-300 rounded-lg ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border border-gray-300 rounded-lg ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {popup && (
        <AddEmployeeModal setPopup={setPopup} fetchEmployee={fetchEmployee} />
      )}
      {editPopup && selectedEmployeId && (
        <EditEmploye
          employeeId={selectedEmployeId}
          setEditPopup={setEditPopup}
          fetchEmployee={fetchEmployee}
        />
      )}
    </>
  );
}

export default Employee;
