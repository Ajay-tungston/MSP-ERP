import React from 'react'

function AddSupplier() {
  return (
    <div className="w-[1280px] p-12 relative bg-white rounded-3xl inline-flex flex-col justify-start items-start gap-12">
    <div className="w-[1184px] pb-6 border-b border-[#a1a5b6] inline-flex justify-start items-center gap-2.5">
        <div className="justify-start text-[#151d48] text-[32px] font-bold font-['Urbanist'] leading-[44.80px]">Add New Supplier</div>
    </div>
    <div className="self-stretch inline-flex justify-between items-start flex-wrap content-start">
        <div className="w-[570px] h-14 flex justify-start items-center gap-12">
            <div className="min-w-[172px] justify-start text-[#737791] text-xl font-normal font-['Urbanist']">No.</div>
            <div className="w-[77px] text-center justify-start text-[#05004e] text-xl font-bold font-['Urbanist']">001</div>
        </div>
        <div className="w-[570px] h-14 flex justify-start items-center gap-12">
            <div className="min-w-[172px] justify-start"><span class="text-[#737791] text-xl font-normal font-['Urbanist']">Supplier Code </span><span class="text-red-500 text-xl font-normal font-['Urbanist']">*</span></div>
            <div className="w-[350px] px-6 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-2">
                <div className="justify-start text-[#a1a5b6] text-xl font-normal font-['Urbanist']">Enter here</div>
            </div>
        </div>
        <div className="flex justify-start items-center gap-12">
            <div className="min-w-[172px] justify-start"><span class="text-[#737791] text-xl font-normal font-['Urbanist']">Supplier Name </span><span class="text-red-500 text-xl font-normal font-['Urbanist']">*</span></div>
            <div className="w-[350px] px-6 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-2">
                <div className="justify-start text-[#a1a5b6] text-xl font-normal font-['Urbanist']">Enter here</div>
            </div>
        </div>
        <div className="flex justify-start items-center gap-12">
            <div className="min-w-[172px] justify-start text-[#737791] text-xl font-normal font-['Urbanist']">Address</div>
            <div className="w-[350px] px-6 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-2">
                <div className="justify-start text-[#a1a5b6] text-xl font-normal font-['Urbanist']">Enter here</div>
            </div>
        </div>
        <div className="flex justify-start items-center gap-12">
            <div className="min-w-[172px] justify-start"><span class="text-[#737791] text-xl font-normal font-['Urbanist']">Phone </span><span class="text-red-500 text-xl font-normal font-['Urbanist']">*</span></div>
            <div className="w-[350px] px-6 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-2">
                <div className="justify-start text-[#a1a5b6] text-xl font-normal font-['Urbanist']">Enter here</div>
            </div>
        </div>
        <div className="flex justify-start items-center gap-12">
            <div className="w-[172px] min-w-[172px] justify-start text-[#737791] text-xl font-normal font-['Urbanist']">WhatsApp</div>
            <div className="inline-flex flex-col justify-center items-start gap-3">
                <div className="w-[350px] px-6 py-4 bg-gray-50 rounded-xl inline-flex justify-start items-center gap-2">
                    <div className="justify-start text-[#a1a5b6] text-xl font-normal font-['Urbanist']">Enter here</div>
                </div>
                <div className="inline-flex justify-start items-center gap-2">
                    <div className="w-4 h-4 relative">
                        <div className="w-4 h-4 left-0 top-0 absolute">
                            <div className="w-4 h-4 left-0 top-0 absolute">
                                <div className="w-[13.33px] h-[13.33px] left-[1.33px] top-[1.33px] absolute outline-1 outline-offset-[-0.50px] outline-[#4078ec]" />
                                <div className="w-[5.67px] h-[3.77px] left-[5.17px] top-[6.11px] absolute outline-1 outline-offset-[-0.50px] outline-[#4078ec]" />
                                <div className="w-4 h-4 left-0 top-0 absolute opacity-0" />
                            </div>
                        </div>
                    </div>
                    <div className="justify-start text-[#a1a5b6] text-base font-normal font-['Urbanist']">Same as Phone</div>
                </div>
            </div>
        </div>
        <div className="flex justify-start items-center gap-12">
            <div className="w-[172px] min-w-[172px] justify-start text-[#737791] text-xl font-normal font-['Urbanist']">Advance </div>
            <div className="w-[350px] px-6 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-3">
                <div className="justify-start text-[#05004e] text-xl font-bold font-['Urbanist']">$</div>
                <div className="justify-start text-[#a1a5b6] text-xl font-normal font-['Urbanist']">Enter here</div>
            </div>
        </div>
        <div className="flex justify-start items-center gap-12">
            <div className="w-[172px] min-w-[172px] justify-start text-[#737791] text-xl font-normal font-['Urbanist']">Advance Deducted</div>
            <div className="w-[350px] px-6 py-4 bg-gray-50 rounded-xl flex justify-start items-center gap-3">
                <div className="justify-start text-[#05004e] text-xl font-bold font-['Urbanist']">$</div>
                <div className="justify-start text-[#a1a5b6] text-xl font-normal font-['Urbanist']">Enter here</div>
            </div>
        </div>
        <div className="flex justify-start items-center gap-12">
            <div className="min-w-[172px] justify-start text-[#737791] text-xl font-normal font-['Urbanist']">Commission Type</div>
            <div className="w-[350px] px-6 py-4 bg-gray-50 rounded-tl-xl rounded-tr-xl flex justify-between items-center">
                <div className="justify-start text-[#a1a5b6] text-xl font-normal font-['Urbanist']">Select</div>
                <div className="w-6 h-6 relative">
                    <div className="w-6 h-6 left-0 top-0 absolute">
                        <div className="w-6 h-6 left-0 top-0 absolute">
                            <div className="w-[15.84px] h-[7.10px] left-[4.08px] top-[7.95px] absolute outline-[1.50px] outline-offset-[-0.75px] outline-[#a1a5b6]" />
                            <div className="w-6 h-6 left-[24px] top-[24px] absolute origin-top-left rotate-180 opacity-0" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="self-stretch inline-flex justify-end items-center gap-4">
        <div className="w-[156px] px-6 py-4 bg-white rounded-2xl outline-1 outline-offset-[-1px] outline-red-500 flex justify-center items-center gap-3">
            <div className="w-8 h-8 relative">
                <div className="w-8 h-8 left-0 top-0 absolute">
                    <div className="w-8 h-8 left-0 top-0 absolute">
                        <div className="w-[7.55px] h-[7.55px] left-[12.23px] top-[12.23px] absolute outline-2 outline-offset-[-1px] outline-red-500" />
                        <div className="w-[7.55px] h-[7.55px] left-[12.23px] top-[12.23px] absolute outline-2 outline-offset-[-1px] outline-red-500" />
                        <div className="w-[26.67px] h-[26.67px] left-[2.67px] top-[2.67px] absolute outline-2 outline-offset-[-1px] outline-red-500" />
                        <div className="w-8 h-8 left-0 top-0 absolute opacity-0" />
                    </div>
                </div>
            </div>
            <div className="justify-start text-red-500 text-xl font-bold font-['Urbanist']">Cancel</div>
        </div>
        <div className="w-[156px] px-6 py-4 bg-[#4078ec] rounded-2xl flex justify-center items-center gap-3">
            <div className="w-8 h-8 relative">
                <div className="w-8 h-8 left-0 top-0 absolute">
                    <div className="w-8 h-8 left-0 top-0 absolute">
                        <div className="w-[26.67px] h-[26.67px] left-[2.67px] top-[2.67px] absolute outline-2 outline-offset-[-1px] outline-white" />
                        <div className="w-[10.67px] h-0 left-[10.67px] top-[16px] absolute outline-2 outline-offset-[-1px] outline-white" />
                        <div className="w-0 h-[10.67px] left-[16px] top-[10.67px] absolute outline-2 outline-offset-[-1px] outline-white" />
                        <div className="w-8 h-8 left-0 top-0 absolute opacity-0" />
                    </div>
                </div>
            </div>
            <div className="justify-start text-white text-xl font-bold font-['Urbanist']">Save</div>
        </div>
    </div>
    <div className="w-[350px] left-[268px] top-[669px] absolute bg-gray-50 rounded-xl flex flex-col justify-center items-start">
        <div className="self-stretch px-6 py-4 bg-[#4078ec] inline-flex justify-start items-center gap-2.5">
            <div className="justify-start text-white text-xl font-normal font-['Urbanist']">C001</div>
        </div>
        <div className="self-stretch px-6 py-4 inline-flex justify-start items-center gap-2.5">
            <div className="justify-start text-[#a1a5b6] text-xl font-normal font-['Urbanist']">C002</div>
        </div>
        <div className="self-stretch px-6 py-4 inline-flex justify-start items-center gap-2.5">
            <div className="justify-start text-[#a1a5b6] text-xl font-normal font-['Urbanist']">C003</div>
        </div>
    </div>
</div>
  )
}

export default AddSupplier