
import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
} from "recharts";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const kpiData = [
  { day: "Mon", NetReceivables: 400, TotalCommission: 780 },
  { day: "Tue", NetReceivables: 700, TotalCommission: 780 },
  { day: "Wed", NetReceivables: 900, TotalCommission: 780 },
  { day: "Thu", NetReceivables: 1100, TotalCommission: 780 },
  { day: "Fri", NetReceivables: 1600, TotalCommission: 780 },
  { day: "Sat", NetReceivables: 2000, TotalCommission: 780 },
];

const salesData = [
  { name: "Local", value: 1200 },
  { name: "Route", value: 2400 },
];

const purchaseData = [
  { name: "Farm Fresh", value: 1250 },
  { name: "Green Supply", value: 2000 },
];

// const expenseData = [
//   { name: "Coolie/Market Fees", value: 500, color: "#6366F1" },
//   { name: " Expenses", value: 250, color: "#22C55E" },
// ];

// const totalExpense = expenseData.reduce((acc, curr) => acc + curr.value, 0);

const data = [
  { name: "Cash Balance", value: 4140 },
  { name: "Customer Receivables", value: 5000 },
  { name: "Supplier Receivables", value: 3000 },
];

const COLORS = ["#5B61EB", "#F3B700", "#3BB273"];

const barData = [
  { name: "Sales", value: 3600 },
  { name: "Purchases", value: 2000 },
  { name: "Expenses", value: 550 },
];

const totalProfit = 1050;

const FinancialDashboard = () => {
  const [recentTransactions, setRecentTransactions] = useState([]);
  const axiosInstance = useAxiosPrivate();
  const [totalExpense, setTotalExpense]=useState(0);
  const [expenseData , setExpenseData] = useState([]);

  const [summary, setSummary] = useState({
    sales: 0,
    purchases: 0,
    expenses: [],
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axiosInstance.get("/admin/transaction/profit");
        setSummary(res.data);
      } catch (err) {
        console.error("Error fetching summary:", err);
      }
    };
    fetchSummary();
  }, [axiosInstance]);
     

  useEffect(() => {
    const fetchExpenseSummary = async () => {
      try {
        const res = await axiosInstance.get("/admin/transaction/summary");
        setExpenseData(res.data.breakdown);
        setTotalExpense(res.data.totalExpense);
 
      } catch (error) {
        console.error("Failed to fetch expense summary", error);
      }
    };

    fetchExpenseSummary();
  }, []);


  
  const totalProfit =
    summary.sales - summary.purchases - summary.totalExpense;

  const barData = [
    { name: "Sales", value: summary.sales },
    { name: "Purchases", value: summary.purchases },
    { name: "Expenses", value: summary.expenses },
  ];
  useEffect(() => {
    const fetchRecentTransactions = async () => {
      try {
        const resp = await axiosInstance.get("/admin/transaction/transactions");
        setRecentTransactions(resp.data || []);
        console.log(resp)
      } catch (error) {
        console.error("Failed to fetch recent transactions", error);
      }
    };
    fetchRecentTransactions();
  }, [axiosInstance]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 ">
        {/* Financial Overview */}
        <div className="bg-white rounded-2xl shadow-md p-6 w-full">
          <h2 className="text-lg font-semibold text-black mb-4">Financial Overview</h2>
          <hr className="mb-4 border-gray-700" />
          <div className="flex justify-center">
            <PieChart width={700} height={300}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={100}
                paddingAngle={1}
                dataKey="value"
                label={({ name, value }) => `${name}\n$${value.toLocaleString()}`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} stroke="white" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            </PieChart>
          </div>
        </div>

        {/* Net Profit */}
        <div className="bg-white shadow-xl rounded-2xl p-4 w-full ">
          <div className="flex justify-between items-center mb-4 w-full overflow-visible">
            <h2 className="text-xl font-bold text-gray-800 ">Net Profit</h2>
            {/* <span className="text-green-600 font-bold text-lg ">
              ${totalProfit.toFixed(2)}
            </span> */}
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart layout="vertical" data={barData}
              margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
            >
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Tooltip />
              <Bar dataKey="value" fill="#6366F1" barSize={20}>
                <LabelList dataKey="value" position="right" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        {/* Expense Summary */}
        <div className="bg-white shadow-xl rounded-2xl p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Expense Summary</h2>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={expenseData}
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {expenseData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="text-3xl font-bold text-center -mt-28 mb-4 text-indigo-900">
        ${totalExpense}
      </div>
      <div className="mt-4 space-y-2 text-sm">
        {expenseData.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.name}
            </span>
            <span className="font-semibold" style={{ color: item.color }}>
              ${item.value} ({((item.value / totalExpense) * 100).toFixed(2)}%)
            </span>
          </div>
        ))}
      </div>
    </div>

        {/* Recent Transactions */}
        <div className="bg-white shadow-xl rounded-2xl p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs text-gray-600 border-b">
                <tr>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Module</th>
                  <th className="py-2 px-4">Description</th>
                  <th className="py-2 px-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((tx, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="py-2 px-4">{new Date(tx.date).toLocaleDateString()}</td>
                    <td className="py-2 px-4">{tx.module}</td>
                    <td className="py-2 px-4">{tx.desc}</td>
                    <td className="py-2 px-4 text-right font-semibold">${tx.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
        {/* KPI Chart */}
        {/* <div className="bg-white shadow-xl rounded-2xl p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Key Performance Indicators</h2>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={kpiData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="NetReceivables"
                stroke="#4F46E5"
                fill="#4F46E5"
                fillOpacity={0.2}
              />
              <Area
                type="monotone"
                dataKey="TotalCommission"
                stroke="#FACC15"
                fill="#FACC15"
                fillOpacity={0.1}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex justify-around text-sm mt-2">
            <div className="flex items-center gap-2 text-blue-600">
              <span className="w-3 h-3 bg-blue-600 rounded-full" /> Net Receivables
            </div>
            <div className="flex items-center gap-2 text-yellow-400">
              <span className="w-3 h-3 bg-yellow-400 rounded-full" /> Total Commission
            </div>
          </div>
        </div> */}

        {/* Sales Summary */}
        {/* <div className="bg-white shadow-xl rounded-2xl p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Sales Summary</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={salesData} barSize={50}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#22C55E">
                <LabelList dataKey="value" position="top" fill="#fff" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div> */}

        {/* Purchase Summary */}
        {/* <div className="bg-white shadow-xl rounded-2xl p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Purchase Summary</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={purchaseData} barSize={50}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366F1">
                <LabelList dataKey="value" position="top" fill="#fff" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div> */}
      </div>
    </div>
  );
};

export default FinancialDashboard;
