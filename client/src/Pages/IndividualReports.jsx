import React, { useState, useEffect } from "react";
import { BsPrinter, BsSearch } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa6";
import { TbPencilMinus } from "react-icons/tb";
import { FaWhatsapp } from "react-icons/fa";
import {
    Combobox,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
} from "@headlessui/react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import OvalSpinner from "../Components/spinners/OvalSpinner";

const IndividualReports = () => {
    const axiosInstance = useAxiosPrivate();

    const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
    const [supplierName, setSupplierName] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalStats, setTotalStats] = useState({});
    const [reportsData, setReportsData] = useState([]);
    console.log("dfhvjgoib", reportsData)
    const [loading, setLoading] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);

    const [searchTerm, setSearchTeam] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const [suppliers, setSuppliers] = useState([]);

    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);

    const limit = 5;
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

    // useEffect(() => {
    //     const fetchSuppliers = async () => {
    //         try {
    //             const res = await axiosInstance.get(`/admin/supplier/list?search=${searchTerm}`);
    //             setSuppliers(res?.data);
    //         } catch (error) {
    //             console.error("Error fetching suppliers:", error);
    //         }
    //     };

    //     fetchSuppliers();
    // }, [searchTerm]);

    useEffect(() => {
        const fetchPurchases = async () => {
            if (selectedSupplier) {
                try {
                    const response = await axiosInstance.get(
                        `admin/purchase/totalStats?startDate=${startDate}&endDate=${endDate}&supplierId=${selectedSupplier?._id}`
                    );
                    console.log("data", response);

                    setTotalStats(response?.data);
                } catch (error) {
                    console.log(error);
                } finally {
                    // setIsLoading(false);
                }
            }
            else {
                setTotalStats([])
            }


        };
        fetchPurchases();
    }, [startDate, endDate, selectedSupplier]);



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
                    supplierId: selectedSupplier?._id,
                    startDate,
                    endDate,
                },
            });
            setReportsData(res.data.purchaseEntries || []);
            setTotalPages(res.data.totalPages || 1);

        } catch (error) {
            console.error("Error fetching report data:", error);
        } finally {
            setLoading(false);
        }
    };
    console.log("totalStats", totalStats);

    const fetchPrintData = async () => {
        if (!selectedSupplier?._id) {
            alert("Please select a supplier before printing.");
            return;
        }

        try {
            const response = await axiosInstance.get(
                `admin/purchase/supplier/report?startDate=${startDate}&endDate=${endDate}&supplierId=${selectedSupplier._id}&noPagination=true`
            );

            openPurchaseRegisterPrintPage(
                response?.data?.purchaseEntries || [],
                totalStats,
                startDate,
                endDate,
                searchTerm,
                selectedSupplier.supplierName
            );
        } catch (error) {
            console.error("Error fetching print data", error);
            console.error("Error details:", error.response?.data || error.message);
        }
    };
    const openPurchaseRegisterPrintPage = (purchaseEntries, totalStats, startDate, endDate, supplierName) => {
        const printWindow = window.open('', '_blank');

        const style = `
            <style>
                body { font-family: sans-serif; padding: 20px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
                th { background-color: #f0f0f0; }
                .header { text-align: center; font-size: 20px; font-weight: bold; margin-bottom: 20px; }
            </style>
        `;

        let html = `
            <html>
            <head>
                <title>Purchase Report</title>
                ${style}
            </head>
            <body>
                <div class="header">
                    <h1>Purchase Report</h1>
                    <p><strong>Supplier:</strong> ${supplierName}</p>
                    <p><strong>Date Range:</strong> ${startDate} to ${endDate}</p>
                 
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Qty (KG)</th>
                            <th>Qty (Box)</th>
                            <th>Commission</th>
                            <th>Gross Total</th>
                            <th>Market Fee</th>
                            <th>Net Total</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        // Loop through purchaseEntries to display the data
        purchaseEntries.forEach(entry => {
            html += `
                <tr>
                    <td>${new Date(entry.dateOfPurchase).toLocaleDateString("en-GB")}</td>
                    <td>${entry.totalKg}</td>
                    <td>${entry.totalBox}</td>
                    <td>${entry.commissionPaid?.toFixed(2)}</td>
                    <td>${entry.grossTotalAmount?.toFixed(2)}</td>
                     <td>${entry.marketFee?.toFixed(2) || "0.00"}</td>
                    <td>${entry.netTotalAmount?.toFixed(2)}</td>
                </tr>
            `;
        });

        html += `
            </tbody>
        </table>
    
        <div>
            <strong>Total Net Amount:</strong> ${totalStats?.netTotalAmount?.toFixed(2) || "0.00"}<br>
            <strong>Total Commission:</strong> ${totalStats?.totalCommission?.toFixed(2) || "0.00"}<br>
            <strong>Total Qty (KG):</strong> ${totalStats?.totalKg || 0}<br>
            <strong>Total Qty (Box):</strong> ${totalStats?.totalBox || 0}<br>
            <strong>Total Gross Amount:</strong> ${totalStats?.grossTotalAmount?.toFixed(2) || "0.00"}<br>
                   <strong>Total Expense:</strong> ${totalStats?.totalMarketFee?.toFixed(2) || "0.00"}<br>
        </div>
    
        <script>
            window.onload = function() {
                window.print();
                setTimeout(() => window.close(), 1000);
            };
        </script>
    
        </body>
        </html>
        `;

        printWindow.document.write(html);
        printWindow.document.close();
    };






    const handleSingleEntryPrint = (entry, supplierName, startDate, endDate) => {
        const printWindow = window.open("", "_blank");
        const style = `
          <style>
            body { font-family: sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f0f0f0; }
          </style>
        `;

        const html = `
          <html>
            <head>
              <title>Purchase Entry</title>
              ${style}
            </head>
            <body>
              <h2>Individual Purchase Entry</h2>
              <p><strong>Supplier:</strong> ${supplierName}</p>
              <p><strong>Date Range:</strong> ${startDate} to ${endDate}</p>
              <hr />
              <table>
                <tr>
                  <th>Date</th>
                  <th>Qty (KG)</th>
                  <th>Qty (Box)</th>
                  <th>Commission</th>
                  <th>Gross Total</th>
                  <th>Market Fee</th> 

                  <th>Net Total</th>
                </tr>
                <tr>
                  <td>${new Date(entry.dateOfPurchase).toLocaleDateString("en-GB")}</td>
                  <td>${entry.totalKg}</td>
                  <td>${entry.totalBox}</td>
                  <td>${entry.commissionPaid?.toFixed(2)}</td>
                  <td>${entry.grossTotalAmount?.toFixed(2)}</td>
                  <td>${entry.marketFee?.toFixed(2) || "0.00"}</td> 

                  <td>${entry.netTotalAmount?.toFixed(2)}</td>
                </tr>
              </table>
      
              <script>
                window.onload = function() {
                  window.print();
                  setTimeout(() => window.close(), 1000);
                };
              </script>
            </body>
          </html>
        `;

        printWindow.document.write(html);
        printWindow.document.close();
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

                <button
                    onClick={fetchPrintData}
                    className="absolute top-[66px] right-10 px-8 py-4 bg-gray-50 rounded-xl inline-flex items-center gap-3 cursor-pointer">
                    <BsPrinter className="w-8 h-8 text-indigo-950" />
                    <div className="text-indigo-950 text-xl font-bold">Print</div>
                </button>

                {/* Filters */}
                <div className="left-[41px] top-[178px] absolute inline-flex justify-between items-center gap-8">
                    <Combobox value={selectedSupplier} onChange={(value) => {
                        setSearchTeam(value.supplierName);
                        setSelectedSupplier(value);
                        setCurrentPage(1); // Reset page
                    }}>
                        <div className="relative h-14 pl-2 pr-4 bg-gray-50 rounded-2xl flex items-center gap-2">
                            <BsSearch className="w-5 h-6 text-gray-500" />
                            <ComboboxInput
                                displayValue={(supplier) => supplier?.supplierName || searchTerm}
                                onChange={(e) => {
                                    setSearchTeam(e.target.value);
                                    setSelectedSupplier(null);
                                }}
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
                        <tr className="p[-2 py-3 bg-gray-50 border-b border-gray-200 inline-flex justify-start items-center gap-12 w-full">
                            <th className="min-w-4 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide p-1">
                                No.
                            </th>
                            <th className="min-w-32 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">
                                Date
                            </th>

                            <th className="min-w-20 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">
                                Qty (KG)
                            </th>
                            <th className="min-w-20 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">
                                Qty (Box)
                            </th>
                            <th className="min-w-24 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide ">
                                Commision
                            </th>
                            <th className="min-w-32 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">
                                Gross
                            </th>
                            <th className="min-w-32 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide ">
                                Expenses {/* New Column */}
                            </th>
                            <th className="min-w-32 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">
                                Total
                            </th>
                            <th className="min-w-24"></th>
                            <th className="min-w-24"></th>

                        </tr>
                    </thead>
                    <tbody className="">
                        {loading ? (
                            <tr>
                                <td colSpan="9" className="fixed inset-0 flex items-center justify-center bg-white/50 z-50">
                                    <OvalSpinner />
                              
                                </td>
                            </tr>
                        ) : reportsData.length === 0 ? (
                            <tr>
                                <td colSpan="9" className="py-10">
 
    <span className="text-gray-500 text-xl font-bold pl-98">
      No more reports available for the selected date range.
    </span>
  
</td>

                            </tr>
                        ) : (

                            reportsData.map((entry, index) => (
                                <tr key={entry._id} className="self-stretch bg-white border-b border-gray-200 inline-flex justify-start items-center gap-12 px-10 py-2">
                                    <td className="min-w-4 text-slate-900 text-xl">{index + 1}</td>
                                    <td className="min-w-32 text-slate-900 text-xl">
                                        {new Date(entry.dateOfPurchase).toLocaleDateString("en-GB")}
                                    </td>


                                    <td className="min-w-20 text-slate-900 text-xl">{entry.totalKg
                                    }</td>
                                    <td className="min-w-20 text-slate-900 text-xl">{entry.totalBox}</td>
                                    <td className="min-w-24 text-slate-900 text-xl ">
                                        {entry.commissionPaid?.toFixed(2)}
                                    </td>

                                    <td className="min-w-32 text-slate-900 text-xl">{entry.grossTotalAmount?.toFixed(2)}</td>
                                    <td className="min-w-32 text-slate-900 text-xl ">
                                        {entry.marketFee?.toFixed(2) || "0.00"} {/* Render Market Fee */}
                                    </td>
                                    <td className="min-w-32 text-slate-900 text-xl ">{entry.netTotalAmount?.toFixed(2)}</td>

                                    <td
                                        className="w-5 relative cursor-pointer"
                                        onClick={() => handleSingleEntryPrint(entry, selectedSupplier?.supplierName, startDate, endDate)}
                                    >
                                        <BsPrinter />
                                    </td>

                                    <td className="w-5  relative cursor-pointer"><TbPencilMinus /></td>
                                    <td className="w-5 relative cursor-pointer">   <FaWhatsapp /></td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/*pagination */}
                <div className="px-12 py-6 left-0 top-[623px] absolute inline-flex justify-between items-center w-full">
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
                <hr className="absolute left-0 w-full border-t border-gray-300 top-[720px]" />


                {/* Stats Section */}
                <div className="w-full px-12 py-4 left-0 top-[822px] absolute bg-teal-50 border-b border-gray-200 inline-flex justify-start items-center gap-16">
                    <div className="min-w-32 text-slate-500/40 text-xl">Total</div>
                    <div className="min-w-32 text-slate-900 text-xl font-bold">
                        {totalStats?.netTotalAmount?.toFixed(2) || "0.00"}
                    </div>

                </div>

                <div className=" py-2 left-0 top-[750px] absolute bg-white border-b border-gray-200 inline-flex justify-between items-center gap-28 p-4">
                    <div className="flex items-center gap-6">
                        <span className="text-slate-500/40 text-xl">Commission</span>
                        <span className="text-slate-900 text-xl font-bold">
                            {totalStats?.totalCommission?.toFixed(2) || "0.00"}
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


            </div>
        </div>
    );
};

export default IndividualReports;
