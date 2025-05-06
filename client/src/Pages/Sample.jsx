import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const data = {
  receivables: {
    total: 10000,
    categories: [
      {
        title: 'Receivables from Customers',
        total: 5000,
        headers: ['Customer', 'Invoice No.', 'Amount'],
        items: [
          { id: 1, checked: true, name: 'GreenMart', ref: 'INV001', amount: 2000 },
          { id: 2, checked: true, name: 'LocalMart', ref: 'INV002', amount: 3000 },
        ],
      },
      {
        title: 'Receivables from Suppliers',
        total: 2000,
        headers: ['Supplier', 'Credit Note No.', 'Amount'],
        items: [
          { id: 3, checked: true, name: 'Farm Fresh', ref: 'CRN001', amount: 1000 },
          { id: 4, checked: true, name: 'LocalMart', ref: 'CRN002', amount: 1000 },
        ],
      },
      {
        title: 'Receivables from Employees',
        total: 1500,
        headers: [],
        items: [],
      },
    ],
  },
  payables: {
    total: 10000,
    categories: [
      {
        title: 'Commission',
        total: 750,
        headers: ['Transaction No.', 'Advance Date', 'Amount'],
        items: [
          { id: 5, checked: true, ref: 'TRXN001', date: '01/12/2024', amount: 500 },
          { id: 6, checked: true, ref: 'TRXN002', date: '02/12/2024', amount: 250 },
        ],
      },
      {
        title: 'Coolie/Logistics',
        total: 500,
        headers: ['Transaction No.', 'Advance Date', 'Amount'],
        items: [
          { id: 7, checked: true, ref: 'TRXN001', date: '01/12/2024', amount: 300 },
          { id: 8, checked: true, ref: 'TRXN002', date: '02/12/2024', amount: 200 },
        ],
      },
      {
        title: 'Payables to Suppliers',
        total: 3000,
        headers: [],
        items: [],
      },
    ],
  },
};

const Category = ({ title, total, headers, items }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="border-b">
      <div
        className="flex items-center justify-between bg-blue-50 px-4 py-2 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          {open ? <FaChevronUp /> : <FaChevronDown />}
          <span className="font-semibold">{title}</span>
        </div>
        <div className="font-semibold">${total.toLocaleString()}.00</div>
      </div>
      {open && items.length > 0 && (
        <div className="px-4 py-2">
          <div className="grid grid-cols-12 font-medium text-gray-600 border-b pb-2">
            <div className="col-span-1"></div>
            {headers.map((h, i) => (
              <div key={i} className="col-span-3">
                {h}
              </div>
            ))}
          </div>
          {items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 items-center py-2 border-b"
            >
              <div className="col-span-1">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={item.checked}
                  readOnly
                />
              </div>
              <div className="col-span-3">{item.name || ''}</div>
              <div className="col-span-3">{item.ref}</div>
              <div className="col-span-3">{item.date || ''}</div>
              <div className="col-span-2 text-right">
                ${item.amount.toLocaleString()}.00
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const TrialBalance = () => {
  return (
    <div className="p-6 bg-white shadow rounded-xl  mx-auto mt-10">
      <div className="mb-4 text-sm text-gray-500">Reports &gt; Trial Balance</div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Trial Balance</h1>
        <button className="bg-gray-100 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200">
          🖨️ Print
        </button>
      </div>

      {/* Date Range Inputs */}
      <div className="flex items-center gap-2 mb-6 float-right bg-amber-900">
        <span className="text-sm text-gray-500">Date Range</span>
        <input
          type="text"
          placeholder="DD/MM/YYYY"
          className="border px-2 py-1 rounded-md text-sm"
        />
        <span>to</span>
        <input
          type="text"
          placeholder="DD/MM/YYYY"
          className="border px-2 py-1 rounded-md text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 pt-18 bg-amber-200">
        {/* Receivables Section */}
        <div>
          <div className="bg-green-100 text-green-800 font-semibold px-4 py-2 rounded-t">
            RECEIVABLES &nbsp; ${data.receivables.total.toLocaleString()}.00
          </div>
          <div className="bg-white border rounded-b">
            {data.receivables.categories.map((cat, idx) => (
              <Category key={idx} {...cat} />
            ))}
          </div>
        </div>

        {/* Payables Section */}
        <div>
          <div className="bg-red-100 text-red-800 font-semibold px-4 py-2 rounded-t">
            PAYABLES &nbsp; ${data.payables.total.toLocaleString()}.00
          </div>
          <div className="bg-white border rounded-b">
            {data.payables.categories.map((cat, idx) => (
              <Category key={idx} {...cat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrialBalance;
