import React from 'react'

function AddPaymentIn() {
    return (
        <div>
            <div className="w-[901px] px-9 py-12 bg-white rounded-3xl inline-flex flex-col justify-end items-end gap-6 overflow-hidden">
                <div className="self-stretch flex flex-col justify-start items-start gap-6">
                    <div className="self-stretch flex flex-col justify-start items-center gap-7">
                        <div className="self-stretch justify-start text-indigo-950 text-3xl font-bold font-['Urbanist']">Payment in</div>
                        <div className="self-stretch inline-flex justify-between items-center">
                            <div className="w-96 self-stretch inline-flex flex-col justify-start items-start gap-6">
                                <div className="self-stretch px-6 py-4 bg-gray-50 rounded-tl-xl rounded-tr-xl inline-flex justify-between items-center">
                                    <div className="justify-start text-slate-500 text-xl font-normal font-['Urbanist']">Choose Category</div>
                                    <div className="w-6 h-6 bg-zinc-300" />
                                    <div className="w-2.5 h-[5px] bg-slate-500" />
                                </div>
                                <div className="self-stretch px-6 py-4 bg-gray-50 rounded-tl-xl rounded-tr-xl inline-flex justify-start items-center gap-9">
                                    <div className="w-6 h-6 relative">
                                        <div className="w-0 h-[3px] left-[8px] top-[2px] absolute shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] outline outline-1 outline-offset-[-0.50px] outline-slate-500" />
                                        <div className="w-0 h-[3px] left-[16px] top-[2px] absolute shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] outline outline-1 outline-offset-[-0.50px] outline-slate-500" />
                                        <div className="w-4 h-0 left-[3.50px] top-[9.09px] absolute shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] outline outline-1 outline-offset-[-0.50px] outline-slate-500" />
                                        <div className="w-4 h-5 left-[3px] top-[3.50px] absolute shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] outline outline-1 outline-offset-[-0.50px] outline-slate-500" />
                                        <div className="w-6 h-6 left-0 top-0 absolute opacity-0" />
                                        <div className="w-px h-px left-[15.20px] top-[13.20px] absolute shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] outline outline-1 outline-offset-[-0.50px] outline-slate-500" />
                                        <div className="w-px h-px left-[15.20px] top-[16.20px] absolute shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] outline outline-1 outline-offset-[-0.50px] outline-slate-500" />
                                        <div className="w-px h-px left-[11.50px] top-[13.20px] absolute shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] outline outline-1 outline-offset-[-0.50px] outline-slate-500" />
                                        <div className="w-px h-px left-[11.50px] top-[16.20px] absolute shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] outline outline-1 outline-offset-[-0.50px] outline-slate-500" />
                                        <div className="w-px h-px left-[7.80px] top-[13.20px] absolute shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] outline outline-1 outline-offset-[-0.50px] outline-slate-500" />
                                        <div className="w-px h-px left-[7.80px] top-[16.20px] absolute shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] outline outline-1 outline-offset-[-0.50px] outline-slate-500" />
                                    </div>
                                    <div className="justify-start text-slate-500 text-xl font-normal font-['Urbanist']">DD/MM/YYYY</div>
                                </div>
                            </div>
                            <div className="w-96 h-36 inline-flex flex-col justify-between items-start">
                                <div className="self-stretch px-6 py-4 bg-gray-50 rounded-tl-xl rounded-tr-xl inline-flex justify-between items-center">
                                    <div className="justify-start text-slate-500 text-xl font-normal font-['Urbanist']">Employee</div>
                                    <div className="w-6 h-6 bg-zinc-300" />
                                    <div className="w-2.5 h-[5px] bg-slate-500" />
                                </div>
                                <div className="self-stretch inline-flex justify-start items-center gap-12">
                                    <div className="flex-1 px-6 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-3">
                                        <div className="w-20 justify-start"><span class="text-slate-500/40 text-xl font-normal font-['Urbanist']">Amount </span><span class="text-red-500 text-xl font-normal font-['Urbanist']">*</span></div>
                                        <div className="justify-start text-indigo-950 text-xl font-bold font-['Urbanist']">$</div>
                                        <div className="justify-start text-zinc-100 text-xl font-normal font-['Urbanist']">Enter here</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch h-36 px-6 py-4 bg-gray-50 rounded-2xl inline-flex justify-start items-start gap-16">
                        <div className="justify-start text-slate-500 text-xl font-normal font-['Urbanist']">Address</div>
                    </div>
                </div>
                <div className="inline-flex justify-start items-center gap-6">
                    <div className="w-40 px-6 py-4 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-red-500 flex justify-center items-center gap-3">
                        <div className="w-8 h-8 relative">
                            <div className="w-2 h-2 left-[12.23px] top-[12.23px] absolute outline outline-2 outline-offset-[-1px] outline-red-500" />
                            <div className="w-2 h-2 left-[12.23px] top-[12.23px] absolute outline outline-2 outline-offset-[-1px] outline-red-500" />
                            <div className="w-7 h-7 left-[2.67px] top-[2.67px] absolute outline outline-2 outline-offset-[-1px] outline-red-500" />
                            <div className="w-8 h-8 left-0 top-0 absolute opacity-0" />
                        </div>
                        <div className="justify-start text-red-500 text-xl font-bold font-['Urbanist']">Cancel</div>
                    </div>
                    <div className="w-40 px-6 py-4 bg-blue-500 rounded-2xl flex justify-center items-center gap-3">
                        <div className="w-8 h-8 relative">
                            <div className="w-7 h-7 left-[2.67px] top-[2.67px] absolute outline outline-2 outline-offset-[-1px] outline-white" />
                            <div className="w-2.5 h-0 left-[10.67px] top-[16px] absolute outline outline-2 outline-offset-[-1px] outline-white" />
                            <div className="w-0 h-2.5 left-[16px] top-[10.67px] absolute outline outline-2 outline-offset-[-1px] outline-white" />
                            <div className="w-8 h-8 left-0 top-0 absolute opacity-0" />
                        </div>
                        <div className="justify-start text-white text-xl font-bold font-['Urbanist']">Save</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPaymentIn
