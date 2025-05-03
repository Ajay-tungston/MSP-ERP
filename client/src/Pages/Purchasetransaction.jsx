import React, { useState, useRef, useEffect, useCallback } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { Trash2 } from "lucide-react";
import { debounce } from "lodash";
import OvalSpinner from "../Components/spinners/OvalSpinner";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { handlePurchasePrint } from "../utils/purchaseBill";

function Purchasetransaction() {
  const [items, setItems] = useState([
    {
      name: "",
      kg: "",
      box: "",
      price: "",
      total: "0.00",
    },
  ]);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...items];
    const item = { ...updatedItems[index], [name]: value };

    let quantity = 0;
    if (item.kg) {
      quantity = parseFloat(item.kg) || 0;
    } else if (item.box) {
      quantity = parseFloat(item.box) || 0;
    }
    item.total = (quantity * item.price).toFixed(2);

    updatedItems[index] = item;
    setItems(updatedItems);
    setError("");
  };
  const supplierNameRef = useRef(null);
  const [supplierSearch, setSupplierSearch] = useState("");
  const [supplierList, setSupplierList] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [supplierLoading, setSupplierLoading] = useState(false);
  const [supplierNameInputFocused, setSupplierNameInputFocused] =
    useState(false);
  const [supplierCodeInputFocused, setSupplierCodeInputFocused] =
    useState(false);
  const dateRef = useRef(null);

  const [itemSearch, setItemSearch] = useState("");
  const [itemList, setItemList] = useState([]);
  const [itemLoading, setItemLoading] = useState(false);
  const [itemInputFocused, setItemInputFocused] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);

  const [purchaseCount, setPurchaseCount] = useState(1);
  const [submitLoading, setSubmitloading] = useState(false);

  const [dateOfPurchase, setDateOfPurchase] = useState(
    new Date().toLocaleDateString("en-CA")
  );

  const axiosInstance = useAxiosPrivate();
  const navigate = useNavigate();

  const debouncedFetchSupplier = useCallback(
    debounce(async (searchTerm) => {
      setSupplierLoading(true);
      try {
        const response = await axiosInstance(
          `/admin/supplier/list?search=${searchTerm}`
        );
        setSupplierList(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setSupplierLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    if (supplierSearch) {
      debouncedFetchSupplier(supplierSearch);
    } else {
      setSupplierList([]);
    }
    return () => {
      debouncedFetchSupplier.cancel();
    };
  }, [supplierSearch, debouncedFetchSupplier]);

  const debouncedFetchItem = useCallback(
    debounce(async (searchTerm) => {
      setItemLoading(true);
      try {
        const response = await axiosInstance(
          `/admin/item/list?search=${searchTerm}`
        );
        setItemList(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setItemLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    if (itemSearch) {
      debouncedFetchItem(itemSearch);
    } else {
      setItemList([]);
    }
    return () => {
      debouncedFetchItem.cancel();
    };
  }, [itemSearch, debouncedFetchItem]);

  useEffect(() => {
    const fetchPurchaseCount = async () => {
      try {
        const response = await axiosInstance(`/admin/purchase/count`);
        setPurchaseCount((Number(response?.data?.count) || 0) + 1);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPurchaseCount();
  }, []);

  const handleDeleteItem = (indexToDelete) => {
    const updatedItems = items.filter((_, index) => index !== indexToDelete);
    setItems(updatedItems);
  };

  const handleKeyDown = (e, rowIndex, colIndex) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nextRef = inputRefs.current?.[rowIndex]?.[colIndex + 1];
      if (nextRef) nextRef.focus();
      else if (inputRefs.current?.[rowIndex + 1]?.[0])
        inputRefs.current[rowIndex + 1][0].focus();
    }
  };

  useEffect(() => {
    inputRefs.current = items.map((_, i) =>
      Array(6)
        .fill(null)
        .map((_, j) => inputRefs.current?.[i]?.[j] || React.createRef())
    );
  }, [items]);

  const totalQuantityInKg = items.reduce((acc, item) => {
    const qty = parseFloat(item.kg);
    return acc + (isNaN(qty) ? 0 : qty);
  }, 0);
  const totalQuantityInBox = items.reduce((acc, item) => {
    const qty = parseFloat(item.box);
    return acc + (isNaN(qty) ? 0 : qty);
  }, 0);

  const totalPrice = items
    .reduce((acc, item) => {
      const total = parseFloat(item.total);
      return acc + (isNaN(total) ? 0 : total);
    }, 0)
    .toFixed(2);

  const marketFee =
    totalQuantityInBox * selectedSupplier?.marketFee +
    totalQuantityInKg * (selectedSupplier?.marketFee / 30); //set 1box=30kg
  const commission = selectedSupplier?.commission
    ? totalPrice * (selectedSupplier.commission / 100)
    : 0;

  const totalDeduction = Number(marketFee) + Number(commission);

  const handleSubmit = async (isPrint) => {
    if (!selectedSupplier) {
      // setErrors(prev => ({ ...prev, supplierName: 'Please select a supplier' }));
      supplierNameRef.current.focus();
      return;
    }
    // Validate item rows
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      // Validate item name
      if (!item.name) {
        inputRefs.current[i]?.[0]?.focus();

        return;
      }

      // Validate quantity (kg or box must be filled)
      if (!item.kg && !item.box) {
        inputRefs.current[i]?.[2]?.focus();

        return;
      }

      // Validate price
      if (!item.price || parseFloat(item.price) <= 0) {
        inputRefs.current[i]?.[4]?.focus();

        return;
      }
      if (!dateOfPurchase) {
        dateRef.current?.focus();
        return;
      }
    }
    setSubmitloading(true);
    try {
      const formattedItems = items.map((item) => ({
        itemName: item.name,
        quantity: Number(item.kg ? item.kg : item.box),
        unitPrice: Number(item.price),
        unitType: item.kg ? "kg" : "box",
      }));
      const response = await axiosInstance.post("/admin/purchase/add", {
        supplierId: selectedSupplier?._id,
        items: formattedItems,
        dateOfPurchase,
        marketFee,
      });
      if(isPrint){
        const transaction = {
          selectedSupplier,
          purchaseCount,
          dateOfPurchase,
          items,
          totalQuantityInBox,
          totalQuantityInKg,
          totalPrice,
          commission,
          marketFee,
          totalDeduction,
        };
        handlePurchasePrint(transaction);
      }
      Swal.fire({
        title: "Purchase transaction added successfully!",
        icon: "success",
        draggable: true,
      });
      setItems([
        {
          name: "",
          kg: "",
          box: "",
          price: "",
          total: "0.00",
        },
      ]);
      setSupplierSearch("");
      setSupplierList([]);
      setSelectedSupplier("");
      setItemSearch("");
      setItemList([]);
    } catch (error) {
      Swal.fire({
        title: "Something went wrong!",
        icon: "error",
        draggable: true,
      });
      console.log(error);
    } finally {
      setSubmitloading(false);
    }
  };

  return (
    <>
      {submitLoading ? (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <OvalSpinner />
        </div>
      ) : (
        <div className="w-full min-h-screen bg-white rounded-3xl p-8 overflow-x-hidden mt-10">
          <div className="max-w-screen-xl mx-auto flex flex-col gap-12">
            {/* Page Header */}
            <div className="pb-6 border-b border-gray-400">
              <h1 className="text-indigo-950 text-4xl font-bold font-['Urbanist']">
                Add New Purchase Transaction
              </h1>
            </div>

            {/* Top Form Fields */}
            <div className="flex flex-col gap-8">
              {/* First Row */}
              <div className="flex gap-8 flex-wrap">
                <div className="flex items-center gap-6 w-full md:w-[48%]">
                  <label className="min-w-44 text-slate-500 text-xl font-normal">
                    Purchase No.
                  </label>
                  <div className="flex-1 px-6 py-4 bg-gray-50 rounded-xl text-indigo-950 text-xl font-bold">
                    {purchaseCount}
                  </div>
                </div>
                <div className="flex items-center gap-6 w-full md:w-[48%]">
                  <label className="min-w-44 text-slate-500 text-xl font-normal">
                    Date of Purchase <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    ref={dateRef}
                    value={dateOfPurchase}
                    onChange={(e) => setDateOfPurchase(e.target.value)}
                    className="flex-1 px-6 py-4 bg-gray-50 rounded-xl text-gray-400 text-xl"
                    placeholder="DD/MM/YYYY"
                  />
                </div>
              </div>

              {/* Second Row */}
              <div className="flex gap-8 flex-wrap">
                {/* Supplier Code */}
                <div className="flex items-center gap-6 w-full md:w-[48%]">
                  <label className="min-w-44 text-slate-500 text-xl font-normal">
                    Supplier Code <span className="text-red-500">*</span>
                  </label>
                  <div className="flex-1 relative">
                    <Combobox
                      value={selectedSupplier}
                      onChange={setSelectedSupplier}
                      onClose={() => setSupplierSearch("")}
                    >
                      <ComboboxInput
                        aria-label="Supplier Code"
                        displayValue={(supplier) => supplier?.supplierCode}
                        onChange={(e) => setSupplierSearch(e.target.value)}
                        ref={supplierNameRef}
                        onFocus={() => setSupplierCodeInputFocused(true)}
                        onBlur={() => setSupplierCodeInputFocused(false)}
                        autoComplete="off"
                        placeholder="Search by code..."
                        className="w-full px-6 py-4 bg-gray-50 rounded-xl text-gray-800 text-xl "
                      />
                      <div className="absolute left-0 right-0 mt-1 z-10">
                        {supplierLoading ? (
                          supplierCodeInputFocused && (
                            <div className="w-full border border-gray-200 rounded-xl bg-white max-h-60 overflow-y-auto shadow-lg px-6 py-3 text-gray-700">
                              <OvalSpinner
                                width="w-6"
                                height="h-6"
                                border="border-2"
                              />
                            </div>
                          )
                        ) : supplierList?.length > 0 ? (
                          <ComboboxOptions className="w-full border border-gray-200 rounded-xl bg-white max-h-60 overflow-y-auto shadow-lg empty:invisible">
                            {supplierList?.map((supplier) => (
                              <ComboboxOption
                                key={supplier._id}
                                value={supplier}
                                className="px-6 py-3 cursor-pointer text-gray-700 hover:bg-gray-100 data-[focus]:bg-blue-100"
                              >
                                {supplier.supplierCode}
                              </ComboboxOption>
                            ))}
                          </ComboboxOptions>
                        ) : (
                          supplierCodeInputFocused &&
                          !selectedSupplier && (
                            <div className="w-full border border-gray-200 rounded-xl bg-white max-h-60 overflow-y-auto shadow-lg px-6 py-3 text-gray-700">
                              No matching suppliers
                            </div>
                          )
                        )}
                      </div>
                    </Combobox>
                  </div>
                </div>

                {/* Supplier Name */}
                <div className="flex items-center gap-6 w-full md:w-[48%]">
                  <label className="min-w-44 text-slate-500 text-xl font-normal">
                    Supplier Name <span className="text-red-500">*</span>
                  </label>
                  <div className="flex-1 relative">
                    <Combobox
                      value={selectedSupplier}
                      onChange={setSelectedSupplier}
                      onClose={() => setSupplierSearch("")}
                    >
                      <ComboboxInput
                        aria-label="Supplier Name"
                        displayValue={(supplier) => supplier?.supplierName}
                        onChange={(e) => setSupplierSearch(e.target.value)}
                        onFocus={() => setSupplierNameInputFocused(true)}
                        onBlur={() => setSupplierNameInputFocused(false)}
                        placeholder="Search by name..."
                        autoComplete="off"
                        className="w-full px-6 py-4 bg-gray-50 rounded-xl text-gray-800 text-xl "
                      />
                      <div className="absolute left-0 right-0 mt-1 z-10">
                        {supplierLoading ? (
                          supplierNameInputFocused && (
                            <div className="w-full border border-gray-200 rounded-xl bg-white max-h-60 overflow-y-auto shadow-lg px-6 py-3 text-gray-700">
                              <OvalSpinner
                                width="w-6"
                                height="h-6"
                                border="border-2"
                              />
                            </div>
                          )
                        ) : supplierList?.length > 0 ? (
                          <ComboboxOptions className="w-full border border-gray-200 rounded-xl bg-white max-h-60 overflow-y-auto shadow-lg empty:invisible">
                            {supplierList.map((supplier) => (
                              <ComboboxOption
                                key={supplier._id}
                                value={supplier}
                                className="px-6 py-3 cursor-pointer text-gray-700 hover:bg-gray-100 data-[focus]:bg-blue-100"
                              >
                                {supplier.supplierName}
                              </ComboboxOption>
                            ))}
                          </ComboboxOptions>
                        ) : (
                          supplierNameInputFocused &&
                          !selectedSupplier && (
                            <div className="w-full border border-gray-200 rounded-xl bg-white max-h-60 overflow-y-auto shadow-lg px-6 py-3 text-gray-700">
                              No matching suppliers
                            </div>
                          )
                        )}
                      </div>
                    </Combobox>
                  </div>
                </div>
              </div>
            </div>

            {/* Item Table Section */}
            <div className="flex flex-col">
              <div className="pb-6 border-b border-gray-400">
                <h2 className="text-indigo-950 text-3xl font-semibold">
                  Item Details
                </h2>
              </div>

              {/* Table Header */}
              <div className="w-full grid grid-cols-12 gap-4 bg-gray-50 px-6 py-4 font-bold text-indigo-950 text-xl border-b">
                <div className="col-span-1">No.</div>
                <div className="col-span-3">Item Name</div>
                <div className="col-span-2">Qty (KG)</div>
                <div className="col-span-2">Qty (Box)</div>
                <div className="col-span-2">Unit Price</div>
                <div className="col-span-1">Subtotal</div>
              </div>

              {/* Dynamic Item Rows */}
              {items.map((item, index) => (
                <div
                  key={index}
                  className="relative w-full grid grid-cols-12 gap-4  px-6 py-4 text-xl border-b hover:bg-gray-100 group"
                >
                  {/* No. */}
                  <input
                    type="number"
                    name="id"
                    value={index + 1}
                    // onChange={(e) => handleInputChange(index, e)}
                    readOnly
                    onKeyDown={(e) => handleKeyDown(e, index, 0)}
                    ref={(el) => {
                      if (!inputRefs.current[index])
                        inputRefs.current[index] = [];
                      inputRefs.current[index][0] = el; // Item name
                      // ...
                      inputRefs.current[index][2] = el; // Qty (KG)
                      inputRefs.current[index][3] = el; // Qty (Box)
                      inputRefs.current[index][4] = el; // Price
                    }}
                    className="col-span-1 bg-white border-none outline-none placeholder:text-gray-400 w-full"
                    placeholder="No."
                  />

                  {/* Item Name */}
                  <div className="col-span-3">
                    <Combobox
                      value={item.name}
                      onChange={(selectedItem) => {
                        const updatedItems = [...items];
                        updatedItems[index].name = selectedItem.itemName;
                        setItems(updatedItems);
                      }}
                    >
                      <div className="relative w-full">
                        <ComboboxInput
                          onChange={(e) => setItemSearch(e.target.value)}
                          displayValue={(item) => item}
                          autoComplete="off"
                          placeholder="Item Name"
                          onFocus={() => setItemInputFocused(index)}
                          onBlur={() => setItemInputFocused(false)}
                          className="bg-white border-none outline-none placeholder:text-gray-400 w-full h-full"
                        />
                        {itemLoading ? (
                          itemInputFocused === index && (
                            <div className="absolute z-10 w-full border border-gray-200 rounded-xl bg-white max-h-60 overflow-y-auto shadow-lg px-6 py-3 text-gray-700">
                              <OvalSpinner
                                width="w-6"
                                height="h-6"
                                border="border-2"
                              />
                            </div>
                          )
                        ) : itemList?.length > 0 ? (
                          <ComboboxOptions className="absolute z-10 w-full mt-1 border border-gray-200 rounded-xl bg-white max-h-60 overflow-y-auto shadow-lg empty:invisible">
                            {itemList.map((itemOption) => (
                              <ComboboxOption
                                key={itemOption._id}
                                value={itemOption}
                                className="px-6 py-3 cursor-pointer text-gray-700 hover:bg-gray-100 data-[focus]:bg-blue-100"
                              >
                                {itemOption.itemName}
                              </ComboboxOption>
                            ))}
                          </ComboboxOptions>
                        ) : (
                          itemInputFocused === index &&
                          !item.name && (
                            <div className="absolute z-10 w-full border border-gray-200 rounded-xl bg-white max-h-60 overflow-y-auto shadow-lg px-6 py-3 text-gray-700">
                              No matching items.
                            </div>
                          )
                        )}
                      </div>
                    </Combobox>
                  </div>

                  {/* Quantity */}
                  {/* KG Input */}
                  <input
                    type="number"
                    name="kg"
                    value={item.kg}
                    disabled={
                      !itemList.some(
                        (option) => option.itemName === item.name
                      ) || !!item.box
                    }
                    onChange={(e) => {
                      const updatedItems = [...items];
                      updatedItems[index].kg = e.target.value;
                      setItems(updatedItems);
                    }}
                    onKeyDown={(e) => handleKeyDown(e, index, 2)}
                    ref={(el) => (inputRefs.current[index][2] = el)}
                    className="col-span-2 bg-white border-none outline-none placeholder:text-gray-400 w-full"
                    placeholder="Qty(Kg)"
                  />

                  {/* BOX Input */}
                  <input
                    type="number"
                    name="box"
                    value={item.box}
                    disabled={
                      !itemList.some(
                        (option) => option.itemName === item.name
                      ) || !!item.kg
                    }
                    onChange={(e) => {
                      const updatedItems = [...items];
                      updatedItems[index].box = e.target.value;
                      setItems(updatedItems);
                    }}
                    onKeyDown={(e) => handleKeyDown(e, index, 3)}
                    ref={(el) => (inputRefs.current[index][3] = el)}
                    className="col-span-2 bg-white border-none outline-none placeholder:text-gray-400 w-full"
                    placeholder="Qty(Box)"
                  />

                  {/* Unit Selector */}
                  {/* <select
                name="unit"
                value={item.unit}
                disabled={
                  !itemList.some((option) => option.itemName === item.name)
                }
                onChange={(e) => handleInputChange(index, e)}
                className="col-span-1 bg-gray-100 border border-gray-300 text-gray-700 px-2 rounded-md w-full"
              >
                <option value="box">Box</option>
                <option value="kg">Kg</option>
              </select> */}

                  {/* Price */}
                  <input
                    type="number"
                    name="price"
                    disabled={
                      !itemList.some((option) => option.itemName === item.name)
                    }
                    value={item.price}
                    onChange={(e) => handleInputChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(e, index, 4)}
                    ref={(el) => (inputRefs.current[index][4] = el)}
                    className="col-span-2 bg-white border-none outline-none placeholder:text-gray-400 w-full"
                    placeholder="Unit Price"
                  />

                  {/* Total (Read Only) */}
                  <input
                    type="text"
                    name="total"
                    disabled={
                      !itemList.some((option) => option.itemName === item.name)
                    }
                    value={item.total}
                    readOnly
                    onKeyDown={(e) => handleKeyDown(e, index, 5)}
                    ref={(el) => (inputRefs.current[index][5] = el)}
                    className="col-span-2 bg-white border-none outline-none placeholder:text-gray-400 w-full"
                    placeholder="Subtotal"
                  />
                  <div
                    className="hidden absolute right-0 top-4 group-hover:flex"
                    onClick={() => handleDeleteItem(index)}
                  >
                    <Trash2 />
                  </div>
                </div>
              ))}

              {error && (
                <div className="text-red-600 text-lg font-medium px-6">
                  {error}
                </div>
              )}

              <div
                className="col-span-6 rounded-lg px-6 py-4 cursor-pointer flex items-center justify-center gap-3 text-indigo-900 text-xl hover:bg-gray-100 transition"
                // onClick={handleAddItem}
                onClick={() => {
                  setItems((prev) => [
                    ...prev,
                    {
                      name: "",
                      kg: "",
                      box: "",
                      price: "",
                      total: "0.00",
                    },
                  ]);
                }}
              >
                <span className="text-2xl">＋</span> Add another item
              </div>

              {/* Totals Row */}
              <div className="w-full bg-teal-50 px-6 py-6 border-b text-xl font-bold text-indigo-950 grid grid-cols-12">
                <div className="col-span-4">Total</div>
                <div className="col-span-2">{totalQuantityInKg}(kg)</div>
                <div className="col-span-2 ">{totalQuantityInBox}(Box)</div>
                <div className="col-span-3 text-end">{totalPrice}</div>
              </div>
            </div>

            {/* Deductions */}
            <div className="flex flex-col gap-6">
              <div className="pb-6 border-b border-gray-400">
                <h2 className="text-indigo-950 text-3xl font-semibold">
                  Deductions
                </h2>
              </div>

              <div className="flex flex-wrap gap-8 border-b pb-6">
                {[
                  {
                    label: "Commission",
                    value: `₹ ${commission ? commission.toFixed(2) : 0}`,
                  },
                  {
                    label: "Market Fee/Coolie Rate",
                    value: `₹ ${marketFee ? marketFee.toFixed(2) : 0}`,
                  },
                  // { label: " ($/KG)", value: "0" },
                  {
                    label: "Total Deductions",
                    value: `₹ ${
                      totalDeduction ? totalDeduction.toFixed(2) : 0
                    }`,
                  },
                ].map((label, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-6 w-full md:w-[48%]"
                  >
                    <label className="min-w-44 text-slate-500 text-xl">
                      {label.label}
                    </label>
                    <div className="w-full md:w-80 px-6 py-4 bg-gray-50 rounded-xl flex items-center gap-2">
                      <span className="text-xl text-gray-400">
                        {label?.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-8">
                {[
                  { label: "Advance Deduction", value: "0" },
                  { label: "Advance Amount", value: "0" },
                  {
                    label: "Net Payable",
                    value:
                      totalPrice && totalDeduction
                        ? (totalPrice - totalDeduction).toFixed(2)
                        : 0,
                    prefix: "₹",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-6 w-full md:w-[48%]"
                  >
                    <label className="min-w-44 text-slate-500 text-xl">
                      {item.label}
                    </label>
                    <div className="w-full md:w-80 px-6 py-4 bg-gray-50 rounded-xl flex items-center gap-2">
                      {item.prefix && (
                        <span className="text-indigo-950 font-bold">
                          {item.prefix}
                        </span>
                      )}
                      <span
                        className={`text-xl ${
                          item.label === "Net Payable"
                            ? "text-indigo-950 font-bold"
                            : "text-gray-400"
                        }`}
                      >
                        {item.value}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                    onClick={()=>handleSubmit(false)}
                  >
                    Save
                  </button>
                  <button
                    className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
                    onClick={()=>handleSubmit(true)}
                  >
                    Print
                  </button>
                  <button
                    className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
                    onClick={() => {
                      // You can clear the form or reset states here
                      setItems([
                        {
                          name: "",
                          kg: "",
                          box: "",
                          price: "",
                          total: "0.00",
                        },
                      ]);
                      setSupplierSearch("");
                      setSupplierList([]);
                      setSelectedSupplier("");
                      setItemSearch("");
                      setItemList([]);
                      setDateOfPurchase("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Purchasetransaction;
