import React, { useState } from 'react';
import { Printer } from 'lucide-react';


const salesData = [
  { id: '001', date: '01/12/2024', supplier: 'Farm Fresh', qtyKg: 100, qtyBox: 20, total: 510 },
  { id: '002', date: '01/12/2024', supplier: 'Green Supply', qtyKg: 150, qtyBox: 30, total: 800 },
];

const LocalSalesReport = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [page, setPage] = useState(1);

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(salesData.map(row => row.id));
    }
    setSelectAll(!selectAll);
  };

  const toggleRow = (id) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const total = salesData.reduce((sum, row) => sum + row.total, 0);

  return (
    <div className="p-6 bg-white rounded-md mt-10">
      <div className="text-[20px] text-gray-500 mb-1">Reports &gt; <span className=" font-medium">Local Sales Report</span></div>
      <h1 className="text-3xl font-bold text-[#0E0F3C] mb-4 mt-8 p-2">Local Sales Report</h1>

      <div className="flex items-center justify-between mb-4 float-right -mt-[5%] mr-[5%]">
      <button className="flex items-center gap-1 px-4 py-2  rounded-md bg-[#F9FAFB] ">
          <Printer size={16} />
          <span className="font-medium text-[#0E0F3C]">Print</span>
        </button>
</div>
        <div className="flex items-center gap-2 text-sm text-gray-500 float-right ">
          <span>Date Range</span>
          <input
            type="date"
            placeholder="DD/MM/YYYY"
            className="px-5 py-3  rounded-md text-sm text-gray-500  bg-[#F9FAFB]" 
          />
          <span>to</span>
          <input
            type="date"
            placeholder="DD/MM/YYYY"
            className="px-5 py-3 rounded-md text-sm text-gray-500  bg-[#F9FAFB]"
          />
        </div>
        
        
      
      <table className="w-full text-sm border rounded-md overflow-hidden mt-[7%]  ">
        <thead className="bg-[#F9FAFB] text-[#0E0F3C] text-left ">
        <tr >
            <th className="p-2 py-3"></th>
            <th className="p-2 py-3">No.</th>
            <th className="p-2 py-3">Date</th>
            <th className="p-2 py-3">Supplier</th>
            <th className="p-2 py-3">Qty (KG)</th>
            <th className="p-2 py-3">Qty (Box)</th>
            <th className="p-2 py-3">Total</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map(row => (
         <tr key={row.id} className="border-t border-t-[#E8E8ED] ">

             <td className="p-2 py-3"></td>
             <td className="p-2 py-3">{row.id}</td>
             <td className="p-2 py-3 ">{row.date}</td>
             <td className="p-2 py-3">{row.supplier}</td>
             <td className="p-2 py-3">{row.qtyKg}</td>
             <td className="p-2 py-3">{row.qtyBox}</td>
             <td className="p-2 py-3">${row.total.toFixed(2)}</td>
           </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between mt-4 text-sm">
        <span className="text-[#0E0F3C]">Page 1 of 10</span>
        <div className="space-x-4 mr-[7%]">
          <button className="px-4 py-3 rounded border text-gray-400 cursor-not-allowed bg-gray-100">Previous</button>
          <button className="px-4 py-3 rounded border text-[#4079ED] hover:bg-blue-100">Next</button>
        </div>
      </div>

      <div className="mt-4 text-right bg-green-50 text-[#0E0F3C] px-6 py-3 rounded-md font-semibold text-lg">
        Grand Total: ${total.toFixed(2)}
      </div>
    </div>
  );
};

export default LocalSalesReport;
