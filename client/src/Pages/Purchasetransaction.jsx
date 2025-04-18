import React, { useState, useRef, useEffect } from 'react';

function Purchasetransaction() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...items];
    const item = { ...updatedItems[index], [name]: value };

    const quantity = parseFloat(item.kg || item.box || 0);
    const price = parseFloat(item.price || 0);
    item.total = (quantity * price).toFixed(2);

    updatedItems[index] = item;
    setItems(updatedItems);
    setError('');
  };

  const handleAddItem = () => {
    const lastItem = items[items.length - 1];

    if (!lastItem) {
      setItems([...items, { id: '', name: '', kg: '', box: '', price: '', total: '' }]);
      return;
    }

    const requiredFields = ['id', 'name', 'kg', 'box', 'price'];
    const isComplete = requiredFields.every(field => lastItem[field] !== '');

    if (!isComplete) {
      setError(' ');
      return;
    }

    setItems([...items, { id: '', name: '', kg: '', box: '', price: '', total: '' }]);
    setError('');
  };

  const handleKeyDown = (e, rowIndex, colIndex) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const nextRef = inputRefs.current?.[rowIndex]?.[colIndex + 1];
      if (nextRef) nextRef.focus();
      else if (inputRefs.current?.[rowIndex + 1]?.[0]) inputRefs.current[rowIndex + 1][0].focus();
    }
  };

  useEffect(() => {
    inputRefs.current = items.map((_, i) =>
      Array(6)
        .fill(null)
        .map((_, j) => inputRefs.current?.[i]?.[j] || React.createRef())
    );
  }, [items]);

  return (
    <div className="w-full min-h-screen bg-white rounded-3xl p-8 overflow-x-hidden mt-10">
      <div className="max-w-screen-xl mx-auto flex flex-col gap-12">

        {/* Page Header */}
        <div className="pb-6 border-b border-gray-400">
          <h1 className="text-indigo-950 text-4xl font-bold font-['Urbanist']">Add New Purchase Transaction</h1>
        </div>

        {/* Top Form Fields */}
<div className="flex flex-col gap-8">
  {/* First Row */}
  <div className="flex gap-8 flex-wrap">
    <div className="flex items-center gap-6 w-full md:w-[48%]">
      <label className="min-w-44 text-slate-500 text-xl font-normal">Purchase No.</label>
      <div className="flex-1 px-6 py-4 bg-gray-50 rounded-xl text-indigo-950 text-xl font-bold">001</div>
    </div>
    <div className="flex items-center gap-6 w-full md:w-[48%]">
      <label className="min-w-44 text-slate-500 text-xl font-normal">
        Date of Purchase <span className="text-red-500">*</span>
      </label>
      <div className="flex-1 px-6 py-4 bg-gray-50 rounded-xl text-gray-400 text-xl">DD/MM/YYYY</div>
    </div>
  </div>

  {/* Second Row */}
  <div className="flex gap-8 flex-wrap">
    <div className="flex items-center gap-6 w-full md:w-[48%]">
      <label className="min-w-44 text-slate-500 text-xl font-normal">
        Supplier Code <span className="text-red-500">*</span>
      </label>
      <div className="flex-1 px-6 py-4 bg-gray-50 rounded-xl text-gray-400 text-xl">Select</div>
    </div>
    <div className="flex items-center gap-6 w-full md:w-[48%]">
      <label className="min-w-44 text-slate-500 text-xl font-normal">
        Supplier <span className="text-red-500">*</span>
      </label>
      <div className="flex-1 px-6 py-4 bg-gray-50 rounded-xl text-gray-400 text-xl">Select</div>
    </div>
  </div>
</div>


        {/* Item Table Section */}
        <div className="flex flex-col gap-6">
          <div className="pb-6 border-b border-gray-400">
            <h2 className="text-indigo-950 text-3xl font-semibold">Item Details</h2>
          </div>

          {/* Table Header */}
          <div className="w-full grid grid-cols-6 bg-gray-50 px-6 py-4 font-bold text-indigo-950 text-xl border-b">
            <div>No.</div>
            <div>Item Name</div>
            <div>Qty (KG)</div>
            <div>Qty (Box)</div>
            <div>Unit Price</div>
            <div>Subtotal</div>
          </div>

          {/* Dynamic Item Rows */}
          {items.map((item, index) => (
            <div key={index} className="w-full grid grid-cols-6 bg-white px-6 py-4 text-xl border-b">
              {['id', 'name', 'kg', 'box', 'price', 'total'].map((field, colIndex) => (
                <input
                  key={colIndex}
                  type={field === 'total' ? 'text' : 'number'}
                  name={field}
                  value={item[field]}
                  readOnly={field === 'total'}
                  onChange={(e) => handleInputChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(e, index, colIndex)}
                  ref={(el) => {
                    if (!inputRefs.current[index]) inputRefs.current[index] = [];
                    inputRefs.current[index][colIndex] = el;
                  }}
                  className="bg-white border-none outline-none placeholder:text-gray-400 w-full"
                  placeholder={
                    field === 'id' ? 'No.' :
                    field === 'name' ? 'Item Name' :
                    field === 'kg' ? 'Qty (KG)' :
                    field === 'box' ? 'Qty (Box)' :
                    field === 'price' ? 'Unit Price' : 'Subtotal'
                  }
                />
              ))}
            </div>
          ))}

          {error && <div className="text-red-600 text-lg font-medium px-6">{error}</div>}

          <div
            className="col-span-6 rounded-lg px-6 py-4 cursor-pointer flex items-center justify-center gap-3 text-indigo-900 text-xl hover:bg-gray-100 transition"
            onClick={handleAddItem}
          >
            <span className="text-2xl">＋</span> Add another item
          </div>

          {/* Totals Row */}
          <div className="w-full bg-teal-50 px-6 py-6 border-b text-xl font-bold text-indigo-950 grid grid-cols-6">
            <div>Total</div>
            <div className="col-span-2">10</div>
            <div className="col-span-2">2</div>
            <div>$400.00</div>
          </div>
        </div>

        {/* Deductions */}
        <div className="flex flex-col gap-6">
          <div className="pb-6 border-b border-gray-400">
            <h2 className="text-indigo-950 text-3xl font-semibold">Deductions</h2>
          </div>

          <div className="flex flex-wrap gap-8 border-b pb-6">
            {['Commission (%)', 'Market Fee ($/KG)', 'Coolie Rate ($/KG)', 'Total Deductions'].map((label, idx) => (
              <div key={idx} className="flex items-center gap-6 w-full md:w-[48%]">
                <label className="min-w-44 text-slate-500 text-xl">{label}</label>
                <div className="w-full md:w-80 px-6 py-4 bg-gray-50 rounded-xl flex items-center gap-2">
                  {label === 'Total Deductions' && <span className="text-indigo-950 font-bold">$</span>}
                  <span className="text-xl text-gray-400">
                    {label === 'Total Deductions' ? 'Auto calculated' : 'Fetch from Commission Master'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-8">
            {[
              { label: 'Advance Deduction', value: 'Apply Advance' },
              { label: 'Advance Amount', value: 'Fetch from Supplier Master' },
              { label: 'Net Payable', value: 'Auto calculated', prefix: '$' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-6 w-full md:w-[48%]">
                <label className="min-w-44 text-slate-500 text-xl">{item.label}</label>
                <div className="w-full md:w-80 px-6 py-4 bg-gray-50 rounded-xl flex items-center gap-2">
                  {item.prefix && <span className="text-indigo-950 font-bold">{item.prefix}</span>}
                  <span className={`text-xl ${item.label === 'Net Payable' ? 'text-indigo-950 font-bold' : 'text-gray-400'}`}>
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Purchasetransaction;