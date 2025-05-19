import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { ChevronDown, ChevronUp, Printer } from 'lucide-react';

// Mock payables data (replace with real API when available)


export default function TrialBalance() {

  // Date range state
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  // Data state for receivables from suppliers
  const [supplierReceivables, setSupplierReceivables] = useState({ total: 0, rows: [] });


  // Data state for receivables
  const [receivables, setReceivables] = useState({ total: 0, rows: [] });
  const [openReceivableSection, setOpenReceivableSection] = useState(false);

  // Data state for payables
  const [openPayables, setOpenPayables] = useState({});


  const [openSupplierPayables, setOpenSupplierPayables] = useState(false);
  const [supplierPayables, setSupplierPayables] = useState({ total: 0, rows: [] });
  const [loadingSupplierPayables, setLoadingSupplierPayables] = useState(false);
  const [errorSupplierPayables, setErrorSupplierPayables] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openEmployeeReceivableSection, setOpenEmployeeReceivableSection] = useState(false);
  const [employeeReceivables, setEmployeeReceivables] = useState({
    total: 0,
    rows: [],
  });

  const [openStockSection, setOpenStockSection] = useState(false);
  const [stockData, setStockData] = useState({ total: 0, rows: [] });
  const [loadingStock, setLoadingStock] = useState(true);
  const [stockError, setStockError] = useState(null);

  const axiosPrivate = useAxiosPrivate();
  const [commissions, setCommissions] = useState({
    total: 0,
    rows: [],
  });

  const [openCommissionSection, setOpenCommissionSection] = useState(false);

  const [cashBalance, setCashBalance] = useState({ total: 0 });
  const [loadingCashBalance, setLoadingCashBalance] = useState(false);
  const [errorCashBalance, setErrorCashBalance] = useState(null);
  const [openCashBalanceSection, setOpenCashBalanceSection] = useState(false);

  const [openLenderPayables, setOpenLenderPayables] = useState(false);
  const [lenderPayables, setLenderPayables] = useState({ total: 0, rows: [] });

  const [openSupplierReceivableSection, setOpenSupplierReceivableSection] = useState(false);
  const [openSupplierPayableSection, setOpenSupplierPayableSection] = useState(false); // <-- this is missing!


  const [openCoolieSection, setOpenCoolieSection] = useState(false);
  const [coolieCharges, setCoolieCharges] = useState({ total: 0, rows: [] });
  const [loadingCoolie, setLoadingCoolie] = useState(false);
  const [errorCoolie, setErrorCoolie] = useState(null);



  const [openProfitLossSection, setOpenProfitLossSection] = useState(true);
  const [profitLossData, setProfitLossData] = useState(null);
  const [loadingProfitLoss, setLoadingProfitLoss] = useState(false);
  const [profitLossError, setProfitLossError] = useState(null);


  const [openProfitLoss, setOpenProfitLoss] = useState(false);
  const [data, setData] = useState(null);


  // Fetch receivables from backend
  const fetchReceivables = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosPrivate.get(
        '/admin/trialBalance/receivable',
        { params: { startDate, endDate } }
      );

      const { totalReceivables, breakdown } = response.data;

      setReceivables({
        total: totalReceivables,
        rows: breakdown.map((item) => ({
          label: item.customerName,

          amount: item.balance,
          openingBalance: item.openingBalance, // ✅ Added here
        })),
      });
    } catch (err) {
      console.error('Failed to load receivables:', err);
      setError('Could not fetch receivables.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (openProfitLoss && !data) {
      fetchProfitAndLoss();
    }
  }, [openProfitLoss]);

  const fetchProfitAndLoss = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/profit-loss"); // Update path if needed
      setData(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to load profit and loss data.");
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


  }, [startDate, endDate]);



  // Fetch receivables from suppliers
  // const fetchPayablesToSuppliers = async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await axiosPrivate.get(
  //       '/admin/trialBalance/suppliers',
  //       { params: { startDate, endDate } }
  //     );
  //     const { totalPayables, breakdown } = response.data;
  //     setSupplierReceivables({
  //       total: totalPayables,
  //       rows: breakdown.map(item => ({
  //         label: item.supplierName,
  //         invoice: '-', // Placeholder
  //         amount: item.balance,
  //       })),
  //     });
  //   } catch (err) {
  //     console.error('Failed to load supplier receivables:', err);
  //     setError('Could not fetch payables to suppliers.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const fetchReceivablesFromEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosPrivate.get(
        '/admin/trialBalance/employee',
        { params: { startDate, endDate } } // Optionally pass date range if required
      );

      const { totalReceivables, breakdown } = response.data;

      setEmployeeReceivables({
        total: totalReceivables,
        rows: breakdown.map(item => ({
          label: item.employeeName, // Employee name from backend

          amount: item.balance, // Balance for the employee
        })),
      });
    } catch (err) {
      console.error('Failed to load employee receivables:', err);
      setError('Could not fetch receivables from employees.');
    } finally {
      setLoading(false);
    }
  };

  // const fetchMarketFeesFromSuppliers = async () => {
  //   setLoading(true); // Loading state for Market Fees
  //   setError(null); // Reset any errors

  //   try {
  //     const response = await axiosPrivate.get(
  //       '/admin/trialBalance/marketfee', // Endpoint to fetch market fees
  //       { params: { startDate, endDate } } // Optional date filter if needed
  //     );

  //     const { totalMarketFees, breakdown } = response.data;

  //     setMarketFees({
  //       total: totalMarketFees,
  //       rows: breakdown.map(item => ({
  //         label: item.supplierName, // Supplier name
  //         invoice: '-', // Placeholder (since no invoice is available)
  //         amount: item.marketFee, // Market fee amount for the supplier
  //       })),
  //     });
  //   } catch (err) {
  //     console.error('Failed to load market fees from suppliers:', err);
  //     setError('Could not fetch market fees from suppliers.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const fetchCashBalance = async () => {
    setLoadingCashBalance(true);
    setErrorCashBalance(null);

    try {
      const response = await axiosPrivate.get('/admin/trialBalance/cashbalance');
      const { cashBalance } = response.data;

      setCashBalance({ total: Number(cashBalance || 0) });
    } catch (err) {
      console.error('Failed to load cash balance:', err);
      setErrorCashBalance('Could not fetch cash balance.');
    } finally {
      setLoadingCashBalance(false);
    }
  };

  const fetchCommissionsFromSuppliers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosPrivate.get('/admin/trialBalance/commission'); // Make sure this matches your backend route
      const { totalCommission, breakdown } = response.data;

      setCommissions({
        total: totalCommission,
        rows: breakdown.map((item) => ({
          supplierName: item.supplierName,
          amount: item.commission,
        })),
      });

    } catch (err) {
      console.error('Failed to load commissions:', err);
      setError('Could not fetch commissions.');
    } finally {
      setLoading(false);
    }
  };


  const fetchCoolieCharges = async () => {
    setLoadingCoolie(true);
    setErrorCoolie(null);
    try {
      const response = await axiosPrivate.get('/admin/trialBalance/coolie');
      const { totalCoolie, breakdown } = response.data;

      setCoolieCharges({
        total: totalCoolie,
        rows: breakdown.map(item => ({
          supplierName: item.supplierName,
          amount: item.coolie || 0,
        })),
      });
    } catch (err) {
      console.error('Failed to load coolie charges:', err);
      setErrorCoolie('Could not fetch Coolie/Logistics data.');
    } finally {
      setLoadingCoolie(false);
    }
  };


  // const fetchPayablesToSupplier = async () => {
  //   setLoadingSupplierPayables(true);
  //   setErrorSupplierPayables(null);

  //   try {
  //     const response = await axiosPrivate.get('/admin/trialBalance/pay');
  //     const { totalPayables, breakdown } = response.data;

  //     setSupplierPayables({
  //       total: Number(totalPayables || 0),
  //       rows: Array.isArray(breakdown)
  //         ? breakdown.map(item => ({
  //           supplierName: item.supplierName || 'Unknown',
  //           amount: Number(item.payable || 0),
  //         }))
  //         : [],
  //     });
  //   } catch (err) {
  //     console.error('Failed to load supplier payables:', err);
  //     setErrorSupplierPayables('Could not fetch payables to suppliers.');
  //   } finally {
  //     setLoadingSupplierPayables(false);
  //   }
  // };


  const fetchPayablesToSuppliers = async () => {
    try {
      const response = await axiosPrivate.get('/admin/trialBalance/supplierbalance');

      const payables = response.data.payables.map(p => ({
        label: p.supplierName,

        amount: p.balance,
      }));

      const receivables = response.data.receivables.map(r => ({
        label: r.supplierName,
        invoice: '-',
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
      console.error('Error fetching supplier balances:', err);
      setError('Failed to fetch supplier balances');
      setLoading(false);
    }
  };

  const fetchLenderPayables = async () => {
    setLoading(true);
    setError(null);

    try {
      // Adjust your API endpoint to get lender payables
      const response = await axiosPrivate.get('/admin/trialBalance/lender');  // <-- Update endpoint
      const { totalPayables, breakdown } = response.data;

      // Update state with lender payables data
      setLenderPayables({
        total: Number(totalPayables || 0),
        rows: Array.isArray(breakdown)
          ? breakdown.map(item => ({
            lenderName: item.lenderName || 'Unknown',  // Lender name
            amount: Number(item.payable || 0),  // Lender payable amount
          }))
          : [],
      });
      console.log(response)
    } catch (err) {
      console.error('Failed to load lender payables:', err);
      setError('Could not fetch payables to lenders.');
    } finally {
      setLoading(false);
    }
  };


  const fetchStockData = async () => {
    setLoadingStock(true);
    try {
      const response = await axiosPrivate.get('/admin/trialBalance/stock');
      const data = response.data;
      console.log(response)
      // Transform to match frontend structure
      const rows = data.breakdown.map(item => ({
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


  const fetchProfitLossData = async () => {
    setLoadingProfitLoss(true);
    try {
      const res = await axios.get("/api/profit-loss"); // Backend API endpoint
      setProfitLossData(res.data);
    } catch (err) {
      console.error("Error fetching Profit & Loss data", err);
      setProfitLossError("Failed to fetch Profit & Loss data.");
    } finally {
      setLoadingProfitLoss(false);
    }
  };

  const totalReceivablesSum =
    (receivables?.total || 0) +
    (supplierReceivables?.total || 0) +
    (stockData?.total || 0) +
    (employeeReceivables?.total || 0) +
    (cashBalance?.total || 0);

  const totalPayablesSum =
    (commissions?.total || 0) +
    (coolieCharges?.total || 0) +
    (supplierPayables?.total || 0) +
    (lenderPayables?.total || 0);

  return (
    <div className="p-4 bg-white min-h-screen mt-10 rounded-xl">
      <nav className="text-gray-500 text-[20px] mb-4">Reports &gt; Trial Balance</nav>
      <div className="flex justify-between w-full">
        <h1 className="text-3xl font-semibold">Trial Balance</h1>
        <button className="flex items-center px-4 py-2 bg-[#F9FAFB] rounded hover:bg-indigo-200">
          <Printer className="mr-2" size={16} /> Print
        </button>
      </div>



      <div className="flex flex-wrap gap-8 mt-10">
        {/* Receivables Section (Customers) */}
        <div className="flex-1">
          <div className="flex justify-between bg-[#F0FDFA] px-6 py-4">
            <span className="font-bold text-[#27AE60] uppercase text-[24px]">Receivables</span>
            <span className="font-bold text-[#2E7D32] text-lg">
              ₹{totalReceivablesSum.toFixed(2)}
            </span>
          </div>
          <div className="rounded-b-lg">
            <div
              className="flex justify-between bg-[#F0F9FF] px-6 py-3 cursor-pointer"
              onClick={() => setOpenReceivableSection((prev) => !prev)}
            >
              <div className="flex items-center gap-2">
                {openReceivableSection ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                <span className="font-semibold text-[#05004E]">Receivables from Customers</span>
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
                        <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-6 py-2">{row.label}</td>
                          <td className="px-6 py-2">₹{(row.openingBalance || 0).toFixed(2)}</td>
                          <td className="px-6 py-2">₹{row.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>


          {/* Receivables Section (Suppliers) */}
          {/* <div className="rounded-b-lg">
            <div
              className="flex justify-between bg-[#F0F9FF] px-6 py-3 cursor-pointer"
              onClick={() => setOpenSupplierReceivableSection(prev => !prev)}
            >
              <div className="flex items-center gap-2">
                {openSupplierReceivableSection ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                <span className="font-semibold text-[#05004E]">Receivables from Suppliers</span>
              </div>
              <span className="font-semibold text-[#05004E]">₹{supplierReceivables.total.toFixed(2)}</span>
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
                        <th className="px-6 py-2 w-3/12">Invoice No.</th>
                        <th className="px-6 py-2 w-3/12">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {supplierReceivables.rows.map((row, idx) => (
                        <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-6 py-2">{row.label}</td>
                          <td className="px-6 py-2">{row.invoice}</td>
                          <td className="px-6 py-2">₹{row.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div> */}

          <div className="rounded-b-lg">
            <div
              className="flex justify-between bg-[#F0F9FF] px-6 py-3 cursor-pointer"
              onClick={() => setOpenSupplierReceivableSection(prev => !prev)}
            >
              <div className="flex items-center gap-2">
                {openSupplierReceivableSection ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                <span className="font-semibold text-[#05004E]">Receivables from Suppliers</span>
              </div>
              <span className="font-semibold text-[#05004E]">₹{supplierReceivables.total.toFixed(2)}</span>
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
                        <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-6 py-2">{row.label}</td>
                          <td className="px-6 py-2">₹{row.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>


          {/* Receivables Section (Employee) */}
          <div className="rounded-b-lg">
            <div
              className="flex justify-between bg-[#F0F9FF] px-6 py-3 cursor-pointer"
              onClick={() => setOpenEmployeeReceivableSection(prev => !prev)}
            >
              <div className="flex items-center gap-2">
                {openEmployeeReceivableSection ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                <span className="font-semibold text-[#05004E]">Receivables from Employees</span>
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
                        <th className="px-6 py-2 w-5/12">Employee</th>
                        <th className="px-6 py-2 w-3/12">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeReceivables.rows.map((row, idx) => (
                        <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-6 py-2">{row.label}</td>
                          <td className="px-6 py-2">₹{row.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>

          {/* Receivables Section (stock in) */}
          <div className="rounded-b-lg">
            <div
              className="flex justify-between  bg-[#F0F9FF] px-6 py-3 cursor-pointer"
              onClick={() => setOpenStockSection(prev => !prev)}
            >
              <div className="flex items-center gap-2">
                {openStockSection ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                <span className="font-semibold text-[#05004E]">Stock in Hand</span>
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
                        <th className="px-6 py-2 w-6/12">Item</th>
                        <th className="px-6 py-2 w-3/12">Quantity</th>
                        <th className="px-6 py-2 w-3/12">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stockData.rows.map((item, idx) => (
                        <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-6 py-2">{item.name}</td>
                          <td className="px-6 py-2">{item.quantity}</td>
                          <td className="px-6 py-2">₹{item.value.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>

  {/* Receivables Section (profit ) */}
          <div className="rounded-b-lg">
      <div
        className="flex justify-between bg-[#F0F9FF] px-6 py-3 cursor-pointer"
        onClick={() => setOpenProfitLossSection(prev => !prev)}
      >
        <div className="flex items-center gap-2">
          {openProfitLossSection ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          <span className="font-semibold text-[#05004E]">Profit </span>
        </div>
        <span className="font-semibold text-[#05004E]">
          {profitLossData ? formatAmount(profitLossData.totalProfitOrLoss) : "₹0.00"}
        </span>
      </div>

      {openProfitLossSection && (
        <>
          {loadingProfitLoss && <p className="p-4">Loading...</p>}
          {profitLossError && <p className="p-4 text-red-500">{profitLossError}</p>}

          {!loadingProfitLoss && !profitLossError && profitLossData && (
            <table className="w-full">
              <thead className="bg-[#F9FAFB] text-left text-sm text-[#05004E] uppercase border-b border-gray-200">
                <tr>
                  <th className="px-6 py-2 w-6/12">Description</th>
                  <th className="px-6 py-2 w-3/12">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-2">Total Sales</td>
                  <td className="px-6 py-2">{formatAmount(profitLossData.totalSales)}</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-2">Total Purchases</td>
                  <td className="px-6 py-2">{formatAmount(profitLossData.totalPurchases)}</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-2">Commission Paid</td>
                  <td className="px-6 py-2">{formatAmount(profitLossData.totalCommissionPaid)}</td>
                </tr>
                <tr className="font-semibold border-t bg-gray-50 hover:bg-gray-100">
                  <td className="px-6 py-2">Net Profit/Loss</td>
                  <td
                    className={`px-6 py-2 ₹{
                      profitLossData.netProfitOrLoss >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {formatAmount(profitLossData.netProfitOrLoss)}
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </>
      )}
    </div>

          {/* Receivables Section (Cash Balance) */}
          <div className="rounded-b-lg">
            <div
              className="flex justify-between bg-[#F0F9FF] px-6 py-3 cursor-pointer"
              onClick={() => setOpenCashBalanceSection(prev => !prev)}
            >
              <div className="flex items-center gap-2">
                {openCashBalanceSection ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                <span className="font-semibold text-[#05004E]">Cash Balance</span>
              </div>
              <span className="font-semibold text-[#05004E]">₹{cashBalance.total.toFixed(2)}</span>
            </div>

            {openCashBalanceSection && (
              <>
                {loadingCashBalance && <p className="p-4">Loading...</p>}
                {errorCashBalance && <p className="p-4 text-red-500">{errorCashBalance}</p>}

              </>
            )}
          </div>

        </div>
        {/* Payables Section */}
        <div className="flex-1">
          <div className="flex justify-between bg-[#FEF2F2] px-6 py-4">
            <span className="font-bold text-[#EB5757] uppercase text-[24px]">Payables</span>
            <span className="font-bold text-[#EB5757] text-[20px]">
              Total: ₹{totalPayablesSum.toFixed(2)}
            </span>
          </div>
          {/* Receivables Section (commission) */}
          <div className="rounded-b-lg">
            <div
              className="flex justify-between bg-[#F0F9FF] px-6 py-3 cursor-pointer"
              onClick={() => setOpenCommissionSection(prev => !prev)}
            >
              <div className="flex items-center gap-2">
                {openCommissionSection ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                <span className="font-semibold text-[#05004E]">Commissions</span>
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
                        <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-6 py-2">{row.supplierName}</td>
                          <td className="px-6 py-2">₹{row.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>


          {/* Receivables Section (coolie) */}
          <div className="rounded-b-lg">
            <div
              className="flex justify-between bg-[#F0F9FF] px-6 py-3 cursor-pointer"
              onClick={() => setOpenCoolieSection(prev => !prev)}
            >
              <div className="flex items-center gap-2">
                {openCoolieSection ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                <span className="font-semibold text-[#05004E]">Coolie / Logistics Charges</span>
              </div>
              <span className="font-semibold text-[#05004E]">₹{coolieCharges.total.toFixed(2)}</span>
            </div>

            {openCoolieSection && (
              <>
                {loadingCoolie && <p className="p-4">Loading...</p>}
                {errorCoolie && <p className="p-4 text-red-500">{errorCoolie}</p>}
                {!loadingCoolie && !errorCoolie && (
                  <table className="w-full">
                    <thead className="bg-[#F9FAFB] text-left text-sm text-[#05004E] uppercase border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-2 w-6/12">Supplier</th>
                        <th className="px-6 py-2 w-6/12">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {coolieCharges.rows.map((row, idx) => (
                        <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-6 py-2">{row.supplierName}</td>
                          <td className="px-6 py-2">₹{row.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>

          {/* Receivables Section (payable to supplier ) */}
          {/* <div className="rounded-b-lg">
            <div
              className="flex justify-between bg-[#F0F9FF] px-6 py-3 cursor-pointer"
              onClick={() => setOpenSupplierReceivableSection(prev => !prev)}
            >
              <div className="flex items-center gap-2">
                {openSupplierReceivableSection ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                <span className="font-semibold text-[#05004E]">Payables to suppliers</span>
              </div>
              <span className="font-semibold text-[#05004E]">₹{supplierReceivables.total.toFixed(2)}</span>
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
                        <th className="px-6 py-2 w-3/12">Invoice No.</th>
                        <th className="px-6 py-2 w-3/12">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {supplierReceivables.rows.map((row, idx) => (
                        <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-6 py-2">{row.label}</td>
                          <td className="px-6 py-2">{row.invoice}</td>
                          <td className="px-6 py-2">₹{row.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div> */}

          <div className="rounded-b-lg">
            <div
              className="flex justify-between bg-[#F0F9FF] px-6 py-3 cursor-pointer"
              onClick={() => setOpenSupplierPayableSection(prev => !prev)}
            >
              <div className="flex items-center gap-2">
                {openSupplierPayableSection ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                <span className="font-semibold text-[#05004E]">Payables to Suppliers</span>
              </div>
              <span className="font-semibold text-[#05004E]">₹{supplierPayables.total.toFixed(2)}</span>
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
                        <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-6 py-2">{row.label}</td>
                          <td className="px-6 py-2">₹{row.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>

          {/* Receivables Section (payable to lender ) */}
          <div className="rounded-b-lg">
            <div
              className="flex justify-between bg-[#F0F9FF] px-6 py-3 cursor-pointer"
              onClick={() => setOpenLenderPayables(prev => !prev)}
            >
              <div className="flex items-center gap-2">
                {openLenderPayables ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                <span className="font-semibold text-[#05004E]">Payables to Lenders</span>
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
                        <th className="px-6 py-2 w-6/12">Lender</th>
                        <th className="px-6 py-2 w-6/12">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lenderPayables.rows.map((row, idx) => (
                        <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-6 py-2">{row.lenderName}</td>
                          <td className="px-6 py-2">₹{Number(row.amount).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>

     {/* Receivables Section (loss ) */}

          <div className="rounded-b-lg">
            <div
              className="flex justify-between bg-[#F0F9FF] px-6 py-3 cursor-pointer"
              onClick={() => setOpenProfitLoss(prev => !prev)}
            >
              <div className="flex items-center gap-2">
                {openProfitLoss ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                <span className="font-semibold text-[#05004E]">Loss</span>
              </div>
              <span className="font-semibold text-[#05004E]">
                {data ? (
                  data.status === "profit" ? (
                    <span className="text-green-600">+₹{Number(data.profitOrLoss).toFixed(2)}</span>
                  ) : data.status === "loss" ? (
                    <span className="text-red-600">-₹{Number(data.profitOrLoss).toFixed(2)}</span>
                  ) : (
                    "Break-even"
                  )
                ) : (
                  "₹0.00"
                )}
              </span>
            </div>

            {openProfitLoss && (
              <>
                {loading && <p className="p-4">Loading...</p>}
                {error && <p className="p-4 text-red-500">{error}</p>}

                {!loading && !error && data && (
                  <table className="w-full">
                    <thead className="bg-[#F9FAFB] text-left text-sm text-[#05004E] uppercase border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-2 w-6/12">Type</th>
                        <th className="px-6 py-2 w-6/12">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="px-6 py-2">Total Sales</td>
                        <td className="px-6 py-2">₹{Number(data.totalSales).toFixed(2)}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-6 py-2">Total Purchases</td>
                        <td className="px-6 py-2">₹{Number(data.totalPurchase).toFixed(2)}</td>
                      </tr>
                      <tr className="font-semibold border-t border-gray-300 bg-gray-50">
                        <td className="px-6 py-2">
                          {data.status === "profit"
                            ? "Net Profit"
                            : data.status === "loss"
                              ? "Net Loss"
                              : "Break-even"}
                        </td>
                        <td className="px-6 py-2">
                          {data.status === "profit"
                            ? `+ ₹₹{Number(data.profitOrLoss).toFixed(2)}`
                            : data.status === "loss"
                              ? `- ₹₹{Number(data.profitOrLoss).toFixed(2)}`
                              : "₹0.00"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
