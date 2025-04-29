// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { CiCirclePlus, CiFilter } from "react-icons/ci";
// import { GoTrash } from "react-icons/go";
// import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
// import useAxiosPrivate from "../hooks/useAxiosPrivate";
// import OvalSpinner from "../Components/spinners/OvalSpinner";

// export default function Item() {
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [itemData, setItemData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const limit = 5;

//   const axiosInstance = useAxiosPrivate();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchItemData = async () => {
//       try {
//         setIsLoading(true);
//         const response = await axiosInstance.get(
//           `/admin/item?page=${currentPage}&limit=${limit}`
//         );
//         setItemData(response?.data);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchItemData();
//   }, [currentPage]);

//   const toggleRowSelection = (id) => {
//     setSelectedRows((prev) =>
//       prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
//     );
//   };

//   const toggleAllRows = () => {
//     if (selectedRows.length === itemData?.items?.length) {
//       setSelectedRows([]);
//     } else {
//       setSelectedRows(itemData?.items?.map((item) => item?._id));
//     }
//   };

//   return (
//     <div className="p-4 rounded-lg shadow-sm bg-[#FFFFFF] mt-5">
//       <nav className="text-sm text-gray-500 mb-2 mt-10">
//         <span>Master </span>
//         <span className="mx-1">›</span> Item
//         <span className="text-gray-700"></span>
//       </nav>

//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-gray-900">Item</h1>
//         <div className="flex space-x-3 -mt-10 mr-10">
//           <button
//             className="bg-indigo-700 hover:bg-indigo-700 text-white px-5 py-4 rounded-lg flex items-center gap-1"
//             onClick={() => navigate("/add-item")}
//           >
//             <CiCirclePlus className="text-xl" /> Add New Item
//           </button>
//         </div>
//       </div>

//       <div className="flex space-x-3 float-right mt-5 mr-10">
//         <button className="border border-red-500 text-red-500 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-100">
//           <GoTrash className="text-lg" /> Delete
//         </button>
//         <button className="border border-gray-300 text-[#4079ED] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100">
//           <CiFilter className="text-lg" /> Filter
//         </button>
//       </div>

//       <div className="mt-20 bg-red-500">
//         <table className="w-full border-collapse text-gray-900">
//           <thead>
//             <tr className="text-left text-gray-900 font-bold border-b-2 border-gray-200 bg-[#F9FAFB]">
//               <th className="p-3">
//                 <button onClick={toggleAllRows} className="text-blue-600">
//                   {selectedRows.length === itemData?.items?.length ? (
//                     <FaCheckSquare size={20} />
//                   ) : (
//                     <FaRegSquare size={20} />
//                   )}
//                 </button>
//               </th>
//               <th className="p-3">No.</th>
//               <th className="p-3">Item Code</th>
//               <th className="p-3">Item Name</th>
//             </tr>
//           </thead>
//           <tbody>
//             {isLoading ? (
//               <tr>
//                 <td colSpan="10">
//                   <OvalSpinner />
//                 </td>
//               </tr>
//             ) : !itemData?.items?.length > 0 ? (
//               <tr>
//                 <td colSpan="10" className="text-center py-10 text-gray-500">
//                   No data available
//                 </td>
//               </tr>
//             ) : (
//               itemData?.items?.map((item, index) => (
//                 <tr
//                   key={item?._id}
//                   className="border-b border-gray-200 hover:bg-red-50 bg-[#FFFFFF]"
//                 >
//                   <td className="p-3">
//                     <button
//                       onClick={() => toggleRowSelection(item?._id)}
//                       className="text-blue-600"
//                     >
//                       {selectedRows.includes(item?._id) ? (
//                         <FaCheckSquare size={20} />
//                       ) : (
//                         <FaRegSquare size={20} />
//                       )}
//                     </button>
//                   </td>
//                   <td className="p-3">
//                     {" "}
//                     {index + 1 + (currentPage - 1) * limit}
//                   </td>
//                   <td className="p-3">{item?.itemCode}</td>
//                   <td className="p-3">{item?.itemName}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//       <div className="flex justify-between items-center mt-68 text-gray-600 ml-10">
//         <span>
//           Page {itemData?.currentPage}of {itemData?.totalPages}
//         </span>
//         <div className="flex space-x-2">
//           <button
//             className={`px-4 py-2 border border-gray-300 rounded-lg ${
//               currentPage === 1
//                 ? "text-gray-400 cursor-not-allowed"
//                 : "hover:bg-gray-100"
//             }`}
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((prev) => prev - 1)}
//           >
//             Previous
//           </button>
//           <button
//             className={`px-4 py-2 border border-gray-300 rounded-lg ${
//               currentPage === itemData?.totalPages
//                 ? "text-gray-400 cursor-not-allowed"
//                 : "hover:bg-gray-100"
//             }`}
//             disabled={currentPage === itemData?.totalPages}
//             onClick={() => setCurrentPage((prev) => prev + 1)}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


 
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiCirclePlus, CiFilter } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import { LuPencilLine } from "react-icons/lu"; // <-- Import Pencil Icon
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import OvalSpinner from "../Components/spinners/OvalSpinner";

export default function Item() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  const axiosInstance = useAxiosPrivate();
  const navigate = useNavigate();

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

  return (
    <div className="p-4 rounded-lg shadow-sm bg-[#FFFFFF] mt-5">
      <nav className="text-sm text-gray-500 mb-2 mt-10">
        <span>Master </span>
        <span className="mx-1">›</span> Item
        <span className="text-gray-700"></span>
      </nav>

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Item</h1>
        <div className="flex space-x-3 -mt-10 mr-10">
          <button
            className="bg-indigo-700 hover:bg-indigo-700 text-white px-5 py-4 rounded-lg flex items-center gap-1"
            onClick={() => navigate("/add-item")}
          >
            <CiCirclePlus className="text-xl" /> Add New Item
          </button>
        </div>
      </div>

      <div className="flex space-x-3 float-right mt-5 mr-10">
        <button className="border border-red-500 text-red-500 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-100">
          <GoTrash className="text-lg" /> Delete
        </button>
        <button className="border border-gray-300 text-[#4079ED] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100">
          <CiFilter className="text-lg" /> Filter
        </button>
      </div>

      <div className="mt-20 bg-red-500">
        <table className="w-full border-collapse text-gray-900">
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
              <th className="p-3"></th> {/* Empty header for edit button */}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="10">
                  <OvalSpinner />
                </td>
              </tr>
            ) : !itemData?.items?.length > 0 ? (
              <tr>
                <td colSpan="10" className="text-center py-10 text-gray-500">
                  No data available
                </td>
              </tr>
            ) : (
              itemData?.items?.map((item, index) => (
                <tr
                  key={item?._id}
                  className="border-b border-gray-200 hover:bg-white bg-[#FFFFFF]"
                >
                  <td className="p-3">
                    <button
                      onClick={() => toggleRowSelection(item?._id)}
                      className="text-blue-600"
                    >
                      {selectedRows.includes(item?._id) ? (
                        <FaCheckSquare size={20} />
                      ) : (
                        <FaRegSquare size={20} />
                      )}
                    </button>
                  </td>
                  <td className="p-3">
                    {index + 1 + (currentPage - 1) * limit}
                  </td>
                  <td className="p-3">{item?.itemCode}</td>
                  <td className="p-3">{item?.itemName}</td>
                  {/* Edit Button */}
                  <td className="p-3">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => navigate("/edit-item")}
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

      <div className="flex justify-between items-center mt-68 text-gray-600 ml-10">
        <span>
          Page {itemData?.currentPage} of {itemData?.totalPages}
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
              currentPage === itemData?.totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
            disabled={currentPage === itemData?.totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
