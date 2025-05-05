import React from 'react'
import { BsPrinter } from "react-icons/bs";



function Cashbook() {
  return (
    <div>
      <div className="h-fit relative bg-gray-50  outline-1 outline-offset-[-1px] outline-white mt-10">
 
    <div className="w-full h-[1095px]  absolute bg-amber-500 rounded-3xl overflow-hidden">

    <div className="left-[697px] top-[194px] absolute inline-flex justify-start items-center gap-12">
            <div className="justify-start text-slate-500/40 text-xl font-normal font-['Urbanist']">Date Range</div>
            <div className="w-64 px-6 py-4 bg-gray-50 rounded-xl flex justify-between items-center">
  <input
    type="date"
    placeholder="DD/MM/YYYY"
    className="justify-start text-black text-xl font-normal font-['Urbanist'] bg-transparent outline-none border-none w-full"
  />
</div>

            <div className="justify-start text-slate-500/40 text-xl font-normal font-['Urbanist']">to</div>
            <div className="w-64 px-6 py-4 bg-gray-50 rounded-xl flex justify-between items-center">
  <input
    type="date"
    placeholder="DD/MM/YYYY"
    className="justify-start text-blaxck text-xl font-normal font-['Urbanist'] bg-transparent outline-none border-none w-full"
  />
</div>

        </div>
        <div className="w-full left-0 top-[298px] absolute inline-flex flex-col justify-start items-start">
            <div className="self-stretch px-12 py-4 bg-gray-50 border-b border-gray-200 inline-flex justify-start items-center gap-16">
                <div className="w-8 h-8 relative">
                    <div className="w-2.5 h-0 left-[10.67px] top-[16px] absolute  outline-2 outline-offset-[-1px] outline-blue-500" />
                    <div className="w-7 h-7 left-[2.67px] top-[2.67px] absolute  outline-2 outline-offset-[-1px] outline-blue-500" />
                    <div className="w-8 h-8 left-0 top-0 absolute opacity-0" />
                </div>
                <div className="min-w-32 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Date</div>
                <div className="w-80 min-w-80 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Description</div>
                <div className="min-w-32 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Debit ($)</div>
                <div className="min-w-32 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Credit ($)</div>
                <div className="min-w-32 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Balance ($)</div>
            </div>
            <div className="self-stretch px-12 py-4 bg-white border-b border-gray-200 inline-flex justify-start items-center gap-16">
                <div className="w-8 h-8 relative">
                    <div className="w-7 h-7 left-[2.66px] top-[2.67px] absolute bg-blue-500" />
                    <div className="w-8 h-8 left-[32px] top-[32px] absolute origin-top-left -rotate-180 opacity-0" />
                </div>
                <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">01/12/2024</div>
                <div className="max-w-80 min-w-80 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">Opening Cash Balance</div>
                <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide"> </div>
                <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide"> </div>
                <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">$5,000.00 </div>
            </div>
            <div className="self-stretch px-12 py-4 bg-white border-b border-gray-200 inline-flex justify-start items-center gap-16">
                <div className="w-8 h-8 relative">
                    <div className="w-7 h-7 left-[2.67px] top-[2.67px] absolute  outline-2 outline-offset-[-1px] outline-blue-500" />
                    <div className="w-3 h-2 left-[10.33px] top-[12.23px] absolute  outline-2 outline-offset-[-1px] outline-blue-500" />
                    <div className="w-8 h-8 left-0 top-0 absolute opacity-0" />
                </div>
                <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">01/12/2024</div>
                <div className="flex-1 max-w-80 min-w-80 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">Purchase from Farm Fresh</div>
                <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">$1,250.00 </div>
                <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide"> </div>
                <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">$3,750.00 </div>
            </div>
            <div className="self-stretch px-12 py-4 bg-white border-b border-gray-200 inline-flex justify-start items-center gap-16">
                <div className="w-8 h-8 relative">
                    <div className="w-7 h-7 left-[2.67px] top-[2.67px] absolute  outline-2 outline-offset-[-1px] outline-blue-500" />
                    <div className="w-3 h-2 left-[10.33px] top-[12.23px] absolute  outline-2 outline-offset-[-1px] outline-blue-500" />
                    <div className="w-8 h-8 left-0 top-0 absolute opacity-0" />
                </div>
                <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">01/12/2024</div>
                <div className="flex-1 max-w-80 min-w-80 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">Sales to GreenMart</div>
                <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide"> </div>
                <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">$510.00 </div>
                <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">$4,260.00 </div>
            </div>
            <div className="self-stretch px-12 py-4 bg-white border-b border-gray-200 inline-flex justify-start items-center gap-16">
                <div className="w-8 h-8 relative">
                    <div className="w-7 h-7 left-[2.67px] top-[2.67px] absolute  outline-2 outline-offset-[-1px] outline-blue-500" />
                    <div className="w-3 h-2 left-[10.33px] top-[12.23px] absolute  outline-2 outline-offset-[-1px] outline-blue-500" />
                    <div className="w-8 h-8 left-0 top-0 absolute opacity-0" />
                </div>
                <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">01/12/2024</div>
                <div className="flex-1 max-w-80 min-w-80 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">Fuel Expense for Route 1</div>
                <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">$120.00 </div>
                <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide"> </div>
                <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">$4,140.00 </div>
            </div>
        </div>
        <div className="w-[1511px] px-12 py-6 left-0 top-[618px] absolute bg-teal-50 border-b border-gray-200 inline-flex justify-start items-center gap-16">
            <div className="w-[624px] justify-center text-slate-500/40 text-xl font-normal font-['Urbanist'] tracking-wide">Total</div>
            <div className="min-w-32 justify-center text-slate-900 text-xl font-bold font-['Urbanist'] tracking-wide">$1,370.00 </div>
            <div className="min-w-32 justify-center text-slate-900 text-xl font-bold font-['Urbanist'] tracking-wide">$510.00 </div>
            <div className="min-w-32 justify-center text-slate-900 text-xl font-bold font-['Urbanist'] tracking-wide">$4,140.00 </div>
        </div>
        <div className="w-[1511px] px-12 py-6 left-0 top-[690px] absolute border-b border-gray-200 inline-flex justify-between items-center">
            <div className="flex justify-start items-center gap-4">
                <div className="text-center justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">Page 1 of 10</div>
            </div>
            <div className="flex justify-end items-center gap-6">
                <div className="w-40 px-6 py-4 bg-white rounded-2xl  outline-1 outline-offset-[-1px] outline-gray-300/30 flex justify-center items-center gap-3">
                    <div className="justify-start text-gray-300/30 text-xl font-bold font-['Urbanist']">Previous</div>
                </div>
                <div className="w-40 px-6 py-4 bg-white rounded-2xl  outline-1 outline-offset-[-1px] outline-gray-300/30 flex justify-center items-center gap-3">
                    <div className="justify-start text-blue-500 text-xl font-bold font-['Urbanist']">Next</div>
                </div>
            </div>
        </div>
        <div className="left-[48px] top-[48px] absolute inline-flex justify-start items-center gap-3">
            <div className="justify-start text-slate-500 text-xl font-normal font-['Urbanist']">Transactions   Cashbook</div>
         
        </div>
        <div className="left-[48px] top-[80px] absolute justify-start text-indigo-950 text-4xl font-bold font-['Urbanist'] leading-[50.40px]">Cashbook</div>
        <div className="left-[48px] top-[194px] absolute inline-flex justify-start items-center gap-12">
            <div className="justify-start text-slate-500/40 text-xl font-normal font-['Urbanist']">Opening Cash Balance</div>
            <div className="px-8 py-4 bg-sky-50 rounded-xl flex justify-start items-center gap-2">
                <div className="justify-start text-blue-500 text-xl font-bold font-['Urbanist']">$</div>
                <div className="justify-start text-blue-500 text-xl font-bold font-['Urbanist']">5,000.00</div>
            </div>
        </div>
        <div className="left-[1049px] top-[66px] absolute inline-flex justify-start items-center gap-6">
           
            <div className="px-8 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-3">
                <div className="w-8 h-8 relative">
                <BsPrinter />
                </div>
                <div className="w-10 justify-start text-indigo-950 text-xl font-bold font-['Urbanist']">Print</div>
            </div>
        </div>
       
     
    </div>
</div>
    </div>
  )
}

export default Cashbook
