// import { CalendarIcon, PrinterIcon } from 'lucide-react';
// import { useState } from 'react';

// export default function IndividualSales() {
//   const [customer, setCustomer] = useState('');
//   const [date, setDate] = useState('');

//   const tableHeaders = ['No.', 'Supplier code', 'Item', 'Qty (KG)', 'Price ($/KG)', 'Total'];

//   const tableData = [
//     {
//       code: '001',
//       supplier: 'MMCSD',
//       item: 'Apples',
//       qty: 100,
//       price: 2.5,
//       rows: 20,
//     },
//   ];

//   return (
//     <div className="p-6 bg-[#F9FAFB] min-h-screen font-[Urbanist]">
//       <div className="bg-[#FFFFFF] rounded-2xl p-12 shadow-md relative">

//         {/* Breadcrumb */}
//         <div className="text-sm text-gray-500 flex gap-3 mb-4">
//           <span className="text-gray-500">Print</span> &gt; <span>Individual Sales</span>
//         </div>

//         {/* Header */}
//         <div className="flex justify-between items-start mb-10">
//           <div className="flex flex-col gap-6">
//             <h1 className="text-[36px] leading-[140%] font-bold tracking-[0px]">Individual Sales</h1>
//             <div className="flex items-center gap-4">
//               <label className="text-sm text-gray-500">Customer</label>
//               <input
//                 type="text"
//                 className="w-[300px] rounded-md px-4 py-2 bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 value={customer}
//                 onChange={(e) => setCustomer(e.target.value)}
//                 placeholder="Enter customer name"
//               />
//             </div>
//           </div>
//           <div className="flex flex-col items-end gap-4">
//             <button className="bg-[#F9FAFB] hover:bg-gray-200 text-sm font-medium rounded-[12px] px-8 py-4 flex items-center gap-3 mt-2">
//               <PrinterIcon className="w-4 h-4" /> Print All
//             </button>
//             <div className="flex items-center gap-4 text-sm text-gray-500">
//               <label className="text-sm text-gray-500">Date</label>
//               <div className="flex items-center bg-gray-50 rounded-md px-4 py-2 text-sm text-gray-700 w-[200px]">
//                 <input
//                   type="date"
//                   className="bg-transparent outline-none w-full"
//                   value={date}
//                   onChange={(e) => setDate(e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Aligned Content Wrapper */}
//         <div className="ml-[-48px] w-[calc(100%+96px)]">

//           {/* Customer Label */}
//           <div className="bg-[#F0F9FF] px-12 py-2 font-semibold text-sm text-gray-700 flex gap-6 mb-0">
//             <span>Customer</span>
//             <span className="font-bold text-black">GreenMart</span>
//           </div>

//           {/* Table Header */}
//           <div className="bg-[#F9FAFB] px-12 py-2 flex items-center border-b border-gray-200">
//             {tableHeaders.map((header, i) => (
//               <div
//                 key={i}
//                 className="text-black-500 font-semibold text-[20px] min-w-[152px] h-[24px] flex items-center"
//               >
//                 {header}
//               </div>
//             ))}
//           </div>

//           {/* Table Body with Scroll */}
//           <div className="bg-[#FFFFFF] px-12">
//             {tableData.map((group, groupIdx) =>
//               Array.from({ length: group.rows }).map((_, rowIdx) => (
//                 <div
//                   key={`${groupIdx}-${rowIdx}`}
//                   className="flex items-center text-sm py-3 border-b last:border-none border-gray-200"
//                 >
//                   <div className="min-w-[152px]">{group.code}</div>
//                   <div className="min-w-[152px]">{group.supplier}</div>
//                   <div className="min-w-[152px]">{group.item}</div>
//                   <div className="min-w-[152px]">{group.qty}</div>
//                   <div className="min-w-[152px]">{group.price.toFixed(2)}</div>
//                   <div className="min-w-[152px] font-semibold">
//                     ${(group.qty * group.price).toFixed(2)}
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           {/* Totals Section */}
//           <div className="bg-[#F0FDFA] text-gray-800 px-12 py-5 text-base space-y-4">
//             <div className="flex justify-between">
//               <span className="text-gray-600">Total</span>
//               <span className="font-bold text-gray-900 ml-[-20px] mr-80">$490.00</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-400">Payment Received (Previous Day)</span>
//               <span className="text-gray-700 ml-[-20px] mr-80">$200.00</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-400">Previous Balance</span>
//               <span className="text-gray-700 ml-[-20px] mr-80">$300.00</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-600 font-semibold">Net Payable (As of Today)</span>
//               <span className="font-bold text-gray-900 ml-[-20px] mr-80">$290.00</span>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }


// import { CalendarIcon, PrinterIcon } from 'lucide-react';
// import { LuPencilLine } from "react-icons/lu";
// import { useState } from 'react';

// export default function IndividualSales() {
//   const [customer, setCustomer] = useState('');
//   const [date, setDate] = useState('');

//   const tableHeaders = ['No.', 'Supplier code', 'Item', 'Qty (KG)', 'Price ($/KG)', 'Total'];

//   const tableData = [
//     {
//       code: '001',
//       supplier: 'MMCSD',
//       item: 'Apples',
//       qty: 100,
//       price: 2.5,
//       rows: 20,
//     },
//   ];

//   return (
//     <div className="p-6 bg-[#F9FAFB] min-h-screen font-[Urbanist]">
//       <div className="bg-[#FFFFFF] rounded-2xl p-12 shadow-md relative">

//         {/* Breadcrumb */}
//         <div className="text-sm text-gray-500 flex gap-3 mb-4">
//           <span className="text-gray-500">Print</span> &gt; <span>Individual Sales</span>
//         </div>

//         {/* Header */}
//         <div className="flex justify-between items-start mb-10">
//           <div className="flex flex-col gap-6">
//             <h1 className="text-[36px] leading-[140%] font-bold tracking-[0px]">Individual Sales</h1>
//             <div className="flex items-center gap-4">
//               <label className="text-sm text-gray-500">Customer</label>
//               <input
//                 type="text"
//                 className="w-[300px] rounded-md px-4 py-2 bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 value={customer}
//                 onChange={(e) => setCustomer(e.target.value)}
//                 placeholder="Enter customer name"
//               />
//             </div>
//           </div>
//           <div className="flex flex-col items-end gap-4">
//             <button className="bg-[#F9FAFB] hover:bg-gray-200 text-sm font-medium rounded-[12px] px-8 py-4 flex items-center gap-3 mt-2">
//               <PrinterIcon className="w-4 h-4" /> Print All
//             </button>
//             <div className="flex items-center gap-4 text-sm text-gray-500">
//               <label className="text-sm text-gray-500">Date</label>
//               <div className="flex items-center bg-gray-50 rounded-md px-4 py-2 text-sm text-gray-700 w-[200px]">
//                 <input
//                   type="date"
//                   className="bg-transparent outline-none w-full"
//                   value={date}
//                   onChange={(e) => setDate(e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Aligned Content Wrapper */}
//         <div className="ml-[-48px] w-[calc(100%+96px)]">

//           {/* Customer Label */}
//           <div className="bg-[#F0F9FF] px-12 py-2 font-semibold text-sm text-gray-700 flex gap-6 mb-0">
//             <span>Customer</span>
//             <span className="font-bold text-black">GreenMart</span>
//           </div>

//           {/* Table Header */}
//           <div className="bg-[#F9FAFB] px-12 py-2 flex items-center border-b border-gray-200">
//             {tableHeaders.map((header, i) => (
//               <div
//                 key={i}
//                 className="text-black-500 font-semibold text-[20px] min-w-[152px] h-[24px] flex items-center"
//               >
//                 {header}
//               </div>
//             ))}
//           </div>

//           {/* Table Body with Scroll */}
//           <div className="bg-[#FFFFFF] px-12">
//             {tableData.map((group, groupIdx) =>
//               Array.from({ length: group.rows }).map((_, rowIdx) => (
//                 <div
//                   key={`${groupIdx}-${rowIdx}`}
//                   className="flex items-center text-sm py-3 border-b last:border-none border-gray-200"
//                 >
//                   {/* No. with Pencil Icon */}
//                   <div className="min-w-[152px] flex items-center gap-2">
//                     {group.code}
//                     <LuPencilLine className="text-[#6A5AE0] w-4 h-4 cursor-pointer " />
//                   </div>
//                   <div className="min-w-[152px]">{group.supplier}</div>
//                   <div className="min-w-[152px]">{group.item}</div>
//                   <div className="min-w-[152px]">{group.qty}</div>
//                   <div className="min-w-[152px]">{group.price.toFixed(2)}</div>
//                   <div className="min-w-[152px] font-semibold">
//                     ${(group.qty * group.price).toFixed(2)}
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           {/* Totals Section */}
//           <div className="bg-[#F0FDFA] text-gray-800 px-12 py-5 text-base space-y-4">
//             <div className="flex justify-between">
//               <span className="text-gray-600">Total</span>
//               <span className="font-bold text-gray-900 ml-[-20px] mr-80">$490.00</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-400">Payment Received (Previous Day)</span>
//               <span className="text-gray-700 ml-[-20px] mr-80">$200.00</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-400">Previous Balance</span>
//               <span className="text-gray-700 ml-[-20px] mr-80">$300.00</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-600 font-semibold">Net Payable (As of Today)</span>
//               <span className="font-bold text-gray-900 ml-[-20px] mr-80">$290.00</span>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }


import { CalendarIcon, PrinterIcon } from 'lucide-react';
import { LuPencilLine } from "react-icons/lu";
import { useState } from 'react';

export default function IndividualSales() {
  const [customer, setCustomer] = useState('');
  const [date, setDate] = useState('');

  const tableHeaders = ['No.', 'Supplier code', 'Item', 'Qty (KG)', 'Price ($/KG)', 'Total'];

  const tableData = [
    {
      code: '001',
      supplier: 'MMCSD',
      item: 'Apples',
      qty: 100,
      price: 2.5,
      rows: 20,
    },
  ];

  return (
    <div className="p-6 bg-[#F9FAFB] min-h-screen font-[Urbanist]">
      <div className="bg-[#FFFFFF] rounded-2xl p-12 shadow-md relative">

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 flex gap-3 mb-4">
          <span className="text-gray-500">Print</span> &gt; <span>Individual Sales</span>
        </div>

        {/* Header */}
        <div className="flex justify-between items-start mb-10">
          <div className="flex flex-col gap-6">
            <h1 className="text-[36px] leading-[140%] font-bold tracking-[0px]">Individual Sales</h1>
            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-500">Customer</label>
              <input
                type="text"
                className="w-[300px] rounded-md px-4 py-2 bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                placeholder="Enter customer name"
              />
            </div>
          </div>
          <div className="flex flex-col items-end gap-4">
            <button className="bg-[#F9FAFB] hover:bg-gray-200 text-sm font-medium rounded-[12px] px-8 py-4 flex items-center gap-3 mt-2">
              <PrinterIcon className="w-4 h-4" /> Print All
            </button>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <label className="text-sm text-gray-500">Date</label>
              <div className="flex items-center bg-gray-50 rounded-md px-4 py-2 text-sm text-gray-700 w-[200px]">
                <input
                  type="date"
                  className="bg-transparent outline-none w-full"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Aligned Content Wrapper */}
        <div className="ml-[-48px] w-[calc(100%+96px)]">

          {/* Customer Label */}
          <div className="bg-[#F0F9FF] px-12 py-2 font-semibold text-sm text-gray-700 flex gap-6 mb-0">
            <span>Customer</span>
            <span className="font-bold text-black">GreenMart</span>
          </div>

          {/* Table Header */}
          <div className="bg-[#F9FAFB] px-12 py-2 flex items-center border-b border-gray-200">
            {tableHeaders.map((header, i) => (
              <div
                key={i}
                className="text-black-500 font-semibold text-[20px] min-w-[152px] h-[24px] flex items-center"
              >
                {header}
              </div>
            ))}
            {/* Extra empty space for icon column alignment */}
            <div className="w-6"></div>
          </div>

          {/* Table Body with Scroll */}
          <div className="bg-[#FFFFFF] px-12">
            {tableData.map((group, groupIdx) =>
              Array.from({ length: group.rows }).map((_, rowIdx) => (
                <div
                  key={`${groupIdx}-${rowIdx}`}
                  className="flex items-center text-sm py-3 border-b last:border-none border-gray-200"
                >
                  <div className="min-w-[152px]">{group.code}</div>
                  <div className="min-w-[152px]">{group.supplier}</div>
                  <div className="min-w-[152px]">{group.item}</div>
                  <div className="min-w-[152px]">{group.qty}</div>
                  <div className="min-w-[152px]">{group.price.toFixed(2)}</div>
                  <div className="min-w-[152px] font-semibold">
                    ${(group.qty * group.price).toFixed(2)}
                  </div>
                  {/* Pencil Icon after Total */}
                  <div className="w-6 flex items-center justify-center">
                    <LuPencilLine className="text-[#6A5AE0] w-4 h-4 cursor-pointer" />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Totals Section */}
          <div className="bg-[#F0FDFA] text-gray-800 px-12 py-5 text-base space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Total</span>
              <span className="font-bold text-gray-900 ml-[-20px] mr-80">$490.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Payment Received (Previous Day)</span>
              <span className="text-gray-700 ml-[-20px] mr-80">$200.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Previous Balance</span>
              <span className="text-gray-700 ml-[-20px] mr-80">$300.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 font-semibold">Net Payable (As of Today)</span>
              <span className="font-bold text-gray-900 ml-[-20px] mr-80">$290.00</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
