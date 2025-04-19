import React from 'react'

function LocalsalesReport() {
  return (
    <div className="inset-0 bg-gray-50  outline-1 outline-offset-[-1px] outline-white overflow-hidden mt-10">
    <div className="w-[1511px] h-[1095px] fixed bg-white rounded-3xl overflow-hidden">
        <div className="w-[1511px] left-0 top-[298px] absolute inline-flex flex-col justify-start items-start">
            <div className="self-stretch px-12 py-4 bg-gray-50 border-b border-gray-200 inline-flex justify-start items-center gap-16">
                <div className="w-8 h-8 relative">
                    <div className="w-2.5 h-0 left-[10.67px] top-[16px] absolute outline-2 outline-offset-[-1px] outline-blue-500" />
                    <div className="w-7 h-7 left-[2.67px] top-[2.67px] absolute outline-2 outline-offset-[-1px] outline-blue-500" />
                    <div className="w-8 h-8 left-0 top-0 absolute opacity-0" />
                </div>
                <div className="min-w-16 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">No.</div>
                <div className="min-w-32 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Date</div>
                <div className="min-w-32 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Supplier</div>
                <div className="min-w-32 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Customer</div>
                <div className="min-w-32 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Qty</div>
                <div className="min-w-32 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Total</div>
            </div>
            <div className="self-stretch px-12 py-4 bg-white border-b border-gray-200 inline-flex justify-start items-center gap-16">
                <div className="w-8 h-8 relative">
                    <div className="w-7 h-7 left-[2.66px] top-[2.67px] absolute bg-blue-500" />
                    <div className="w-8 h-8 left-[32px] top-[32px] absolute origin-top-left -rotate-180 opacity-0" />
                </div>
                <div className="min-w-16 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">001</div>
                <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">01/12/2024</div>
                <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">Farm Fresh</div>
                <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">GreenMart</div>
                <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">100</div>
                <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">$510.00</div>
            </div>
            <div className="self-stretch px-12 py-4 bg-white border-b border-gray-200 inline-flex justify-start items-center gap-16">
                <div className="w-8 h-8 relative">
                    <div className="w-7 h-7 left-[2.67px] top-[2.67px] absolute outline-2 outline-offset-[-1px] outline-blue-500" />
                    <div className="w-3 h-2 left-[10.33px] top-[12.23px] absolute outline-2 outline-offset-[-1px] outline-blue-500" />
                    <div className="w-8 h-8 left-0 top-0 absolute opacity-0" />
                </div>
                <div className="min-w-16 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">002</div>
                <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">01/12/2024</div>
                <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">Green Supply</div>
                <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">LocalMart</div>
                <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">150</div>
                <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">$800.00</div>
            </div>
        </div>
        <div className="w-[1511px] px-12 py-6 left-0 top-[594px] absolute bg-teal-50 border-b border-gray-200 inline-flex justify-start items-center gap-16">
            <div className="w-[960px] min-w-32 justify-center text-slate-500/40 text-xl font-normal font-['Urbanist'] tracking-wide">Grand Total</div>
            <div className="min-w-32 justify-center text-slate-900 text-xl font-bold font-['Urbanist'] tracking-wide">$1,310.00 </div>
        </div>
        <div className="w-[1511px] px-12 py-6 left-0 top-[490px] absolute border-b border-gray-200 inline-flex justify-between items-center">
            <div className="flex justify-start items-center gap-4">
                <div className="text-center justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">Page 1 of 10</div>
            </div>
            <div className="flex justify-end items-center gap-6">
                <div className="w-40 px-6 py-4 bg-white rounded-2xl outline-1 outline-offset-[-1px] outline-gray-300/30 flex justify-center items-center gap-3">
                    <div className="justify-start text-gray-300/30 text-xl font-bold font-['Urbanist']">Previous</div>
                </div>
                <div className="w-40 px-6 py-4 bg-white rounded-2xl outline-1 outline-offset-[-1px] outline-gray-300/30 flex justify-center items-center gap-3">
                    <div className="justify-start text-blue-500 text-xl font-bold font-['Urbanist']">Next</div>
                </div>
            </div>
        </div>
        <div className="left-[48px] top-[48px] absolute inline-flex justify-start items-center gap-3">
            <div className="justify-start text-slate-500 text-xl font-normal font-['Urbanist']">Reports</div>
            <div className="w-6 h-6 relative">
                <div className="w-2 h-4 left-[8.91px] top-[4.08px] absolute outline-[1.50px] outline-offset-[-0.75px] outline-slate-500/40" />
                <div className="w-6 h-6 left-[24px] top-[24px] absolute origin-top-left -rotate-180 opacity-0" />
            </div>
            <div className="justify-start text-slate-500 text-xl font-normal font-['Urbanist']">Local Sales Report</div>
        </div>
        <div className="left-[48px] top-[80px] absolute justify-start text-indigo-950 text-4xl font-bold font-['Urbanist'] leading-[50.40px]">Local Sales Report</div>
        <div className="left-[697px] top-[194px] absolute inline-flex justify-start items-center gap-12">
            <div className="justify-start text-slate-500/40 text-xl font-normal font-['Urbanist']">Date Range</div>
            <div className="w-64 px-6 py-4 bg-gray-50 rounded-tl-xl rounded-tr-xl flex justify-between items-center">
                <div className="justify-start text-zinc-100 text-xl font-normal font-['Urbanist']">DD/MM/YYYY</div>
                <div className="w-6 h-6 relative">
                    <div className="w-0 h-[3px] left-[8px] top-[2px] absolute outline-[1.50px] outline-offset-[-0.75px] outline-slate-500/40" />
                    <div className="w-0 h-[3px] left-[16px] top-[2px] absolute outline-[1.50px] outline-offset-[-0.75px] outline-slate-500/40" />
                    <div className="w-4 h-0 left-[3.50px] top-[9.09px] absolute outline-[1.50px] outline-offset-[-0.75px] outline-slate-500/40" />
                    <div className="w-4 h-5 left-[3px] top-[3.50px] absolute outline-[1.50px] outline-offset-[-0.75px] outline-slate-500/40" />
                    <div className="w-6 h-6 left-0 top-0 absolute opacity-0" />
                    <div className="w-px h-px left-[15.20px] top-[13.20px] absolute outline-2 outline-offset-[-1px] outline-slate-500/40" />
                    <div className="w-px h-px left-[15.20px] top-[16.20px] absolute outline-2 outline-offset-[-1px] outline-slate-500/40" />
                </div>
            </div>
            <div className="justify-start text-slate-500/40 text-xl font-normal font-['Urbanist']">to</div>
            <div className="w-64 px-6 py-4 bg-gray-50 rounded-tl-xl rounded-tr-xl flex justify-between items-center">
                <div className="justify-start text-zinc-100 text-xl font-normal font-['Urbanist']">DD/MM/YYYY</div>
                <div className="w-6 h-6 relative">
                    <div className="w-0 h-[3px] left-[8px] top-[2px] absolute outline-[1.50px] outline-offset-[-0.75px] outline-slate-500/40" />
                    <div className="w-0 h-[3px] left-[16px] top-[2px] absolute outline-[1.50px] outline-offset-[-0.75px] outline-slate-500/40" />
                    <div className="w-4 h-0 left-[3.50px] top-[9.09px] absolute outline-[1.50px] outline-offset-[-0.75px] outline-slate-500/40" />
                    <div className="w-4 h-5 left-[3px] top-[3.50px] absolute outline-[1.50px] outline-offset-[-0.75px] outline-slate-500/40" />
                    <div className="w-6 h-6 left-0 top-0 absolute opacity-0" />
                    <div className="w-px h-px left-[15.20px] top-[13.20px] absolute outline-2 outline-offset-[-1px] outline-slate-500/40" />
                    <div className="w-px h-px left-[15.20px] top-[16.20px] absolute outline-2 outline-offset-[-1px] outline-slate-500/40" />
                </div>
            </div>
        </div>
        <div className="px-8 py-4 left-[1313px] top-[66px] absolute bg-gray-50 rounded-xl inline-flex justify-start items-center gap-3">
            <div className="w-8 h-8 relative">
                <div className="w-3 h-1.5 left-[9.67px] top-[2.67px] absolute outline-2 outline-offset-[-1px] outline-zinc-800" />
                <div className="w-2.5 h-2.5 left-[10.67px] top-[20px] absolute outline-2 outline-offset-[-1px] outline-zinc-800" />
                <div className="w-6 h-3.5 left-[4px] top-[9.33px] absolute outline-2 outline-offset-[-1px] outline-zinc-800" />
                <div className="w-3.5 h-0 left-[9.33px] top-[20px] absolute outline-2 outline-offset-[-1px] outline-zinc-800" />
                <div className="w-1 h-0 left-[9.33px] top-[14.67px] absolute outline-2 outline-offset-[-1px] outline-zinc-800" />
                <div className="w-8 h-8 left-0 top-0 absolute opacity-0" />
            </div>
            <div className="w-10 justify-start text-indigo-950 text-xl font-bold font-['Urbanist']">Print</div>
        </div>
    </div>
</div>

  )
}

export default LocalsalesReport
