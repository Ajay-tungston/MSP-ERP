import React from "react";

const SalesRegister = () => {
  return (
    <div className="w-full min-h-screen bg-[#EEEEEE] p-4 md:p-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Panel - Sales Register */}
        <div className="w-full lg:w-2/3 bg-white rounded-xl p-6 shadow">
          <div className="text-slate-500 text-xl mb-2">Transactions &gt; Sales</div>
          <h2 className="text-3xl font-bold text-indigo-950 mb-6">Sales register</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">No.</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Item name</th>
                  <th className="p-3">Qty (KG)</th>
                  <th className="p-3">Unit</th>
                  <th className="p-3">Unit Price</th>
                  <th className="p-3">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(6)].map((_, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-3">00{i + 1}</td>
                    <td className="p-3">{i === 0 ? "Farm Fresh" : "Green Supply"}</td>
                    <td className="p-3">{i === 0 ? "Farm Fresh" : "Green Supply"}</td>
                    <td className="p-3">{i === 0 ? 10 : "-"}</td>
                    <td className="p-3">{i === 0 ? "-" : 2}</td>
                    <td className="p-3">$100.00</td>
                    <td className="p-3">$200.00</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 text-indigo-600 flex items-center gap-2 cursor-pointer">
              <span className="text-2xl">+</span>
              <span>Add another item</span>
            </div>
          </div>

          <div className="mt-12 border-t pt-6">
            <h3 className="text-2xl font-semibold text-indigo-950 mb-4">Deductions</h3>
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <label className="text-lg min-w-[8rem] text-slate-600">Net Payable</label>
              <div className="flex items-center gap-2">
                <span className="text-lg">$</span>
                <input
                  type="text"
                  disabled
                  value="Auto calculated"
                  className="bg-gray-100 px-4 py-2 rounded-md text-gray-600"
                />
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button className="px-6 py-2 border-2 border-red-500 text-red-500 rounded-full font-semibold flex items-center gap-2">
                <span className="text-xl">✖</span> Cancel
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold flex items-center gap-2">
                <span className="text-xl">＋</span> Save
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Item List */}
        <div className="w-full lg:w-1/3 bg-white rounded-xl p-6 shadow">
          <h3 className="text-2xl font-semibold text-indigo-950 mb-4">Item list</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">No.</th>
                  <th className="p-3">Item name</th>
                  <th className="p-3">Qty (KG)</th>
                  <th className="p-3">Unit</th>
                  <th className="p-3">Unit Price</th>
                  <th className="p-3">Total</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(6)].map((_, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-3">0{i + 1}.</td>
                    <td className="p-3">demo{i > 0 ? i : ""}</td>
                    <td className="p-3">5</td>
                    <td className="p-3">-</td>
                    <td className="p-3">$125</td>
                    <td className="p-3">$22154</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesRegister;
