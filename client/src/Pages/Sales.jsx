import React, { useState, useEffect, useRef } from "react";
import { CiCirclePlus } from "react-icons/ci";
import {
  XCircleIcon,
  PlusCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { ChevronDownIcon } from "lucide-react";
import debounce from "lodash/debounce";


const Sales = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const axiosInstance = useAxiosPrivate();

  const itemList = [
    { id: 1, name: "Crab", quantity: 50, unit: "KG", unitPrice: 150 },
    { id: 2, name: "Karimeen", quantity: 140, unit: "KG", unitPrice: 45 },
    { id: 3, name: "Mathi", quantity: 25, unit: "KG", unitPrice: 30 },
    { id: 4, name: "Ayala", quantity: 200, unit: "KG", unitPrice: 40 },
    { id: 5, name: "Choora", quantity: 110, unit: "KG", unitPrice: 50 },
  ];
  // rows holds each line of the sales form
  const [rows, setRows] = useState([
    {
      id: 1,
      customer: "",
      customerLabel: "",
      item: "",
      quantity: "",
      unit: "",
      unitPrice: "",
    },
  ]);

  // which row’s dropdown is open?
  const [activeCustomerIndex, setActiveCustomerIndex] = useState(null);
  // what the user has typed when searching
  const [searchTerm, setSearchTerm] = useState("");

  // refs for each row’s dropdown container (to detect outside clicks)
  const wrapperRefs = useRef([]);
  

  useEffect(() => {
    const fetchCustomers = async (query) => {
      setLoading(true);
      setError(null);
      try {
        const qParam = query.trim()
          ? `?q=${encodeURIComponent(query.trim())}`
          : "";
        const res = await axiosInstance.get(`/admin/customer/getname${qParam}`);
        setCustomers(
          res.data.customers.map((c) => ({
            value: c.id,
            label: c.name,
          }))
        );
      } catch (err) {
        console.error("Failed to fetch customer names:", err);
        setError("Failed to fetch customers");
      } finally {
        setLoading(false);
      }
    };
  
    const debouncedFetch = debounce(fetchCustomers, 300);
  
    if (searchTerm.trim() === "") {
      // Fetch immediately if input is empty
      fetchCustomers("");
    } else {
      // Use debounced fetch for search
      debouncedFetch(searchTerm);
    }
  
    return () => {
      debouncedFetch.cancel();
    };
  }, [searchTerm, axiosInstance]);
  
  
  
  // ─── FETCH WITH DEBOUNCE ────────────────────────────────────────────────

  

  const sortAlphabetically = (data) => {
    return [...data].sort((a, b) => a.label.localeCompare(b.label));
  };

  // Then modify your customers filtering logic:
  const filteredCustomers = searchTerm
    ? customers.filter((c) =>
        c.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : customers;

  // Sort the filtered results alphabetically
  const sortedCustomers = sortAlphabetically(filteredCustomers);

  const [selectedCustomerIndex, setSelectedCustomerIndex] = useState(-1);
  const inputRef = useRef(null);
  const resultsListRef = useRef(null);
  // close dropdown if clicked outside
  useEffect(() => {
    const onClickOutside = (e) => {
      if (wrapperRefs.current.every((ref) => ref && !ref.contains(e.target))) {
        setActiveCustomerIndex(null);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // if (loading) return <p>Loading customers...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  const handleChange = (i, field, val) => {
    const copy = [...rows];
    copy[i][field] = val;
    setRows(copy);
  };

  const handleCustomerSelect = (i, customer) => {
    const copy = [...rows];
    copy[i].customer = customer.value;
    copy[i].customerLabel = customer.label;
    setRows(copy);
    setActiveCustomerIndex(null);
  };

  const calculateSubtotal = (qty, price) => {
    const q = parseFloat(qty),
      p = parseFloat(price);
    return isNaN(q) || isNaN(p) ? 0 : q * p;
  };

  const addRow = () => {
    setRows((r) => [
      ...r,
      {
        id: r.length + 1,
        customer: "",
        customerLabel: "",
        item: "",
        quantity: "",
        unit: "",
        unitPrice: "",
      },
    ]);
  };
  const handleItemChange = (index, selectedItemName) => {
    const selectedItem = itemList.find(
      (item) => item.name === selectedItemName
    );

    setRows(
      rows.map((row, i) =>
        i === index
          ? {
              ...row,
              item: selectedItemName,
              quantity: 0, // Reset quantity when item changes
              error: null, // Clear any previous errors
            }
          : row
      )
    );
  };

  const handleQuantityChange = (index, value) => {
    const quantity = parseInt(value) || 0;
    const currentRow = rows[index];
    const selectedItem = itemList.find((item) => item.name === currentRow.item);

    let error = null;
    if (selectedItem && quantity > selectedItem.quantity) {
      error = `Only ${selectedItem.quantity} ${selectedItem.unit} available`;
    }

    setRows(
      rows.map((row, i) => (i === index ? { ...row, quantity, error } : row))
    );
  };
  const handleKeyDown = (e, rowIndex) => {
    if (customers.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedCustomerIndex((prev) =>
          Math.min(prev + 1, customers.length - 1)
        );
        // Scroll into view
        setTimeout(() => {
          const selectedItem =
            resultsListRef.current?.children[selectedCustomerIndex + 1];
          selectedItem?.scrollIntoView({ block: "nearest" });
        }, 0);
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedCustomerIndex((prev) => Math.max(prev - 1, 0));
        // Scroll into view
        setTimeout(() => {
          const selectedItem =
            resultsListRef.current?.children[selectedCustomerIndex - 1];
          selectedItem?.scrollIntoView({ block: "nearest" });
        }, 0);
        break;
      case "Enter":
        if (
          selectedCustomerIndex >= 0 &&
          selectedCustomerIndex < customers.length
        ) {
          handleCustomerSelect(rowIndex, customers[selectedCustomerIndex]);
        }
        break;
      case "Escape":
        setActiveCustomerIndex(-1);
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <div className="  bg-[#fff] w-full h-screen  ">
        <div className="w-[665px] h-full left-[1200px] top-[148px] absolute bg-[#fff]">
          <div className="w-[653px] left-[6px] top-[176px] absolute inline-flex flex-col justify-start items-start">
            <div className="self-stretch px-2.5 py-4 bg-[white]  outline-[0.20px] outline-offset-[-0.20px] outline-slate-600/40 inline-flex justify-start items-center gap-[5px]">
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

            {itemList.map((item) => {
              const total = calculateSubtotal(item.quantity, item.unitPrice);

              return (
                <div
                  key={item.id}
                  className="self-stretch px-2.5 py-4 bg-white outline-[0.20px] outline-offset-[-0.20px] outline-slate-600/40 inline-flex justify-start items-center gap-[5px]"
                >
                  <div className="min-w-8 justify-center text-indigo-950 text-sm font-normal font-['Urbanist'] tracking-wide">
                    {item.id}
                  </div>
                  <div className="min-w-32 justify-center text-indigo-950 text-sm font-normal font-['Urbanist'] tracking-wide">
                    {item.name}
                  </div>
                  <div className="min-w-32 justify-center text-indigo-950 text-sm font-normal font-['Urbanist'] tracking-wide">
                    {item.quantity}
                  </div>
                  <div className="min-w-32 justify-center text-indigo-950 text-sm font-normal font-['Urbanist'] tracking-wide">
                    {item.unit}
                  </div>
                  <div className="min-w-32 justify-center text-indigo-950 text-sm font-normal font-['Urbanist'] tracking-wide">
                    ₹{parseFloat(item.unitPrice).toFixed(2)}
                  </div>
                  <div className="w-20 justify-center text-indigo-950 text-sm font-normal font-['Urbanist'] tracking-wide">
                    ₹ {total.toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-96 pb-6 left-[6px] top-[122px] absolute border-b border-none inline-flex justify-start items-center gap-2.5">
            <div className="justify-start text-indigo-950 text-3xl font-bold font-['Urbanist'] leading-10">
              Item list
            </div>
          </div>
        </div>
        <div className="w-[865px] h-full left-[329px] top-[148px] absolute bg-[#EEEEEE] shadow-[0px_4px_5.800000190734863px_0px_rgba(0,0,0,0.25)] overflow-y-scroll ">
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

        <div className="w-[851px] left-[337px] top-[324px] absolute inline-flex flex-col justify-start items-start bf gap-3.5  ">
          <div className="self-stretch flex flex-col justify-start items-start  ">
            <div className="self-stretch flex flex-col justify-start items-start">
              {/* Header row */}
              <div className="self-stretch px-2.5 py-4 relative bg-[white] border-t-[0.20px] border-b-[0.20px] border-slate-600/40 inline-flex justify-start items-center gap-3.5">
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
                  className="self-stretch px-2.5 py-4 bg-[#fff] border-b-[0.20px] border-slate-600/40 inline-flex justify-start items-center gap-3.5"
                >
                  <div className="flex-1 max-w-16 justify-center text-slate-900 text-sm font-normal font-['Urbanist'] tracking-wide">
                    {String(row.id).padStart(3, "0")}
                  </div>

                  <div
                    ref={(el) => (wrapperRefs.current[index] = el)}
                    className="min-w-32 -ml-4 justify-center text-slate-900 text-sm font-normal font-['Urbanist'] tracking-wide relative"
                  >
                    {/* Trigger */}
                    <div
                      onClick={() => {
                        setActiveCustomerIndex(index);
                        setSearchTerm("");
                        setSelectedCustomerIndex(-1); // Reset selection when opening
                      }}
                      className="cursor-pointer w-full -ml-6 bg-transparent outline-none text-slate-900 flex items-center justify-between"
                    >
                      <span>{row.customerLabel || "Select"}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 text-slate-500 ml-2 transition-transform ₹{
                          activeCustomerIndex === index ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>

                    {/* Dropdown panel */}
                    {activeCustomerIndex === index && (
                      <div
                        className="absolute top-full mt-1 left-0 right-0 bg-[#fff] rounded shadow-lg z-10"
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        tabIndex={0}
                      >
                        {/* Search box */}
                        <div className="relative px-2 py-1 border-b">
                          <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                            <svg
                              className="h-4 w-4 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              />
                            </svg>
                          </div>
                          <input
                            autoFocus
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search..."
                            className="w-full pl-8 outline-none"
                            ref={inputRef}
                          />
                        </div>

                        {/* Results */}
                        <ul
                          className="max-h-40 overflow-y-auto"
                          ref={resultsListRef}
                        >
                          {loading ? (
                            <li className="flex items-center gap-2 px-2 py-2 text-gray-500 text-sm">
                              <svg
                                className="animate-spin h-4 w-4 text-slate-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                />
                              </svg>
                              Loading customers...
                            </li>
                          ) : sortedCustomers.length === 0 ? (
                            <li className="px-2 py-1 text-gray-500">
                              No customers found
                            </li>
                          ) : (
                            sortedCustomers.map((c, i) => (
                              <li
                                key={c.value}
                                onClick={() => handleCustomerSelect(index, c)}
                                className={`px-2 py-1 cursor-pointer transition-colors duration-200
                ${
                  selectedCustomerIndex === i
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-600 hover:text-white"
                }`}
                              >
                                {c.label}
                              </li>
                            ))
                          )}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="min-w-32 justify-center text-slate-900 text-sm font-normal font-['Urbanist'] tracking-wide">
                    <select
                      value={row.item}
                      onChange={(e) => handleItemChange(index, e.target.value)}
                      className="w-20 bg-transparent outline-none text-slate-900 -ml-5"
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      {itemList.map((item) => (
                        <option key={item.id} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quantity Input with Validation */}
                  <div className="min-w-32 justify-center text-slate-900 text-sm font-normal font-['Urbanist'] tracking-wide">
                    <div className="flex flex-col">
                      <input
                        type="number"
                        min="0"
                        max={
                          itemList.find((i) => i.name === row.item)?.quantity ||
                          0
                        }
                        value={row.quantity}
                        onChange={(e) =>
                          handleQuantityChange(index, e.target.value)
                        }
                        disabled={!row.item} // Disable if no item selected
                        className={`w-25 bg-[transparent] outline-none text-slate-900 -ml-8 ${
                          row.error ? "border-b border-red-500" : ""
                        }`}
                      />
                      {row.error && (
                        <span className="text-red-500 bg-text-xs mt-1 -ml-8">
                          {row.error}
                        </span>
                      )}
                    </div>
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
                    ₹{calculateSubtotal(row.quantity, row.unitPrice).toFixed(2)}
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
                        ₹
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
                        ₹
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
