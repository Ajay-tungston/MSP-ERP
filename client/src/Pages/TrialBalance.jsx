import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { ChevronDown, ChevronUp, Printer } from "lucide-react";
import { handleTrialBalancePrint } from "../utils/trailBalanceprint";
export default function TrialBalance() {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  });

  const [supplierReceivables, setSupplierReceivables] = useState({
    total: 0,
    rows: [],
  });

  // Data state for receivables
  const [receivables, setReceivables] = useState({ total: 0, rows: [] });
  const [openReceivableSection, setOpenReceivableSection] = useState(false);

  const [expense, setExpense] = useState({
    totalExpenses: 0,
    breakdown: [],
  });
  const [openExpenseSection, setOpenExpenseSection] = useState(false);
  const [expenseLoading, setExpenseLoading] = useState(false);
  const [expenseError, setExpenseError] = useState(null);

  const [salaryOpen, setSalaryOpen] = useState(false);

  const [vehicleData, setVehicleData] = useState({
    income: { netBalance: 0, vehicles: [] },
    expense: { netBalance: 0, vehicles: [] },
  });
  const [openVehicleReceivableSection, setOpenVehicleReceivableSection] = useState(false);
  const [openVehiclePayableSection, setOpenVehiclePayableSection] = useState(false);
  const [vehicleLoading, setVehicleLoading] = useState(false);
  const [vehicleError, setVehicleError] = useState(null);

  // Data state for payables
  const [openPayables, setOpenPayables] = useState({});

  const [openSupplierPayables, setOpenSupplierPayables] = useState(false);
  const [supplierPayables, setSupplierPayables] = useState({
    total: 0,
    rows: [],
  });
  const [loadingSupplierPayables, setLoadingSupplierPayables] = useState(false);
  const [errorSupplierPayables, setErrorSupplierPayables] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openEmployeeReceivableSection, setOpenEmployeeReceivableSection] =
    useState(false);
  const [employeeReceivables, setEmployeeReceivables] = useState({
    total: 0,
    rows: [],
    totalSalaries: 0,
    salaryBreakdown: [],
  });
  console.log(employeeReceivables);
  const [openStockSection, setOpenStockSection] = useState(false);
  const [stockData, setStockData] = useState({ total: 0, rows: [] });
  const [loadingStock, setLoadingStock] = useState(true);
  const [stockError, setStockError] = useState(null);

  const axiosPrivate = useAxiosPrivate();
  const [commissions, setCommissions] = useState({
    total: 0,
    rows: [],
    totalCommission: 0,
    pastSalaries: 0,
    pastExpenses: 0,
  });

  const [openCommissionSection, setOpenCommissionSection] = useState(false);

  const [cashBalance, setCashBalance] = useState({ total: 0 });
  const [loadingCashBalance, setLoadingCashBalance] = useState(false);
  const [errorCashBalance, setErrorCashBalance] = useState(null);

  const [openLenderPayables, setOpenLenderPayables] = useState(false);
  const [lenderPayables, setLenderPayables] = useState({ total: 0, rows: [] });

  const [openSupplierReceivableSection, setOpenSupplierReceivableSection] =
    useState(false);
  const [openSupplierPayableSection, setOpenSupplierPayableSection] =
    useState(false); // <-- this is missing!

  const [openCoolieSection, setOpenCoolieSection] = useState(false);
  const [coolieCharges, setCoolieCharges] = useState({ total: 0, rows: [] });
  const [loadingCoolie, setLoadingCoolie] = useState(false);
  const [errorCoolie, setErrorCoolie] = useState(null);

  const [profitLossData, setProfitLossData] = useState({
    totalProfit: 0,
    totalLoss: 0,
    netProfitOrLoss: 0,
    totalSales: 0,
    totalPurchases: 0,
    totalCommissionPaid: 0,
  });

  const [loadingProfitLoss, setLoadingProfitLoss] = useState(false);
  const [profitLossError, setProfitLossError] = useState(null);

  // Fetch receivables from backend
  //done
  const fetchReceivables = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosPrivate.get(
        `/admin/trialBalance/receivable?month=${selectedMonth}`
        // { params: { startDate, endDate } }
      );

      const { totalReceivables, breakdown } = response.data;
      setReceivables({
        total: totalReceivables,
        rows: breakdown.map((item) => ({
          label: item.customerName,

          amount: item.balance,
          openingBalance: item.openingBalance,
        })),
      });
    } catch (err) {
      console.error("Failed to load receivables:", err);
      setError("Could not fetch receivables.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount and when date range changes
  useEffect(() => {
    fetchReceivables();
    // fetchPayablesToSuppliers();
    fetchReceivablesFromEmployees();
    // fetchMarketFeesFromSuppliers();
    fetchCashBalance();
    fetchCommissionsFromSuppliers();
    fetchCoolieCharges();
    // fetchPayablesToSupplier();
    fetchLenderPayables();
    fetchPayablesToSuppliers();
    fetchStockData();
    fetchProfitLossData();
    fetchExpenseData();
    fetchVehicleData();
  }, [
    // startDate, endDate,
    selectedMonth,
  ]);

  //done
  const fetchReceivablesFromEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosPrivate.get(
        `/admin/trialBalance/employee?month=${selectedMonth}`
        // { params: { startDate, endDate } } // Optionally pass date range if required
      );
      const { totalReceivables, breakdown, totalSalaries, salaryBreakdown } =
        response.data;
      console.log(response);
      setEmployeeReceivables({
        total: totalReceivables,
        rows: breakdown.map((item) => ({
          label: item.employeeName, // Employee name from backend
          amount: item.balance, // Balance for the employee
          openingbalance: item.openingBalance,
        })),
        totalSalaries,
        salaryBreakdown,
      });
    } catch (err) {
      console.error("Failed to load employee receivables:", err);
      setError("Could not fetch receivables from employees.");
    } finally {
      setLoading(false);
    }
  };

  //done
  const fetchCashBalance = async () => {
    setLoadingCashBalance(true);
    setErrorCashBalance(null);

    try {
      const response = await axiosPrivate.get(
        `/admin/trialBalance/cashbalance?month=${selectedMonth}`
      );
      const { cashBalance } = response.data;
      setCashBalance({ total: Number(cashBalance || 0) });
    } catch (err) {
      console.error("Failed to load cash balance:", err);
      setErrorCashBalance("Could not fetch cash balance.");
    } finally {
      setLoadingCashBalance(false);
    }
  };

  //done
  const fetchCommissionsFromSuppliers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosPrivate.get(
        `/admin/trialBalance/commission?month=${selectedMonth}`
      ); // Make sure this matches your backend route
      const {
        netAfterDeductions,
        totalCommission,
        breakdown,
        pastSalaries,
        pastExpenses,
      } = response.data;
      setCommissions({
        total: netAfterDeductions,
        rows: breakdown.map((item) => ({
          supplierName: item.supplierName,
          amount: item.commission,
        })),
        totalCommission,
        pastSalaries,
        pastExpenses,
      });
    } catch (err) {
      console.error("Failed to load commissions:", err);
      setError("Could not fetch commissions.");
    } finally {
      setLoading(false);
    }
  };

  //done
  const fetchCoolieCharges = async () => {
    setLoadingCoolie(true);
    setErrorCoolie(null);
    try {
      const response = await axiosPrivate.get(
        `/admin/trialBalance/coolie`
      );
      // `/admin/trialBalance/coolie?month=${selectedMonth}`
      const { totalCoolie, breakdown } = response.data;
      setCoolieCharges({
        total: totalCoolie,
        rows: breakdown.map((item) => ({
          supplierName: item.supplierName,
          amount: item.coolie || 0,
        })),
      });
    } catch (err) {
      console.error("Failed to load coolie charges:", err);
      setErrorCoolie("Could not fetch Coolie/Logistics data.");
    } finally {
      setLoadingCoolie(false);
    }
  };

  //done
  const fetchPayablesToSuppliers = async () => {
    try {
      const response = await axiosPrivate.get(
        `/admin/trialBalance/supplierbalance?month=${selectedMonth}`
      );
      const payables = response.data.payables.map((p) => ({
        label: p.supplierName,

        amount: p.balance,
      }));

      const receivables = response.data.receivables.map((r) => ({
        label: r.supplierName,
        invoice: "-",
        amount: r.balance,
      }));

      setSupplierPayables({
        total: payables.reduce((sum, row) => sum + row.amount, 0),
        rows: payables,
      });

      setSupplierReceivables({
        total: receivables.reduce((sum, row) => sum + row.amount, 0),
        rows: receivables,
      });

      setLoading(false);
    } catch (err) {
      console.error("Error fetching supplier balances:", err);
      setError("Failed to fetch supplier balances");
      setLoading(false);
    }
  };

  //done
  const fetchLenderPayables = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosPrivate.get(
        `/admin/trialBalance/lender?month=${selectedMonth}`
      );
      const { totalPayables, breakdown } = response.data;
      setLenderPayables({
        total: Number(totalPayables || 0),
        rows: Array.isArray(breakdown)
          ? breakdown.map((item) => ({
              lenderName: item.lenderName || "Unknown", // Lender name
              amount: Number(item.payable || 0), // Lender payable amount
            }))
          : [],
      });
    } catch (err) {
      console.error("Failed to load lender payables:", err);
      setError("Could not fetch payables to lenders.");
    } finally {
      setLoading(false);
    }
  };

  //done
  const fetchStockData = async () => {
    setLoadingStock(true);
    try {
      const response = await axiosPrivate.get(
        `/admin/trialBalance/stock?month=${selectedMonth}`
      );
      const data = response.data;
      // Transform to match frontend structure
      const rows = data.breakdown.map((item) => ({
        name: item.itemName,
        quantity: item.quantity,
        value: item.value,
      }));

      setStockData({
        total: data.totalStockValue,
        rows,
      });
      setLoadingStock(false);
    } catch (error) {
      console.error("Failed to fetch stock in hand:", error);
      setStockError("Failed to fetch stock in hand.");
      setLoadingStock(false);
    }
  };

  //done
  const fetchProfitLossData = async () => {
    try {
      const response = await axiosPrivate.get(
        `/admin/trialBalance/profitloss?month=${selectedMonth}`
      );
      setProfitLossData(response.data.summary);
    } catch (err) {
      setProfitLossError("Failed to fetch profit/loss.");
      console.log(err);
    } finally {
      setLoadingProfitLoss(false);
    }
  };

  const fetchExpenseData = async () => {
    setExpenseLoading(true);
    try {
      const response = await axiosPrivate.get(
        `/admin/trialBalance/expense?month=${selectedMonth}`
      );
      setExpense(response?.data);
    } catch (err) {
      setExpenseError("Failed to fetch expense");
      console.log(err);
    } finally {
      setExpenseLoading(false);
    }
  };

  const fetchVehicleData = async () => {
    setVehicleLoading(true);
    try {
      const response = await axiosPrivate.get(`/admin/trialBalance/vehicle`);
      console.log("vehicel=", response);
      setVehicleData(response?.data);
    } catch (err) {
      setVehicleError("Failed to fetch vehicle");
      console.log(err);
    } finally {
      setVehicleLoading(false);
    }
  };

  const totalReceivablesSum =
    (receivables?.total || 0) +
    (supplierReceivables?.total || 0) +
    (stockData?.total || 0) +
    (profitLossData?.totalLoss || 0) +
    (employeeReceivables?.total || 0) +
    (cashBalance?.total || 0) +
    (expense?.totalExpenses || 0) +
    (employeeReceivables?.totalSalaries || 0) +
    vehicleData?.expense?.netBalance;

  const totalPayablesSum =
    (commissions?.total || 0) +
    (coolieCharges?.total || 0) +
    (supplierPayables?.total || 0) +
    (profitLossData?.totalProfit || 0) +
    (lenderPayables?.total || 0) +
    vehicleData?.income?.netBalance;


    const handlePrintClick = () => {
      handleTrialBalancePrint({
        receivablesFromCustomers: receivables.total || 0,
        receivablesFromEmployees: employeeReceivables.total || 0,
        receivablesFromSuppliers: supplierReceivables.total || 0,
        payablesToSuppliers: supplierPayables.total || 0,
        payablesToLenders: lenderPayables.total || 0,
        vehicleReceivables: vehicleData.expense.netBalance || 0,
        vehiclePayables : vehicleData.income.netBalance || 0,
        totalCommission: commissions.totalCommission || 0,
        totalCoolie: coolieCharges.total || 0,
        totalExpense: expense.totalExpenses || 0,
        totalSalary: employeeReceivables.totalSalaries || 0,
        cashBalance: cashBalance.total || 0,
        stockInHand: stockData.total || 0,
        profit: profitLossData.totalProfit || 0,
        loss: profitLossData.totalLoss || 0,
      });
    };

  return (
    <div className="p-4 bg-white min-h-screen mt-10 rounded-xl">
      <nav className="text-gray-500 text-[20px] mb-4">
        Reports &gt; Trial Balance
      </nav>
      <div className="flex justify-between w-full">
        <h1 className="text-3xl font-semibold">Trial Balance</h1>
        <button 
             onClick={handlePrintClick}
        className="flex items-center px-4 py-2 bg-[#F9FAFB] rounded hover:bg-indigo-200">
          <Printer className="mr-2" size={16} /> Print
        </button>
        {/* <input
          type="month"
          value={selectedMonth}
          // onChange={(e) => setSelectedMonth(e.target.value)}
          className=" px-2 py-1 rounded"
        /> */}
      </div>

      <div className="flex flex-wrap gap-8 mt-10">
        {/* Receivables Section (Customers) */}
        <div className="flex-1">
          <div className="flex justify-between bg-[#F0FDFA] px-6 py-4">
            <span className="font-bold text-[#27AE60] uppercase text-xl">
              Receivables
            </span>
            <span className="font-bold text-[#27AE60] text-xl">
              ₹{totalReceivablesSum.toFixed(2)}
            </span>
          </div>

          <div className="rounded-b-lg mt-5">
            <div
              className="flex justify-between bg-[#F0F9FF] px-6 py-3 cursor-pointer"
              onClick={() => setOpenReceivableSection((prev) => !prev)}
            >
              <div className="flex items-center gap-2">
                {openReceivableSection ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
                <span className="font-semibold text-[#05004E]">
                  Receivables from Customers
                </span>
              </div>
              <span className="font-semibold text-[#05004E]">
                ₹{receivables.total.toFixed(2)}
              </span>
            </div>

            {openReceivableSection && (
              <>
                {loading && <p className="p-4">Loading...</p>}
                {error && <p className="p-4 text-red-500">{error}</p>}
                {!loading && !error && (
                  <table className="w-full">
                    <thead className="bg-[#F9FAFB] text-left text-sm text-[#05004E] uppercase border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-2 w-4/12">Customer</th>
                        <th className="px-6 py-2 w-4/12">Opening Balance</th>
                        <th className="px-6 py-2 w-4/12">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {receivables.rows.map((row, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-gray-200 hover:bg-gray-50"
                        >
                          <td className="px-6 py-2">{row.label}</td>
                          <td className="px-6 py-2">
                            ₹{(row.openingBalance || 0).toFixed(2)}
                          </td>
                          <td className="px-6 py-2">
                            ₹{row.amount.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>

          <div className="rounded-b-lg mt-5">
            <div
              className="flex justify-between bg-[#F0F9FF] px-6 py-3 cursor-pointer"
              onClick={() => setOpenSupplierReceivableSection((prev) => !prev)}
            >
              <div className="flex items-center gap-2">
                {openSupplierReceivableSection ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
                <span className="font-semibold text-[#05004E]">
                  Receivables from Suppliers
                </span>
              </div>
              <span className="font-semibold text-[#05004E]">
                ₹{supplierReceivables.total.toFixed(2)}
              </span>
            </div>

            {openSupplierReceivableSection && (
              <>
                {loading && <p className="p-4">Loading...</p>}
                {error && <p className="p-4 text-red-500">{error}</p>}
                {!loading && !error && (
                  <table className="w-full">
                    <thead className="bg-[#F9FAFB] text-left text-sm text-[#05004E] uppercase border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-2 w-5/12">Supplier</th>
                        <th className="px-6 py-2 w-3/12">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {supplierReceivables.rows.map((row, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-gray-200 hover:bg-gray-50"
                        >
                          <td className="px-6 py-2">{row.label}</td>
                          <td className="px-6 py-2">
                            ₹{row.amount.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>

          {/* Receivables Section (Employee) */}
          <div className="rounded-b-lg mt-5">
            <div
              className="flex justify-between bg-[#F0F9FF] px-6 py-3 cursor-pointer"
              onClick={() => setOpenEmployeeReceivableSection((prev) => !prev)}
            >
              <div className="flex items-center gap-2">
                {openEmployeeReceivableSection ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
                <span className="font-semibold text-[#05004E]">
                  Receivables from Employees
                </span>
              </div>
              <span className="font-semibold text-[#05004E]">
                ₹{employeeReceivables.total.toFixed(2)}
              </span>
            </div>

            {openEmployeeReceivableSection && (
              <>
                {loading && <p className="p-4">Loading...</p>}
                {error && <p className="p-4 text-red-500">{error}</p>}
                {!loading && !error && (
                  <table className="w-full">
                    <thead className="bg-[#F9FAFB] text-left text-sm text-[#05004E] uppercase border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-2 w-4/12">Employee</th>
                        <th className="px-6 py-2 w-4/12">Opening Balance</th>
                        <th className="px-6 py-2 w-4/12">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeReceivables.rows.map((row, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-gray-200 hover:bg-gray-50"
                        >
                          <td className="px-6 py-2">{row.label}</td>
                          <td className="px-6 py-2">
                            ₹{row.openingbalance?.toFixed(2)}
                          </td>
                          <td className="px-6 py-2">
                            ₹{row?.amount?.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>


          {/* vehicle Receivables section */}
          <div className="rounded-b-lg mt-5">
            <div
              className="flex justify-between bg-[#F0F9FF] px-6 py-3 cursor-pointer"
              onClick={() => setOpenVehicleReceivableSection((prev) => !prev)}
            >
              <div className="flex items-center gap-2">
                {openVehicleReceivableSection ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
                <span className="font-semibold text-[#05004E]">
                  Receivables from vehicles
                </span>
              </div>
              <span className="font-semibold text-[#05004E]">
                ₹{vehicleData?.expense?.netBalance?.toFixed(2)}
              </span>
            </div>

            {openVehicleReceivableSection && (
              <>
                {vehicleLoading && <p className="p-4">Loading...</p>}
                {vehicleError && <p className="p-4 text-red-500">{vehicleError}</p>}
                {!vehicleLoading && !vehicleError && (
                  <table className="w-full">
                    <thead className="bg-[#F9FAFB] text-left text-sm text-[#05004E] uppercase border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-2 w-5/12">Vehicle</th>
                        <th className="px-6 py-2 w-3/12">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vehicleData?.expense?.vehicles?.map((row, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-gray-200 hover:bg-gray-50"
                        >
                          <td className="px-6 py-2">{row?.vehicleName}</td>
                          <td className="px-6 py-2">
                            ₹{row?.netBalance?.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>

          {/* Receivables Section (stock in) */}
          <div className="rounded-b-lg mt-5">
            <div
              className="flex justify-between  bg-[#F0F9FF] px-6 py-3 cursor-pointer"
              onClick={() => setOpenStockSection((prev) => !prev)}
            >
              <div className="flex items-center gap-2">
                {openStockSection ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
                <span className="font-semibold text-[#05004E]">
                  Stock in Hand
                </span>
              </div>
              <span className="font-semibold text-[#05004E]">
                ₹{stockData.total.toFixed(2)}
              </span>
            </div>

            {openStockSection && (
              <>
                {loadingStock && <p className="p-4">Loading...</p>}
                {stockError && <p className="p-4 text-red-500">{stockError}</p>}
                {!loadingStock && !stockError && (
                  <table className="w-full">
                    <thead className="bg-[#F9FAFB] text-left text-sm text-[#05004E] uppercase border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-2 w-4/12">Item</th>
                        <th className="px-6 py-2 w-4/12">Quantity</th>
                        <th className="px-6 py-2 w-4/12">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stockData.rows.map((item, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-gray-200 hover:bg-gray-50"
                        >
                          <td className="px-6 py-2">{item.name}</td>
                          <td className="px-6 py-2">{item.quantity}</td>
                          <td className="px-6 py-2">
                            ₹{item.value.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>

          {/* expense */}
          <div className="rounded-b-lg mt-5">
            <div
              className="flex justify-between bg-[#F0F9FF] px-6 py-3 cursor-pointer"
              onClick={() => setOpenExpenseSection((prev) => !prev)}
            >
              <div className="flex items-center gap-2">
                {openExpenseSection ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
                <span className="font-semibold text-[#05004E]">Expense</span>
              </div>
              <span className="font-semibold text-[#05004E]">
                ₹{expense?.totalExpenses?.toFixed(2)}
              </span>
            </div>

            {openExpenseSection && (
              <>
                {expenseLoading && <p className="p-4">Loading...</p>}
                {expenseError && (
                  <p className="p-4 text-red-500">{expenseError}</p>
                )}
                {!expenseLoading &&
                  !error &&
                  expense?.breakdown?.length > 0 && (
                    <table className="w-full">
                      <thead className="bg-[#F9FAFB] text-left text-sm text-[#05004E] uppercase border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-2 w-5/12">Type</th>
                          <th className="px-6 py-2 w-3/12">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {expense?.breakdown?.map((row, idx) => (
                          <tr
                            key={idx}
                            className="border-b border-gray-200 hover:bg-gray-50"
                          >
                            <td className="px-6 py-2">{row?.expenseName}</td>
                            <td className="px-6 py-2">
                              ₹{row?.totalAmount?.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
              </>
            )}
          </div>

          {/* salary section */}
          <div className="rounded-b-lg mt-5">
            <div
              className="flex justify-between bg-[#F0F9FF] px-6 py-3 cursor-pointer"
              onClick={() => setSalaryOpen((prev) => !prev)}
            >
              <div className="flex items-center gap-2">
                {salaryOpen ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
                <span className="font-semibold text-[#05004E]">Salary</span>
              </div>
              <span className="font-semibold text-[#05004E]">
                ₹{employeeReceivables?.totalSalaries?.toFixed(2)}
              </span>
            </div>

            {salaryOpen && (
              <>
                {loading && <p className="p-4">Loading...</p>}
                {error && <p className="p-4 text-red-500">{error}</p>}
                {!loading && !error && (
                  <table className="w-full">
                    <thead className="bg-[#F9FAFB] text-left text-sm text-[#05004E] uppercase border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-2 w-5/12">Employee</th>
                        <th className="px-6 py-2 w-3/12">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeReceivables?.salaryBreakdown?.map((row, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-gray-200 hover:bg-gray-50"
                        >
                          <td className="px-6 py-2">{row?.employeeName}</td>
                          <td className="px-6 py-2">
                            ₹{row?.totalSalary?.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>

          {/* Receivables Section (loss ) */}
          <div className="rounded-b-lg mt-5">
            <div
              className="flex justify-between bg-[#F0F9FF] px-6 py-3 cursor-pointer"
              // onClick={() => setOpenLossSection((prev) => !prev)}
            >
              <div className="flex items-center gap-2">
                {/* {openLossSection ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )} */}
                <span className="font-semibold text-[#05004E]">
                  Sales Difference (Loss)
                </span>
              </div>
              <span className="font-semibold text-[#05004E]">
                ₹{(profitLossData?.totalLoss || 0).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Receivables Section (Cash Balance) */}
          <div className="rounded-b-lg mt-5">
            <div
              className="flex justify-between bg-[#F0F9FF] px-6 py-3 cursor-pointer"
              // onClick={() => setOpenCashBalanceSection((prev) => !prev)}
            >
              <div className="flex items-center gap-2">
                {/* {openCashBalanceSection ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )} */}
                <span className="font-semibold text-[#05004E]">
                  Cash Balance
                </span>
              </div>
              {loadingCashBalance ? (
                <p className="p-4">Loading...</p>
              ) : (
                <span className="font-semibold text-[#05004E]">
                  ₹{cashBalance.total.toFixed(2)}
                </span>
              )}
            </div>
            {errorCashBalance && (
              <p className="p-4 text-red-500">{errorCashBalance}</p>
            )}
          </div>
        </div>
        {/* Payables Section */}
        <div className="flex-1">
          <div className="flex justify-between bg-[#FEF2F2] px-6 py-4">
            <span className="font-bold text-[#EB5757] uppercase text-xl">
              Payables
            </span>
            <span className="font-bold text-[#EB5757] text-xl">
              ₹{totalPayablesSum.toFixed(2)}
            </span>
          </div>
          {/* Receivables Section (commission) */}
          <div className="rounded-b-lg mt-5">
            <div
              className="flex justify-between bg-[#F0F9FF] px-6 py-3 cursor-pointer"
              onClick={() => setOpenCommissionSection((prev) => !prev)}
            >
              <div className="flex items-center gap-2">
                {openCommissionSection ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
                <span className="font-semibold text-[#05004E]">
                  Commissions
                </span>
              </div>
              <span className="font-semibold text-[#05004E]">
                ₹{commissions.total.toFixed(2)}
              </span>
            </div>

            {openCommissionSection && (
              <>
                {loading && <p className="p-4">Loading...</p>}
                {error && <p className="p-4 text-red-500">{error}</p>}
                {!loading && !error && (
                  <table className="w-full">
                    <thead className="bg-[#F9FAFB] text-left text-sm text-[#05004E] uppercase border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-2 w-5/12">Supplier</th>
                        <th className="px-6 py-2 w-3/12">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {commissions.rows.map((row, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-gray-200 hover:bg-gray-50"
                        >
                          <td className="px-6 py-2">{row.supplierName}</td>
                          <td className="px-6 py-2">
                            ₹{row.amount.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                      <tr className="font-semibold bg-[#F9FAFB] text-left text-sm text-[#05004E]  border-b border-gray-200">
                        <td className="px-6 py-2">
                          Total Commission (Before Deductions)
                        </td>
                        <td className="px-6 py-2">
                          ₹{commissions?.totalCommission}
                        </td>
                      </tr>
                      <tr className="font-semibold bg-[#F9FAFB] text-left text-sm text-[#05004E]  border-b border-gray-200">
                        <td className="px-6 py-2">
                          Expenses Till Previous Month
                        </td>
                        <td className="px-6 py-2">
                          ₹{commissions?.pastExpenses}
                        </td>
                      </tr>
                      <tr className="font-semibold bg-[#F9FAFB] text-left text-sm text-[#05004E]  border-b border-gray-200">
                        <td className="px-6 py-2">
                          Salaries Till Previous Month
                        </td>
                        <td className="px-6 py-2">
                          ₹{commissions?.pastSalaries}
                        </td>
                      </tr>
                      <tr className="font-semibold bg-[#F9FAFB] text-left text-sm text-[#05004E]  border-b border-gray-200">
                        <td className="px-6 py-2">
                          Net Commission After Deductions
                        </td>
                        <td className="px-6 py-2">₹{commissions?.total}</td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>

          {/* Receivables Section (coolie) */}
          <div className="rounded-b-lg mt-5">
            <div
              className="flex justify-between bg-[#F0F9FF] px-6 py-3 cursor-pointer"
              onClick={() => setOpenCoolieSection((prev) => !prev)}
            >
              <div className="flex items-center gap-2">
                {openCoolieSection ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
                <span className="font-semibold text-[#05004E]">
                  Coolie / Logistics Charges
                </span>
              </div>
              <span className="font-semibold text-[#05004E]">
                ₹{coolieCharges.total.toFixed(2)}
              </span>
            </div>

            {openCoolieSection && (
              <>
                {loadingCoolie && <p className="p-4">Loading...</p>}
                {errorCoolie && (
                  <p className="p-4 text-red-500">{errorCoolie}</p>
                )}
                {!loadingCoolie && !errorCoolie && (
                  <table className="w-full">
                    <thead className="bg-[#F9FAFB] text-left text-sm text-[#05004E] uppercase border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-2 w-5/12">Supplier</th>
                        <th className="px-6 py-2 w-3/12">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {coolieCharges.rows.map((row, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-gray-200 hover:bg-gray-50"
                        >
                          <td className="px-6 py-2">{row.supplierName}</td>
                          <td className="px-6 py-2">
                            ₹{row.amount.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>

          <div className="rounded-b-lg mt-5">
            <div
              className="flex justify-between bg-[#F0F9FF] px-6 py-3 cursor-pointer"
              onClick={() => setOpenSupplierPayableSection((prev) => !prev)}
            >
              <div className="flex items-center gap-2">
                {openSupplierPayableSection ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
                <span className="font-semibold text-[#05004E]">
                  Payables to Suppliers
                </span>
              </div>
              <span className="font-semibold text-[#05004E]">
                ₹{supplierPayables.total.toFixed(2)}
              </span>
            </div>

            {openSupplierPayableSection && (
              <>
                {loading && <p className="p-4">Loading...</p>}
                {error && <p className="p-4 text-red-500">{error}</p>}
                {!loading && !error && (
                  <table className="w-full">
                    <thead className="bg-[#F9FAFB] text-left text-sm text-[#05004E] uppercase border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-2 w-5/12">Supplier</th>
                        <th className="px-6 py-2 w-3/12">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {supplierPayables.rows.map((row, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-gray-200 hover:bg-gray-50"
                        >
                          <td className="px-6 py-2">{row.label}</td>
                          <td className="px-6 py-2">
                            ₹{row.amount.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>

          {/* Receivables Section (payable to lender ) */}
          <div className="rounded-b-lg mt-5">
            <div
              className="flex justify-between bg-[#F0F9FF] px-6 py-3 cursor-pointer"
              onClick={() => setOpenLenderPayables((prev) => !prev)}
            >
              <div className="flex items-center gap-2">
                {openLenderPayables ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
                <span className="font-semibold text-[#05004E]">
                  Payables to Lenders
                </span>
              </div>
              <span className="font-semibold text-[#05004E]">
                ₹{Number(lenderPayables?.total ?? 0).toFixed(2)}
              </span>
            </div>

            {openLenderPayables && (
              <>
                {loading && <p className="p-4">Loading...</p>}
                {error && <p className="p-4 text-red-500">{error}</p>}

                {!loading && !error && (
                  <table className="w-full">
                    <thead className="bg-[#F9FAFB] text-left text-sm text-[#05004E] uppercase border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-2 w-5/12">Lender</th>
                        <th className="px-6 py-2 w-3/12">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lenderPayables.rows.map((row, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-gray-200 hover:bg-gray-50"
                        >
                          <td className="px-6 py-2">{row.lenderName}</td>
                          <td className="px-6 py-2">
                            ₹{Number(row.amount).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>

          {/* vehicle payable section */}
          <div className="rounded-b-lg mt-5">
            <div
              className="flex justify-between bg-[#F0F9FF] px-6 py-3 cursor-pointer"
              onClick={() => setOpenVehiclePayableSection((prev) => !prev)}
            >
              <div className="flex items-center gap-2">
                {openVehiclePayableSection ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
                <span className="font-semibold text-[#05004E]">
                  Payables to vehicles
                </span>
              </div>
              <span className="font-semibold text-[#05004E]">
                ₹{vehicleData?.income?.netBalance?.toFixed(2)}
              </span>
            </div>

            {openVehiclePayableSection && (
              <>
                {vehicleLoading && <p className="p-4">Loading...</p>}
                {vehicleError && <p className="p-4 text-red-500">{vehicleError}</p>}
                {!vehicleLoading && !vehicleError && (
                  <table className="w-full">
                    <thead className="bg-[#F9FAFB] text-left text-sm text-[#05004E] uppercase border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-2 w-5/12">Vehicle</th>
                        <th className="px-6 py-2 w-3/12">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vehicleData?.income?.vehicles?.map((row, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-gray-200 hover:bg-gray-50"
                        >
                          <td className="px-6 py-2">{row?.vehicleName}</td>
                          <td className="px-6 py-2">
                            ₹{row?.netBalance?.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>

          {/* Receivables Section (profit ) */}
          <div className="rounded-b-lg mt-5">
            <div
              className="flex justify-between bg-[#F0F9FF] px-6 py-3 cursor-pointer"
              // onClick={() => setOpenProfitLossSection((prev) => !prev)}
            >
              <div className="flex items-center gap-2">
                {/* {openProfitLossSection ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )} */}
                <span className="font-semibold text-[#05004E]">
                  Sales Difference (Profit){" "}
                </span>
              </div>
              <span className="font-semibold text-[#05004E]">
                ₹{(profitLossData?.totalProfit || 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
