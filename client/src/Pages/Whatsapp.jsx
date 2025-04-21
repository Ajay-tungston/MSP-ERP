import React from 'react'
import { TbBrandWhatsappFilled } from "react-icons/tb";
import { FaChevronRight } from "react-icons/fa6";

function Whatsapp() {
    return (
        <div>
            <div className=" h-screen relative bg-gray-50  outline-1 outline-offset-[-1px] outline-white overflow-hidden">
                <div className="w-[1511px] h-[1095px]   absolute bg-white rounded-3xl overflow-hidden mt-10">
                    <div className="left-[48px] top-[86px] absolute inline-flex justify-start items-center gap-3">
                        <div className="justify-start text-slate-500 text-xl font-normal font-['Urbanist'] inline-flex items-center">
                            Master <FaChevronRight className="ml-2" /> Company
                        </div>

                    </div>
                    <div className="left-[48px] top-[118px] absolute justify-start text-indigo-950 text-4xl font-bold font-['Urbanist'] leading-[50.40px]">Company</div>
                    <div className="left-[697px] top-[194px] absolute inline-flex justify-start items-center gap-12">
                        <div className="justify-start text-slate-500 text-xl font-normal font-['Urbanist']">Date Range</div>
                        <div className="w-64 px-6 py-4 bg-gray-50 rounded-xl flex justify-between items-center">
                            <input
                                type="date"
                                defaultValue="2024-12-01"
                                className="w-full bg-transparent text-indigo-950 text-xl font-normal font-['Urbanist'] outline-none cursor-pointer"
                            />
                        </div>

                        <div className="justify-start text-slate-500 text-xl font-normal font-['Urbanist']">to</div>
                        <div className="w-64 px-6 py-4 bg-gray-50 rounded-xl flex justify-between items-center">
                            <input
                                type="date"
                                defaultValue="2024-12-07"
                                className="w-full bg-transparent text-indigo-950 text-xl font-normal font-['Urbanist'] outline-none cursor-pointer"
                            />
                        </div>

                    </div>
                    <div className="left-[48px] top-[194px] absolute inline-flex justify-start items-center gap-12">
                        <div className="justify-start text-slate-500 text-xl font-normal font-['Urbanist']">Contact</div>

                        <div className="w-80 px-6 py-4 bg-gray-50 rounded-xl flex justify-between items-center">
                            <select
                                className="w-full bg-transparent text-gray-400 text-xl font-normal font-['Urbanist'] outline-none cursor-pointer"
                                defaultValue=""
                            >
                                <option value="" disabled>Select</option>
                                <option value="contact1">John Doe</option>
                                <option value="contact2">Jane Smith</option>
                                <option value="contact3">Alex Johnson</option>
                            </select>




                        </div>
                    </div>

                    <div className="w-[1415px] h-[740px] left-[48px] top-[307px] absolute inline-flex justify-start items-start gap-6">
                        <div className="flex-1 self-stretch relative bg-gray-200 rounded-3xl overflow-hidden">
                            <div className="left-[276px] top-[312px] absolute text-center justify-start text-gray-400 text-5xl font-bold font-['Urbanist']">Report<br />PDF</div>
                        </div>
                        <div className="flex-1 self-stretch relative bg-gray-50 rounded-3xl overflow-hidden">
                            <div className="w-[599px] left-[48.50px] top-[48px] absolute justify-start text-black text-2xl font-normal font-['Courier_Prime']">Dear [Customer Name],
                                <br />Please find your sales report for [Date] attached.
                            <br />- Total Amount: $490.00
                            <br />- Previous Balance: $300.00<br />
                            - Net Payable: $290.00
                            <br />Thank you!</div>
                        </div>
                    </div>
                    <button className="w-80 px-6 py-4 left-[1127px] top-[48px] absolute bg-green-500 rounded-2xl inline-flex justify-center items-center gap-3">
                        <div className="w-8 h-8 relative text-white opacity-60 ">
                            <TbBrandWhatsappFilled className="w-7 h-7 absolute left-[2.66px] top-[2.67px] " />
                        </div>
                        <div className="justify-start text-white text-xl font-bold font-['Urbanist']">
                            Send via WhatsApp
                        </div>
                    </button>

                </div>
            </div>.
        </div>
    )
}

export default Whatsapp
