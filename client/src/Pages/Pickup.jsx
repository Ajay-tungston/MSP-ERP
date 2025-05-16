import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaChevronRight } from "react-icons/fa6";
import { TbPencilMinus } from "react-icons/tb";
import { FaTrashAlt } from "react-icons/fa";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import AddPickup from "./AddPickup";
import EditPickup from "./EditPickup";

export default function Pickup() {
    const [pickups, setPickups] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [popup, setPopup] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedPickup, setSelectedPickup] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(8);
    const [totalPages, setTotalPages] = useState(1);

    const axiosInstance = useAxiosPrivate();

    // Fetch pickups from backend
    const fetchPickups = async () => {
        try {
            setIsLoading(true);
            const res = await axiosInstance.get(`/admin/pickup/get?page=${currentPage}&limit=${limit}&search=${search}`);
            console.log("Fetched pickups:", res.data.pickups);
            setPickups(res.data.pickups);
            setCurrentPage(res.data.currentPage || 1);
            setTotalPages(res.data.totalPages || 1);
            setTotalPages(res.data?.totalPages || 1);
        }
        catch (error) {
            console.error("Failed to fetch pickups:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPickups();
    }, [search, currentPage]);

    const toggleRowSelection = (id) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        );
    };

    const toggleAllRows = () => {
        if (selectedRows.length === pickups.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(pickups.map((p) => p._id));
        }
    };

    const deletePickup = async (id) => {
        try {
            await axiosInstance.delete(`/admin/pickup/delete/${id}`);
            fetchPickups();
        } catch (err) {
            console.error("Failed to delete pickUp", err);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setCurrentPage(newPage);
      };

    return (
        <>
            <div className="py-4 rounded-lg shadow-sm h-[800px] bg-white mt-10">
                {/* Breadcrumb */}
                <nav className="flex items-center text-[20px] text-gray-500 mb-2 px-4 mt-10">
                    <span>Master</span> <FaChevronRight className="mx-2" />
                    <span className="text-gray-700">Pickup</span>
                </nav>

                {/* Header & Buttons */}

                <h1 className="text-3xl font-bold text-gray-900 ml-5">Pickup</h1>
                <div className="relative max-w-md ml-5 mt-5">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setCurrentPage(1);
                            setSearch(e.target.value);
                        }}
                        placeholder="Search here..."
                        className=" px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div className="flex space-x-3 -mt-10  mr-10 float-end ">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-lg flex items-center gap-2 "
                        onClick={() => setPopup(true)}>
                        <CiCirclePlus className="text-xl " /> Add New PickUp
                    </button>
                </div>


                <div className="mt-10 bg-white">
                    <table className="w-full border-collapse text-gray-900">
                        <thead>
                            <tr className="text-left text-gray-900 font-bold border-b-2 border-gray-200 bg-[#F9FAFB]">
                                <th className="p-3">No.</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Route</th>
                                <th className="p-3">Phone</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Address</th>
                                <th className="p-3">Vehicle No.</th>
                                <th className="p-3">License No.</th>
                                <th className="p-3">Rate</th>
                                <th className="p-3"></th>
                                <th className="p-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {pickups.map((pickup, index) => (
                                <tr
                                    key={pickup._id}
                                    className="border-b border-gray-200 hover:bg-gray-50 bg-white"
                                >
                                  <td className="p-3">{(currentPage - 1) * limit + index + 1}</td>

                                    <td className="p-3">{pickup.name}</td>
                                    <td className="p-3">{pickup.route}</td>
                                    <td className="p-3">{pickup.phone}</td>
                                    <td className="p-3">{new Date(pickup.date).toLocaleDateString()}</td>
                                    <td className="p-3">{pickup.address}</td>
                                    <td className="p-3">{pickup.vehicleNo}</td>
                                    <td className="p-3">{pickup.licenseNo}</td>
                                    <td className="p-3">₹{parseFloat(pickup.rate).toFixed(2)}</td>
                                    <td className="p-3 text-blue-800 cursor-pointer" onClick={() => {
                                        setSelectedPickup(pickup);  // store the pickup to edit
                                        setPopup("edit");
                                    }}>
                                        <TbPencilMinus />
                                    </td>
                                    <td className="p-3 text-red-600 cursor-pointer">
                                        <FaTrashAlt onClick={() => deletePickup(pickup._id)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Placeholder */}
                <div className="flex justify-between items-center mt-10 text-gray-600 ml-10">
                    <span>Page {currentPage} of {totalPages}</span>
                    <div className="flex space-x-2 pr-10">
                        <button className={`px-4 py-2 text-gray-400 border border-gray-300 rounded-lg ${currentPage === 1 ? "cursor-not-allowed text-gray-400" : ""
                            }`}
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            Previous
                        </button>
                        <button className={`px-4 py-2 border border-gray-300 rounded-lg ${currentPage === totalPages ? "cursor-not-allowed text-gray-400" : ""
                            }`}
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
            {popup && <AddPickup setPopup={setPopup} fetchPickups={fetchPickups} />}
            {popup === "edit" && selectedPickup && (
                <EditPickup
                    setPopup={setPopup}
                    fetchPickups={fetchPickups}
                    pickupToEdit={selectedPickup}
                />
            )}
        </>
    );
}
