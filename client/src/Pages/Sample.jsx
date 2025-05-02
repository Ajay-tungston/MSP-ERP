// import React from 'react';

// function PurchaseReportTable({ data }) {
//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden">
//       <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
//         <h2 className="text-xl font-semibold text-gray-800">Individual Purchase Report</h2>
//         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//           Print
//         </button>
//       </div>
//       <div className="px-6 py-4 flex items-center space-x-4">
//         <div className="relative flex-grow">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
//           </div>
//           <input
//             type="text"
//             placeholder="Search here..."
//             className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
//           />
//         </div>
//         <div className="flex items-center space-x-2">
//           <label htmlFor="date-range" className="text-sm text-gray-600">Date Range</label>
//           <input
//             type="date"
//             className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
//           />
//           <span className="text-gray-500">to</span>
//           <input
//             type="date"
//             className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
//           />
//         </div>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty (KG)</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty (Box)</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total (KG)</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//               <th scope="col" className="relative px-6 py-3">
//                 <span className="sr-only">Edit</span>
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {data.map((item) => (
//               <tr key={item.No}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.No}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.Date}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.Supplier}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item['Qty (KG)']}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item['Qty (Box)']}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item['Total (KG)']}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.Amount}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                   <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-2">
//                     {/* Edit Icon (you can use an SVG here) */}
//                     <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15.828 10 16.5V12h-4v-4z" /></svg>
//                   </a>
//                   <a href="#" className="text-blue-600 hover:text-blue-900">
//                     {/* View Icon (you can use an SVG here) */}
//                     <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7 1.274 4.057-1.176 8-5.042 8-3.868 0-7.659-3.943-8.933-8z" /></svg>
//                   </a>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
//         <div className="text-sm text-gray-500">Page 1 of 10</div>
//         <div className="flex items-center space-x-2">
//           <button className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50">
//             Previous
//           </button>
//           <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
//             Next
//           </button>
//         </div>
//       </div>
//       <div className="bg-gray-50 px-6 py-4 grid grid-cols-3 gap-4">
//         <div>
//           <span className="text-sm font-medium text-gray-500">Commission</span>
//           <p className="text-lg font-semibold text-gray-800">$200.00</p>
//         </div>
//         <div className="text-center">
//           <span className="text-sm font-medium text-gray-500">Coolie</span>
//           <p className="text-lg font-semibold text-gray-800">$100.00</p>
//         </div>
//         <div className="text-right">
//           <span className="text-sm font-medium text-gray-500">Expenses</span>
//           <p className="text-lg font-semibold text-gray-800">$50.00</p>
//         </div>
//       </div>
//       <div className="bg-green-100 px-6 py-4 text-right">
//         <span className="text-sm font-medium text-gray-700">Total</span>
//         <p className="text-xl font-bold text-green-700">$3,750.00</p>
//       </div>
//     </div>
//   );
// }

// export default PurchaseReportTable;
import React from 'react'

function Sample() {
  return (
    <div>
      
    </div>
  )
}

export default Sample

