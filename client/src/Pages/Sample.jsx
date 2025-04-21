import React, { useState } from 'react';
import { BsPrinter } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa6";

function PurchaseReport() {
    const [activeButton, setActiveButton] = useState(null);
    const [checkedItems, setCheckedItems] = useState(Array(8).fill(false));

    const handlePreviousClick = () => {
        setActiveButton('previous');
    };

    const handleNextClick = () => {
        setActiveButton('next');
    };

    const checkFirstCheckbox = () => {
        const updated = [...checkedItems];
        updated[0] = true;
        setCheckedItems(updated);
    };

    const checkAllCheckboxes = () => {
        setCheckedItems(Array(8).fill(true));
    };

    return (
        <div className="h-full overflow-hidden">
            <div className="h-auto bg-gray-50 mt-10 overflow-hidden"></div>

            <div className="w-[1495px] h-fit mb-0 left-[359px] absolute bg-black rounded-3xl">

                {/* Buttons to check checkboxes */}
                <div className="px-12 py-4 bg-white flex gap-4">
                    <button onClick={checkFirstCheckbox} className="px-4 py-2 bg-blue-600 text-white rounded">
                        Check First Checkbox
                    </button>
                    <button onClick={checkAllCheckboxes} className="px-4 py-2 bg-green-600 text-white rounded">
                        Check All
                    </button>
                </div>

                <table className="w-[1491px] left-0 top-[108px] absolute inline-table">
                    <thead>
                        <tr className="px-12 py-3 bg-gray-50 border-b border-gray-200 inline-flex justify-start items-center gap-16 w-full">
                            <th className="w-4 h-6 relative"></th>
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
                        {[...Array(8)].map((_, i) => (
                            <tr key={i} className="px-12 py-2 bg-white border-b border-gray-200 inline-flex justify-start items-center gap-16 w-full">
                                <td className="w-8 h-8 relative">
                                    <input
                                        type="checkbox"
                                        checked={checkedItems[i]}
                                        onChange={() => {
                                            const updated = [...checkedItems];
                                            updated[i] = !updated[i];
                                            setCheckedItems(updated);
                                        }}
                                        className="peer absolute left-[2.66px] top-[2.67px] w-7 h-7 appearance-none border border-gray-300 rounded-md bg-white checked:bg-blue-500 cursor-pointer"
                                    />
                                    <span className="pointer-events-none peer-checked:block hidden absolute left-[5.5px] top-[1px] text-white text-xl font-bold select-none">
                                        ✔
                                    </span>
                                </td>

                                <td className="min-w-16 text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">
                                    {i === 0 ? '001' : '002'}
                                </td>
                                <td className="min-w-32 text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">01/12/2024</td>
                                <td className="max-w-80 min-w-36 text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">
                                    {i === 0 ? 'Farm Fresh' : 'Green Supply'}
                                </td>
                                <td className="min-w-24 text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">
                                    {i === 0 ? '10' : '-'}
                                </td>
                                <td className="min-w-24 text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">2</td>
                                <td className="min-w-24 text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">
                                    {i === 0 ? '10' : '70'}
                                </td>
                                <td className="min-w-32 text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">
                                    {i === 0 ? '$1,250.00' : '$2,400.00'}
                                </td>
                                <td className="w-6 h-6 relative"></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Totals, navigation, header, and other layout code... */}
                {/* (Same as what you had before) */}

            </div>
        </div>
    );
}

export default PurchaseReport;
