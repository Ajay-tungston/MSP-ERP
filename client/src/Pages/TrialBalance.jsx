import {useState} from 'react'
import { FaChevronRight } from "react-icons/fa6";

function TrialBalance() {
    const [date, setDate] = useState("DD/MM/YYYY");
  return (
    <div>
      <div className="h-full relative bg-gray-50  outline-1 outline-offset-[-1px] outline-white mt-10">
   
    <div className="w-[1511px] h-[1095px]  absolute bg-white rounded-3xl overflow-hidden">
        <div className="w-[740px] h-[1037px] left-0 top-[258px] absolute">
            <div className="w-[740px] left-0 top-[77px] absolute inline-flex flex-col justify-start items-start">
                <div className="self-stretch px-12 py-4 bg-sky-50 border-b border-gray-200 inline-flex justify-between items-center">
                    <div className="min-w-[480px] flex justify-start items-center gap-12">
                        <div className="w-6 h-6 relative"> 
                            <div className="w-3.5 h-2 left-[5px] top-[8.18px] absolute bg-zinc-800" />
                            <div className="w-6 h-6 left-[24px] top-[24px] absolute origin-top-left -rotate-180 opacity-0" />
                        </div>
                        <div className="flex-1 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Receivables from Customers</div>
                    </div>
                    <div className="min-w-32 text-right justify-center text-slate-900 text-xl font-bold font-['Urbanist'] tracking-wide">$5,000.00</div>
                </div>
                <div className="self-stretch px-12 py-4 bg-gray-50 border-b border-gray-200 inline-flex justify-start items-center gap-16">
                    <div className="w-8 h-8 relative">
                        <div className="w-2.5 h-0 left-[10.67px] top-[16px] absolute  outline-2 outline-offset-[-1px] outline-blue-500" />
                        <div className="w-7 h-7 left-[2.67px] top-[2.67px] absolute  outline-2 outline-offset-[-1px] outline-blue-500" />
                        <div className="w-8 h-8 left-0 top-0 absolute opacity-0" />
                    </div>
                    <div className="min-w-36 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Customer</div>
                    <div className="min-w-36 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Invoice No.</div>
                    <div className="min-w-32 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Amount</div>
                </div>
                <div className="self-stretch px-12 py-4 bg-white border-b border-gray-200 inline-flex justify-start items-center gap-16">
                    <div className="w-8 h-8 relative">
                        <div className="w-7 h-7 left-[2.66px] top-[2.67px] absolute bg-blue-500" />
                        <div className="w-8 h-8 left-[32px] top-[32px] absolute origin-top-left -rotate-180 opacity-0" />
                    </div>
                    <div className="min-w-36 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">GreenMart</div>
                    <div className="min-w-36 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">INV001</div>
                    <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">$2,000.00</div>
                </div>
                <div className="self-stretch px-12 py-4 bg-white border-b border-gray-200 inline-flex justify-start items-center gap-16">
                    <div className="w-8 h-8 relative">
                        <div className="w-7 h-7 left-[2.67px] top-[2.67px] absolute  outline-2 outline-offset-[-1px] outline-blue-500" />
                        <div className="w-3 h-2 left-[10.33px] top-[12.23px] absolute  outline-2 outline-offset-[-1px] outline-blue-500" />
                        <div className="w-8 h-8 left-0 top-0 absolute opacity-0" />
                    </div>
                    <div className="min-w-36 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">LocalMart</div>
                    <div className="min-w-36 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">INV002</div>
                    <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">$3,000.00</div>
                </div>
            </div>
            <div className="w-[740px] left-0 top-[373px] absolute inline-flex flex-col justify-start items-start">
                <div className="self-stretch px-12 py-4 bg-sky-50 border-b border-gray-200 inline-flex justify-between items-center">
                    <div className="min-w-[480px] flex justify-start items-center gap-12">
                        <div className="w-6 h-6 relative">
                            <div className="w-3.5 h-2 left-[5px] top-[8.18px] absolute bg-zinc-800" />
                            <div className="w-6 h-6 left-[24px] top-[24px] absolute origin-top-left -rotate-180 opacity-0" />
                        </div>
                        <div className="flex-1 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Receivables from Suppliers</div>
                    </div>
                    <div className="min-w-32 text-right justify-center text-slate-900 text-xl font-bold font-['Urbanist'] tracking-wide">$2,000.00 </div>
                </div>
                <div className="self-stretch px-12 py-4 bg-gray-50 border-b border-gray-200 inline-flex justify-start items-center gap-16">
                    <div className="w-8 h-8 relative">
                        <div className="w-2.5 h-0 left-[10.67px] top-[16px] absolute  outline-2 outline-offset-[-1px] outline-blue-500" />
                        <div className="w-7 h-7 left-[2.67px] top-[2.67px] absolute  outline-2 outline-offset-[-1px] outline-blue-500" />
                        <div className="w-8 h-8 left-0 top-0 absolute opacity-0" />
                    </div>
                    <div className="min-w-36 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Supplier</div>
                    <div className="min-w-36 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Credit Note No.</div>
                    <div className="min-w-32 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Amount</div>
                </div>
                <div className="self-stretch px-12 py-4 bg-white border-b border-gray-200 inline-flex justify-start items-center gap-16">
                    <div className="w-8 h-8 relative">
                        <div className="w-7 h-7 left-[2.66px] top-[2.67px] absolute bg-blue-500" />
                        <div className="w-8 h-8 left-[32px] top-[32px] absolute origin-top-left -rotate-180 opacity-0" />
                    </div>
                    <div className="min-w-36 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">Farm Fresh</div>
                    <div className="min-w-36 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">CRN001</div>
                    <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">$1,000.00</div>
                </div>
                <div className="self-stretch px-12 py-4 bg-white border-b border-gray-200 inline-flex justify-start items-center gap-16">
                    <div className="w-8 h-8 relative">
                        <div className="w-7 h-7 left-[2.67px] top-[2.67px] absolute  outline-2 outline-offset-[-1px] outline-blue-500" />
                        <div className="w-3 h-2 left-[10.33px] top-[12.23px] absolute  outline-2 outline-offset-[-1px] outline-blue-500" />
                        <div className="w-8 h-8 left-0 top-0 absolute opacity-0" />
                    </div>
                    <div className="min-w-36 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">LocalMart</div>
                    <div className="min-w-36 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">CRN002</div>
                    <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">$1,000.00</div>
                </div>
            </div>
            <div className="w-[740px] px-12 py-4 left-0 top-[669px] absolute bg-sky-50 border-b border-gray-200 inline-flex justify-between items-center">
                <div className="min-w-[480px] flex justify-start items-center gap-12">
                    <div className="w-6 h-6 relative">
                        <div className="w-3.5 h-2 left-[5px] top-[8.18px] absolute bg-zinc-800" />
                        <div className="w-6 h-6 left-[24px] top-[24px] absolute origin-top-left -rotate-180 opacity-0" />
                    </div>
                    <div className="flex-1 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Receivables from Employees</div>
                </div>
                <div className="min-w-32 text-right justify-center text-slate-900 text-xl font-bold font-['Urbanist'] tracking-wide">$1,500.00 </div>
            </div>
            <div className="w-[740px] px-12 py-4 left-0 top-[773px] absolute bg-sky-50 border-b border-gray-200 inline-flex justify-between items-center">
                <div className="w-[480px] min-w-[480px] flex justify-start items-center gap-12">
                    <div className="w-6 h-6 relative">
                        <div className="w-3.5 h-2 left-[5px] top-[8.18px] absolute bg-zinc-800" />
                        <div className="w-6 h-6 left-[24px] top-[24px] absolute origin-top-left -rotate-180 opacity-0" />
                    </div>
                    <div className="justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Market Fees</div>
                </div>
                <div className="min-w-32 text-right justify-center text-slate-900 text-xl font-bold font-['Urbanist'] tracking-wide">$300.00 </div>
            </div>
            <div className="w-[740px] px-12 py-4 left-0 top-[877px] absolute bg-sky-50 border-b border-gray-200 inline-flex justify-between items-center">
                <div className="min-w-[480px] flex justify-start items-center gap-12">
                    <div className="w-6 h-6 relative">
                        <div className="w-3.5 h-2 left-[5px] top-[8.18px] absolute bg-zinc-800" />
                        <div className="w-6 h-6 left-[24px] top-[24px] absolute origin-top-left -rotate-180 opacity-0" />
                    </div>
                    <div className="flex-1 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Sales Difference (Local Sales)</div>
                </div>
                <div className="min-w-32 text-right justify-center text-slate-900 text-xl font-bold font-['Urbanist'] tracking-wide">$200.00 </div>
            </div>
            <div className="w-[740px] px-12 py-6 left-0 top-0 absolute bg-teal-50 border-b border-gray-200 inline-flex justify-between items-center">
                <div className="flex-1 min-w-[480px] justify-center text-green-500 text-2xl font-black font-['Urbanist'] uppercase tracking-wide">Receivables</div>
                <div className="min-w-32 text-right justify-center text-green-500 text-2xl font-black font-['Urbanist'] tracking-wide">$10,000.00 </div>
            </div>
            <div className="w-[740px] px-12 py-4 left-0 top-[981px] absolute bg-sky-50 border-b border-gray-200 inline-flex justify-between items-center">
                <div className="min-w-[480px] justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Cash Balance</div>
                <div className="min-w-32 text-right justify-center text-slate-900 text-xl font-bold font-['Urbanist'] tracking-wide">$1,200.00 </div>
            </div>
        </div>
        <div className="w-[740px] h-[957px] left-[771px] top-[258px] absolute">
            <div className="w-[740px] left-0 top-[77px] absolute inline-flex flex-col justify-start items-start">
                <div className="self-stretch px-12 py-4 bg-sky-50 border-b border-gray-200 inline-flex justify-between items-center">
                    <div className="w-[480px] min-w-[480px] flex justify-start items-center gap-12">
                        <div className="w-6 h-6 relative">
                            <div className="w-3.5 h-2 left-[5px] top-[8.18px] absolute bg-zinc-800" />
                            <div className="w-6 h-6 left-[24px] top-[24px] absolute origin-top-left -rotate-180 opacity-0" />
                        </div>
                        <div className="justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Commission</div>
                    </div>
                    <div className="min-w-32 text-right justify-center text-slate-900 text-xl font-bold font-['Urbanist'] tracking-wide">$750.00 </div>
                </div>
                <div className="self-stretch px-12 py-4 bg-gray-50 border-b border-gray-200 inline-flex justify-start items-center gap-16">
                    <div className="w-8 h-8 relative">
                        <div className="w-2.5 h-0 left-[10.67px] top-[16px] absolute  outline-2 outline-offset-[-1px] outline-blue-500" />
                        <div className="w-7 h-7 left-[2.67px] top-[2.67px] absolute  outline-2 outline-offset-[-1px] outline-blue-500" />
                        <div className="w-8 h-8 left-0 top-0 absolute opacity-0" />
                    </div>
                    <div className="min-w-36 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Transaction No.</div>
                    <div className="min-w-36 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Advance Date</div>
                    <div className="min-w-32 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Amount</div>
                </div>
                <div className="self-stretch px-12 py-4 bg-white border-b border-gray-200 inline-flex justify-start items-center gap-16">
                    <div className="w-8 h-8 relative">
                        <div className="w-7 h-7 left-[2.67px] top-[2.67px] absolute bg-blue-500" />
                        <div className="w-8 h-8 left-[32px] top-[32px] absolute origin-top-left -rotate-180 opacity-0" />
                    </div>
                    <div className="min-w-36 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">TRXN001</div>
                    <div className="min-w-36 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">01/12/2024</div>
                    <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">$500.00</div>
                </div>
                <div className="self-stretch px-12 py-4 bg-white border-b border-gray-200 inline-flex justify-start items-center gap-16">
                    <div className="w-8 h-8 relative">
                        <div className="w-7 h-7 left-[2.67px] top-[2.67px] absolute  outline-2 outline-offset-[-1px] outline-blue-500" />
                        <div className="w-3 h-2 left-[10.33px] top-[12.23px] absolute  outline-2 outline-offset-[-1px] outline-blue-500" />
                        <div className="w-8 h-8 left-0 top-0 absolute opacity-0" />
                    </div>
                    <div className="min-w-36 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">TRXN002</div>
                    <div className="min-w-36 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">02/12/2024</div>
                    <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">$250.00</div>
                </div>
            </div>
            <div className="w-[740px] left-0 top-[373px] absolute inline-flex flex-col justify-start items-start">
                <div className="self-stretch px-12 py-4 bg-sky-50 border-b border-gray-200 inline-flex justify-between items-center">
                    <div className="w-[480px] min-w-[480px] flex justify-start items-center gap-12">
                        <div className="w-6 h-6 relative">
                            <div className="w-3.5 h-2 left-[5px] top-[8.18px] absolute bg-zinc-800" />
                            <div className="w-6 h-6 left-[24px] top-[24px] absolute origin-top-left -rotate-180 opacity-0" />
                        </div>
                        <div className="justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Coolie/Logistics</div>
                    </div>
                    <div className="min-w-32 text-right justify-center text-slate-900 text-xl font-bold font-['Urbanist'] tracking-wide">$500.00 </div>
                </div>
                <div className="self-stretch px-12 py-4 bg-gray-50 border-b border-gray-200 inline-flex justify-start items-center gap-16">
                    <div className="w-8 h-8 relative">
                        <div className="w-2.5 h-0 left-[10.67px] top-[16px] absolute  outline-2 outline-offset-[-1px] outline-blue-500" />
                        <div className="w-7 h-7 left-[2.67px] top-[2.67px] absolute  outline-2 outline-offset-[-1px] outline-blue-500" />
                        <div className="w-8 h-8 left-0 top-0 absolute opacity-0" />
                    </div>
                    <div className="min-w-36 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Transaction No.</div>
                    <div className="min-w-36 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Advance Date</div>
                    <div className="min-w-32 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Amount</div>
                </div>
                <div className="self-stretch px-12 py-4 bg-white border-b border-gray-200 inline-flex justify-start items-center gap-16">
                    <div className="w-8 h-8 relative">
                        <div className="w-7 h-7 left-[2.67px] top-[2.67px] absolute bg-blue-500" />
                        <div className="w-8 h-8 left-[32px] top-[32px] absolute origin-top-left -rotate-180 opacity-0" />
                    </div>
                    <div className="min-w-36 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">TRXN001</div>
                    <div className="min-w-36 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">01/12/2024</div>
                    <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">$300.00</div>
                </div>
                <div className="self-stretch px-12 py-4 bg-white border-b border-gray-200 inline-flex justify-start items-center gap-16">
                    <div className="w-8 h-8 relative">
                        <div className="w-7 h-7 left-[2.67px] top-[2.67px] absolute  outline-2 outline-offset-[-1px] outline-blue-500" />
                        <div className="w-3 h-2 left-[10.33px] top-[12.23px] absolute  outline-2 outline-offset-[-1px] outline-blue-500" />
                        <div className="w-8 h-8 left-0 top-0 absolute opacity-0" />
                    </div>
                    <div className="min-w-36 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">TRXN002</div>
                    <div className="min-w-36 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">02/12/2024</div>
                    <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">$200.00</div>
                </div>
            </div>
            <div className="w-[740px] px-12 py-4 left-0 top-[669px] absolute bg-sky-50 border-b border-gray-200 inline-flex justify-between items-center">
                <div className="w-[480px] min-w-[480px] flex justify-start items-center gap-12">
                    <div className="w-6 h-6 relative">
                        <div className="w-3.5 h-2 left-[5px] top-[8.18px] absolute bg-zinc-800" />
                        <div className="w-6 h-6 left-[24px] top-[24px] absolute origin-top-left -rotate-180 opacity-0" />
                    </div>
                    <div className="justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Payables to Suppliers</div>
                </div>
                <div className="min-w-32 text-right justify-center text-slate-900 text-xl font-bold font-['Urbanist'] tracking-wide">$3,000.00 </div>
            </div>
            <div className="w-[740px] px-12 py-6 left-0 top-0 absolute bg-red-50 border-b border-gray-200 inline-flex justify-between items-center">
                <div className="flex-1 min-w-[480px] justify-center text-rose-500 text-2xl font-black font-['Urbanist'] uppercase tracking-wide">payables</div>
                <div className="min-w-32 text-right justify-center text-rose-500 text-2xl font-black font-['Urbanist'] tracking-wide">$10,000.00 </div>
            </div>
        </div>
        <div className="left-[48px] top-[48px] absolute inline-flex justify-start items-center gap-3">
        <div className="flex items-center gap-2 text-slate-500 text-xl font-normal font-['Urbanist']">
  Reports <FaChevronRight /> Trial Balance
</div>

           
        </div>
        <div className="left-[48px] top-[80px] absolute justify-start text-indigo-950 text-4xl font-bold font-['Urbanist'] leading-[50.40px]">Trial Balance</div>
        <div className="left-[697px] top-[154px] absolute inline-flex justify-start items-center gap-12">
            <div className="justify-start text-slate-500/40 text-xl font-normal font-['Urbanist']">Date Range</div>
            <div className="w-64 px-6 py-4 bg-gray-50 rounded-tl-xl rounded-tr-xl flex justify-between items-center">
  <input 
    type="date" 
    className="bg-transparent text-black text-xl font-normal font-['Urbanist'] outline-none w-full" 
    placeholder="DD/MM/YYYY"
    defaultValue="DD/MM/YYYY"
  />
</div>

            <div className="justify-start text-slate-500/40 text-xl font-normal font-['Urbanist']">to</div>
            <div className="w-64 px-6 py-4 bg-gray-50 rounded-tl-xl rounded-tr-xl flex justify-between items-center">
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="bg-transparent text-black text-xl font-normal font-['Urbanist'] outline-none w-full"
      />
    </div>
        </div>
        <div className="px-8 py-4 left-[1313px] top-[66px] absolute bg-gray-50 rounded-xl inline-flex justify-start items-center gap-3">
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
</div>
    </div>
  )
}

export default TrialBalance
