import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";




const financialOverviewData = [
  { name: "Cash Balance", value: 4140, color: "#5D5FEF" }, // Primary Purple
  { name: "Supplier Receivables", value: 3000, color: "#27AE60" }, // Soft Green
  { name: "Customer Receivables", value: 5000, color: "#EFBE27" }, // Soft Yellow
];

const expenseSummaryData = [
  { name: "Coolie/Logistics", value: 500, color: "#9b87f5" },
  { name: "Route Expenses", value: 250, color: "#33C3F0" },
  { name: "Market Fees", value: 300, color: "#FEF7CD" },
];

const netProfitData = [
  { name: "Sales", value: 3600 },
  { name: "Purchases", value: 2000 },
  { name: "Expenses", value: 550 },
];

const transactions = [
  {
    date: "01/12/2024",
    module: "Sales",
    discount: "GreenMart - Apples",
    amount: 300,
  },
  {
    date: "01/12/2024",
    module: "Purchase",
    discount: "Farm Fresh - Bananas",
    amount: 1250,
  },
  {
    date: "02/12/2024",
    module: "Expense",
    discount: "Fuel for Route 1",
    amount: 120,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex bg-[#f8fafc] text-[#000000de] font-sans">
      {/* Sidebar */}
     

      {/* Main content area */}
      <main className="flex-1 p-8 space-y-6">
        {/* Header */}
     

        {/* Dashboard cards grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Financial Overview Card */}
          <div className="bg-amber-600 rounded-xl shadow-md p-16  ">
            <h3 className="font-semibold text-[#222222] mb-4">Financial Overview</h3>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={financialOverviewData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent, value }) =>
                    `${name} $${value.toLocaleString()}`
                  }
                  labelLine={false}
                >
                  {financialOverviewData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Net Profit Card */}
          <div className="bg-white rounded-xl shadow-md p-6 max-w-full">
            <h3 className="font-semibold text-[#222222] mb-4">Net Profit</h3>
            <div style={{ width: "100%", height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={netProfitData}
                  margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    width={90}
                    style={{ fontWeight: "600", color: "#222222" }}
                  />
                  <Tooltip
                    // formatter={(value: number) => `$${value.toLocaleString()}`}
                    // cursor={{ fill: "rgba(155, 135, 245, 0.15)" }}
                  />
                  <Bar dataKey="value" fill="#9b87f5" barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-right text-green-600 font-semibold">$1050.00</p>
          </div>

          {/* Expense Summary Card */}
          <div className="bg-white rounded-xl shadow-md p-6 max-w-md">
            <h3 className="font-semibold text-[#222222] mb-2">Expense Summary</h3>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={expenseSummaryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  label={({ name, value, percent }) => {
                    if (name === "Coolie/Logistics") {
                      return `${name} $${value} ${(percent * 100).toFixed(2)}%`;
                    }
                    if (name === "Route Expenses") {
                      return `${name} $${value} ${(percent * 100).toFixed(2)}%`;
                    }
                    if (name === "Market Fees") {
                      return `${name} $${value} ${(percent * 100).toFixed(2)}%`;
                    }
                    return "";
                  }}
                  labelLine={false}
                >
                  {expenseSummaryData.map((entry, index) => (
                    <Cell key={`expense-cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <span className="font-bold text-2xl text-[#222222]">$1050</span>
            </div> */}
          </div>

          {/* Recent Transactions Card */}
          <div className="bg-white rounded-xl shadow-md p-6 max-w-full">
            <h3 className="font-semibold text-[#222222] mb-4">Recent Transactions</h3>
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-left border-collapse border border-gray-100">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="pb-2 border-b border-gray-200">Date</th>
                    <th className="pb-2 border-b border-gray-200">Module</th>
                    <th className="pb-2 border-b border-gray-200">Discount Freq.</th>
                    <th className="pb-2 border-b border-gray-200">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(({ date, module, discount, amount }, idx) => (
                    <tr
                      key={idx}
                      className={`${idx % 2 === 0 ? "bg-[#fafafa]" : ""} border-b border-gray-100`}
                    >
                      <td className="py-2">{date}</td>
                      <td className="py-2">{module}</td>
                      <td className="py-2">{discount}</td>
                      <td className="py-2">${amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;

