import {useState} from 'react'

function AddPaymentIn() {
    const [category, setCategory] = useState(''); // Track selected category

    const handleCategoryChange = (e) => {
      setCategory(e.target.value); // Update category state
    };
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-800"> {/* This will center the card */}
      <div className="w-[900px] px-8 py-10 bg-amber-300 rounded-3xl shadow-lg "> {/* Card container */}
        <div className="self-stretch flex flex-col justify-start items-start gap-6">
          <div className="self-stretch flex flex-col justify-start items-center gap-7">
            <div className="self-stretch justify-start text-indigo-950 text-3xl font-bold font-['Urbanist']">Payment in</div>
            <div className="self-stretch inline-flex justify-between items-center">
              <div className="w-full self-stretch inline-flex flex-col justify-start items-start gap-6 ">
              <div className="self-stretch px-6 py-4 bg-gray-50 rounded-xl rounded-tr-xl inline-flex justify-between items-center">
      <div className="justify-start text-slate-500 text-xl font-normal font-['Urbanist']">Choose Category</div>
      <select
        value={category} // Bind the value to category state
        onChange={handleCategoryChange} // Update state on change
        className="w-40 text-xl font-normal font-['Urbanist'] px-4 py-2 border border-gray-300 rounded-lg"
      >
        <option value="">Select</option>
        <option value="Employee">Employee</option>
        <option value="Manager">Customer</option>
        <option value="Admin">Supplier</option>
        <option value="Customer">Company</option>
        <option value="Customer">Bank</option>
        <option value="Customer">Others</option>
      </select>
    </div>
    <div className="self-stretch px-6 py-4 bg-gray-50 rounded-xl rounded-tr-xl inline-flex justify-start items-center gap-9">
  <div className="justify-start text-slate-500 text-xl font-normal font-['Urbanist']">Date</div>
  <input
    type="date"
    className="w-full px-3 py-2  text-xl font-normal font-['Urbanist'] text-slate-500 "
  />
</div>

              </div>
              <div className="w-full h-40 inline-flex flex-col justify-between items-start gap-6 ml-8 -mt-4">
              <div className="self-stretch px-6 py-4 bg-gray-50 rounded-xl rounded-tr-xl inline-flex justify-between items-center">
  <div className="justify-start text-slate-500 text-xl font-normal font-['Urbanist']">Employee</div>
  <input
    type="text"
    placeholder="Enter Employee Name"
    className="w-full px-5 py-2 text-xl font-normal font-['Urbanist'] text-slate-500  "
  />
</div>

              
<div className="self-stretch px-6 py-4 bg-gray-50 rounded-xl rounded-tr-xl inline-flex justify-between items-center gap-9">
  <div className="justify-start text-slate-500 text-xl font-normal font-['Urbanist']">
    Amount <span className="text-red-600">*</span>
  </div>
  <input
    type="number"
    placeholder="Enter amount"
    className="w-full px-5 py-2 text-xl font-normal font-['Urbanist'] text-slate-500 -mt-5"
  />
</div>

              </div>
             </div>
          </div>
          <div className="self-stretch h-36 px-6 py-4 bg-gray-50 rounded-2xl inline-flex justify-start items-start gap-16 mt-5">
  <textarea
    placeholder="Enter address"
    className="w-full h-full bg-transparent outline-none resize-none text-slate-500 text-xl font-normal font-['Urbanist']"
  ></textarea>
</div>

        </div>
        <div className="inline-flex justify-start items-center gap-6 mt-6"> {/* Add margin-top to separate the buttons from the form */}
          <div className="w-40 px-6 py-4 bg-white rounded-2xl outline-1 outline-offset-[-1px] outline-red-500 flex justify-center items-center gap-3">
            <div className="w-8 h-8 relative">
              <div className="w-2 h-2 left-[12.23px] top-[12.23px] absolute outline-2 outline-offset-[-1px] outline-red-500" />
              <div className="w-2 h-2 left-[12.23px] top-[12.23px] absolute outline-2 outline-offset-[-1px] outline-red-500" />
              <div className="w-7 h-7 left-[2.67px] top-[2.67px] absolute outline-2 outline-offset-[-1px] outline-red-500" />
              <div className="w-8 h-8 left-0 top-0 absolute opacity-0" />
            </div>
            <div className="justify-start text-red-500 text-xl font-bold font-['Urbanist']">Cancel</div>
          </div>
          <div className="w-40 px-6 py-4 bg-blue-500 rounded-2xl flex justify-center items-center gap-3">
            <div className="w-8 h-8 relative">
              <div className="w-7 h-7 left-[2.67px] top-[2.67px] absolute outline-2 outline-offset-[-1px] outline-white" />
              <div className="w-2.5 h-0 left-[10.67px] top-[16px] absolute outline-2 outline-offset-[-1px] outline-white" />
              <div className="w-0 h-2.5 left-[16px] top-[10.67px] absolute outline-2 outline-offset-[-1px] outline-white" />
              <div className="w-8 h-8 left-0 top-0 absolute opacity-0" />
            </div>
            <div className="justify-start text-white text-xl font-bold font-['Urbanist']">Save</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPaymentIn;
