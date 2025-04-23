import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa"; // For styled checkboxes
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import OvalSpinner from "../Components/spinners/OvalSpinner";
import Swal from "sweetalert2";
function Supplier() {
    const [selectedRows, setSelectedRows] = useState([]);
    const [supplier, setSupplier] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 8;
    const [isLoading, setIsLoading] = useState(false);
    const axiosInstance = useAxiosPrivate();
  
    useEffect(() => {
      setSelectedRows([]);
      const fetchSuppliers = async () => {
        try {
          setIsLoading(true);
          const response = await axiosInstance.get(
            `/admin/supplier?page=${currentPage}&limit=${limit}`
          );
          setSupplier(response?.data);
          setTotalPages(data.totalPages);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchSuppliers();
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
  
    const toggleRowSelection = (id) => {
      setSelectedRows((prev) =>
        prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
      );
    };
    const navigate = useNavigate();
  
    const toggleAllRows = () => {
      if (selectedRows.length === supplier?.suppliers?.length) {
        setSelectedRows([]);
      } else {
        setSelectedRows(supplier?.suppliers?.map((i) => i._id));
      }
    };
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

      <div className=" h-full relative bg-gray-50  outline-1 outline-offset-[-1px] outline-white overflow-hidden">

    
    <div className="w-[1511px] h-[1095px]   absolute bg-white rounded-3xl overflow-hidden mt-10">
        <div className="left-[48px] top-[86px] absolute inline-flex justify-start items-center gap-3">
        <div className="flex items-center gap-2 text-slate-500 text-xl font-normal font-['Urbanist']">
  Master <FaChevronRight /> Supplier
</div>
            <div className="left-[4px] top-[33px] absolute justify-start text-indigo-950 text-4xl font-bold font-['Urbanist'] leading-[50.40px]">Supplier</div>
        </div>
       
       
        <div className="w-80 h-[64px] px-6 py-4 left-[1143px] top-[32px] absolute bg-indigo-500 rounded-2xl inline-flex justify-center items-center gap-3" onClick={() => navigate('/add-supplier')}>
          <div className="w-8 h-8 relative">
            <CiCirclePlus className="w-7 h-7 left-[2.67px] top-[2.67px] absolute text-white" />
            <div className="w-8 h-8 left-[32px] top-[32px] absolute origin-top-left -rotate-180 opacity-0" />
          </div>
          <div className="justify-start text-white text-xl font-bold font-['Urbanist']">Add New Supplier</div>
        </div>
         <div className="w-36 h-[64px] px-6 py-4 left-[1303px] top-[144px] absolute bg-white hover:bg-gray-100 rounded-2xl  outline-1 outline-offset-[-1px] outline-gray-300/30 inline-flex justify-center items-center gap-3">
               <button className=" text-[#4079ED] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100">
                 <CiFilter className="text-lg" /> Filter
               </button>
                   
                   </div>
        <div className="w-36 h-[64px] px-6 py-4 left-[1150px] top-[144px] absolute bg-white hover:bg-red-100 rounded-2xl  outline-1 outline-offset-[-1px] outline-red-500 inline-flex justify-center items-center gap-3">
                <button className=" border-red-500 text-red-500 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-100 font-Urbanist">
                  <GoTrash className="text-lg" /> Delete
                </button>
                </div>


        <div className="w-[1511px] left-0 top-[256px] absolute inline-flex flex-col justify-start items-start">
        <table className="w-full border-collapse text-gray-900">
          {/* Table Header */}
          <thead>
            <tr className="text-left text-gray-900 font-bold border-b-2 border-gray-200 bg-[#F9FAFB] ">
              <th className="p-3">
                <button onClick={toggleAllRows} className="text-blue-600">
                  {selectedRows.length === supplier?.suppliers?.length ? (
                    <FaCheckSquare size={20} />
                  ) : (
                    <FaRegSquare size={20} />
                  )}
                </button>
              </th>
              <th className="p-3">No.</th>
              <th className="p-3">S.code</th>
              <th className="p-3">Name</th>
              <th className="p-3">Address</th>
              <th className="p-3">Phone</th>
              <th className="p-3">WhatsApp</th>
              <th className="p-3">Comm.Type</th>
              <th className="p-3">Advance</th>
              <th className="p-3">Adv.Deducted</th>
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
            ) : !supplier?.suppliers?.length > 0 ? (
              <tr>
                <td colSpan="10" className="text-center py-10 text-gray-500">
                  No data available
                </td>
              </tr>
            ) : (
              supplier?.suppliers?.map((supplier, index) => (
                <tr
                  key={supplier.id}
                  className="border-b border-gray-200 hover:bg-gray-50 bg-white"
                >
                  <td className="p-3">
                    <button
                      onClick={() => toggleRowSelection(supplier?._id)}
                      className="text-blue-600"
                    >
                      {selectedRows.includes(supplier?._id) ? (
                        <FaCheckSquare size={20} />
                      ) : (
                        <FaRegSquare size={20} />
                      )}
                    </button>
                  </td>
                  <td className="p-3">
                    {index + 1 + (currentPage - 1) * limit}
                  </td>
                  <td className="p-3">{supplier?.supplierCode}</td>
                  <td className="p-3">{supplier?.supplierName}</td>
                  <td className="p-3">{supplier?.address}</td>
                  <td className="p-3">{supplier?.phone}</td>
                  <td className="p-3">{supplier?.whatsapp}</td>
                  <td className="p-3">{supplier?.commission}</td>
                  <td className="p-3">{supplier?.advance}</td>
                  <td className="p-3">{supplier?.advanceDeducted}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        </div>
      {/* Pagination */}
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

  )
}

export default Supplier
