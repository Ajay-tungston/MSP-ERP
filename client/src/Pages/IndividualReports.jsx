import React from 'react';
import { MdKeyboardArrowRight } from "react-icons/md";
function IndividualReports() {
    return (
        <div>
            <div className="w-[1511px] h-[790px]  absolute bg-white rounded-3xl overflow-hidden mt-10">
                <div className="left-[48px] top-[48px] absolute inline-flex justify-start items-center gap-3">
                    <div className="flex items-center gap-1 text-slate-500 text-xl font-normal font-['Urbanist']">
                        Reports <MdKeyboardArrowRight /> Individual Purchase Report
                    </div>
                </div>

                <div className="left-[48px] top-[80px] absolute justify-start text-indigo-950 text-4xl font-bold font-['Urbanist'] leading-[50.40px]">Individual Purchase Report</div>

                <div className="px-8 py-4 left-[1313px] top-[66px] absolute bg-gray-50 rounded-xl inline-flex justify-start items-center gap-3">
                    <div className="w-8 h-8 relative">
                        {/* Print Icon Placeholder */}
                        <div className="w-3 h-1.5 left-[9.67px] top-[2.67px] absolute  outline-2 outline-offset-[-1px] outline-zinc-800" />
                        <div className="w-2.5 h-2.5 left-[10.67px] top-[20px] absolute  outline-2 outline-offset-[-1px] outline-zinc-800" />
                        <div className="w-6 h-3.5 left-[4px] top-[9.33px] absolute  outline-2 outline-offset-[-1px] outline-zinc-800" />
                        <div className="w-3.5 h-0 left-[9.33px] top-[20px] absolute  outline-2 outline-offset-[-1px] outline-zinc-800" />
                        <div className="w-1 h-0 left-[9.33px] top-[14.67px] absolute  outline-2 outline-offset-[-1px] outline-zinc-800" />
                        <div className="w-8 h-8 left-0 top-0 absolute opacity-0" />
                    </div>
                    <div className="w-10 justify-start text-indigo-950 text-xl font-bold font-['Urbanist']">Print</div>
                </div>

                <div className="w-[1094px] h-[573px] left-[48px] top-[178px] absolute bg-[#E8E8ED] rounded-3xl overflow-hidden">
                    <div className="left-[475px] top-[229px] absolute text-center justify-start text-gray-400 text-5xl font-bold font-['Urbanist']">
                        Report<br />PDF
                    </div>
                </div>
            </div>
        </div>

    );
}

export default IndividualReports;