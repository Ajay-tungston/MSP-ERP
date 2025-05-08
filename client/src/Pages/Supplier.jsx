import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import { LuPencilLine } from "react-icons/lu"; // Imported your pencil icon
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import OvalSpinner from "../Components/spinners/OvalSpinner";
import Swal from "sweetalert2";
import AddSupplier from "./AddSupplier";
import EditSupplier from "./EditSupplier";
import { FaTrashAlt } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6"

export default function CustomerHeader() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;
  const [isLoading, setIsLoading] = useState(false);
  const axiosInstance = useAxiosPrivate();
  const [editPopup, setEditPopup] = useState(false);
  const navigate = useNavigate();
  const [selectedSupplierId, setSelectedSupplierId] = useState(null); 

  useEffect(() => {
    setSelectedRows([]);
    const fetchSuppliers = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(
          `/admin/supplier?page=${currentPage}&limit=${limit}`
        );
        setSupplier(response?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSuppliers();
  }, [currentPage]);

  const handleDelete = async () => {
    const swalWithTailwindButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded",
        cancelButton:
          "bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-4"
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
      const response = await axiosInstance.delete("/admin/supplier", {
        data: {
          supplierIds: selectedRows
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

  const toggleAllRows = () => {
    if (selectedRows.length === supplier?.suppliers?.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(supplier?.suppliers?.map((i) => i._id));
    }
  };
  const [popup,setPopup] = useState(false);

  return (
    <>
    <div className="p-4 rounded-lg shadow-sm h-[800px] bg-white mt-5">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[20px] text-gray-500 mb-2 mt-10">
  <span>Master</span>
  <FaChevronRight />
  <span className="text-gray-700">Supplier</span>
</nav>


      {/* Header & Buttons */}

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Supplier</h1>
        <div className="relative max-w-md">
  <input
    type="text"
    placeholder="Search here..."
    className=" px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  />
 </div>

        
        <div className="flex space-x-3 -mt-10  float-end ">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-lg flex items-center gap-2" onClick={()=>setPopup(true)} >
            <CiCirclePlus className="text-xl " /> Add New supplier
          </button>
        </div>

      <div className="mt-20 bg-white ">
        <table className="w-full border-collapse text-gray-900">
          {/* Table Header */}
          <thead>
            <tr className="text-left text-gray-900 font-bold border-b-2 border-gray-200 bg-[#F9FAFB]">
             
              <th className="p-3">No.</th>
              <th className="p-3">S.code</th>
              <th className="p-3">Name</th>
              <th className="p-3">Address</th>
              <th className="p-3">Phone</th>
              <th className="p-3">WhatsApp</th>
              <th className="p-3">Comm(%)</th>
          
              <th className="p-3"></th> {/* For pencil icon column */}
              <th className="p-3"></th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="11">
                  <OvalSpinner />
                </td>
              </tr>
            ) : !supplier?.suppliers?.length > 0 ? (
              <tr>
                <td colSpan="11" className="text-center py-10 text-gray-500">
                  No data available
                </td>
              </tr>
            ) : (
              supplier?.suppliers?.map((supplier, index) => (
                <tr
                  key={supplier._id}
                  className="border-b border-gray-200 hover:bg-gray-50 bg-white"
                >
                
                  <td className="p-3">
                    {index + 1 + (currentPage - 1) * limit}
                  </td>
                  <td className="p-3">{supplier?.supplierCode}</td>
                  <td className="p-3">{supplier?.supplierName}</td>
                  <td className="p-3">{supplier?.address}</td>
                  <td className="p-3">{supplier?.phone}</td>
                  <td className="p-3">{supplier?.whatsapp}</td>
                  <td className="p-3">{supplier?.commission}</td>
                 
                  <td className="p-3 text-blue-600">
                  <LuPencilLine
                        className="text-[#6A5AE0] w-4 h-4 cursor-pointer"
                        onClick={() => {
                          setSelectedSupplierId(supplier._id);
                          setEditPopup(true);
                        }}
                        />
                  </td >
                  <td className="p-3 text-red-600">
                  <FaTrashAlt />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="flex justify-between items-center mt-[5%] text-gray-600 ml-10">
        <span>
          Page {supplier?.currentPage} of {supplier?.totalPages}
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
              currentPage === supplier?.totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
            disabled={currentPage === supplier?.totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
    {popup && <AddSupplier  setPopup={setPopup}/>}
    {editPopup && selectedSupplierId && (
        <EditSupplier
         supplierId={selectedSupplierId}
          setEditPopup={setEditPopup}
        />
    )}
    </>
  );
}
