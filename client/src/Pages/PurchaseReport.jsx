import React from 'react'
import { RiPrinterLine } from "react-icons/ri";
import { FaChevronRight } from "react-icons/fa6";
function PurchaseReport() {
    return (
        <div>
            <div className=" h-[1311px]  bg-gray-50  outline-1 outline-offset-[-1px] outline-white mt-10">

                <div className="w-[1490px] h-[1095px]  fixed bg-white rounded-3xl ">
                    <div className="w-[1511px] left-0 top-[298px] absolute inline-flex flex-col justify-start items-start">
                        <div className="self-stretch px-12 py-4 bg-gray-50 border-b border-gray-200 inline-flex justify-start items-center gap-16">
                            <div className="w-8 h-8 relative">
                                <div className="w-2.5 h-0 left-[10.67px] top-[16px] absolute  outline-2 outline-offset-[-1px] outline-blue-500" />
                                <div className="w-7 h-7 left-[2.67px] top-[2.67px] absolute  outline-2 outline-offset-[-1px] outline-blue-500" />
                                <div className="w-8 h-8 left-0 top-0 absolute opacity-0" />
                            </div>
                            <div className="min-w-16 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">No.</div>
                            <div className="min-w-32 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Date</div>
                            <div className="min-w-36 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Supplier</div>
                            <div className="min-w-24 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Qty (KG)</div>
                            <div className="min-w-24 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Qty (Box)</div>
                            <div className="min-w-24 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Total (KG)</div>
                            <div className="min-w-32 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Amount</div>
                        </div>
                        <div className="self-stretch px-12 py-4 bg-white border-b border-gray-200 inline-flex justify-start items-center gap-16">
                            <div className="w-8 h-8 relative">
                                <div className="w-7 h-7 left-[2.66px] top-[2.67px] absolute bg-blue-500" />
                                <div className="w-8 h-8 left-[32px] top-[32px] absolute origin-top-left -rotate-180 opacity-0" />
                            </div>
                            <div className="min-w-16 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">001</div>
                            <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">01/12/2024</div>
                            <div className="max-w-80 min-w-36 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">Farm Fresh</div>
                            <div className="min-w-24 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">10</div>
                            <div className="min-w-24 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">-</div>
                            <div className="min-w-24 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">10</div>
                            <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">$1,250.00</div>
                            <div className="w-6 h-6 relative">
                                <div className="w-2.5 h-[5px] left-[7.25px] top-[2px] absolute  outline-[1.50px] outline-offset-[-0.75px] outline-gray-300/30" />
                                <div className="w-2 h-1.5 left-[8px] top-[15px] absolute  outline-[1.50px] outline-offset-[-0.75px] outline-gray-300/30" />
                                <div className="w-4 h-2.5 left-[3px] top-[7px] absolute  outline-[1.50px] outline-offset-[-0.75px] outline-gray-300/30" />
                                <div className="w-2.5 h-0 left-[7px] top-[15px] absolute  outline-[1.50px] outline-offset-[-0.75px] outline-gray-300/30" />
                                <div className="w-[3px] h-0 left-[7px] top-[11px] absolute  outline-[1.50px] outline-offset-[-0.75px] outline-gray-300/30" />
                                <div className="w-6 h-6 left-0 top-0 absolute opacity-0" />
                            </div>
                        </div>
                        <div className="self-stretch px-12 py-4 bg-white border-b border-gray-200 inline-flex justify-start items-center gap-16">
                            <div className="w-8 h-8 relative">
                                <div className="w-7 h-7 left-[2.67px] top-[2.67px] absolute  outline-2 outline-offset-[-1px] outline-blue-500" />
                                <div className="w-3 h-2 left-[10.33px] top-[12.23px] absolute  outline-2 outline-offset-[-1px] outline-blue-500" />
                                <div className="w-8 h-8 left-0 top-0 absolute opacity-0" />
                            </div>
                            <div className="min-w-16 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">002</div>
                            <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">01/12/2024</div>
                            <div className="max-w-80 min-w-36 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">Green Supply</div>
                            <div className="min-w-24 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">-</div>
                            <div className="min-w-24 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">2</div>
                            <div className="min-w-24 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">70</div>
                            <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">$2,400.00</div>
                            <div className="w-6 h-6 relative">
                                <div className="w-2.5 h-[5px] left-[7.25px] top-[2px] absolute  outline-[1.50px] outline-offset-[-0.75px] outline-gray-300/30" />
                                <div className="w-2 h-1.5 left-[8px] top-[15px] absolute  outline-[1.50px] outline-offset-[-0.75px] outline-gray-300/30" />
                                <div className="w-4 h-2.5 left-[3px] top-[7px] absolute  outline-[1.50px] outline-offset-[-0.75px] outline-gray-300/30" />
                                <div className="w-2.5 h-0 left-[7px] top-[15px] absolute  outline-[1.50px] outline-offset-[-0.75px] outline-gray-300/30" />
                                <div className="w-[3px] h-0 left-[7px] top-[11px] absolute  outline-[1.50px] outline-offset-[-0.75px] outline-gray-300/30" />
                                <div className="w-6 h-6 left-0 top-0 absolute opacity-0" />
                            </div>
                        </div>
                    </div>
                    <div className="w-[1511px] px-12 py-6 left-0 top-[666px] absolute bg-teal-50 border-b border-gray-200 inline-flex justify-start items-center gap-16">
                        <div className="w-[1104px] min-w-32 justify-center text-slate-500/40 text-xl font-normal font-['Urbanist'] tracking-wide">Total</div>
                        <div className="min-w-32 justify-center text-slate-900 text-xl font-bold font-['Urbanist'] tracking-wide">$3,750.00 </div>
                    </div>
                    <div className="w-[1511px] px-12 py-6 left-0 top-[594px] absolute bg-white border-b border-gray-200 inline-flex justify-between items-center">
                        <div className="flex justify-start items-center gap-32">
                            <div className="justify-center text-slate-500/40 text-xl font-normal font-['Urbanist'] tracking-wide">Commission</div>
                            <div className="justify-center text-slate-900 text-xl font-bold font-['Urbanist'] tracking-wide">$200.00 </div>
                        </div>
                        <div className="flex justify-start items-center gap-32">
                            <div className="justify-center text-slate-500/40 text-xl font-normal font-['Urbanist'] tracking-wide">Coolie</div>
                            <div className="justify-center text-slate-900 text-xl font-bold font-['Urbanist'] tracking-wide">$100.00 </div>
                        </div>
                        <div className="flex justify-start items-center gap-32">
                            <div className="justify-center text-slate-500/40 text-xl font-normal font-['Urbanist'] tracking-wide">Expenses</div>
                            <div className="justify-center text-slate-900 text-xl font-bold font-['Urbanist'] tracking-wide">$50.00 </div>
                        </div>
                    </div>
                    <div className="w-[1511px] px-12 py-6 left-0 top-[490px] absolute border-b border-gray-200 inline-flex justify-between items-center">
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
                        <div className="flex items-center gap-2 text-slate-500 text-xl font-normal font-['Urbanist']">
                            <span>Reports</span>
                            <FaChevronRight className="text-base" />
                            <span>Purchase Report</span>
                        </div>
                    </div>
                    <div className="left-[48px] top-[80px] absolute justify-start text-indigo-950 text-4xl font-bold font-['Urbanist'] leading-[50.40px]">Purchase Report</div>
                    <div className="left-[697px] top-[194px] absolute inline-flex justify-start items-center gap-12">
                        <div className="justify-start text-slate-500/40 text-xl font-normal font-['Urbanist']">Date Range</div>
                        <div className="w-64 px-6 py-4 bg-gray-50 rounded-tl-xl rounded-tr-xl flex justify-between items-center">
                            <input
                                type="date"
                                className="bg-transparent text-slate-700 text-xl font-normal font-['Urbanist'] focus:outline-none"
                            />

                        </div>
                        <div className="justify-start text-slate-500/40 text-xl font-normal font-['Urbanist']">to</div>
                        <div className="w-64 px-6 py-4 bg-gray-50 rounded-tl-xl rounded-tr-xl flex justify-between items-center">
                            <input
                                type="date"
                                className="bg-transparent text-slate-700 text-xl font-normal font-['Urbanist'] focus:outline-none w-full"
                                placeholder="DD/MM/YYYY"
                            />

                        </div>

                    </div>
                    <div className="px-8 py-4 left-[1313px] top-[66px] absolute bg-gray-50 rounded-xl inline-flex justify-start items-center gap-3">
                        <div className="w-8 h-8 text-zinc-800">
                            <RiPrinterLine className="w-full h-full" />
                        </div>
                        <div className="w-10 justify-start text-indigo-950 text-xl font-bold font-['Urbanist']">Print</div>
                    </div>
                </div>
            </div>
</div>
            )
}

            export default PurchaseReport
