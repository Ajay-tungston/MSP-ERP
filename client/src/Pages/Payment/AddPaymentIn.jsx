import { useEffect, useState } from "react";
import { XCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function AddPaymentIn({ setPopup }) {
  const [category, setCategory] = useState("");
  console.log(category);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});
  const [nameList, setNameList] = useState([]);
  const [sellectedData, setselectedData] = useState(null);
  const [autoFilledAddress, setAutoFilledAddress] = useState("");
  const axiosInstance = useAxiosPrivate();
  console.log("namelist=", nameList);
  console.log("selecteddaa=", sellectedData);

  console.log("name=", name);

  useEffect(() => {
    const fetchName = async () => {
      const qry=category==="customer"?`/admin/customer/getname?q=${name}`:`/admin/${category}/list?search=${name}`
      try {
        const response = await axiosInstance.get(qry);
        category==="customer"?setNameList(response?.data?.customers):setNameList(response?.data);
       
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchName();
  }, [name, category]);
  

  const handleSave = () => {
    const newErrors = {};

    // Validation for Category
    if (!category) newErrors.category = "Category is required";

    // Validation for Date
    if (!date) newErrors.date = "Date is required";

    // Validation for Name
    if (!name) {
      newErrors.name = "Name is required";
    } else if (!nameList.includes(name)) {
      newErrors.name = "Name must be one of the available options"; // You can customize this condition based on your needs
    }

    // Validation for Amount
    if (!amount) {
      newErrors.amount = "Amount is required";
    } else if (parseFloat(amount) <= 0) {
      newErrors.amount = "Amount is invalid";
    }

    // Validation for Address
    if (address.trim().length <= 5) {
      newErrors.address = "Address must be more than 5 characters";
    }

    // Set the errors state
    setErrors(newErrors);

    // If no errors, proceed to submit
    if (Object.keys(newErrors).length === 0) {
      console.log("Submitting Data:", {
        category,
        date,
        name,
        amount,
        address,
      });
      alert("Data Saved!");
      // Optionally reset the form
      setCategory("");
      setDate("");
      setName("");
      setAmount("");
      setAddress("");
      setAutoFilledAddress("");
    }
  };

  const handleCancel = () => {
    setCategory("");
    setDate("");
    setName("");
    setAmount("");
    setAddress("");
    setErrors({});
    setPopup("");
    setAutoFilledAddress("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75">
      <div className="w-[900px] px-8 py-10 bg-gray-100 rounded-3xl shadow-lg">
        <div className="flex flex-col gap-6">
          <div className="text-indigo-950 text-3xl font-bold font-['Urbanist']">
            Payment Out
          </div>

          <div className="flex justify-between gap-8">
            {/* Left Column */}
            <div className="w-full flex flex-col gap-6">
              {/* Category */}
              <div className="w-full">
                {errors.category && (
                  <span className="text-red-600 text-sm ml-6">
                    {errors.category}
                  </span>
                )}
                <div className="px-6 py-4 bg-gray-50 rounded-xl rounded-tr-xl flex justify-between items-center">
                  <div className="text-slate-500 text-xl font-normal font-['Urbanist']">
                    Choose Category
                  </div>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-40 text-xl font-normal font-['Urbanist'] px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select</option>
                    <option value="employee">Employee</option>
                    <option value="customer">Customer</option>
                    <option value="supplier">Supplier</option>
                    <option value="company">Company</option>
                    <option value="Bank">Bank</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>

              {/* Date */}
              <div className="w-full">
                {errors.date && (
                  <span className="text-red-600 text-sm ml-6">
                    {errors.date}
                  </span>
                )}
                <div className="px-12 py-4 bg-gray-50 rounded-xl rounded-tr-xl flex justify-start items-center gap-9">
                  <div className="text-slate-500 text-xl font-normal font-['Urbanist']">
                    Date
                  </div>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 text-xl font-normal font-['Urbanist'] text-slate-500"
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="w-full flex flex-col gap-6">
              {/* Name */}
              <div className="w-full relative">
                {errors.name && (
                  <span className="text-red-600 text-sm ml-6">
                    {errors.name}
                  </span>
                )}
                <div className="px-6 py-4 bg-gray-50 rounded-xl rounded-tr-xl flex justify-between items-center">
                  <div className="text-slate-500 text-xl font-normal font-['Urbanist']">
                    Name
                  </div>
                  <Combobox
                    value={sellectedData}
                    onChange={setselectedData}
                    // onClose={() => setselectedData("")}
                  >
                    <ComboboxInput
                      aria-label="Name"
                      displayValue={(item) => {
                        if (!item) return "";
                        if (category === "supplier") return item.supplierName;
                        if (category === "employee") return item.employeeName;
                        if (category === "company") return item.companyName;
                        if (category === "customer") return item.name;
                        return "";
                      }}
                      onChange={(e) => setName(e.target.value)}
                      // onFocus={() => setInputFocused(true)}
                      // onBlur={() => setInputFocused(false)}
                      autoComplete="off"
                      placeholder="Enter Name"
                      className="w-full px-8 py-2 text-xl font-normal font-['Urbanist'] text-slate-500"
                    />
                    <div className="absolute left-0 right-0 mt- z-10 top-18">
                      <ComboboxOptions className="w-full border border-gray-200 rounded-xl bg-white max-h-60 overflow-y-auto shadow-lg">
                        {nameList?.map((item, index) => (
                          <ComboboxOption
                            key={index}
                            value={item}
                            className="px-6 py-3 cursor-pointer text-gray-700 hover:bg-gray-100"
                          >{category==="supplier"?item?.supplierName:category==="employee"?
                            item?.employeeName:category==="company"?item?.companyName:category==="customer"?item.name:""}
                          </ComboboxOption>
                        ))}
                      </ComboboxOptions>
                    </div>
                  </Combobox>
                </div>
              </div>

              {/* Amount */}
              <div className="w-full">
                {errors.amount && (
                  <span className="text-red-600 text-sm ml-6">
                    {errors.amount}
                  </span>
                )}
                <div className="px-6 py-4 bg-gray-50 rounded-xl rounded-tr-xl flex justify-between items-center">
                  <div className="text-slate-500 text-xl font-normal font-['Urbanist']">
                    Amount<span className="text-red-600">*</span>
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full px-8 py-2 text-xl font-normal font-['Urbanist'] text-slate-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          {errors.address && (
            <span className="text-red-600 text-sm ml-6">{errors.address}</span>
          )}
          <div className="px-6 py-4 bg-gray-50 rounded-2xl">
            {category === "Bank" || category === "Others" ? (
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
                className="w-full h-full bg-transparent outline-none resize-none text-slate-500 text-xl font-normal font-['Urbanist']"
              ></textarea>
            ) : (
              <input
                type="text"
                // value={autoFilledAddress || address}
                value={sellectedData?.address}

                // onChange={(e) => setAddress(e.target.value)}
                className="w-full px-8 py-2 text-xl font-normal font-['Urbanist'] text-slate-500"
                disabled={
                  category === "Customer" ||
                  category === "Employee" ||
                  category === "Supplier"
                }
              />
            )}
          </div>

          {/* Buttons */}
          <div className="mt-10 flex justify-end gap-4">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-100 transition"
            >
              <XCircleIcon className="w-5 h-5" /> Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <PlusCircleIcon className="w-5 h-5" /> Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPaymentIn;
