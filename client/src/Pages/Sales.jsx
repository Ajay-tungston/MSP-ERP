import React, { useState, useEffect, useRef } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { XCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Sales = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const axiosInstance = useAxiosPrivate();
  const items = ["Apples", "Oranges", "Bananas"];

  // rows holds each line of the sales form
  const [rows, setRows] = useState([
    { id: 1, customer: "", customerLabel: "", item: "", quantity: "", unit: "", unitPrice: "" },
  ]);

  // which row’s dropdown is open?
  const [activeCustomerIndex, setActiveCustomerIndex] = useState(null);
  // what the user has typed when searching
  const [searchTerm, setSearchTerm] = useState("");

  // ref to detect outside clicks
  const wrapperRefs = useRef([]);

  // fetch customer names whenever searchTerm changes
  useEffect(() => {
    const fetchCustomerNames = async () => {
      try {
        const qParam = searchTerm.trim() ? `?q=${encodeURIComponent(searchTerm.trim())}` : "";
        const res = await axiosInstance.get(`/admin/customer/getname${qParam}`);
        // backend returns { customers: [ { id, name }, … ] }
        setCustomers(res.data.customers.map(c => ({ value: c.id, label: c.name })));
      } catch (err) {
        console.error("Failed to fetch customer names:", err);
        setError("Failed to fetch customers");
      } finally {
        setLoading(false);
      }
    };
    fetchCustomerNames();
  }, [searchTerm, axiosInstance]);

  // close dropdown if clicked outside
  useEffect(() => {
    const onClick = e => {
      if (
        wrapperRefs.current.every(
          ref => ref && !ref.contains(e.target)
        )
      ) {
        setActiveCustomerIndex(null);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (loading) return <p>Loading customers...</p>;
  if (error)   return <p>{error}</p>;

  const handleChange = (i, field, val) => {
    const copy = [...rows];
    copy[i][field] = val;
    setRows(copy);
  };

  const calculateSubtotal = (qty, price) => {
    const q = parseFloat(qty), p = parseFloat(price);
    return isNaN(q) || isNaN(p) ? 0 : q * p;
  };

  const addRow = () => {
    setRows(r => [
      ...r,
      { id: r.length + 1, customer: "", customerLabel: "", item: "", quantity: "", unit: "", unitPrice: "" }
    ]);
  };
  return (
    <div>
      <div className="  bg-white  overflow-y-scroll ">
        <div className="w-[665px] h-full left-[1200px] top-[148px] absolute bg-[#EEEEEE]">
          <div className="w-[653px] left-[6px] top-[176px] absolute inline-flex flex-col justify-start items-start">
            <div className="self-stretch px-2.5 py-4 bg-white  outline-[0.20px] outline-offset-[-0.20px] outline-slate-600/40 inline-flex justify-start items-center gap-[5px]">
              <div className="flex-1 max-w-16 justify-center text-indigo-950 text-sm font-bold font-['Urbanist'] tracking-wide">
                No.
              </div>
              <div className="min-w-32 justify-center text-indigo-950 text-sm font-bold font-['Urbanist'] tracking-wide">
                Item name
              </div>
              <div className="min-w-32 justify-center text-indigo-950 text-sm font-bold font-['Urbanist'] tracking-wide">
                Qty (KG)
              </div>
              <div className="min-w-32 justify-center text-indigo-950 text-sm font-bold font-['Urbanist'] tracking-wide">
                Unit
              </div>
              <div className="min-w-32 justify-center text-indigo-950 text-sm font-bold font-['Urbanist'] tracking-wide">
                Unit Price
              </div>
              <div className="w-20 justify-center text-indigo-950 text-sm font-bold font-['Urbanist'] tracking-wide">
                total
              </div>
            </div>
            <div className="self-stretch px-2.5 py-4 bg-white  outline-[0.20px] outline-offset-[-0.20px] outline-slate-600/40 inline-flex justify-start items-center gap-[5px]">
              <div className="w-5 max-w-16 justify-center text-indigo-950 text-sm font-normal font-['Urbanist'] tracking-wide">
                01.
              </div>
              <div className="min-w-32 justify-center text-indigo-950 text-sm font-normal font-['Urbanist'] tracking-wide">
                demo
              </div>
              <div className="min-w-32 justify-center text-indigo-950 text-sm font-normal font-['Urbanist'] tracking-wide">
                2
              </div>
              <div className="min-w-32 justify-center text-indigo-950 text-sm font-normal font-['Urbanist'] tracking-wide">
                -
              </div>
              <div className="min-w-32 justify-center text-indigo-950 text-sm font-normal font-['Urbanist'] tracking-wide">
                $205
              </div>
              <div className="w-20 justify-center text-indigo-950 text-sm font-normal font-['Urbanist'] tracking-wide">
                $25154
              </div>
            </div>
          </div>
          <div className="w-96 pb-6 left-[6px] top-[122px] absolute border-b border-none inline-flex justify-start items-center gap-2.5">
            <div className="justify-start text-indigo-950 text-3xl font-bold font-['Urbanist'] leading-10">
              Item list
            </div>
          </div>
        </div>
        <div className="w-[865px] h-full left-[329px] top-[148px] absolute bg-[#EEEEEE] shadow-[0px_4px_5.800000190734863px_0px_rgba(0,0,0,0.25)]">
          <div className="w-[782px] left-[44px] top-[80px] absolute inline-flex flex-col justify-start items-start gap-2.5">
            <div className="inline-flex justify-start items-center gap-3">
              <div className="justify-start text-slate-500 text-xl font-normal font-['Urbanist']">
                Transactions <span></span>Sales
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-11">
              <div className="self-stretch pb-6 border-b border-zinc-100 inline-flex justify-start items-center gap-2.5">
                <div className="justify-start text-indigo-950 text-3xl font-bold font-['Urbanist'] leading-10">
                  Sales register
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[851px] left-[337px] top-[324px] absolute inline-flex flex-col justify-start items-start gap-3.5 ">
          <div className="self-stretch flex flex-col justify-start items-start ">
            <div className="self-stretch flex flex-col justify-start items-start">
              {/* Header row */}
              <div className="self-stretch px-2.5 py-4 relative bg-white border-t-[0.20px] border-b-[0.20px] border-slate-600/40 inline-flex justify-start items-center gap-3.5">
                <div className="flex-1 max-w-16 justify-center text-indigo-950 text-sm font-bold font-['Urbanist'] tracking-wide">
                  No.
                </div>
                <div className="min-w-32 justify-center text-indigo-950 text-sm font-bold font-['Urbanist'] tracking-wide">
                  Customer
                </div>
                <div className="min-w-32 justify-center text-indigo-950 text-sm font-bold font-['Urbanist'] tracking-wide">
                  Item name
                </div>
                <div className="min-w-32 justify-center text-indigo-950 text-sm font-bold font-['Urbanist'] tracking-wide">
                  Qty (KG)
                </div>
                <div className="w-20 justify-center text-indigo-950 text-sm font-bold font-['Urbanist'] tracking-wide">
                  Unit
                </div>
                <div className="min-w-32 justify-center text-indigo-950 text-sm font-bold font-['Urbanist'] tracking-wide">
                  Unit Price
                </div>
                <div className="min-w-32 justify-center text-indigo-950 text-sm font-bold font-['Urbanist'] tracking-wide">
                  Subtotal
                </div>
              </div>

              {/* Dynamic rows */}

              {rows.map((row, index) => (
                <div
                  key={index}
                  className="self-stretch px-2.5 py-4 bg-white border-b-[0.20px] border-slate-600/40 inline-flex justify-start items-center gap-3.5"
                >
                  <div className="flex-1 max-w-16 justify-center text-slate-900 text-sm font-normal font-['Urbanist'] tracking-wide">
                    {String(row.id).padStart(3, "0")}
                  </div>

                  <div className="min-w-32 -ml-4 justify-center text-slate-900 text-sm font-normal font-['Urbanist'] tracking-wide">
                    <select
                      value={row.customer}
                      onChange={(e) =>
                        handleChange(index, "customer", e.target.value)
                      }
                      className="w-full -ml-6 bg-transparent outline-none text-slate-900"
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      {customers.length === 0 ? (
                        <option disabled>No customers found</option>
                      ) : (
                        customers.map((customer, i) => (
                          <option key={i} value={customer.value}>
                            {customer.label}
                            
                          </option>
                        ))
                      )}
                    </select>
                  </div>

                  <div className="min-w-32 justify-center text-slate-900 text-sm font-normal font-['Urbanist'] tracking-wide">
                    <select
                      value={row.item}
                      onChange={(e) =>
                        handleChange(index, "item", e.target.value)
                      }
                      className="w-20 bg-transparent outline-none text-slate-900 -ml-5"
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      {items.map((item, i) => (
                        <option key={i} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="min-w-32 justify-center text-slate-900 text-sm font-normal font-['Urbanist'] tracking-wide">
                    <input
                      type="number"
                      min="0"
                      value={row.quantity}
                      onChange={(e) =>
                        handleChange(index, "quantity", e.target.value)
                      }
                      className="w-25 bg-transparent outline-none text-slate-900 -ml-8"
                    />
                  </div>

                  <div className="w-20 justify-center text-slate-900 text-sm font-normal font-['Urbanist'] tracking-wide">
                    <select
                      value={row.unit}
                      onChange={(e) =>
                        handleChange(index, "unit", e.target.value)
                      }
                      className="w-20 bg-transparent outline-none text-slate-900 text-center -ml-15"
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      <option value="KG">KG</option>
                      <option value="Box">Box</option>
                    </select>
                  </div>

                  <div className="w-20 justify-center text-slate-900 text-sm font-normal font-['Urbanist'] tracking-wide">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={row.unitPrice}
                      onChange={(e) =>
                        handleChange(index, "unitPrice", e.target.value)
                      }
                      className="w-full bg-transparent outline-none text-slate-900 -ml-8"
                    />
                  </div>

                  <div className="min-w-32 justify-center text-slate-900 text-sm font-normal font-['Urbanist'] tracking-wide">
                    ${calculateSubtotal(row.quantity, row.unitPrice).toFixed(2)}
                  </div>
                </div>
              ))}

              {/* Add new row button */}
              <button
                type="button"
                onClick={addRow}
                className="self-stretch px-12 py-4 bg-white border-b border-gray-200 inline-flex justify-center items-center gap-4 cursor-pointer"
              >
                <div className="w-6 h-6 relative text-indigo-400">
                  <CiCirclePlus className="w-6 h-6 absolute" />
                </div>
                <div className="min-w-32 justify-center text-indigo-400 text-sm font-normal font-['Urbanist'] tracking-wide">
                  Add another item
                </div>
              </button>
            </div>

            <div className="self-stretch flex flex-col justify-start items-end gap-8">
              <div className="self-stretch px-4 flex flex-col justify-start items-start gap-12">
                <div className="self-stretch pb-6 border-b border-slate-600/40 inline-flex justify-start items-center gap-2.5">
                  <div className="justify-start text-indigo-950 text-3xl font-semibold font-['Urbanist'] leading-10">
                    Deductions
                  </div>
                </div>
                <div className="self-stretch pb-8 border-b border-zinc-100 inline-flex justify-between items-start flex-wrap content-start">
                  <div className="w-96 flex justify-between items-center">
                    <label
                      className="w-24 justify-start text-slate-600/40 text-sm font-normal font-['Urbanist']"
                      htmlFor="commission"
                    >
                      Commission (%)
                    </label>
                    <div className="w-64 h-12 px-6 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-2">
                      <input
                        type="number"
                        id="commission"
                        name="commission"
                        placeholder="Fetch from Customer Master"
                        className="w-full bg-transparent outline-none text-indigo-950 text-sm font-medium font-['Urbanist']"
                      />
                    </div>
                  </div>

                  <div className="w-96 flex justify-between items-center">
                    <label
                      className="w-24 justify-start text-slate-600/40 text-sm font-normal font-['Urbanist']"
                      htmlFor="discount"
                    >
                      Discount (%)
                    </label>
                    <div className="w-64 h-12 px-6 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-2">
                      <input
                        type="number"
                        id="discount"
                        name="discount"
                        placeholder="Fetch from Customer Master"
                        className="w-full bg-transparent outline-none text-indigo-950 text-sm font-medium font-['Urbanist']"
                      />
                    </div>
                  </div>

                  <div className="flex justify-start items-center gap-2 mt-10">
                    <label
                      className="w-30 justify-start text-slate-600/40 text-sm font-normal font-['Urbanist']"
                      htmlFor="totalDeductions"
                    >
                      Total Deductions
                    </label>
                    <div className="w-64 h-12 px-6 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-3">
                      <div className="justify-start text-indigo-950 text-xl font-bold font-['Urbanist']">
                        $
                      </div>
                      <input
                        type="text"
                        id="totalDeductions"
                        name="totalDeductions"
                        readOnly
                        className="w-full bg-transparent outline-none text-indigo-950 text-sm font-bold font-['Urbanist']"
                      />
                    </div>
                  </div>
                </div>

                <div className="self-stretch inline-flex justify-between items-start flex-wrap content-start">
                  <div className="w-96 flex justify-between items-center">
                    <label
                      className="w-24 justify-start text-slate-600/40 text-sm font-normal font-['Urbanist']"
                      htmlFor="netPayable"
                    >
                      Net Payable
                    </label>
                    <div className="w-64 h-12 px-6 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-3">
                      <div className="justify-start text-indigo-950 text-xl font-bold font-['Urbanist']">
                        $
                      </div>
                      <input
                        type="text"
                        id="netPayable"
                        name="netPayable"
                        readOnly
                        className="w-full bg-transparent outline-none text-indigo-950 text-sm font-bold font-['Urbanist']"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="self-stretch flex justify-end items-center gap-4 mt-8 md:mr-25">
                <div className="flex gap-4">
                  {/* Cancel Button */}
                  <button className="flex items-center gap-2 border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-100 transition">
                    <XCircleIcon className="w-5 h-5" />
                    Cancel
                  </button>

                  {/* Save Button */}
                  <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    <PlusCircleIcon className="w-5 h-5" />
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
