import React from 'react'

function Cashbook() {
  return (
 
      <div className=" h-fit relative bg-white rounded-3xl overflow-hidden">
    <div className="w-[1511px] left-0 top-[298px] absolute inline-flex flex-col justify-start items-start">
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
        <div className="justify-start text-slate-500 text-xl font-normal font-['Urbanist']">Transactions</div>
        <div className="w-6 h-6 relative">
            <div className="w-2 h-4 left-[8.91px] top-[4.08px] absolute  outline-[1.50px] outline-offset-[-0.75px] outline-slate-500/40" />
            <div className="w-6 h-6 left-[24px] top-[24px] absolute origin-top-left -rotate-180 opacity-0" />
        </div>
        <div className="justify-start text-slate-500 text-xl font-normal font-['Urbanist']">Cashbook</div>
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
        <div className="w-60 min-w-60 px-8 py-4 bg-gray-50 rounded-xl flex justify-between items-center">
            <div className="flex justify-start items-center gap-3">
                <div className="w-8 h-8 relative">
                    <div className="w-[2.67px] h-2 left-[12px] top-[14.67px] absolute  outline-2 outline-offset-[-1px] outline-zinc-800" />
                    <div className="w-[2.67px] h-[2.67px] left-[9.33px] top-[20px] absolute  outline-2 outline-offset-[-1px] outline-zinc-800" />
                    <div className="w-7 h-7 left-[2.67px] top-[2.67px] absolute  outline-2 outline-offset-[-1px] outline-zinc-800" />
                    <div className="w-2.5 h-2.5 left-[18.67px] top-[2.67px] absolute  outline-2 outline-offset-[-1px] outline-zinc-800" />
                    <div className="w-8 h-8 left-0 top-0 absolute opacity-0" />
                </div>
                <div className="justify-start text-indigo-950 text-xl font-bold font-['Urbanist']">Export as</div>
            </div>
            <div className="w-6 h-6 relative">
                <div className="w-4 h-2 left-[4.08px] top-[8.95px] absolute  outline-[1.50px] outline-offset-[-0.75px] outline-zinc-800" />
                <div className="w-6 h-6 left-[24px] top-[24px] absolute origin-top-left -rotate-180 opacity-0" />
            </div>
        </div>
        <div className="px-8 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-3">
            <div className="w-8 h-8 relative">
                <div className="w-3 h-1.5 left-[9.67px] top-[2.67px] absolute  outline-2 outline-offset-[-1px] outline-zinc-800" />
                <div className="w-2.5 h-2.5 left-[10.67px] top-[20px] absolute  outline-2 outline-offset-[-1px] outline-zinc-800" />
                <div className="w-6 h-3.5 left-[4px] top-[9.33px] absolute  outline-2 outline-offset-[-1px] outline-zinc-800" />
                <div className="w-3.5 h-0 left-[9.33px] top-[20px] absolute  outline-2 outline-offset-[-1px] outline-zinc-800" />
                <div className="w-1 h-0 left-[9.33px] top-[14.67px] absolute  outline-2 outline-offset-[-1px] outline-zinc-800" />
                <div className="w-8 h-8 left-0 top-0 absolute opacity-0" />
            </div>
            <div className="w-10 justify-start text-indigo-950 text-xl font-bold font-['Urbanist']">Print</div>
        </div>
    </div>
    <div className="left-[697px] top-[194px] absolute inline-flex justify-start items-center gap-12">
        <div className="justify-start text-slate-500/40 text-xl font-normal font-['Urbanist']">Date Range</div>
        <div className="w-64 px-6 py-4 bg-gray-50 rounded-xl flex justify-between items-center">
            <div className="justify-start text-zinc-100 text-xl font-normal font-['Urbanist']">DD/MM/YYYY</div>
            <div className="w-6 h-6 relative">
                <div className="w-0 h-[3px] left-[8px] top-[2px] absolute  outline-[1.50px] outline-offset-[-0.75px] outline-slate-500/40" />
                <div className="w-0 h-[3px] left-[16px] top-[2px] absolute  outline-[1.50px] outline-offset-[-0.75px] outline-slate-500/40" />
                <div className="w-4 h-0 left-[3.50px] top-[9.09px] absolute  outline-[1.50px] outline-offset-[-0.75px] outline-slate-500/40" />
                <div className="w-4 h-5 left-[3px] top-[3.50px] absolute  outline-[1.50px] outline-offset-[-0.75px] outline-slate-500/40" />
                <div className="w-6 h-6 left-0 top-0 absolute opacity-0" />
                <div className="w-px h-px left-[15.20px] top-[13.20px] absolute  outline-2 outline-offset-[-1px] outline-slate-500/40" />
                <div className="w-px h-px left-[15.20px] top-[16.20px] absolute  outline-2 outline-offset-[-1px] outline-slate-500/40" />
                <div className="w-px h-px left-[11.50px] top-[13.20px] absolute  outline-2 outline-offset-[-1px] outline-slate-500/40" />
                <div className="w-px h-px left-[11.50px] top-[16.20px] absolute  outline-2 outline-offset-[-1px] outline-slate-500/40" />
                <div className="w-px h-px left-[7.80px] top-[13.20px] absolute  outline-2 outline-offset-[-1px] outline-slate-500/40" />
                <div className="w-px h-px left-[7.80px] top-[16.20px] absolute  outline-2 outline-offset-[-1px] outline-slate-500/40" />
            </div>
        </div>
        <div className="justify-start text-slate-500/40 text-xl font-normal font-['Urbanist']">to</div>
        <div className="w-64 px-6 py-4 bg-gray-50 rounded-xl flex justify-between items-center">
            <div className="justify-start text-zinc-100 text-xl font-normal font-['Urbanist']">DD/MM/YYYY</div>
            <div className="w-6 h-6 relative">
                <div className="w-0 h-[3px] left-[8px] top-[2px] absolute  outline-[1.50px] outline-offset-[-0.75px] outline-slate-500/40" />
                <div className="w-0 h-[3px] left-[16px] top-[2px] absolute  outline-[1.50px] outline-offset-[-0.75px] outline-slate-500/40" />
                <div className="w-4 h-0 left-[3.50px] top-[9.09px] absolute  outline-[1.50px] outline-offset-[-0.75px] outline-slate-500/40" />
                <div className="w-4 h-5 left-[3px] top-[3.50px] absolute  outline-[1.50px] outline-offset-[-0.75px] outline-slate-500/40" />
                <div className="w-6 h-6 left-0 top-0 absolute opacity-0" />
                <div className="w-px h-px left-[15.20px] top-[13.20px] absolute  outline-2 outline-offset-[-1px] outline-slate-500/40" />
                <div className="w-px h-px left-[15.20px] top-[16.20px] absolute  outline-2 outline-offset-[-1px] outline-slate-500/40" />
                <div className="w-px h-px left-[11.50px] top-[13.20px] absolute  outline-2 outline-offset-[-1px] outline-slate-500/40" />
                <div className="w-px h-px left-[11.50px] top-[16.20px] absolute  outline-2 outline-offset-[-1px] outline-slate-500/40" />
                <div className="w-px h-px left-[7.80px] top-[13.20px] absolute  outline-2 outline-offset-[-1px] outline-slate-500/40" />
                <div className="w-px h-px left-[7.80px] top-[16.20px] absolute  outline-2 outline-offset-[-1px] outline-slate-500/40" />
            </div>
        </div>
    </div>
</div>

  )
}

export default Cashbook
