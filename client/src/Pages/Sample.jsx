import {useEffect,useState} from 'react'
import { FaChevronRight } from "react-icons/fa6";
import { CiCirclePlus } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import OvalSpinner from "../Components/spinners/OvalSpinner";
import Swal from "sweetalert2";

function Sample() {
    const [selectedRows, setSelectedRows] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
 
  const limit = 8;
  const items = itemData?.items ?? [];
  const axiosInstance = useAxiosPrivate();
  useEffect(() => {
    const fetchItemData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(
          `/admin/item?page=${currentPage}&limit=${limit}`
        );
        setItemData(response?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItemData();
  }, [currentPage]);

  const toggleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleAllRows = () => {
    if (selectedRows.length === itemData?.items?.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(itemData?.items?.map((item) => item?._id));
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
  return (
    <div>
      <div className=" h-full relative bg-gray-50  outline-1 outline-offset-[-1px] outline-white overflow-hidden mt-10">
 </div>
    <div className="w-[1511px] h-[1095px]  absolute bg-white rounded-3xl overflow-hidden">
        <div className="left-[48px] top-[66px] absolute inline-flex justify-start items-center gap-3">
        <div className="inline-flex items-center gap-1 text-slate-500 text-xl font-normal font-['Urbanist']">
  <span>Master</span>
  <FaChevronRight />
  <span>Item</span>
</div>
  </div>   

       <div className="w-80 h-[64px] px-6 py-4 left-[1143px] top-[32px] absolute bg-indigo-500 rounded-2xl inline-flex justify-center items-center gap-3" 
    //    onClick={()=>setPopup(true)}
       >
                        <div className="w-8 h-8 relative">
                          <CiCirclePlus className="w-7 h-7 left-[2.67px] top-[2.67px] absolute text-white" />
                          <div className="w-8 h-8 left-[32px] top-[32px] absolute origin-top-left -rotate-180 opacity-0" />
                        </div>
                        <div className="justify-start text-white text-xl font-bold font-['Urbanist']">Add New Items</div>
                       </div>

 <div className="w-36 h-[64px] px-6 py-4 left-[1303px] top-[124px] absolute bg-white hover:bg-gray-100 rounded-2xl  outline-1 outline-offset-[-1px] outline-gray-300/30 inline-flex justify-center items-center gap-3">
               <button className=" text-[#4079ED] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100">
                 <CiFilter className="text-lg" /> Filter
               </button>
                   
                   </div>
        <div className="w-36 h-[64px] px-6 py-4 left-[1150px] top-[124px] absolute bg-white hover:bg-red-100 rounded-2xl  outline-1 outline-offset-[-1px] outline-red-500 inline-flex justify-center items-center gap-3">
                <button className=" border-red-500 text-red-500 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-100 font-Urbanist">
                  <GoTrash className="text-lg" /> Delete
                </button>
                </div>

        <div className="w-[1511px] left-0 top-[216px] absolute inline-flex flex-col justify-start items-start">
        <table className="w-full border-collapse text-gray-900">
  {/* Header */}
  <thead>
             <tr className="text-left text-gray-900 font-bold border-b-2 border-gray-200 bg-[#F9FAFB]">
               <th className="p-3">
                 <button onClick={toggleAllRows} className="text-blue-600">
                   {selectedRows.length === itemData?.items?.length ? (
                     <FaCheckSquare size={20} />
                   ) : (
                     <FaRegSquare size={20} />
                   )}
                 </button>
               </th>
               <th className="p-3">No.</th>
               <th className="p-3">Item Code</th>
               <th className="p-3">Item Name</th>
             </tr>
           </thead>

  {/* Body */}
  <tbody>
    {isLoading ? (
      <tr>
        <td colSpan="3">
          <OvalSpinner />
        </td>
      </tr>
    ) : items.length === 0 ? (
      <tr>
        <td colSpan="3" className="text-center py-10 text-gray-500">
          No items available
        </td>
      </tr>
    ) : (
      items.map((item, index) => (
        <tr
          key={item.id}
          className="border-b border-gray-200 hover:bg-gray-50 bg-white"
        >
          <td className="p-3">
            <button
              onClick={() => toggleRowSelection(item.id)}
              className="text-blue-600"
            >
              {selectedRows.includes(item.id)
                ? <FaCheckSquare size={20}/>
                : <FaRegSquare size={20}/>}
            </button>
          </td>
          <td className="p-3">
            {index + 1 + (currentPage - 1) * limit}
          </td>
          <td className="p-3">{item?.itemCode}</td>
          <td className="p-3">{item.itemName}</td>
        </tr>
      ))
    )}
  </tbody>
</table>

         </div>
         <div className="left-[48px] top-[118px] absolute justify-start text-indigo-950 text-4xl font-bold font-['Urbanist'] leading-[50.40px]">Item</div>
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

export default Sample
