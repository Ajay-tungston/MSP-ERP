import React, { useState, useRef, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";

function Purchasetransaction() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "",
      qty: "",
      unit: "box",
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

    const quantity = parseFloat(item.qty || 0);
    const price = parseFloat(item.price || 0);
    item.total = (quantity * price).toFixed(2);

    updatedItems[index] = item;
    setItems(updatedItems);
    setError("");
  };
  const [supplierSearch, setSupplierSearch] = useState("");
  const [supplierList, setSupplierList] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const [itemSearch, setItemSearch] = useState("");
  const [itemList, setItemList] = useState([]);

  const [purchaseCount, setPurchaseCount]=useState(1)

  const axiosInstance = useAxiosPrivate();

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await axiosInstance(
          `/admin/supplier/list?search=${supplierSearch}`
        );
        setSupplierList(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSupplier();
  }, [supplierSearch]);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axiosInstance(
          `/admin/item/list?search=${itemSearch}`
        );
        setItemList(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItem();
  }, [itemSearch]);

  useEffect(() => {
    const fetchPurchaseCount = async () => {
      try {
        const response = await axiosInstance(
          `/admin/purchase/count`
        );
        setPurchaseCount((Number(response?.data?.count) || 0) + 1);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPurchaseCount();
  }, []);

  const handleAddItem = () => {
    const lastItem = items[items.length - 1];

    if (!lastItem) {
      setItems([
        ...items,
        { id: "", name: "", kg: "", box: "", price: "", total: "" },
      ]);
      return;
    }

    const requiredFields = ["id", "name", "kg", "box", "price"];
    const isComplete = requiredFields.every((field) => lastItem[field] !== "");

    if (!isComplete) {
      setError(" ");
      return;
    }

    setItems([
      ...items,
      { id: "", name: "", kg: "", box: "", price: "", total: "" },
    ]);
    setError("");
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

  const totalQuantity = items.reduce((acc, item) => {
    const qty = parseFloat(item.qty);
    return acc + (isNaN(qty) ? 0 : qty);
  }, 0);
  
  const totalPrice = items.reduce((acc, item) => {
    const qty = parseFloat(item.qty);
    const price = parseFloat(item.price);
    const subtotal = (!isNaN(qty) && !isNaN(price)) ? qty * price : 0;
    return acc + subtotal;
  }, 0);

  const handleSubmit = async () => {
    try {
      const formattedItems = items.map((item) => ({
        itemName: item.name,
        quantity: Number(item.qty),
        unitPrice: Number(item.price),
        unitType: item.unit,
      }));
      const response = await axiosInstance.post("/admin/purchase/add", {
        supplierId: selectedSupplier?._id,
        items: formattedItems,
      });
      alert("sgfsaug")
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  };

  return (
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
                    placeholder="Search by code..."
                    className="w-full px-6 py-4 bg-gray-50 rounded-xl text-gray-800 text-xl "
                  />
                  <div className="absolute left-0 right-0 mt-1 z-10">
                    <ComboboxOptions className="w-full border border-gray-200 rounded-xl bg-white max-h-60 overflow-y-auto shadow-lg empty:invisible">
                      {supplierList.map((supplier) => (
                        <ComboboxOption
                          key={supplier._id}
                          value={supplier}
                          className="px-6 py-3 cursor-pointer text-gray-700 hover:bg-gray-100 data-[focus]:bg-blue-100"
                        >
                          {supplier.supplierCode}
                        </ComboboxOption>
                      ))}
                    </ComboboxOptions>
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
                    placeholder="Search by name..."
                    className="w-full px-6 py-4 bg-gray-50 rounded-xl text-gray-800 text-xl "
                  />
                  <div className="absolute left-0 right-0 mt-1 z-10">
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
                  </div>
                </Combobox>
              </div>
            </div>
          </div>
        </div>

        {/* Item Table Section */}
        <div className="flex flex-col gap-6">
          <div className="pb-6 border-b border-gray-400">
            <h2 className="text-indigo-950 text-3xl font-semibold">
              Item Details
            </h2>
          </div>

          {/* Table Header */}
          <div className="w-full grid grid-cols-12 gap-4 bg-gray-50 px-6 py-4 font-bold text-indigo-950 text-xl border-b">
            <div className="col-span-1">No.</div>
            <div className="col-span-4">Item Name</div>
            <div className="col-span-2">Qty</div>
            <div className="col-span-1">Unit</div>
            <div className="col-span-2">Unit Price</div>
            <div className="col-span-1">Subtotal</div>
          </div>

          {/* Dynamic Item Rows */}
          {items.map((item, index) => (
            <div
              key={index}
              className="w-full grid grid-cols-12 gap-4 bg-white px-6 py-4 text-xl border-b"
            >
              {/* No. */}
              <input
                type="number"
                name="id"
                value={item.id}
                onChange={(e) => handleInputChange(index, e)}
                onKeyDown={(e) => handleKeyDown(e, index, 0)}
                ref={(el) => {
                  if (!inputRefs.current[index]) inputRefs.current[index] = [];
                  inputRefs.current[index][0] = el;
                }}
                className="col-span-1 bg-white border-none outline-none placeholder:text-gray-400 w-full"
                placeholder="No."
              />

              {/* Item Name */}
              <div className="col-span-4">
                <Combobox
                  value={item.name}
                  onChange={(selectedItem) => {
                    const updatedItems = [...items];
                    updatedItems[index].name = selectedItem.itemName; // Assuming selectedItem contains itemName
                    updatedItems[index].price = selectedItem.price; // Update price as well
                    setItems(updatedItems);
                  }}
                >
                  <div className="relative w-full">
                    <ComboboxInput
                      onChange={(e) => setItemSearch(e.target.value)}
                      displayValue={(item) => item}
                      placeholder="Item Name"
                      className="bg-white border-none outline-none placeholder:text-gray-400 w-full h-full"
                    />

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
                  </div>
                </Combobox>
              </div>

              {/* Quantity */}
              <input
                type="number"
                name="qty"
                value={item.qty}
                disabled={
                  !itemList.some((option) => option.itemName === item.name)
                }
                onChange={(e) => handleInputChange(index, e)}
                onKeyDown={(e) => handleKeyDown(e, index, 2)}
                ref={(el) => (inputRefs.current[index][2] = el)}
                className="col-span-2 bg-white border-none outline-none placeholder:text-gray-400 w-full"
                placeholder="Quantity"
              />

              {/* Unit Selector */}
              <select
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
              </select>

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
            </div>
          ))}

          {error && (
            <div className="text-red-600 text-lg font-medium px-6">{error}</div>
          )}

          <div
            className="col-span-6 rounded-lg px-6 py-4 cursor-pointer flex items-center justify-center gap-3 text-indigo-900 text-xl hover:bg-gray-100 transition"
            // onClick={handleAddItem}
            onClick={() => {
              const nextId = items.length + 1;
              setItems((prev) => [
                ...prev,
                {
                  id: nextId,
                  name: "",
                  qty: "",
                  unit: "box",
                  price: "",
                  total: "0.00",
                },
              ]);
            }}
          >
            <span className="text-2xl">＋</span> Add another item
          </div>

          {/* Totals Row */}
          <div className="w-full bg-teal-50 px-6 py-6 border-b text-xl font-bold text-indigo-950 grid grid-cols-6">
            <div>Total</div>
            <div className="col-span-2"></div>
            <div className="col-span-2">{totalQuantity}</div>
            <div>{totalPrice}</div>
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
              {label:"Commission (%)",value:`${selectedSupplier?.commission}%`},
              {label:"Market Fee ($/KG)",value:""},
              {label:"Coolie Rate ($/KG)",value:""},
              {label:"Total Deductions",value:""},
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
                   {label?.value&&label.value}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-8">
            {[
              { label: "Advance Deduction", value: "Apply Advance" },
              { label: "Advance Amount", value: "Fetch from Supplier Master" },
              { label: "Net Payable", value: "Auto calculated", prefix: "$" },
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
            <button className="bg-blue-800" onClick={handleSubmit}>save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Purchasetransaction;
