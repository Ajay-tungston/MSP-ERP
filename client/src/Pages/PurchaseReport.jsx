//  
import React from 'react'
import { useState } from 'react';
import { BsPrinter } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa6";
import { FaCheckSquare, FaRegSquare } from 'react-icons/fa';


function PurchaseReport() {
    const [activeButton, setActiveButton] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const rows = [...Array(8).keys()];

    // Select all toggle
    const toggleAllRows = () => {
        if (selectedRows.length === rows.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(rows);
        }
    };

    // Select individual row
    const toggleRowSelection = (i) => {
        setSelectedRows((prev) =>
            prev.includes(i) ? prev.filter((row) => row !== i) : [...prev, i]
        );
    };

    const handlePreviousClick = () => setActiveButton('previous');
    const handleNextClick = () => setActiveButton('next');
    return (
        <div className="h-full overflow-hidden ">
            <div className=" h-auto bg-gray-50  outline-1 outline-offset-[-1px] outline-white mt-10 overflow-hidden">
            </div>
            <div className="w-[1495px] h-fit mb-0 left-[359px]  absolute bg-black rounded-3xl ">
                <table className="w-[1491px] left-0 top-[108px] absolute inline-table">
                    <thead>
                        <tr className="px-12 py-3 bg-gray-50 border-b border-gray-200 inline-flex justify-start items-center gap-16 w-full">
                            <th className="w-8">
                                <button onClick={toggleAllRows}>
                                    {selectedRows.length === rows.length ? (
                                        <FaCheckSquare className="text-blue-600 mr-10" />
                                    ) : (
                                        <FaRegSquare className="text-blue-600 mr-10" />
                                    )}
                                </button>
                            </th>
                            <th className="min-w-16 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">No.</th>
                            <th className="min-w-32 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Date</th>
                            <th className="min-w-36 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Supplier</th>
                            <th className="min-w-24 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Qty (KG)</th>
                            <th className="min-w-24 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Qty (Box)</th>
                            <th className="min-w-24 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Total (KG)</th>
                            <th className="min-w-32 text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((i) => (
                            <tr key={i} className="px-12 py-2 bg-white border-b border-gray-200 inline-flex justify-start items-center gap-16 w-full">
                                <td className="w-8">
                                    <button onClick={() => toggleRowSelection(i)}>
                                        {selectedRows.includes(i) ? (
                                            <FaCheckSquare className="text-blue-600" />
                                        ) : (
                                            <FaRegSquare className="text-blue-600" />
                                        )}
                                    </button>
                                </td>
                                <td className="min-w-16 text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">{i === 0 ? '001' : '002'}</td>
                                <td className="min-w-32 text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">01/12/2024</td>
                                <td className="max-w-80 min-w-36 text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">{i === 0 ? 'Farm Fresh' : 'Green Supply'}</td>
                                <td className="min-w-24 text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">{i === 0 ? '10' : '-'}</td>
                                <td className="min-w-24 text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">2</td>
                                <td className="min-w-24 text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">{i === 0 ? '10' : '70'}</td>
                                <td className="min-w-32 text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">{i === 0 ? '$1,250.00' : '$2,400.00'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

               <div className="w-[1491px] px-12 py-4 left-0 top-[722px] absolute bg-teal-50 border-b border-gray-200 inline-flex justify-start items-center gap-16">
                    <div className="w-[1104px] min-w-32 justify-center text-slate-500/40 text-xl font-normal font-['Urbanist'] tracking-wide">Total</div>
                    <div className="min-w-32 justify-center text-slate-900 text-xl font-bold font-['Urbanist'] tracking-wide">$3,750.00 </div>
                              </div>
                     <div className="w-[1495px] px-12 py-2 left-0 top-[650px] absolute bg-white border-b border-gray-200 inline-flex justify-between items-center">
                    <div className="flex justify-start items-center gap-32">
                        <div className="justify-center text-slate-500/40 text-xl font-normal font-['Urbanist'] tracking-wide">Commission</div>
                        <div className="justify-center text-slate-900 text-xl font-bold font-['Urbanist'] tracking-wide">$200.00 </div>
                    </div>
                    <div className="flex justify-start items-center gap-32">
                        <div className="justify-center text-slate-500/40 text-xl font-normal font-['Urbanist'] tracking-wide">Coolie</div>
                        <div className="justify-center text-slate-900 text-xl font-bold font-['Urbanist'] tracking-wide">$100.00 </div>
                      </div>
                      <div className="flex justify-start items-center gap-32">
                        <div className="justify-center text-slate-500/40 text-xl font-normal font-['Urbanist'] tracking-wide">Expenses</div>
                        <div className="justify-center text-slate-900 text-xl font-bold font-['Urbanist'] tracking-wide">$50.00 </div>
                     </div>
                          </div>
                      <div className="w-[1495px] px-12 py-3 left-0 top-[546px] absolute border-b border-gray-200 inline-flex justify-between items-center">
                     <div className="flex justify-start items-center gap-4">
                        <div className="text-center justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">Page 1 of 10</div>
                      </div>
                     <div className="flex justify-end items-center gap-6">
                        <button
                            className={`w-40 px-6 py-4 bg-white rounded-2xl outline-1 outline-offset-[-1px] outline-gray-300/30 
                               flex justify-center items-center gap-3
                            ${activeButton === 'previous' ? 'text-blue-500' : 'text-gray-300'}  // Set color based on active state
                          hover:text-blue-500 active:bg-blue-100 transition-all duration-200`}
                            onClick={handlePreviousClick}
                        >
                            <span className="text-xl font-bold font-['Urbanist']">
                                Previous
                            </span>
                        </button>

                        {/* Next Button */}
                        <button
                            className={`w-40 px-6 py-4 bg-white rounded-2xl outline-1 outline-offset-[-1px] outline-gray-300/30 
                              flex justify-center items-center gap-3
                        ${activeButton === 'next' ? 'text-blue-500' : 'text-gray-300'}  // Set color based on active state
                              hover:text-blue-500 active:bg-blue-100 transition-all duration-200`}
                            onClick={handleNextClick}
                        >
                            <span className="text-xl font-bold font-['Urbanist']">
                                Next
                            </span>
                        </button>
                    </div>
                </div>


                <div className="bg-white h-[100px] rounded-tl-2xl rounded-tr-2xl">
                    <div className="left-[48px] top-[8px] absolute inline-flex justify-start items-center gap-3 ">
                        <div className="flex items-center text-slate-500 text-xl font-normal font-['Urbanist']">
                            <span>Reports</span>
                            <span className="mx-2">
                                <FaChevronRight />
                            </span>
                            <span>Purchase Report</span>
                        </div>

                    </div>
                    <div className="left-[48px] top-[40px] absolute justify-start text-indigo-950 text-4xl font-bold font-['Urbanist'] leading-[50.40px]">Purchase Report</div>
                    <div className="left-[541px] top-[3px] absolute inline-flex justify-start items-center gap-1.5">
                        <div className="flex justify-start items-center gap-12">
                            <div className="justify-start text-slate-500/40 text-xl font-normal font-['Urbanist']">Date Range</div>
                            <div className="w-64 px-6 py-4 bg-gray-50 rounded-tl-xl rounded-tr-xl flex justify-between items-center">
                                <input
                                    type="date"
                                    className="bg-gray-50 text-zinc-700 text-xl font-normal font-['Urbanist'] w-full outline-none"
                                />
                            </div>

                            <div className="justify-start text-slate-500/40 text-xl font-normal font-['Urbanist']">to</div>
                            <div className="w-64 px-6 py-4 bg-gray-50 rounded-tl-xl rounded-tr-xl flex justify-between items-center">
                                <input
                                    type="date"
                                    className="bg-gray-50 text-zinc-700 text-xl font-normal font-['Urbanist'] w-full placeholder-zinc-300 outline-none"
                                    placeholder="DD/MM/YYYY"
                                />
                            </div>
                        </div>
                        <button className="px-8 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-3 cursor-pointer">
                            <div className="w-8 h-8 flex items-center justify-center text-xl">
                                <BsPrinter />
                            </div>
                            <div className="w-10 justify-start text-indigo-950 text-xl font-bold font-['Urbanist']">
                                Print
                            </div>
                        </button>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default PurchaseReport
