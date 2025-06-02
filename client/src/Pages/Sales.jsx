import React, { useState, useEffect, useRef } from "react";
import { CiCirclePlus } from "react-icons/ci";
import {
  XCircleIcon,
  PlusCircleIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { ChevronDownIcon } from "lucide-react";
import debounce from "lodash/debounce";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const Sales = () => {
  const { id: purchaseId } = useParams();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [purchase, setPurchase] = useState();
  const axiosInstance = useAxiosPrivate();
  const [loadingPurchase, setLoadingPurchase] = useState(true);
  const [submitLoading, setSubmitloading] = useState(false);
  const [dateOfSale, setDateOfSale] = useState(
    new Date().toLocaleDateString("en-CA")
  );

  const [rows, setRows] = useState([
    {
      id: 1,
      customerId: "",
      customerLabel: "",
      supplierId: "",
      itemName: "",
      itemId: "",
      quantityType: "",
      quantityKg: 0,
      quantityBox: 0,
      unitPrice: 0,
      remainingQuantity: 0,
      error: "",
    },
  ]);

  // which row’s dropdown is open?
  const [activeCustomerIndex, setActiveCustomerIndex] = useState(null);
  // what the user has typed when searching
  const [searchTerm, setSearchTerm] = useState("");

  // refs for each row’s dropdown container (to detect outside clicks)
  const wrapperRefs = useRef([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchPurchase = async () => {
      setLoadingPurchase(true);
      try {
        const res = await axiosInstance.get(
          `/admin/purchase/get/${purchaseId}`
        );
        setPurchase(res.data);

        // Initialize rows from items still in stock
      } catch (err) {
        console.error("Error fetching purchase:", err);
        setError("Failed to load purchase.");
      } finally {
        setLoadingPurchase(false);
      }
    };

    fetchPurchase();
  }, [purchaseId, axiosInstance]);

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

  const calculateSubtotal = (qty, price, quantityType) => {
    const q = parseFloat(qty),
      p = parseFloat(price);

    // Check for valid quantity and price
    if (isNaN(q) || isNaN(p)) {
      return 0;
    }

    // Return the subtotal
    return q * p;
  };
  const netPayable = rows.reduce((sum, row) => {
    return (
      sum + calculateSubtotal(row.quantity, row.unitPrice, row.quantityType)
    );
  }, 0);

  const handleItemChange = (idx, itemName) => {
    const pi = purchase.items.find((it) => it.item.itemName === itemName);
    if (!pi) return;
    setRows((rs) =>
      rs.map((r, i) =>
        i === idx
          ? {
              ...r,
              itemName: pi.item.itemName,
              itemId: pi.item._id,
              unitPrice: pi.unitPrice,
              quantityType: pi.quantityType,
              remainingQuantity: pi.remainingQuantity,
            }
          : r
      )
    );
  };

  const getRemainingQuantity = (itemId, quantityType, currentIndex = -1) => {
    const selectedItem = purchase?.items?.find(
      (i) => i.item._id === itemId && i.quantityType === quantityType
    );
    if (!selectedItem) return 0;

    let remaining = selectedItem.remainingQuantity || 0;

    rows.forEach((row, index) => {
      if (
        row.itemId === itemId &&
        row.quantityType === quantityType &&
        index !== currentIndex
      ) {
        const q = parseFloat(row.quantity) || 0;
        remaining -= q;
      }
    });

    return Math.max(remaining, 0);
  };

  const handleQuantityChange = (index, value) => {
    const q = value === "" ? "" : parseFloat(value);
    setRows((rs) =>
      rs.map((r, i) => {
        if (i !== index) return r;

        const matchingPurchaseItem = purchase?.items?.find(
          (pi) =>
            pi?.item?._id === r.itemId && pi.quantityType === r.quantityType
        );

        const maxQty = matchingPurchaseItem?.remainingQuantity || 0;
        const error =
          q !== "" && q > maxQty ? `Max ${maxQty} ${r.quantityType}` : "";

        return {
          ...r,
          quantity: q,
          quantityKg: r.quantityType === "kg" ? q : "",
          quantityBox: r.quantityType === "box" ? q : "",
          error,
        };
      })
    );
  };

  const handleQuantityTypeChange = (index, value) => {
    setRows((rs) =>
      rs.map((r, i) => {
        if (i !== index) return r;

        // Get matching item from purchase
        const selectedItem = purchase?.items?.find(
          (it) => it.item._id === r.itemId && it.quantityType === value
        );

        return {
          ...r,
          quantityType: value,
          quantity: "",
          error: "",
          unitPrice: selectedItem ? selectedItem.unitPrice : "",
        };
      })
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

  const handleAddSale = async () => {
    setSubmitloading(true);
    try {
      // 1) Validate form
      for (let i = 0; i < rows.length; i++) {
        const r = rows[i];
        if (!r.customer) {
          throw new Error(`Row ${i + 1}: Please select a customer.`);
        }
        if (!r.itemName) {
          throw new Error(`Row ${i + 1}: Please select an item.`);
        }
        if (
          !r.quantityType ||
          (r.quantityType !== "kg" && r.quantityType !== "box")
        ) {
          throw new Error(`Row ${i + 1}: Please select a valid quantity type.`);
        }

        if (!r.quantity || Number(r.quantity) <= 0) {
          throw new Error(`Row ${i + 1}: Please enter a valid quantity.`);
        }

        if (!r.unitPrice || r.unitPrice <= 0) {
          throw new Error(`Row ${i + 1}: Invalid unit price.`);
        }
      }
      const salesPayload = rows.map((r) => {
        // const quantity = : r.;
        return {
          purchase: purchase?._id,
          customer: r.customer,
          discount: r.discount || 0,
          dateOfSale,
          items: [
            {
              item: r.itemId,
              supplier: purchase?.supplier?._id,
              quantityType: r.quantityType,
              quantity: r.quantityType === "kg" ? r.quantityKg : r.quantityBox,
              unitPrice: Number(r.unitPrice),
            },
          ],
        };
      });
      // 3) Send it in one go
      await axiosInstance.post("/admin/sales/add", salesPayload);

      Swal.fire({
        title: "All sales transactions added successfully!",
        icon: "success",
        draggable: true,
      });

      // // 4) Re-fetch the purchase to get updated remainingQuantity
      // const { data: updatedPurchase } = await axiosInstance.get(
      //   `/admin/purchase/get/${purchase._id}`
      // );
      // setPurchase(updatedPurchase);
      navigate("/sales-transaction");
    } catch (error) {
      Swal.fire({
        title:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong!",
        icon: "error",
        draggable: true,
      });
      console.error("handleAddSale error:", error);
    } finally {
      setSubmitloading(false);
    }
  };
  const handleDeleteRow = (index) => {
    setRows((prev) => {
      if (prev.length <= 1) return prev; // Prevent deleting the last row
      return prev.filter((_, i) => i !== index);
    });
  };

  const purchaseTotal =
    purchase?.items?.reduce((total, item) => {
      const remainingQuantity = item.remainingQuantity ?? 0;
      const unitPrice = parseFloat(item.unitPrice ?? 0);
      const quantityType = item.quantityType;

      if (quantityType === "kg" || quantityType === "box") {
        return total + remainingQuantity * unitPrice;
      }
      return total;
    }, 0) || 0;

  const salesDifference = netPayable - purchaseTotal;

  // Conditionally set text color
  const differenceTextColor =
    salesDifference < 0 ? "text-red-600" : "text-blue-600";

  return (
    <div className="w-full min-h-screen bg-[#EEEEEE] p-6 md:p-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3 bg-white rounded-xl p-6 shadow">
          <div className="text-slate-500 text-xl mb-2">
            Transactions &gt; Sales
          </div>
          <h2 className="text-3xl font-bold text-indigo-950 mb-6">
            Sales register
          </h2>

          {/* </div> */}
          {/* <div className="w-[851px] left-[337px] top-[324px] absolute inline-flex flex-col justify-start items-start bf gap-3.5">
          <div className="self-stretch flex flex-col justify-start items-start  "> */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">No.</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Item name</th>
                  <th className="p-3">Qty</th>
                  <th className="p-3">Unit</th>
                  <th className="p-3">Unit Price</th>
                  <th className="p-3">Subtotal</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index} className="border-t ">
                    <td className="p-3 ">{String(row.id).padStart(3, "0")}</td>
                    <td
                      ref={(el) => (wrapperRefs.current[index] = el)}
                      className="p-3  relative"
                    >
                      <div
                        onClick={() => {
                          setActiveCustomerIndex(index);
                          setSearchTerm("");
                          setSelectedCustomerIndex(-1);
                        }}
                        className="cursor-pointer w-full bg-transparent outline-none text-slate-900 flex items-center justify-between"
                      >
                        <span>{row.customerLabel || "Select"}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-4 w-4 text-slate-500 ml-2 transition-transform ${
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

                      {activeCustomerIndex === index && (
                        <div
                          className="absolute top-12 left-0 right-0 bg-[#fff] rounded shadow-lg z-10"
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          tabIndex={0}
                        >
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
                                  className={`px-2 py-1 cursor-pointer transition-colors duration-200 ${
                                    selectedCustomerIndex === i
                                      ? "bg-orange-600 text-white"
                                      : "hover:bg-orange-600 hover:text-white"
                                  }`}
                                >
                                  {c.label}
                                </li>
                              ))
                            )}
                          </ul>
                        </div>
                      )}
                    </td>

                    <td className="p-3">
                      <select
                        value={row.itemName}
                        onChange={(e) =>
                          handleItemChange(index, e.target.value)
                        }
                        className="w-20 bg-transparent outline-none text-slate-900 "
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        {purchase?.items
                          ?.map((item) => item.item.itemName)
                          .filter(
                            (value, index, self) =>
                              self.indexOf(value) === index
                          )
                          .map((itemName, idx) => (
                            <option key={idx} value={itemName}>
                              {itemName}
                            </option>
                          ))}
                      </select>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-col ">
                        <input
                          placeholder="000"
                          type="number"
                          min="0"
                          max={
                            row.itemId
                              ? getRemainingQuantity(row.itemId, index)
                              : undefined
                          }
                          value={row.quantity}
                          onChange={(e) =>
                            handleQuantityChange(index, e.target.value)
                          }
                          disabled={!row.itemId}
                          className={`p-3 outline-none  ${
                            row.error ? "border-b border-red-500" : ""
                          }`}
                        />
                        {row.error && (
                          <span className="text-red-500 text-xs mt-1 ">
                            {row.error}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <select
                        value={row.quantityType}
                        onChange={(e) =>
                          handleQuantityTypeChange(
                            index,
                            e.target.value.toLowerCase()
                          )
                        }
                        className="p-3"
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="kg">KG</option>
                        <option value="box">Box</option>
                      </select>
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={row.unitPrice}
                        onChange={(e) =>
                          handleChange(index, "unitPrice", e.target.value)
                        }
                        className="p-3"
                      />
                    </td>
                    <td className="p-3">
                      ₹
                      {calculateSubtotal(row.quantity, row.unitPrice).toFixed(
                        2
                      )}
                    </td>
                    <td className="p-3">
                      <TrashIcon
                        className="w-5 text-red-600 cursor-pointer"
                        onClick={() => handleDeleteRow(index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Add new row button */}
            <div
              className="col-span-6 rounded-lg px-6 py-4 cursor-pointer flex items-center justify-center gap-3 text-indigo-900 text-xl hover:bg-gray-100 transition"
              onClick={() => {
                setRows((prev) => [
                  ...prev,
                  {
                    id: prev.length + 1,
                    customer: "",
                    supplierId: "",
                    customerName: "",
                    itemName: "",
                    quantity: "",
                    unit: "",
                    unitPrice: "",
                  },
                ]);
              }}
            >
              <span className="text-2xl">＋</span> Add another item
            </div>
          </div>

          <div className="self-stretch flex flex-col justify-start items-end gap-8">
            <div className="self-stretch px-4 flex flex-col justify-start items-start gap-12">
              <div className="self-stretch inline-flex justify-between items-start flex-wrap content-start">
                <div className=" flex justify-between items-center ">
                  <label
                    className="w-20 justify-start text-slate-600/40 text-xl font-normal font-['Urbanist'] "
                    htmlFor="netPayable"
                  >
                    Total:
                  </label>
                  <div className="w-64 h-12 px-6 py-4 bg-gray-50 rounded-xl flex justify-start items-center">
                    <div className="justify-start text-indigo-950 text-lg font-bold font-['Urbanist']">
                      ₹
                    </div>
                    <input
                      type="text"
                      id="netPayable"
                      name="netPayable"
                      readOnly
                      value={netPayable.toFixed(2)}
                      className=" p-1 w-full bg-transparent outline-none text-indigo-950 text-lg font-bold font-['Urbanist']"
                    />
                  </div>
                </div>
                <div className="w-94 flex justify-between items-center ">
                  <label
                    className="w-94 justify-start text-slate-600/40 text-xl font-normal font-['Urbanist']"
                    htmlFor="salesDifference"
                  >
                    Sales Difference
                  </label>
                  <div className="w-64 h-12 px-6 py-4 bg-gray-50 rounded-xl flex justify-start items-center">
                    <div
                      className={`justify-start text-lg font-bold font-['Urbanist'] ${differenceTextColor}`}
                    >
                      ₹
                    </div>
                    <input
                      type="text"
                      id="salesDifference"
                      name="salesDifference"
                      readOnly
                      value={salesDifference.toFixed(2)}
                      className={`pl-1 w-full bg-transparent outline-none text-lg font-bold font-['Urbanist'] ${differenceTextColor}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex justify-end items-center gap-4 mt-8 md:mr-25">
            <div className="flex gap-4">
              {/* Cancel Button */}
              <button
                onClick={() => navigate("/sales-transaction")}
                className="flex items-center gap-2 border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-100 transition"
              >
                <XCircleIcon className="w-5 h-5" />
                Cancel
              </button>

              {/* Save Button */}

              <button
                onClick={handleAddSale}
                className="flex items-center gap-2 border border-blue-800 text-blue-800 px-5 py-2 rounded-lg hover:bg-blue-100 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
        {/* Right Panel - Item List */}
        <div className="w-full lg:w-1/3 bg-white rounded-xl p-6 shadow">
          <h3 className="text-2xl font-semibold text-indigo-950 mb-4">
            Item list
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">No.</th>
                  <th className="p-3">Item name</th>
                  <th className="p-3">Qty (KG)</th>
                  <th className="p-3">Qty (Box)</th>
                  <th className="p-3">Unit Price</th>
                  <th className="p-3">Total</th>
                </tr>
              </thead>
              <tbody>
                {purchase?.items?.map((item, index) => {
                  const remainingQuantity = item.remainingQuantity ?? 0;
                  const unitPrice = parseFloat(item.unitPrice ?? 0);
                  const quantityType = item.quantityType;

                  let total = 0;
                  if (quantityType === "kg" || quantityType === "box") {
                    total = remainingQuantity * unitPrice;
                  }

                  return (
                    <tr
                      key={item._id}
                      className="bg-white border-b border-slate-600/40"
                    >
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3">{item?.item?.itemName || "-"}</td>
                      <td className="p-3">
                        {quantityType === "kg"
                          ? `${remainingQuantity} kg`
                          : "-"}
                      </td>
                      <td className="p-3">
                        {quantityType === "box"
                          ? `${remainingQuantity} box`
                          : "-"}
                      </td>
                      <td className="p-3">₹{unitPrice.toFixed(2)}</td>
                      <td className="p-3">₹{total.toFixed(2)}</td>
                    </tr>
                  );
                })}

                {/* Uncomment if you want total row */}
                <tr className="bg-white border-t border-slate-600/40 font-bold">
                  <td colSpan="4" />
                  <td className="px-2.5 py-4 ">Total</td>
                  <td className="px-2.5 py-4 ">
                    ₹
                    {purchase?.items
                      ?.reduce((total, item) => {
                        const remainingQuantity = item.remainingQuantity ?? 0;
                        const unitPrice = parseFloat(item.unitPrice ?? 0);
                        const quantityType = item.quantityType;

                        if (quantityType === "kg" || quantityType === "box") {
                          return total + remainingQuantity * unitPrice;
                        }
                        return total;
                      }, 0)
                      .toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Sales;
