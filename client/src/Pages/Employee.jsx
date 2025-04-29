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
                    const response = await axiosInstance.delete("/admin/supplier",{
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
      <div className=" h-full relative bg-gray-50  outline-1 outline-offset-[-1px] outline-white overflow-hidden mt-10">
         <div className={`w-[1511px] h-[1095px] absolute bg-white rounded-3xl overflow-hidden ${popup ? 'backdrop-blur-sm':''}`}>
        <div className="left-[48px] top-[86px] absolute inline-flex justify-start items-center gap-3">
            <div className="justify-start text-slate-500 text-xl font-bold font-['Urbanist']">Master  Employee</div>
        </div>
              <div className="w-80 h-[64px] px-6 py-4 left-[1143px] top-[32px] absolute bg-indigo-500 rounded-2xl inline-flex justify-center items-center gap-3" onClick={()=>setPopup(true)}>
                 <div className="w-8 h-8 relative">
                   <CiCirclePlus className="w-7 h-7 left-[2.67px] top-[2.67px] absolute text-white" />
                   <div className="w-8 h-8 left-[32px] top-[32px] absolute origin-top-left -rotate-180 opacity-0" />
                 </div>
                 <div className="justify-start text-white text-xl font-bold font-['Urbanist']">Add New Employee</div>
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
       
                       <table className="w-[1500px] absolute left-0 top-[216px] text-left border-collapse">
  {/* Table Head */}
  <thead>
    <tr className="px-12 py-4 bg-gray-50 border-b border-gray-200 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">
      <th className="w-8 h-8 p-2">
        <button onClick={toggleAllRows} className="text-blue-600">
          {selectedRows.length === employee?.employees?.length ? (
            <FaCheckSquare size={20} />
          ) : (
            <FaRegSquare size={20} />
          )}
        </button>
      </th>
      <th className="max-w-16 px-4 py-2">No.</th>
      <th className="min-w-32 px-4 py-2">Name</th>
      <th className="min-w-32 px-4 py-2">Address</th>
      <th className="min-w-32 px-4 py-2">Phone</th>
      <th className="min-w-32 px-4 py-2">WhatsApp</th>
      <th className="min-w-32 px-4 py-2">Opening Bal.</th>
      <th className="min-w-32 px-4 py-2">Joining Date</th>
      <th className="min-w-48 px-4 py-2">Salary<br />(Monthly/Daily)</th>
    </tr>
  </thead>

  {/* Table Body */}
  <tbody>
    {isLoading ? (
      <tr>
        <td colSpan="9" className="text-center py-10 text-gray-500">
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
          className="bg-white border-b border-gray-200 hover:bg-gray-50 text-slate-900 text-xl font-bold font-['Urbanist'] tracking-wide"
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
          <td className="min-w-32 px-4 py-3">{employee?.employeeName}</td>
          <td className="min-w-32 px-4 py-3">{employee?.address}</td>
          <td className="min-w-32 px-4 py-3">{employee?.phone}</td>
          <td className="min-w-32 px-4 py-3">{employee?.whatsapp}</td>
          <td className="min-w-32 px-4 py-3">{employee?.openingBalance}</td>
          <td className="min-w-32 px-4 py-3">
            {format(parseISO(employee?.joiningDate), "dd/MM/yyyy")}
          </td>
          <td className="min-w-48 px-4 py-3">{employee?.salary}</td>
        </tr>
      ))
    )}
  </tbody>
</table>
        <div className="flex justify-between items-center mt-[730px] text-gray-600 ml-10 mr-30">
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
    {popup && <AddEmployeeModal setPopup={setPopup}/>}
    </>
  )
}

export default Employee
