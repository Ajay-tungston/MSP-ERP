import React from 'react'

function Purchasetransaction() {
    return (
        <div>
            <div className=" h-[1087px] left-[377px]  absolute bg-white rounded-3xl -ml-1">
                <div className="w-[1415px] left-[48px] top-[48px] absolute inline-flex flex-col justify-start items-start gap-11">
                    <div className="pb-6 border-b border-gray-400 inline-flex justify-start items-center gap-2.5">
                        <div className="justify-start text-indigo-950 text-4xl font-bold font-['Urbanist'] leading-[50.40px]">Add New Purchase Transaction</div>
                    </div>
                    <div className=" inline-flex justify-between items-start flex-wrap content-start">
                        <div className="w-[570px] h-14 flex justify-start items-center gap-12">
                            <div className="min-w-44 justify-start text-slate-500 text-xl font-normal font-['Urbanist']">Purchase No.</div>
                            <div className="w-20 text-center justify-start text-indigo-950 text-xl font-bold font-['Urbanist']">001</div>
                        </div>
                        <div className="flex justify-start items-center gap-12">
                            <div className="min-w-44 justify-start"><span class="text-slate-500 text-xl font-normal font-['Urbanist']">Date of Purchase </span><span class="text-red-500 text-xl font-normal font-['Urbanist']">*</span></div>
                            <div className="w-80 px-6 py-4 bg-gray-50 rounded-tl-xl rounded-tr-xl flex justify-between items-center">
                                <div className="justify-start text-gray-400 text-xl font-normal font-['Urbanist']">DD/MM/YYYY</div>
                               
                            </div>
                        </div>
                        <div className="flex justify-start items-center gap-12">
                            <div className="min-w-44 justify-start"><span class="text-slate-500 text-xl font-normal font-['Urbanist']">Supplier Code </span><span class="text-red-500 text-xl font-normal font-['Urbanist']">*</span></div>
                            <div className="w-80 px-6 py-4 bg-gray-50 rounded-xl flex justify-between items-center">
                                <div className="justify-start text-gray-400 text-xl font-normal font-['Urbanist']">Select</div>
                                
                            </div>
                        </div>
                        <div className="flex justify-start items-center gap-12">
                            <div className="min-w-44 justify-start"><span class="text-slate-500 text-xl font-normal font-['Urbanist']">Supplier </span><span class="text-red-500 text-xl font-normal font-['Urbanist']">*</span></div>
                            <div className="w-80 px-6 py-4 bg-gray-50 rounded-xl flex justify-between items-center">
                                <div className="justify-start text-gray-400 text-xl font-normal font-['Urbanist']">Select</div>
                               
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[1415px] left-[48px] top-[373px] absolute inline-flex flex-col justify-start items-start gap-12">
                    <div className="self-stretch pb-6 border-b border-gray-400 inline-flex justify-start items-center gap-2.5">
                        <div className="justify-start text-indigo-950 text-3xl font-semibold font-['Urbanist'] leading-10">Item Details</div>
                    </div>
                    <div className="self-stretch flex flex-col justify-start items-start">
                        <div className="self-stretch px-12 py-4 bg-gray-50 border-b border-gray-200 inline-flex justify-between items-center">
                            <div className="flex-1 max-w-16 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">No.</div>
                            <div className="min-w-32 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Item Name</div>
                            <div className="min-w-32 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Qty (KG)</div>
                            <div className="min-w-32 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Qty (Box)</div>
                            <div className="min-w-32 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Unit Price</div>
                            <div className="min-w-32 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">Subtotal</div>
                        </div>
                        <div className="self-stretch px-12 py-4 bg-white border-b border-gray-200 inline-flex justify-between items-center">
                            <div className="flex-1 max-w-16 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">001</div>
                            <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">Apples</div>
                            <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">10</div>
                            <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">-</div>
                            <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">$1.00</div>
                            <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">$200.00</div>
                        </div>
                        <div className="self-stretch px-12 py-4 bg-white border-b border-gray-200 inline-flex justify-between items-center">
                            <div className="flex-1 max-w-16 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">002</div>
                            <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">Banana</div>
                            <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">-</div>
                            <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">2</div>
                            <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">$100.00</div>
                            <div className="min-w-32 justify-center text-slate-900 text-xl font-normal font-['Urbanist'] tracking-wide">$200.00</div>
                        </div>
                        <div className="self-stretch px-12 py-4 bg-white border-b border-gray-200 inline-flex justify-center items-center gap-4">
                          
                            <div className="min-w-32 justify-center text-slate-500 text-xl font-normal font-['Urbanist'] tracking-wide">Add another item</div>
                        </div>
                        <div className="self-stretch px-12 py-6 bg-teal-50 border-b border-gray-200 inline-flex justify-start items-center gap-16">
                            <div className="w-96 min-w-32 justify-center text-slate-500 text-xl font-normal font-['Urbanist'] tracking-wide">Total</div>
                            <div className="w-44 min-w-32 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">10</div>
                            <div className="w-96 min-w-32 justify-center text-indigo-950 text-xl font-bold font-['Urbanist'] tracking-wide">2</div>
                            <div className="min-w-32 justify-center text-slate-900 text-xl font-bold font-['Urbanist'] tracking-wide">$400.00 </div>
                        </div>
                    </div>
                </div>
                <div className="w-[1415px] left-[48px] top-[834px] absolute inline-flex flex-col justify-start items-start gap-12">
                    <div className="self-stretch pb-6 border-b border-gray-400 inline-flex justify-start items-center gap-2.5">
                        <div className="justify-start text-indigo-950 text-3xl font-semibold font-['Urbanist'] leading-10">Deductions</div>
                    </div>
                    <div className="self-stretch pb-8 border-b border-gray-400 inline-flex justify-between items-start flex-wrap content-start">
                        <div className="flex justify-start items-center gap-12">
                            <div className="min-w-44 justify-start text-slate-500 text-xl font-normal font-['Urbanist']">Commission (%)</div>
                            <div className="w-80 px-6 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-2">
                                <div className="justify-start text-gray-400 text-xl font-normal font-['Urbanist']">Fetch from Commission Master</div>
                            </div>
                        </div>
                        <div className="flex justify-start items-center gap-12">
                            <div className="min-w-44 justify-start text-slate-500 text-xl font-normal font-['Urbanist']">Market Fee ($/KG)</div>
                            <div className="w-80 px-6 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-2">
                                <div className="justify-start text-gray-400 text-xl font-normal font-['Urbanist']">Fetch from Commission Master</div>
                            </div>
                        </div>
                        <div className="flex justify-start items-center gap-12">
                            <div className="min-w-44 justify-start text-slate-500 text-xl font-normal font-['Urbanist']">Coolie Rate ($/KG)</div>
                            <div className="w-80 px-6 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-2">
                                <div className="justify-start text-gray-400 text-xl font-normal font-['Urbanist']">Fetch from Commission Master</div>
                            </div>
                        </div>
                        <div className="flex justify-start items-center gap-12">
                            <div className="w-44 justify-start text-slate-500 text-xl font-normal font-['Urbanist']">Total Deductions</div>
                            <div className="w-80 px-6 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-3">
                                <div className="justify-start text-indigo-950 text-xl font-bold font-['Urbanist']">$</div>
                                <div className="justify-start text-gray-400 text-xl font-normal font-['Urbanist']">Auto calculated</div>
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch inline-flex justify-between items-start flex-wrap content-start">
                        <div className="flex justify-start items-center gap-12">
                            <div className="min-w-44 justify-start text-slate-500 text-xl font-normal font-['Urbanist']">Advance Deduction</div>
                            <div className="flex justify-start items-center gap-2.5">
                                
                                <div className="justify-start text-gray-400 text-xl font-normal font-['Urbanist']">Apply Advance</div>
                            </div>
                        </div>
                        <div className="flex justify-start items-center gap-12">
                            <div className="w-44 justify-start text-slate-500 text-xl font-normal font-['Urbanist']">Advance Amount</div>
                            <div className="w-80 px-6 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-2">
                                <div className="justify-start text-gray-400 text-xl font-normal font-['Urbanist']">Fetch from Supplier Master</div>
                            </div>
                        </div>
                        <div className="flex justify-start items-center gap-12">
                            <div className="w-44 justify-start text-slate-500 text-xl font-normal font-['Urbanist']">Net Payable</div>
                            <div className="w-80 px-6 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-3">
                                <div className="justify-start text-indigo-950 text-xl font-bold font-['Urbanist']">$</div>
                                <div className="justify-start text-gray-400 text-xl font-normal font-['Urbanist']">Auto calculated</div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
  )
}

export default Purchasetransaction
