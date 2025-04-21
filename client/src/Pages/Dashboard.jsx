import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 flex flex-col justify-between">
        <div>
          <div className="mb-10 text-xl font-bold">🏢 Company Name</div>
          <nav className="space-y-4">
            <button className="flex items-center gap-2 p-2 bg-indigo-500 text-white rounded">
              📊 Dashboard
            </button>
            <button className="flex items-center gap-2 text-gray-600">📁 Master</button>
            <button className="flex items-center gap-2 text-gray-600">💸 Transactions</button>
            <button className="flex items-center gap-2 text-gray-600">📈 Reports</button>
            <button className="flex items-center gap-2 text-gray-600">🖨️ Print</button>
            <button className="flex items-center gap-2 text-gray-600">⚙️ Settings</button>
          </nav>
        </div>
        <button className="text-red-500 mt-6 flex items-center gap-2">🔓 Sign Out</button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search here..."
              className="rounded-full px-4 py-2 border outline-none w-60"
            />
            <div className="flex items-center gap-2">
              <span className="text-sm">User Name</span>
              <img src="https://via.placeholder.com/30" alt="User" className="rounded-full" />
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Financial Overview */}
          <div className="bg-white p-4 rounded-2xl shadow">
            <h2 className="font-semibold mb-2">Financial Overview</h2>
            <div className="h-40 bg-gray-100 rounded flex items-center justify-center">[Pie Chart]</div>
          </div>

          {/* Net Profit */}
          <div className="bg-white p-4 rounded-2xl shadow col-span-2">
            <h2 className="font-semibold mb-2">Net Profit</h2>
            <div className="h-40 bg-gray-100 rounded flex items-center justify-center">[Bar Chart]</div>
          </div>

          {/* Expense Summary */}
          <div className="bg-white p-4 rounded-2xl shadow">
            <h2 className="font-semibold mb-2">Expense Summary</h2>
            <div className="h-40 bg-gray-100 rounded flex items-center justify-center">[Donut Chart]</div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white p-4 rounded-2xl shadow col-span-2">
            <h2 className="font-semibold mb-4">Recent Transactions</h2>
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs uppercase text-gray-500 border-b">
                <tr>
                  <th className="py-2">Date</th>
                  <th>Module</th>
                  <th>Discount Freq.</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">01/12/2024</td>
                  <td>Sales</td>
                  <td>GreenMart - Apples</td>
                  <td>$300.00</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">01/12/2024</td>
                  <td>Purchase</td>
                  <td>Farm Fresh - Bananas</td>
                  <td>$1250.00</td>
                </tr>
                <tr>
                  <td className="py-2">02/12/2024</td>
                  <td>Expense</td>
                  <td>Fuel for Route 1</td>
                  <td>$120.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
