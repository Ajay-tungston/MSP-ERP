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
  const [openSupplierReceivableSection, setOpenSupplierReceivableSection] = useState(false);

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

  const [openMarketFeeSection, setOpenMarketFeeSection] = useState(false);
  const [marketFees, setMarketFees] = useState({
    total: 0,
    rows: [],
  })
  // Axios instance from custom hook
  const axiosPrivate = useAxiosPrivate();
  const [commissions, setCommissions] = useState({ total: 0, rows: [] });
  const [openCommissionSection, setOpenCommissionSection] = useState(false);

  const [openCoolieSection, setOpenCoolieSection] = useState(false);
  const [coolieCharges, setCoolieCharges] = useState({ total: 0, rows: [] });
  const [loadingCoolie, setLoadingCoolie] = useState(false);
  const [errorCoolie, setErrorCoolie] = useState(null);
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
        rows: breakdown.map(item => ({
          label: item.customerName,
          invoice: '-',
          amount: item.balance,


        })),
      });
    } catch (err) {
      console.error('Failed to load receivables:', err);
      setError('Could not fetch receivables.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount and when date range changes
  useEffect(() => {
    fetchReceivables();
    fetchPayablesToSuppliers();
    fetchReceivablesFromEmployees();
    fetchMarketFeesFromSuppliers();
    fetchCommissionsFromSuppliers();
    fetchCoolieCharges();
    fetchPayablesToSupplier();
  }, [startDate, endDate]);



  // Fetch receivables from suppliers
  const fetchPayablesToSuppliers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosPrivate.get(
        '/admin/trialBalance/suppliers',
        { params: { startDate, endDate } }
      );
      const { totalPayables, breakdown } = response.data;
      setSupplierReceivables({
        total: totalPayables,
        rows: breakdown.map(item => ({
          label: item.supplierName,
          invoice: '-', // Placeholder
          amount: item.balance,
        })),
      });
    } catch (err) {
      console.error('Failed to load supplier receivables:', err);
      setError('Could not fetch payables to suppliers.');
    } finally {
      setLoading(false);
    }
  };


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
          invoice: '-', // Placeholder (since invoice is not available)
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

  const fetchMarketFeesFromSuppliers = async () => {
    setLoading(true); // Loading state for Market Fees
    setError(null); // Reset any errors

    try {
      const response = await axiosPrivate.get(
        '/admin/trialBalance/marketfee', // Endpoint to fetch market fees
        { params: { startDate, endDate } } // Optional date filter if needed
      );

      const { totalMarketFees, breakdown } = response.data;

      setMarketFees({
        total: totalMarketFees,
        rows: breakdown.map(item => ({
          label: item.supplierName, // Supplier name
          invoice: '-', // Placeholder (since no invoice is available)
          amount: item.marketFee, // Market fee amount for the supplier
        })),
      });
    } catch (err) {
      console.error('Failed to load market fees from suppliers:', err);
      setError('Could not fetch market fees from suppliers.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCommissionsFromSuppliers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosPrivate.get('/admin/trialBalance/commission');
      const { totalCommission, breakdown } = response.data;

      setCommissions({
        total: totalCommission,
        rows: breakdown.map((item) => ({
          supplierName: item.supplierName,
          amount: item.commission,
        })),
      });
      console.log(response)
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

  const fetchPayablesToSupplier = async () => {
    setLoadingSupplierPayables(true);
    setErrorSupplierPayables(null);
  
    try {
      const response = await axiosPrivate.get('/admin/trialBalance/pay');
      const { totalPayables, breakdown } = response.data;
  
      setSupplierPayables({
        total: Number(totalPayables || 0),
        rows: Array.isArray(breakdown)
          ? breakdown.map(item => ({
              supplierName: item.supplierName || 'Unknown',
              amount: Number(item.payable || 0),
            }))
          : [],
      });
    } catch (err) {
      console.error('Failed to load supplier payables:', err);
      setErrorSupplierPayables('Could not fetch payables to suppliers.');
    } finally {
      setLoadingSupplierPayables(false);
    }
  };
  

  return (
    <div className="p-4 bg-white min-h-screen mt-10 rounded-xl">
      <nav className="text-gray-500 text-[20px] mb-4">Reports &gt; Trial Balance</nav>
      <div className="flex justify-between w-full">
        <h1 className="text-3xl font-semibold">Trial Balance</h1>
        <button className="flex items-center px-4 py-2 bg-[#F9FAFB] rounded hover:bg-indigo-200">
          <Printer className="mr-2" size={16} /> Print
        </button>
      </div>

      {/* Date Range Filter */}
      <div className="flex justify-end items-center mb-6">
        <div className="flex items-center gap-4 text-gray-500">
          <label>Date Range</label>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="px-4 py-2 bg-[#F9FAFB] rounded text-gray-600"
          />
          <span>to</span>
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="px-4 py-2 bg-[#F9FAFB] rounded text-gray-600"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-8">
        {/* Receivables Section (Customers) */}
        <div className="flex-1">
          <div className="flex justify-between bg-[#F0FDFA] px-6 py-4">
            <span className="font-bold text-[#27AE60] uppercase text-[24px]">Receivables</span>
            <span className="font-bold text-[#27AE60] text-[24px]">${receivables.total.toFixed(2)}</span>
          </div>
          <div className="rounded-b-lg">
            <div
              className="flex justify-between bg-[#F0F9FF] px-6 py-3 cursor-pointer"
              onClick={() => setOpenReceivableSection(prev => !prev)}
            >
              <div className="flex items-center gap-2">
                {openReceivableSection ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                <span className="font-semibold text-[#05004E]">Receivables from Customers</span>
              </div>
              <span className="font-semibold text-[#05004E]">${receivables.total.toFixed(2)}</span>
            </div>

            {openReceivableSection && (
              <>
                {loading && <p className="p-4">Loading...</p>}
                {error && <p className="p-4 text-red-500">{error}</p>}
                {!loading && !error && (
                  <table className="w-full">
                    <thead className="bg-[#F9FAFB] text-left text-sm text-[#05004E] uppercase border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-2 w-5/12">Customer</th>
                        <th className="px-6 py-2 w-3/12">Invoice No.</th>
                        <th className="px-6 py-2 w-3/12">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {receivables.rows.map((row, idx) => (
                        <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-6 py-2">{row.label}</td>
                          <td className="px-6 py-2">{row.invoice}</td>
                          <td className="px-6 py-2">${row.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>

          {/* Receivables Section (Suppliers) */}
          <div className="rounded-b-lg">
            <div
              className="flex justify-between bg-[#F0F9FF] px-6 py-3 cursor-pointer"
              onClick={() => setOpenSupplierReceivableSection(prev => !prev)}
            >
              <div className="flex items-center gap-2">
                {openSupplierReceivableSection ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                <span className="font-semibold text-[#05004E]">Receivables from Suppliers</span>
              </div>
              <span className="font-semibold text-[#05004E]">${supplierReceivables.total.toFixed(2)}</span>
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
                          <td className="px-6 py-2">${row.amount.toFixed(2)}</td>
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
                ${employeeReceivables.total.toFixed(2)}
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
                        <th className="px-6 py-2 w-3/12">Invoice No.</th>
                        <th className="px-6 py-2 w-3/12">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeReceivables.rows.map((row, idx) => (
                        <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-6 py-2">{row.label}</td>
                          <td className="px-6 py-2">{row.invoice}</td>
                          <td className="px-6 py-2">${row.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>
          {/* Receivables Section (Market fee) */}
          <div className="rounded-b-lg">
            <div
              className="flex justify-between bg-[#F0F9FF] px-6 py-3 cursor-pointer"
              onClick={() => setOpenMarketFeeSection(prev => !prev)} // Toggle the market fee section
            >
              <div className="flex items-center gap-2">
                {openMarketFeeSection ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                <span className="font-semibold text-[#05004E]">Market Fees</span>
              </div>
              <span className="font-semibold text-[#05004E]">${marketFees.total.toFixed(2)}</span>
            </div>

            {openMarketFeeSection && (
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
                      {marketFees.rows.map((row, idx) => (
                        <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-6 py-2">{row.label}</td>
                          <td className="px-6 py-2">{row.invoice}</td>
                          <td className="px-6 py-2">${row.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>

          {/* Receivables Section (local sales) */}
          <div className="rounded-b-lg">
            <div
              className="flex justify-between bg-[#F0F9FF] px-6 py-3 cursor-pointer"
              onClick={() => setOpenMarketFeeSection(prev => !prev)} // Toggle the market fee section
            >
              <div className="flex items-center gap-2">
                {openMarketFeeSection ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                <span className="font-semibold text-[#05004E]">Sales Difference (local sales)</span>
              </div>
              <span className="font-semibold text-[#05004E]">${marketFees.total.toFixed(2)}</span>
            </div>

            {openMarketFeeSection && (
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
                      {marketFees.rows.map((row, idx) => (
                        <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-6 py-2">{row.label}</td>
                          <td className="px-6 py-2">{row.invoice}</td>
                          <td className="px-6 py-2">${row.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>
          {/* Receivables Section (Cash Book) */}
          <div className="rounded-b-lg">
            <div
              className="flex justify-between bg-[#F0F9FF] px-6 py-3 cursor-pointer"
              onClick={() => setOpenMarketFeeSection(prev => !prev)} // Toggle the market fee section
            >
              <div className="flex items-center gap-2">
                {openMarketFeeSection ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                <span className="font-semibold text-[#05004E]">Cash Book</span>
              </div>
              <span className="font-semibold text-[#05004E]">${marketFees.total.toFixed(2)}</span>
            </div>

            {openMarketFeeSection && (
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
                      {marketFees.rows.map((row, idx) => (
                        <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-6 py-2">{row.label}</td>
                          <td className="px-6 py-2">{row.invoice}</td>
                          <td className="px-6 py-2">${row.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>
        </div>
        {/* Payables Section */}
        <div className="flex-1">
          <div className="flex justify-between bg-[#FEF2F2] px-6 py-4">
            <span className="font-bold text-[#EB5757] uppercase text-[24px]">Payables</span>
            {/* <span className="font-bold text-[#EB5757] text-[24px]">${mockPayables.reduce((sum, s) => sum + s.total, 0).toFixed(2)}</span> */}
          </div>
          <div className="rounded-b-lg">
            <div
              className="flex justify-between bg-[#F0F9FF] px-6 py-3 cursor-pointer"
              onClick={() => setOpenCommissionSection(prev => !prev)}
            >
              <div className="flex items-center gap-2">
                {openCommissionSection ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                <span className="font-semibold text-[#05004E]">Commissions</span>
              </div>
              <span className="font-semibold text-[#05004E]">${commissions.total.toFixed(2)}</span>
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

                          <td className="px-6 py-2">${row.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>


          <div className="rounded-b-lg">
            <div
              className="flex justify-between bg-[#F0F9FF] px-6 py-3 cursor-pointer"
              onClick={() => setOpenCoolieSection(prev => !prev)}
            >
              <div className="flex items-center gap-2">
                {openCoolieSection ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                <span className="font-semibold text-[#05004E]">Coolie / Logistics Charges</span>
              </div>
              <span className="font-semibold text-[#05004E]">${coolieCharges.total.toFixed(2)}</span>
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
                          <td className="px-6 py-2">${row.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>

          <div className="rounded-b-lg">
  <div
    className="flex justify-between bg-[#F0F9FF] px-6 py-3 cursor-pointer"
    onClick={() => setOpenSupplierPayables(prev => !prev)}
  >
    <div className="flex items-center gap-2">
      {openSupplierPayables ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      <span className="font-semibold text-[#05004E]">Payables to Suppliers</span>
    </div>
    <span className="font-semibold text-[#05004E]">
      ${Number(supplierPayables?.total ?? 0).toFixed(2)}
    </span>
  </div>

  {openSupplierPayables && (
    <>
      {loadingSupplierPayables && <p className="p-4">Loading...</p>}
      {errorSupplierPayables && <p className="p-4 text-red-500">{errorSupplierPayables}</p>}

      {!loadingSupplierPayables && !errorSupplierPayables && (
        <table className="w-full">
          <thead className="bg-[#F9FAFB] text-left text-sm text-[#05004E] uppercase border-b border-gray-200">
            <tr>
              <th className="px-6 py-2 w-6/12">Supplier</th>
              <th className="px-6 py-2 w-6/12">Amount</th>
            </tr>
          </thead>
          <tbody>
            {supplierPayables.rows.map((row, idx) => (
              <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-2">{row.supplierName}</td>
                <td className="px-6 py-2">${Number(row.amount).toFixed(2)}</td>
              </tr>
            ))}
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
