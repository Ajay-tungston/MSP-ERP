import React, { useState } from 'react';
import { PiPrinterLight } from "react-icons/pi";
import { CiCirclePlus, } from "react-icons/ci";
import { FaChevronRight } from "react-icons/fa6";
import AddPaymentIn from './AddPaymentIn';
function PaymentIn() {
  const data = [
    { category: 'Employee', name: 'Ajay kumar IPS', date: '12-12 2012', amount: '$5000' },
    { category: 'Employee', name: 'Xavier Brooks', date: '12-12 2012', amount: '$5000' },
    { category: 'Employee', name: 'John Doe', date: '12-12 2012', amount: '$4000' },
    { category: 'Employee', name: 'Jane Smith', date: '12-12 2012', amount: '$3500' },
    { category: 'Employee', name: 'Mark Allen', date: '12-12 2012', amount: '$3000' },
    { category: 'Employee', name: 'Emma Watson', date: '12-12 2012', amount: '$6000' },
    { category: 'Employee', name: 'Chris Evans', date: '12-12 2012', amount: '$4200' },
    { category: 'Employee', name: 'Scarlett Johansson', date: '12-12 2012', amount: '$5100' },
    { category: 'Employee', name: 'Robert Downey', date: '12-12 2012', amount: '$7100' },
    { category: 'Employee', name: 'Tom Holland', date: '12-12 2012', amount: '$4800' },
    { category: 'Employee', name: 'Benedict Cumberbatch', date: '12-12 2012', amount: '$6900' },
  ];
  const [popup,setPopup]=useState(false);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
<>
      <div className="h-fit relative bg-gray-50 outline-1 outline-offset-[-1px] outline-white mt-10">
        <div className="w-[1471px] h-[1095px] absolute bg-white rounded-3xl overflow-hidden">
          <div className="left-[48px] top-[48px] absolute inline-flex justify-start items-center gap-3">
          <div className="flex items-center text-slate-500 text-xl font-normal font-['Urbanist']">
  Transactions <FaChevronRight className="ml-2" />
  Payment in
</div>


            <div className="w-80 h-[64px] px-6 py-4 left-[1023px] top-[32px] absolute bg-indigo-500 rounded-2xl inline-flex justify-center items-center gap-3" onClick={()=>setPopup(true)}>
              <div className="w-8 h-8 relative">
                <CiCirclePlus className="w-7 h-7 left-[2.67px] top-[2.67px] absolute text-white" />
                <div className="w-8 h-8 left-[32px] top-[32px] absolute origin-top-left -rotate-180 opacity-0" />
              </div>
              <div className="justify-start text-white text-xl font-bold font-['Urbanist']">Payment In</div>
            </div>
          </div>

          <div className="left-[48px] top-[80px] absolute justify-start text-indigo-950 text-4xl font-bold font-['Urbanist'] leading-[50.40px]">Payment In</div>

          <div className="w-[1451px] left-0 top-[202px] absolute inline-flex flex-col justify-start items-start">
            {/* Header */}
            <div className="self-stretch px-12 py-4 bg-gray-50 border-b border-gray-200 inline-flex justify-between items-center">
              <div className="min-w-32 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Category</div>
              <div className="w-44 min-w-32 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Names</div>
              <div className="min-w-32 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Date</div>
              <div className="min-w-36 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Amount</div>
              <div className="w-6 h-6 relative" />
            </div>

            {/* Data Rows */}
            {currentData.map((row, index) => (
              <div key={index} className="self-stretch px-12 py-4 bg-white border-b border-gray-200 inline-flex justify-between items-center">
                <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">{row.category}</div>
                <div className="w-44 min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">{row.name}</div>
                <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">{row.date}</div>
                <div className="min-w-36 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">{row.amount}</div>
                <div className="w-6 h-6 flex items-center justify-center text-slate-500 cursor-pointer">
      <PiPrinterLight className="w-5 h-5" />
    </div>
  </div>
))}
          </div>
     

          {/* Pagination Controls */}
          <div className="w-[1511px] px-12 py-6 left-0 top-[976px] absolute border-b border-gray-200 inline-flex justify-between items-center">
            <div className="flex justify-start items-center gap-4">
              <div className="text-center justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">
                Page {currentPage} of {totalPages}
              </div>
            </div>
            <div className="flex justify-end items-center gap-6">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="w-40 px-6 py-4 bg-white rounded-2xl outline-1 outline-offset-[-1px] outline-gray-300/30 flex justify-center items-center gap-3"
              >
                <div className={`text-xl font-bold font-['Urbanist'] ${currentPage === 1 ? 'text-gray-300/30' : 'text-blue-500'}`}>Previous</div>
              </button>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="w-40 px-6 py-4 bg-white rounded-2xl outline-1 outline-offset-[-1px] outline-gray-300/30 flex justify-center items-center gap-3"
              >
                <div className={`text-xl font-bold font-['Urbanist'] ${currentPage === totalPages ? 'text-gray-300/30' : 'text-blue-500'}`}>Next</div>
              </button>
            </div>
          </div>
        </div>
      </div>

    {popup && <AddPaymentIn setPopup={setPopup}/>}
    </>
  );
}

export default PaymentIn;
