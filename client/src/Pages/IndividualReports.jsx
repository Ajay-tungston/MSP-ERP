import React, { useState, useEffect } from "react";
import { BsPrinter, BsSearch } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa6";
import { TbPencilMinus } from "react-icons/tb";
import {
    Combobox,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
} from "@headlessui/react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const IndividualReports = () => {
    const axiosInstance = useAxiosPrivate();

    const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalStats, setTotalStats] = useState({});
    const [reportsData, setReportsData] = useState([]);
    const [loading, setLoading] = useState(false);
console.log(reportsData);

    const [searchTerm, setSearchTeam] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const [suppliers, setSuppliers] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState("");
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);

    const limit = 1;
    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const res = await axiosInstance.get(`/admin/supplier/list?search=${searchTerm}`);
                setSuggestions(res.data);
            } catch (error) {
                console.error("Error fetching suppliers:", error);
            }
        };

        if (searchTerm) {
            fetchSuppliers();
        } else {
            setSuggestions([]);
        }
    }, [searchTerm]);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const res = await axiosInstance.get(`/admin/supplier/list?search=${searchTerm}`);
                setSuppliers(res?.data);
            } catch (error) {
                console.error("Error fetching suppliers:", error);
            }
        };

        fetchSuppliers();
    }, [searchTerm]);

    useEffect(() => {
        if (selectedSupplier && startDate && endDate) {
            fetchReportsData();
        }
    }, [selectedSupplier, startDate, endDate, currentPage]);

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const fetchReportsData = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get("/admin/purchase/supplier/report", {
                params: {
                    page: currentPage,
                    limit,
                    supplierId: selectedSupplier,
                    startDate,
                    endDate,
                },
            });
            setReportsData(res.data.purchaseEntries || []);
            setTotalPages(res.data.totalPages || 1);
            setTotalStats(res.data.summary || {});
        } catch (error) {
            console.error("Error fetching report data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full px-4 md:px-8 lg:px-12">
            <div className="h-screen relative bg-white rounded-3xl overflow-hidden mt-10">
                <div className="left-[48px] top-[48px] absolute inline-flex justify-start items-center gap-3">
                    <div className="flex items-center justify-start text-slate-500 text-xl font-normal">
                        Reports <FaChevronRight className="mx-2" /> Individual Purchase Report
                    </div>
                </div>

                <div className="left-[48px] top-[80px] absolute justify-start text-indigo-950 text-4xl font-bold leading-[50.40px]">
                    Individual Purchase Report
                </div>

                <div className="absolute top-[66px] right-10 px-8 py-4 bg-gray-50 rounded-xl inline-flex items-center gap-3">
                    <BsPrinter className="w-8 h-8 text-indigo-950" />
                    <div className="text-indigo-950 text-xl font-bold">Print</div>
                </div>

                {/* Filters */}
                <div className="left-[41px] top-[178px] absolute inline-flex justify-between items-center gap-8">
                    <Combobox value={searchTerm} onChange={(value) => {
                        setSearchTeam(value.name);
                        setSelectedSupplier(value._id);
                        setCurrentPage(1); // Reset page
                    }}>
                        <div className="relative h-14 pl-2 pr-4 bg-gray-50 rounded-2xl flex items-center gap-2">
                            <BsSearch className="w-5 h-6 text-gray-500" />
                            <ComboboxInput
                                displayValue={(supplier) => supplier}
                                onChange={(e) => setSearchTeam(e.target.value)}
                                onFocus={() => setShowDropdown(true)}
                                onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
                                placeholder="Search here..."
                                className="bg-transparent text-slate-500 text-xl outline-none w-full"
                            />
                            {showDropdown && suggestions.length > 0 && (
                                <ComboboxOptions className="absolute top-full left-0 w-full bg-white rounded-b-2xl shadow-md z-10 max-h-60 overflow-y-auto">
                                    {suggestions.map((supplier) => (
                                        <ComboboxOption
                                            key={supplier._id}
                                            value={supplier}
                                            className={({ active }) =>
                                                `px-4 py-2 cursor-pointer text-slate-600 text-base ${active ? "bg-gray-100" : ""}`
                                            }
                                        >
                                            {supplier.supplierName}
                                        </ComboboxOption>
                                    ))}
                                </ComboboxOptions>
                            )}
                        </div>
                    </Combobox>

                    <div className="text-slate-500/40 text-xl">From</div>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => {
                            setStartDate(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-64 px-6 py-4 bg-gray-50 rounded-xl text-zinc-700 text-xl outline-none"
                    />

                    <div className="text-slate-500/40 text-xl">To</div>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => {
                            setEndDate(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-64 px-6 py-4 bg-gray-50 rounded-xl text-zinc-700 text-xl outline-none"
                    />
                </div>

                {/* Table */}
                <table className="w-fit left-0 top-[288px] absolute inline-flex flex-col justify-start items-start">
                    <thead className="self-stretch bg-gray-50 border-b border-gray-200">
                    <tr className="px-4 py-3 bg-gray-50 border-b border-gray-200 inline-flex justify-start items-center gap-16 w-full">
              <th className="min-w-16 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">
                No.
              </th>
              <th className="min-w-32 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">
                Date
              </th>
            
              <th className="min-w-24 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">
                Qty (KG)
              </th>
              <th className="min-w-24 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">
                Qty (Box)
              </th>
              <th className="min-w-24 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">
                Commision
              </th>
              <th className="min-w-32 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">
                Gross
              </th>
              <th className="min-w-32 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide pr-10">
                Total
              </th>
            </tr>
                    </thead>
                    <tbody>
                        {reportsData.map((entry, index) => (
                            <tr key={entry._id} className="self-stretch bg-white border-b border-gray-200 inline-flex justify-start items-center gap-18 px-8 py-2">
                                <td className="min-w-16 text-slate-900 text-xl">{index + 1}</td>
                                <td className="min-w-32 text-slate-900 text-xl">
                                    {new Date(entry.dateOfPurchase).toLocaleDateString("en-GB")}
                                </td>

                            
                                <td className="min-w-24 text-slate-900 text-xl">{entry.totalKg
                                }</td>
                                <td className="min-w-23 text-slate-900 text-xl">{entry.totalBox}</td>
                                <td className="min-w-24 text-slate-900 text-xl ">
  {entry.commissionPaid?.toFixed(2)}
</td>

                                <td className="min-w-24 text-slate-900 text-xl">{entry.grossTotalAmount?.toFixed(2)}</td>
                                <td className="min-w-24 text-slate-900 text-xl">{entry.netTotalAmount?.toFixed(2)}</td>
                                <td className="w-8 h-8 relative"><BsPrinter /></td>
                                <td className="w-8 h-8 relative"><TbPencilMinus /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Stats Section */}
                <div className="w-[1491px] px-12 py-4 left-0 top-[722px] absolute bg-teal-50 border-b border-gray-200 inline-flex justify-start items-center gap-16">
                    <div className="min-w-32 text-slate-500/40 text-xl">Total</div>
                    <div className="min-w-32 text-slate-900 text-xl font-bold">
                        {totalStats?.netTotalAmount?.toFixed(2) || "0.00"}
                    </div>
                </div>

                <div className="px-18 py-2 left-0 top-[650px] absolute bg-white border-b border-gray-200 inline-flex justify-between items-center gap-40">
                    <div className="flex items-center gap-6">
                        <span className="text-slate-500/40 text-xl">Commission</span>
                        <span className="text-slate-900 text-xl font-bold">
                            {totalStats?.commissionPaid?.toFixed(2) || "0.00"}
                        </span>
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="text-slate-500/40 text-xl">Qty(kg)</span>
                        <span className="text-slate-900 text-xl font-bold">{totalStats?.totalKg || 0}</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="text-slate-500/40 text-xl">Qty(Box)</span>
                        <span className="text-slate-900 text-xl font-bold">{totalStats?.totalBox || 0}</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="text-slate-500/40 text-xl">Expenses</span>
                        <span className="text-slate-900 text-xl font-bold">
                            {totalStats?.totalMarketFee?.toFixed(2) || "0.00"}
                        </span>
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="text-slate-500/40 text-xl">Gross Total</span>
                        <span className="text-slate-900 text-xl font-bold">
                            {totalStats?.grossTotalAmount?.toFixed(2) || "0.00"}
                        </span>
                    </div>
                </div>

                {/* Pagination */}
                <div className="px-12 py-6 left-0 top-[823px] absolute inline-flex justify-between items-center w-full">
                    <div className="text-slate-900 text-xl">
                        Page {currentPage} of {totalPages}
                    </div>
                    <div className="flex gap-6">
                        <div
                            onClick={goToPreviousPage}
                            className={`w-40 px-6 py-4 bg-white rounded-2xl  outline-1 outline-gray-300/30 flex justify-center items-center gap-3 cursor-pointer ${currentPage === 1 ? 'pointer-events-none opacity-30' : ''}`}
                        >
                            <span className="text-gray-400 text-xl font-bold">Previous</span>
                        </div>
                        <div
                            onClick={goToNextPage}
                            className={`w-40 px-6 py-4 bg-white rounded-2xl  outline-1 outline-gray-300/30 flex justify-center items-center gap-3 cursor-pointer ${currentPage === totalPages ? 'pointer-events-none opacity-30' : ''}`}
                        >
                            <span className="text-blue-500 text-xl font-bold">Next</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndividualReports;
