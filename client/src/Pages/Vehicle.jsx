import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaChevronRight } from "react-icons/fa6";
import { TbPencilMinus } from "react-icons/tb";
import { FaTrashAlt } from "react-icons/fa";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import AddVehicle from "./AddVehicle";
import { debounce } from "lodash";
import OvalSpinner from "../Components/spinners/OvalSpinner";

export default function Vehicle() {
    const [vehicles, setVehicles] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [popup, setPopup] = useState();
    const [loading, setIsLoading] = useState(false);
    const [search, setSearch] = useState("");
console.log(vehicles)
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(8);
    const [totalPages, setTotalPages] = useState(1);

    const axiosInstance = useAxiosPrivate();

    // Fetch vehicles from backend
    const fetchVehiclesDebounced = debounce(async () => {
        try {
            setIsLoading(true);
            const res = await axiosInstance.get(`/admin/vehicle/get?page=${currentPage}&limit=${limit}&search=${search}`);
            setVehicles(res.data.data);
            setCurrentPage(res.data.currentPage || 1);
            setTotalPages(res.data.totalPages || 1);
        } catch (error) {
            
            console.error("Failed to fetch vehicles:", error);
        } finally {
            setIsLoading(false);
        }
    },300)

    useEffect(() => {
        fetchVehiclesDebounced();
    }, [search, currentPage]);

    const toggleRowSelection = (id) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        );
    };

    const toggleAllRows = () => {
        if (selectedRows.length === vehicles.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(vehicles.map((v) => v._id));
        }
    };

    const deleteVehicle = async (id) => {
        try {
            await axiosInstance.delete(`/admin/vehicle/delete/${id}`);
            fetchVehicles();
        } catch (err) {
            console.error("Failed to delete vehicle", err);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setCurrentPage(newPage);
    };

    return (
        <>
            <div className="py-4 rounded-3xl shadow-md h-[800px] bg-white mt-5">
                {/* Breadcrumb */}
                <nav className="flex items-center text-[20px] text-gray-500 mb-2 px-4 mt-10">
                    <span>Master</span> <FaChevronRight className="mx-2" />
                    <span className="text-gray-700">Vehicle</span>
                </nav>

                {/* Header & Buttons */}
                <h1 className="text-3xl font-bold text-gray-900 ml-5">Vehicle</h1>
                <div className="relative max-w-md ml-5 mt-5">
                    <input
                        type="text"
                        value={search}
                        autoComplete="off"
                        onChange={(e) => {
                            setCurrentPage(1);
                            const value = e.target.value;
                            setSearch(value);
                        }}
                        placeholder="Search here..."
                        className=" px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div className="flex space-x-3 -mt-10 mr-10 float-end">
                    <button
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-lg flex items-center gap-2"
                        onClick={() => setPopup(true)}
                    >
                        <CiCirclePlus className="text-xl" /> Add New Vehicle
                    </button>
                </div>

                <div className=" bg-white p-6">
                    <table className="w-full border-collapse text-gray-900 ">
                        <thead>
                            <tr className="text-left text-gray-900 font-bold border-b-2 border-gray-200 bg-[#F9FAFB] text-lg">
                                <th className="p-3">No.</th>
                                <th className="p-3">Vehicle Name</th>
                                <th className="p-3">Vehicle No.</th>
                                <th className="p-3">RC No.</th>
                                <th className="p-3"></th>
                                <th className="p-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="text-center p-5">
                                        <OvalSpinner />
                                    </td>
                                </tr>
                            ) : Array.isArray(vehicles) && vehicles.length > 0 ? (
                                vehicles.map((vehicle, index) => (
                                    <tr
                                        key={vehicle._id}
                                        className="border-b border-gray-200 hover:bg-gray-50 bg-white text-lg"
                                    >
                                        <td className="p-3">{(currentPage - 1) * limit + index + 1}</td>
                                        <td className="p-3">{vehicle.vehicleName}</td>
                                        <td className="p-3">{vehicle.vehicleNo}</td>
                                        <td className="p-3">{vehicle.rcNo}</td>
                                        <td
                                            className="p-3 text-blue-800 cursor-pointer"
                                            onClick={() => {
                                                setSelectedVehicle(vehicle);
                                                setPopup("edit");
                                            }}
                                        >
                                            <TbPencilMinus />
                                        </td>
                                        <td className="p-3 text-red-600 cursor-pointer">
                                            <FaTrashAlt onClick={() => deleteVehicle(vehicle._id)} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center p-5">
                                        No vehicles found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-10 text-gray-600 ml-10">
                    <span>Page {currentPage} of {totalPages}</span>
                    <div className="flex space-x-2 pr-10">
                        <button
                            className={`px-4 py-2 text-gray-300 border border-gray-300 rounded-lg ${currentPage === 1 ? "cursor-not-allowed" : ""}`}
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            Previous
                        </button>
                        <button
                            className={`px-4 py-2 border border-gray-300 rounded-lg ${currentPage === totalPages ? "cursor-not-allowed text-[#4079ED]" : ""}`}
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {popup === true && (
                <AddVehicle setPopup={setPopup} fetchVehicles={fetchVehicles} />
            )}

            {popup === "edit" && selectedVehicle && (
                <EditVehicle
                    setPopup={setPopup}
                    fetchVehicles={fetchVehicles}
                    vehicleToEdit={selectedVehicle}
                />
            )}
        </>
    );
}
