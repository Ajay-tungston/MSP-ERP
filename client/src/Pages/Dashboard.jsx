import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Area,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  Label,
  AreaChart,
  CartesianGrid,
} from "recharts";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { format } from "date-fns";

const COLORS = ["#5B61EB", "#F3B700", "#3BB273"];

const FinancialDashboard = () => {
  const [recentTransactions, setRecentTransactions] = useState([]);
  const axiosInstance = useAxiosPrivate();
  const [expenseData, setExpenseData] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
    const [kpiData, setKpiData] = useState([]);
    console.log(kpiData)
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  });

  const [summary, setSummary] = useState({
    sales: 0,
    purchases: 0,
    expenses: [],
  });

  ////////////////////////
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

  /////////////////////////////////////////
  useEffect(() => {
    const fetchExpenseSummary = async () => {
      try {
        const res = await axiosInstance.get(
          `/admin/trialBalance/expense${selectedMonth ? `?month=${selectedMonth}` : ""
          }`
        );
        const res2 = await axiosInstance.get(
          `/admin/trialBalance/coolie${selectedMonth ? `?month=${selectedMonth}` : ""
          }`
        );

        const expense = res.data.totalExpenses || 0;
        const coolie = res2.data.totalCoolie || 0;
        const chartData = [
          { name: "Expense", value: expense, color: COLORS[0] },
          { name: "Coolie / Market Fee", value: coolie, color: COLORS[1] },
        ];

        setExpenseData(chartData);
        setTotalExpense(expense + coolie);
      } catch (error) {
        console.error("Failed to fetch expense summary", error);
      }
    };

    fetchExpenseSummary();
  }, []);

  const barData = [
    { name: "Sales", value: summary.sales },
    { name: "Purchases", value: summary.purchases },
    { name: "Expenses", value: summary.expenses },
  ];

  const todayData = [
    { name: "Sales", value: summary.sales },
    { name: "Purchases", value: summary.purchases },

  ];
  


useEffect(() => {
  const fetchKpi = async () => {
  console.log("fhdcbhufb")

    try {
      const res = await axiosInstance.get("/admin/transaction/today");
      console.log("📊 KPI DATA:", res.data); // 👈 Check format!
      setKpiData(res.data);
    } catch (err) {
      console.error("❌ KPI Fetch Error:", err);
    }
  };

  fetchKpi();
}, []);



  useEffect(() => {
    const fetchRecentTransactions = async () => {
      try {
        const resp = await axiosInstance.get("/admin/transaction/transactions");

        setRecentTransactions(resp.data || []);
      } catch (error) {
        console.error("Failed to fetch recent transactions", error);
      }
    };
    fetchRecentTransactions();
  }, [axiosInstance]);

  const [overview, setOverview] = useState([
    { name: "Cash Balance", value: 0 },
    { name: "Customer Receivables", value: 0 },
    { name: "Supplier Receivables", value: 0 },
  ]);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res1 = await axiosInstance.get("/admin/trialBalance/receivable"); // customer receivables
        const res2 = await axiosInstance.get(
          "/admin/trialBalance/supplierbalance"
        ); // supplier receivables
        const res3 = await axiosInstance.get("/admin/trialBalance/cashbalance"); // cash balance
        const data = [
          { name: "Cash Balance", value: res3.data.cashBalance || 0 },
          {
            name: "Customer Receivables",
            value: res1.data.totalReceivables || 0,
          },
          {
            name: "Supplier Receivables",
            value: res2.data.totalReceivables || 0,
          },
        ];

        setOverview(data);
      } catch (error) {
        console.error("Failed to fetch overview", error);
      }
    };

    fetchOverview();
  }, [axiosInstance]);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 p-4 ">
        {/* Financial Overview */}
        <div className="bg-white rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.10)] p-6 w-full col-span-2 overflow-visible">
          <h2 className="text-2xl font-semibold text-[#05004E] mb-4">
            Financial Overview
          </h2>
          <hr className="mb-4 border-gray-200" />
          <div className="flex justify-center overflow-visible">
            {overview.some((item) => item.value > 0) ? (
              <PieChart width={450} height={300}>
                <Pie
                  data={overview}
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  innerRadius={0}
                  dataKey="value"
                  labelLine={false}
                  paddingAngle={0}
                  label={({
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    name,
                    value,
                  }) => {
                    const RADIAN = Math.PI / 180;
                    const radius =
                      innerRadius + (outerRadius - innerRadius) * 0.6;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);

                    return (
                      <text
                        x={x}
                        y={y}
                        fill="white"
                        textAnchor="middle"
                        dominantBaseline="central"
                        style={{ fontSize: "12px", fontWeight: "bold" }}
                      >
                        {name}
                        <tspan x={x} dy="1.2em">
                          ₹{value.toLocaleString()}
                        </tspan>
                      </text>
                    );
                  }}
                >
                  {overview.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index]}
                      strokeWidth={0}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
              </PieChart>
            ) : (
              <div className="text-center text-gray-500 font-medium h-[250px] flex items-center justify-center">
                No data available{" "}
              </div>
            )}
          </div>
        </div>

        {/* Net Profit */}
        <div className="bg-white rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.10)] p-6  w-full col-span-4">
          {/* <div className="flex justify-between items-center mb-4 w-full overflow-visible"> */}
          <h2 className="text-2xl font-semibold text-[#05004E] mb-4">
            Overview
          </h2>
          <hr className="mb-4 border-gray-200" />

          {/* <span className="text-green-600 font-bold text-lg ">
              ${totalProfit.toFixed(2)}
            </span> */}
          {/* </div> */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              layout="vertical"
              data={barData}
              margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
            >
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Tooltip />
              <Bar dataKey="value" fill="#6366F1" barSize={20}>
                <LabelList
                  dataKey="value"
                  content={({ x, y, width, height, value }) => {
                    const padding = 5;
                    const inside = width > 30;

                    return (
                      <text
                        x={inside ? x + width - padding : x + width + padding}
                        y={y + height / 2}
                        fill={inside ? "white" : "#6366F1"}
                        textAnchor={inside ? "end" : "start"}
                        dominantBaseline="middle"
                        style={{ fontSize: "12px", fontWeight: "bold" }}
                      >
                        ₹{value.toLocaleString()}
                      </text>
                    );
                  }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 p-4">
        {/* Expense Summary */}

        <div className="bg-white shadow-[0_0_10px_rgba(0,0,0,0.10)] rounded-2xl p-6 col-span-2">
          <h2 className="text-2xl font-semibold text-[#05004E] mb-4">
            Expense Summary
          </h2>
          <hr className="mb-4 border-gray-200" />

          {(expenseData[0]?.value || 0) > 0 ||
            (expenseData[1]?.value || 0) > 0 ? (
            <ResponsiveContainer
              width="100%"
              height={300}
              className="overflow-visible"
            >
              <PieChart>
                <Pie
                  data={expenseData}
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    percent,
                    index,
                  }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = outerRadius + 20;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                    const item = expenseData[index];
                    return (
                      <text
                        x={x}
                        y={y}
                        fill={item.color}
                        textAnchor={x > cx ? "start" : "end"}
                        dominantBaseline="central"
                        style={{ fontSize: "12px", fontWeight: 500 }}
                      >
                        <tspan x={x} dy="0">
                          {item.name}
                        </tspan>
                        <tspan x={x} dy="1.2em">
                          ₹{item.value?.toFixed(0)} (
                          {(percent * 100).toFixed(1)}%)
                        </tspan>
                      </text>
                    );
                  }}
                  labelLine={true}
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                  <Label
                    value={`₹${totalExpense.toFixed(0)}`}
                    position="center"
                    style={{
                      fontSize: "24px",
                      fill: "#1e1b4b",
                      fontWeight: "bold",
                    }}
                  />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center text-gray-500 font-medium h-[250px] flex items-center justify-center">
              No expense or coolie data available for this period.
            </div>
          )}
        </div>

        {/* Recent Transactions */}
        {/* <div className="bg-white shadow-[0_0_10px_rgba(0,0,0,0.10)] rounded-2xl p-6 col-span-3">
          <h2 className="text-2xl font-semibold text-[#05004E] mb-4">
            Recent Transactions
          </h2>
          <hr className="mb-2 border-gray-200" />

          <div className="overflow-x-auto ">
            <ResponsiveContainer width="100%" height={300}>
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
          </div>
        </div> */}


        <div className="bg-white shadow-[0_0_10px_rgba(0,0,0,0.10)] rounded-2xl p-6 col-span-3">
          <h2 className="text-2xl font-semibold text-[#05004E] mb-4">
            Today's Purchase & Sales
          </h2>
          <hr className="mb-2 border-gray-200" />

         {Array.isArray(kpiData) && kpiData.length > 0 ? (
  <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={kpiData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="label" />
      <YAxis />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="Purchase"
        stroke="#4F46E5"
        fill="#4F46E5"
        fillOpacity={0.2}
      />
      <Area
        type="monotone"
        dataKey="Sales"
        stroke="#FACC15"
        fill="#FACC15"
        fillOpacity={0.1}
      />
    </AreaChart>
  </ResponsiveContainer>
) : (
  <p className="text-center text-gray-500 text-xl">Loading data...</p>
)}

</div>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4"> */}
      {/* KPI Chart */}
      {/* <div className="bg-white shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-2xl p-4">
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
      {/* </div> */}
    </div>
  );
};

export default FinancialDashboard;
