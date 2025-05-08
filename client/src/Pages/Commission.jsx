import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate
import { CiCirclePlus, CiFilter } from 'react-icons/ci';
import { GoTrash } from 'react-icons/go';
import { FaCheckSquare, FaRegSquare } from 'react-icons/fa';

export default function Commission() {
    const navigate = useNavigate(); // ✅ Use the hook to get navigate function
    const [selectedRows, setSelectedRows] = useState([]);

    const commissions = [
        { id: 'COM001', type: 'Fixed', percentage: '5.0%', marketFee: '$0.50', logistics: '$0.50', avgKg: 10 },
        { id: 'COM002', type: 'Variable', percentage: '2.5%', marketFee: '$1.00', logistics: '$0.60', avgKg: 12 },
        { id: 'COM003', type: 'Fixed', percentage: '3.0%', marketFee: '$0.75', logistics: '$0.55', avgKg: 15 },
        { id: 'COM004', type: 'Variable', percentage: '2.5%', marketFee: '$1.00', logistics: '$0.60', avgKg: 12 },
        { id: 'COM005', type: 'Variable', percentage: '2.5%', marketFee: '$1.00', logistics: '$0.60', avgKg: 12 },
        { id: 'COM006', type: 'Variable', percentage: '2.5%', marketFee: '$1.00', logistics: '$0.60', avgKg: 12 },
        { id: 'COM007', type: 'Variable', percentage: '2.5%', marketFee: '$1.00', logistics: '$0.60', avgKg: 12 },
        { id: 'COM008', type: 'Variable', percentage: '2.5%', marketFee: '$1.00', logistics: '$0.60', avgKg: 12 },
    ];

    const toggleRowSelection = (id) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        );
    };

    const toggleAllRows = () => {
        if (selectedRows.length === commissions.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(commissions.map((item) => item.id));
        }
    };

    return (
        <div className="p-4 rounded-lg shadow-sm bg-white mt-5">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500 mb-2 mt-10">
                <span>Master</span> <span className="mx-1">›</span> <span className="text-gray-700">Commission</span>
            </nav>

            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Commission</h1>
                <div className="flex space-x-3 -mt-10 mr-10">
              
                    <button
                        onClick={() => navigate('/add-commission')}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-lg flex items-center gap-2"
                    >
                        <CiCirclePlus className="text-xl" /> Add New Commission
                    </button>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 float-right mt-5 mr-10">
                <button className="border border-red-500 text-red-500 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-100">
                    <GoTrash className="text-lg" /> Delete
                </button>
                <button className="border border-gray-300 text-[#4079ED] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100">
                    <CiFilter className="text-lg" /> Filter
                </button>
            </div>

            {/* Table */}
            <div className="mt-20 bg-white">
                <table className="w-full border-collapse text-gray-900">
                    <thead>
                        <tr className="text-left text-gray-900 font-bold border-b-2 border-gray-200 bg-[#F9FAFB]">
                            <th className="p-3">
                                <button onClick={toggleAllRows} className="text-blue-600">
                                    {selectedRows.length === commissions.length ? (
                                        <FaCheckSquare size={20} />
                                    ) : (
                                        <FaRegSquare size={20} />
                                    )}
                                </button>
                            </th>
                            <th className="p-3">Comm. Code</th>
                            <th className="p-3">Comm. Type</th>
                            <th className="p-3">Commission %</th>
                            <th className="p-3">Market Fee</th>
                            <th className="p-3">Coolie/Logistics</th>
                            <th className="p-3">Avg. KG/Box</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commissions.map((item) => (
                            <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50 bg-white">
                                <td className="p-3">
                                    <button onClick={() => toggleRowSelection(item.id)} className="text-blue-600">
                                        {selectedRows.includes(item.id) ? (
                                            <FaCheckSquare size={20} />
                                        ) : (
                                            <FaRegSquare size={20} />
                                        )}
                                    </button>
                                </td>
                                <td className="p-3">{item.id}</td>
                                <td className="p-3">{item.type}</td>
                                <td className="p-3">{item.percentage}</td>
                                <td className="p-3">{item.marketFee}</td>
                                <td className="p-3">{item.logistics}</td>
                                <td className="p-3">{item.avgKg}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}