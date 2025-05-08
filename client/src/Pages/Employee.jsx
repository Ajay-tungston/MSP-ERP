import {useState , useEffect} from 'react'
import { CiCirclePlus } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { format, parseISO } from "date-fns";
import OvalSpinner from "../Components/spinners/OvalSpinner";
import Swal from "sweetalert2";
import AddEmployeeModal from './Addemploye';
import { LuPencilLine } from 'react-icons/lu';

function Employee() {
    const [selectedRows, setSelectedRows] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
        const [totalPages, setTotalPages] = useState(1);
        const [currentPage, setCurrentPage] = useState(1);
        const limit = 8;
        const axiosInstance = useAxiosPrivate();
        
           useEffect(() => {
              const fetchEmployee = async () => {
                try {
                  setIsLoading(true);
                  const response = await axiosInstance.get(
                    `/admin/employee?page=${currentPage}&limit=${limit}`
                  );
                  setEmployee(response?.data);
                  setTotalPages(response?.data?.totalPages);

                } catch (error) {
                  console.log(error);
                } finally {
                  setIsLoading(false);
                }
              };
              fetchEmployee();
            }, [currentPage]);

              //need to add logic for check the supplier has any transcations
                const handleDelete = async () => {
                  const swalWithTailwindButtons = Swal.mixin({
                    customClass: {
                      confirmButton:
                        "bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded",
                      cancelButton:
                        "bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-4" // ← Add margin-right to cancel button
                    },
                    buttonsStyling: false
                  });
                  
                  swalWithTailwindButtons.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, cancel!",
                    reverseButtons: true
                  }).then((result) => {
                    if (result.isConfirmed) {
                      swalWithTailwindButtons.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                      swalWithTailwindButtons.fire({
                        title: "Cancelled",
                        text: "Your imaginary file is safe :)",
                        icon: "error"
                      });
                    }
                  });
                  
                  try {
                    const response = await axiosInstance.delete("/admin/employee",{
                      data:{
                        supplierIds:selectedRows
                      }
                    });
                  } catch (error) {
                    console.log(error);
                  }
                };

            const navigate = useNavigate();
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
              const [popup,setPopup]=useState(false);

  return (
    <>
    <div className="p-4 rounded-lg shadow-sm h-[800px] bg-white mt-5">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-2 mt-10">
        <span>Master</span> <span className="mx-1">›</span> <span className="text-gray-700">Employee</span>
      </nav>

      {/* Header & Buttons */}
      <div className="flex justify-between items-center ">
        <h1 className="text-2xl font-bold text-gray-900">Employee</h1>

        <div className="flex space-x-3 -mt-10  mr-10 ">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-lg flex items-center gap-2" onClick={()=>setPopup(true)} >
            <CiCirclePlus className="text-xl " /> Add New Employee
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
      
      {/* Dynamic Table */}
      <div className="mt-20 bg-white">
        <table className="w-full border-collapse text-gray-900">
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
      <th className="max-w-16 px-4 py-2">No.</th>
      <th className="max-w-32 px-4 py-2">Name</th>
      <th className="max-w-32 px-4 py-2">Address</th>
      <th className="max-w-32 px-4 py-2">Phone</th>
      <th className="max-w-32 px-4 py-2">WhatsApp</th>
      <th className="max-w-32 px-4 py-2">Opening Bal.</th>
      <th className="max-w-32 px-4 py-2">Joining Date</th>
      <th className="max-w-48 px-4 py-2">Salary<br />(Monthly/Daily)</th>
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
          key={employee?._id}
          className="bg-white border-b border-gray-200 hover:bg-gray-50 font-['Urbanist'] "
        >
          <td className="w-8 h-8 p-2 text-blue-600">
            <button onClick={() => toggleRowSelection(employee?._id)}>
              {selectedRows.includes(employee?._id) ? (
                <FaCheckSquare size={20} />
              ) : (
                <FaRegSquare size={20} />
              )}
            </button>
          </td>
          <td className="max-w-16 px-4 py-3">{index + 1 + (currentPage - 1) * limit}</td>
<td className="max-w-32 px-4 py-3 truncate overflow-hidden whitespace-nowrap">{employee?.employeeName}</td>
<td className="max-w-32 px-4 py-3 truncate overflow-hidden whitespace-nowrap">{employee?.address}</td>
<td className="max-w-32 px-4 py-3 truncate overflow-hidden whitespace-nowrap">{employee?.phone}</td>
<td className="max-w-32 px-4 py-3 truncate overflow-hidden whitespace-nowrap">{employee?.whatsapp}</td>
<td className="max-w-32 px-4 py-3 truncate overflow-hidden whitespace-nowrap">{employee?.openingBalance}</td>
<td className="max-w-32 px-4 py-3 truncate overflow-hidden whitespace-nowrap">
  {format(parseISO(employee?.joiningDate), "dd/MM/yyyy")}
</td>



        
          <td className="min-w-48 px-4 py-3">{employee?.salary}</td>

          <td className="min-w-4 px-4 py-3 text-blue-600">
                              <button
                                onClick={() => navigate(`/edit-employee`)} // Navigate to edit page with supplier ID
                              >
                                <LuPencilLine size={20} />


                              </button>
                            </td>

        </tr>
      ))
    )}
  </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-between items-center mt-8 text-gray-600 ml-10">
        <span>Page {currentPage} of {totalPages}</span>
        <div className="flex space-x-2">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`px-4 py-2 border border-gray-300 rounded-lg ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border border-gray-300 rounded-lg ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
    {popup && <AddEmployeeModal setPopup={setPopup}/>}
  </>
    
  );
}

export default Employee