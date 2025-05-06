// src/components/TrialBalance.jsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Printer } from 'lucide-react';

const mockData = {
  receivables: [
    {
      section: 'Receivables from Customers',
      total: 5000,
      rows: [
        { label: 'GreenMart', invoice: 'INV001', amount: 2000 },
        { label: 'LocalMart', invoice: 'INV002', amount: 3000 },
      ],
    },
    {
      section: 'Receivables from Suppliers',
      total: 2000,
      rows: [
        { label: 'Farm Fresh', invoice: 'CRN001', amount: 1000 },
        { label: 'LocalMart', invoice: 'CRN002', amount: 1000 },
      ],
    },
    {
      section: 'Receivables from Employees',
      total: 1500,
      rows: [
        { label: 'Alice', invoice: 'EMP100', amount: 1500 },
      ],
    },
  ],
  payables: [
    {
      section: 'Commission',
      total: 750,
      rows: [
        { label: 'TRXNO01', date: '2024-12-01', amount: 500 },
        { label: 'TRXNO02', date: '2024-12-02', amount: 250 },
      ],
    },
    {
      section: 'Coolie/Logistics',
      total: 500,
      rows: [
        { label: 'TRXNO01', date: '2024-12-01', amount: 300 },
        { label: 'TRXNO02', date: '2024-12-02', amount: 200 },
      ],
    },
    {
      section: 'Payables to Suppliers',
      total: 3000,
      rows: [],
    },
  ],
};

export default function TrialBalance() {
  const [openReceivables, setOpenReceivables] = useState({});
  const [openPayables, setOpenPayables] = useState({});
  const [checkedRows, setCheckedRows] = useState({});

  const toggleSection = (side, idx) => {
    if (side === 'rec') {
      setOpenReceivables(prev => ({ ...prev, [idx]: !prev[idx] }));
    } else {
      setOpenPayables(prev => ({ ...prev, [idx]: !prev[idx] }));
    }
  };

  const toggleRow = (key) => {
    setCheckedRows(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-8 bg-white min-h-screen mt-10 rounded-xl">
      <nav className="text-gray-500 text-sm mb-4">Reports &gt; Trial Balance</nav>
      <div className='flex justify-between w-full'>
        <h1 className="text-3xl font-semibold ">Trial Balance</h1>
        <button className="flex items-center px-4 py-2 bg-[#F9FAFB] 0 rounded hover:bg-indigo-200 pl-2 mr-8">
          <Printer className="mr-2" size={16} /> Print
        </button>
        </div>
      <div className="flex justify-end  items-center mb-6">
        
        <div className="pt-10 flex items-center gap-4 text-gray-500">
        <label>Date Range</label>
        <input type="date" className="px-4 py-2 bg-[#F9FAFB]  rounded text-gray-600" />
        <span>to</span>
        <input type="date" className="px-4 py-2 bg-[#F9FAFB] rounded text-gray-600" />
      </div>
      </div>
      <div className="flex flex-wrap gap-8">
        {/* Receivables */}
        <div className="flex-1">
          <div className="flex justify-between bg-[#F0FDFA] px-6 py-4 ">
            <span className="font-bold text-[#27AE60] uppercase text-[24px]">Receivables</span>
            <span className="font-bold text-[#27AE60] text-[24px]">${mockData.receivables.reduce((sum, s) => sum + s.total, 0).toFixed(2)}</span>
          </div>
          <div className=" rounded-b-lg">
            {mockData.receivables.map((sect, i) => (
              <div key={i}>
                <div
                  className="flex justify-between bg-[#F0F9FF] px-6 py-3 cursor-pointer "
                  onClick={() => toggleSection('rec', i)}
                >
                  <div className="flex items-center gap-2">
                    {openReceivables[i] ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}  
                    <span className="font-semibold text-[#05004E]">{sect.section}</span>
                  </div>
                  <span className="font-semibold text-[#05004E]">${sect.total.toFixed(2)}</span>
                </div>
                {openReceivables[i] && sect.rows.length > 0 && (
                  <table className="w-full">
                    <thead className="bg-[#F9FAFB] text-left text-sm text-[#05004E] uppercase border-b  [border-color:#E8E8ED]">
                      <tr>
                        <th className="px-6 py-2 w-1/12"></th>
                        <th className="px-6 py-2 w-5/12">Customer</th>
                        <th className="px-6 py-2 w-3/12">Invoice No.</th>
                        <th className="px-6 py-2 w-3/12">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sect.rows.map((row, j) => {
                        const key = `rec-${i}-${j}`;
                        return (
                          <tr key={j} className="border-b [border-color:#E8E8ED] hover:bg-gray-50">

                          <td></td>
                            <td className="px-6 py-2">{row.label}</td>
                            <td className="px-6 py-2">{row.invoice}</td>
                            <td className="px-6 py-2">${row.amount.toFixed(2)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Payables */}
        <div className="flex-1">
          <div className="flex justify-between bg-[#FEF2F2] px-6 py-4">
            <span className="font-bold text-[#EB5757] uppercase text-[24px]">Payables</span>
            <span className="font-bold text-[#EB5757] text-[24px]">${mockData.payables.reduce((sum, s) => sum + s.total, 0).toFixed(2)}</span>
          </div>
          <div className="rounded-b-lg">
            {mockData.payables.map((sect, i) => (
              <div key={i}>
                <div
                  className="flex justify-between bg-[#F0F9FF] px-6 py-3 cursor-pointer "
                  onClick={() => toggleSection('pay', i)}
                >
                  <div className="flex items-center gap-2">
                    {openPayables[i] ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}  
                <span className="font-semibold text-[#05004E]">{sect.section}</span>
                  </div>
                  <span className="font-semibold text-[#05004E]">${sect.total.toFixed(2)}</span>
                </div>
                {openPayables[i] && sect.rows.length > 0 && (
                  <table className="w-full">
                    <thead className="bg-[#F9FAFB] text-left text-sm text-[#05004E] uppercase border-b [border-color:#E8E8ED]">
                      <tr>
                        <th className="px-6 py-2 w-1/12"></th>
                        <th className="px-6 py-2 w-4/12">Transaction No.</th>
                        <th className="px-6 py-2 w-3/12">Advance Date</th>
                        <th className="px-6 py-2 w-3/12">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sect.rows.map((row, j) => {
                        const key = `pay-${i}-${j}`;
                        return (
                          <tr key={j} className="border-b [border-color:#E8E8ED] hover:bg-gray-50">
                            <td className="px-6 py-2">
                              
                            </td>
                            <td className="px-6 py-2">{row.label}</td>
                            <td className="px-6 py-2">{new Date(row.date).toLocaleDateString('en-GB')}</td>
                            <td className="px-6 py-2">${row.amount.toFixed(2)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Date Range */}
    
    </div>
)
}
