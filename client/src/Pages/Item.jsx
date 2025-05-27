import { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { CiCirclePlus } from "react-icons/ci";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import OvalSpinner from "../Components/spinners/OvalSpinner";
import AddItem from "./AddItem";
import { LuPencilLine } from "react-icons/lu";
import { FaTrashAlt } from "react-icons/fa";
import EditItem from "./EditItem";
import { debounce } from "lodash";
import Swal from "sweetalert2";

function Item() {
  const [itemData, setItemData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [popup, setPopup] = useState(false);
  const [editpopup, setEditPopup] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [search, setSearch] = useState("");
  const limit = 8;
  const items = itemData?.items ?? [];
  const axiosInstance = useAxiosPrivate();

  const fetchItemData = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `/admin/item/get?page=${currentPage}&limit=${limit}&search=${search}`
      );
      setItemData(response?.data);
      setTotalPages(response?.data?.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const debouncedFetch = debounce(fetchItemData, 300);

    debouncedFetch();
    return () => {
      debouncedFetch.cancel();
    };
  }, [search, currentPage]);

   const handleDelete = async (id) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This will permanently delete the Item.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });
  
      if (result.isConfirmed) {
        try {
          const response = await axiosInstance.delete(
            `/admin/item/delete/${id}`
          );
          fetchItemData();
          Swal.fire({
            title: "Deleted!",
            text: response.data.message,
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (error) {
          console.log(error)
          Swal.fire({
            title: "Error!",
            text: error?.response?.data?.message || "Failed to delete Item.",
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

  return (
    <>
      <div className="p-4 rounded-lg shadow-sm h-[800px] bg-white mt-5">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-x-2 text-[20px] text-gray-500 mb-2 mt-10">
          <span>Master</span>
          <FaChevronRight />
          <span className="text-gray-700">Item</span>
        </nav>

        {/* Header & Buttons */}

        <h1 className="text-3xl font-bold text-gray-800 mb-6">Item</h1>
        <div className="relative max-w-md">
          <input
            type="text"
            value={search}
              autoComplete="off"
            onChange={(e) => {
              setCurrentPage(1);
              setSearch(e.target.value);
            }}
            placeholder="Search here..."
            className=" px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex space-x-3 -mt-10   float-end">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-lg flex items-center gap-2"
            onClick={() => setPopup(true)}
          >
            <CiCirclePlus className="text-xl " /> Add New Item
          </button>
        </div>

        <div className="mt-10 bg-white">
          <table className="w-full border-collapse text-gray-900">
            <thead>
              <tr className="text-left text-gray-900 font-bold border-b-2 border-gray-200 bg-[#F9FAFB] text-lg">
                <th className="p-3">No.</th>
                <th className="p-3">Item Code</th>
                <th className="p-3">Item Name</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
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
                    className="border-b border-gray-200 hover:bg-gray-50 bg-white text-lg"
                  >
                    <td className="p-3">
                      {index + 1 + (currentPage - 1) * limit}
                    </td>
                    <td className="p-3">{item?.itemCode ||'--'}</td>
                    <td className="p-3">{item.itemName || '--'}</td>
                    <td className="p-3 text-[#6A5AE0]">
                      <LuPencilLine
                        className="text-[#6A5AE0] w-4 h-4 cursor-pointer"
                        onClick={() => {
                          setSelectedItemId(item._id);
                          setEditPopup(true);
                        }}
                      />
                    </td>
                    <td className="p-3 text-red-600" onClick={()=>handleDelete(item._id)}>
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
                  ? "text-gray-300 cursor-not-allowed"
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
                  ? "text-[#4079ED] cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {popup && <AddItem setPopup={setPopup} fetchItemData={fetchItemData} />}
      {editpopup && selectedItemId && (
        <EditItem
          itemId={selectedItemId}
          setEditPopup={setEditPopup}
          fetchItemData={fetchItemData}
        />
      )}
    </>
  );
}

export default Item;
