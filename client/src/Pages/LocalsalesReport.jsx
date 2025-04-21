import React, { useState } from 'react';
import { RiPrinterLine } from "react-icons/ri";

function LocalsalesReport() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const data = [
        { no: '001', date: '01/12/2024', supplier: 'Farm Fresh', customer: 'GreenMart', qty: '100', total: '$510.00' },
        { no: '002', date: '01/12/2024', supplier: 'Green Supply', customer: 'LocalMart', qty: '150', total: '$800.00' },
        { no: '003', date: '02/12/2024', supplier: 'EcoGrocer', customer: 'NatureFoods', qty: '200', total: '$1,200.00' },
        { no: '004', date: '03/12/2024', supplier: 'AgroPlus', customer: 'MarketWay', qty: '80', total: '$400.00' },
        { no: '005', date: '03/12/2024', supplier: 'GrowWell', customer: 'EcoMart', qty: '120', total: '$600.00' },
        { no: '006', date: '04/12/2024', supplier: 'Organic Roots', customer: 'Farmers Co.', qty: '90', total: '$450.00' },
        { no: '007', date: '04/12/2024', supplier: 'Harvest Point', customer: 'Fresh Basket', qty: '300', total: '$1,800.00' },
        { no: '008', date: '05/12/2024', supplier: 'Daily Harvest', customer: 'Urban Store', qty: '50', total: '$250.00' },
        { no: '009', date: '06/12/2024', supplier: 'FreshCo', customer: 'Green Basket', qty: '70', total: '$350.00' },
    ];

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const [selectedRows, setSelectedRows] = useState([]);
    const isAllSelected = paginatedData.length > 0 && paginatedData.every(item => selectedRows.includes(item.no));

    const handleSelectAll = () => {
        if (isAllSelected) {
            setSelectedRows([]);
        } else {
            setSelectedRows(paginatedData.map(item => item.no));
        }
    };

    const toggleCheckbox = (no) => {
        setSelectedRows((prev) =>
            prev.includes(no) ? prev.filter(id => id !== no) : [...prev, no]
        );
    };

    return (
        <div className=" bg-gray-50 outline-1 outline-offset-[-1px] outline-white overflow-hidden mt-10">
            <div className="w-[1511px] h-[1095px] fixed bg-white rounded-3xl overflow-hidden">

                {/* Table */}
                <table className="w-[1511px] absolute left-0 top-[200px]">
                    <thead>
                        <tr className="px-12 py-4 bg-gray-50 border-b border-gray-200 inline-flex justify-start items-center gap-16">
                            <th className="w-8 h-8 relative">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 absolute left-[7px] top-[7px] accent-blue-500"
                                    checked={isAllSelected}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th className="min-w-16 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">No.</th>
                            <th className="min-w-32 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Date</th>
                            <th className="min-w-32 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Supplier</th>
                            <th className="min-w-32 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Customer</th>
                            <th className="min-w-32 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Qty</th>
                            <th className="min-w-32 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((item) => (
                            <tr key={item.no} className="px-12 py-4 bg-white border-b border-gray-200 inline-flex justify-start items-center gap-16">
                                <td className="w-8 h-8 relative">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 absolute left-[7px] top-[7px] accent-blue-500"
                                        checked={selectedRows.includes(item.no)}
                                        onChange={() => toggleCheckbox(item.no)}
                                    />
                                </td>
                                <td className="min-w-16 text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">{item.no}</td>
                                <td className="min-w-32 text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">{item.date}</td>
                                <td className="min-w-32 text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">{item.supplier}</td>
                                <td className="min-w-32 text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">{item.customer}</td>
                                <td className="min-w-32 text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">{item.qty}</td>
                                <td className="min-w-32 text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">{item.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Grand Total */}
                <div className="w-[1511px] px-12 py-5 left-0 top-[735px] absolute bg-teal-50 border-b border-gray-200 inline-flex justify-start items-center gap-16">
                    <div className="w-[960px] min-w-32 justify-center text-slate-500/40 text-xl font-normal font-['Urbanist'] tracking-wide">Grand Total</div>
                    <div className="min-w-32 justify-center text-slate-900 text-xl font-bold font-['Urbanist'] tracking-wide">$1,310.00</div>
                </div>

                {/* Pagination */}
                <div className="w-[1511px] px-12 py-2 left-0 top-[660px] absolute border-b border-gray-200 inline-flex justify-between items-center">
                    <div className="flex justify-start items-center gap-4">
                        <div className="text-center justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">
                            Page {currentPage} of {totalPages}
                        </div>
                    </div>
                    <div className="flex justify-end items-center gap-6">
                        <button
                            className="w-40 px-6 py-4 bg-white rounded-2xl outline-1 outline-offset-[-1px] outline-gray-300/30 flex justify-center items-center gap-3"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            <div className={`justify-start text-xl font-bold font-['Urbanist'] ${currentPage === 1 ? 'text-gray-300/30' : 'text-blue-500'}`}>
                                Previous
                            </div>
                        </button>
                        <button
                            className="w-40 px-6 py-4 bg-white rounded-2xl outline-1 outline-offset-[-1px] outline-gray-300/30 flex justify-center items-center gap-3"
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            <div className={`justify-start text-xl font-bold font-['Urbanist'] ${currentPage === totalPages ? 'text-gray-300/30' : 'text-blue-500'}`}>
                                Next
                            </div>
                        </button>
                    </div>
                </div>

                {/* Header */}
                <div className="left-[48px] top-[38px] absolute inline-flex justify-start items-center gap-3">
                    <div className="justify-start text-slate-500 text-xl font-normal font-['Urbanist']">Reports Local Sales Report</div>
                </div>
                <div className="left-[48px] top-[60px] absolute justify-start text-indigo-950 text-4xl font-bold font-['Urbanist'] leading-[50.40px]">
                    Local Sales Report
                </div>

                {/* Date Filters */}
                <div className="left-[697px] top-[120px] absolute inline-flex justify-start items-center gap-12">
                    <div className="justify-start text-slate-500/40 text-xl font-normal font-['Urbanist']">Date Range</div>
                    <div className="w-64 px-6 py-4 bg-gray-50 rounded-tl-xl rounded-tr-xl flex justify-between items-center">
                        <input type="date" className="bg-gray-50 text-zinc-700 text-xl font-normal font-['Urbanist'] w-full outline-none" />
                    </div>
                    <div className="justify-start text-slate-500/40 text-xl font-normal font-['Urbanist']">to</div>
                    <div className="w-64 px-6 py-4 bg-gray-50 rounded-tl-xl rounded-tr-xl flex justify-between items-center">
                        <input type="date" className="bg-gray-50 text-zinc-700 text-xl font-normal font-['Urbanist'] w-full outline-none" />
                    </div>
                </div>

                {/* Print Icon */}
                <button className="px-8 py-4 left-[1313px] top-[36px] absolute bg-gray-50 rounded-xl inline-flex justify-start items-center gap-3">
    <div className="w-8 h-8 relative">
        {/* Printer Icon */}
        <RiPrinterLine className="w-8 h-8 left-0 top-0 absolute opacity-100 text-zinc-800" />
    </div>
    <div className="w-10 justify-start text-indigo-950 text-xl font-bold font-['Urbanist']">Print</div>
</button> 
            </div>
        </div>
    );
}

export default LocalsalesReport;
