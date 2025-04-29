// // // // // // // import { useState } from 'react';
// // // // // // // import { PrinterIcon, ChevronDown, ChevronUp } from 'lucide-react';

// // // // // // // const sections = {
// // // // // // //   receivables: [
// // // // // // //     {
// // // // // // //       title: 'Receivables from Customers',
// // // // // // //       total: 5000,
// // // // // // //       headers: ['Customer', 'Invoice No.', 'Amount'],
// // // // // // //       rows: [
// // // // // // //         { name: 'GreenMart', invoice: 'INV001', amount: 2000 },
// // // // // // //         { name: 'LocalMart', invoice: 'INV002', amount: 3000 },
// // // // // // //       ],
// // // // // // //     },
// // // // // // //     {
// // // // // // //       title: 'Receivables from Suppliers',
// // // // // // //       total: 2000,
// // // // // // //       headers: ['Supplier', 'Credit Note No.', 'Amount'],
// // // // // // //       rows: [
// // // // // // //         { name: 'Farm Fresh', invoice: 'CRN001', amount: 1000 },
// // // // // // //         { name: 'LocalMart', invoice: 'CRN002', amount: 1000 },
// // // // // // //       ],
// // // // // // //     },
// // // // // // //     {
// // // // // // //       title: 'Receivables from Employees',
// // // // // // //       total: 1500,
// // // // // // //       headers: [],
// // // // // // //       rows: [],
// // // // // // //     },
// // // // // // //   ],
// // // // // // //   payables: [
// // // // // // //     {
// // // // // // //       title: 'Commission',
// // // // // // //       total: 750,
// // // // // // //       headers: ['Transaction No.', 'Advance Date', 'Amount'],
// // // // // // //       rows: [
// // // // // // //         { name: 'TRXN001', date: '01/12/2024', amount: 500 },
// // // // // // //         { name: 'TRXN002', date: '02/12/2024', amount: 250 },
// // // // // // //       ],
// // // // // // //     },
// // // // // // //     {
// // // // // // //       title: 'Coolie/Logistics',
// // // // // // //       total: 500,
// // // // // // //       headers: ['Transaction No.', 'Advance Date', 'Amount'],
// // // // // // //       rows: [
// // // // // // //         { name: 'TRXN001', date: '01/12/2024', amount: 300 },
// // // // // // //         { name: 'TRXN002', date: '02/12/2024', amount: 200 },
// // // // // // //       ],
// // // // // // //     },
// // // // // // //     {
// // // // // // //       title: 'Payables to Suppliers',
// // // // // // //       total: 3000,
// // // // // // //       headers: [],
// // // // // // //       rows: [],
// // // // // // //     },
// // // // // // //   ],
// // // // // // // };

// // // // // // // export default function TrialBalanceReport() {
// // // // // // //   const [expandedSections, setExpandedSections] = useState({});

// // // // // // //   const toggleSection = (title) => {
// // // // // // //     setExpandedSections((prev) => ({ ...prev, [title]: !prev[title] }));
// // // // // // //   };

// // // // // // //   const renderSection = (section, isReceivable = true) => (
// // // // // // //     <div key={section.title} className="border-b border-[#E8E8ED]">
// // // // // // //       <div
// // // // // // //         className="flex items-center justify-between bg-[#F0F9FF] px-6 py-3 font-semibold text-sm text-gray-700 cursor-pointer border-b border-[#E8E8ED]"
// // // // // // //         onClick={() => toggleSection(section.title)}
// // // // // // //       >
// // // // // // //         <div className="flex items-center gap-2">
// // // // // // //           {expandedSections[section.title] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
// // // // // // //           <span>{section.title}</span>
// // // // // // //         </div>
// // // // // // //         <span className="text-right">${section.total.toFixed(2)}</span>
// // // // // // //       </div>
// // // // // // //       {expandedSections[section.title] && (
// // // // // // //         <div className="bg-[#FFFFFF] text-sm">
// // // // // // //           <div className="flex items-center px-6 py-2 bg-[#fbfaf9] border-b border-[#E8E8ED]">
// // // // // // //             <input type="checkbox" className="mr-4 w-4 h-4 accent-[#4079ED]" />
// // // // // // //             {section.headers.map((h, idx) => (
// // // // // // //               <div key={idx} className="min-w-[152px] font-semibold">
// // // // // // //                 {h}
// // // // // // //               </div>
// // // // // // //             ))}
// // // // // // //           </div>
// // // // // // //           {section.rows.map((row, idx) => (
// // // // // // //             <div key={idx} className="flex items-center px-6 py-2 border-b border-[#E8E8ED]">
// // // // // // //               <input type="checkbox" className="mr-4 w-4 h-4 accent-[#4079ED]" />
// // // // // // //               {isReceivable ? (
// // // // // // //                 <>
// // // // // // //                   <div className="min-w-[152px]">{row.name}</div>
// // // // // // //                   <div className="min-w-[152px]">{row.invoice}</div>
// // // // // // //                   <div className="min-w-[152px]">${row.amount.toFixed(2)}</div>
// // // // // // //                 </>
// // // // // // //               ) : (
// // // // // // //                 <>
// // // // // // //                   <div className="min-w-[152px]">{row.name}</div>
// // // // // // //                   <div className="min-w-[152px]">{row.date}</div>
// // // // // // //                   <div className="min-w-[152px]">${row.amount.toFixed(2)}</div>
// // // // // // //                 </>
// // // // // // //               )}
// // // // // // //             </div>
// // // // // // //           ))}
// // // // // // //         </div>
// // // // // // //       )}
// // // // // // //     </div>
// // // // // // //   );

// // // // // // //   const receivablesTotal = sections.receivables.reduce((sum, sec) => sum + sec.total, 0);
// // // // // // //   const payablesTotal = sections.payables.reduce((sum, sec) => sum + sec.total, 0);

// // // // // // //   return (
// // // // // // //     <div className="p-3 min-h-screen font-[Urbanist]">
// // // // // // //       <div className="bg-white rounded-[24px] shadow-md mt-5 ml-0 overflow-hidden">
// // // // // // //         <div className="p-10">
// // // // // // //           <div className="flex justify-between items-start mb-10">
// // // // // // //             <div>
// // // // // // //               <div className="text-sm text-gray-500 mb-2">Reports &gt; Trial Balance</div>
// // // // // // //               <h1 className="text-[36px] font-bold mb-4">Trial Balance</h1>
// // // // // // //             </div>
// // // // // // //             <button className="bg-gray-100 hover:bg-gray-200 text-sm font-medium rounded-[12px] px-6 py-3 flex items-center gap-3">
// // // // // // //               <PrinterIcon className="w-4 h-4" /> Print
// // // // // // //             </button>
// // // // // // //           </div>

// // // // // // //           <div className="grid grid-cols-2 gap-8">
// // // // // // //             <div>
// // // // // // //               <div className="bg-[#F0FDFA] px-6 py-2 border-b border-[#E8E8ED] flex items-center">
// // // // // // //                 <div className="text-green-600 font-black uppercase tracking-[0.04em] text-[24px] leading-[100%] min-w-[480px] w-[512px] h-[29px] font-[Urbanist] flex items-center justify-between">
// // // // // // //                   RECEIVABLES
// // // // // // //                   <span className="text-black normal-case font-normal text-[16px]">
// // // // // // //                     ${receivablesTotal.toFixed(2)}
// // // // // // //                   </span>
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //               <div className="bg-white">
// // // // // // //                 {sections.receivables.map((section, idx) => (
// // // // // // //                   <div key={idx} className="mb-6">
// // // // // // //                     {renderSection(section, true)}
// // // // // // //                   </div>
// // // // // // //                 ))}
// // // // // // //               </div>
// // // // // // //             </div>

// // // // // // //             <div>
// // // // // // //               <div className="bg-red-100 px-6 py-2 border-b border-[#E8E8ED] flex items-center">
// // // // // // //                 <div className="text-red-600 font-black uppercase tracking-[0.04em] text-[24px] leading-[100%] min-w-[480px] w-[512px] h-[29px] font-[Urbanist] flex items-center justify-between">
// // // // // // //                   PAYABLES
// // // // // // //                   <span className="text-black normal-case font-normal text-[16px]">
// // // // // // //                     ${payablesTotal.toFixed(2)}
// // // // // // //                   </span>
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //               <div className="bg-white">
// // // // // // //                 {sections.payables.map((section, idx) => (
// // // // // // //                   <div key={idx} className="mb-6">
// // // // // // //                     {renderSection(section, false)}
// // // // // // //                   </div>
// // // // // // //                 ))}
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }


// // // // // // import { useState } from 'react';
// // // // // // import { PrinterIcon, ChevronDown, ChevronUp } from 'lucide-react';

// // // // // // const sections = {
// // // // // //   receivables: [
// // // // // //     {
// // // // // //       title: 'Receivables from Customers',
// // // // // //       total: 5000,
// // // // // //       headers: ['Customer', 'Invoice No.', 'Amount'],
// // // // // //       rows: [
// // // // // //         { name: 'GreenMart', invoice: 'INV001', amount: 2000 },
// // // // // //         { name: 'LocalMart', invoice: 'INV002', amount: 3000 },
// // // // // //       ],
// // // // // //     },
// // // // // //     {
// // // // // //       title: 'Receivables from Suppliers',
// // // // // //       total: 2000,
// // // // // //       headers: ['Supplier', 'Credit Note No.', 'Amount'],
// // // // // //       rows: [
// // // // // //         { name: 'Farm Fresh', invoice: 'CRN001', amount: 1000 },
// // // // // //         { name: 'LocalMart', invoice: 'CRN002', amount: 1000 },
// // // // // //       ],
// // // // // //     },
// // // // // //     {
// // // // // //       title: 'Receivables from Employees',
// // // // // //       total: 1500,
// // // // // //       headers: [],
// // // // // //       rows: [],
// // // // // //     },
// // // // // //   ],
// // // // // //   payables: [
// // // // // //     {
// // // // // //       title: 'Commission',
// // // // // //       total: 750,
// // // // // //       headers: ['Transaction No.', 'Advance Date', 'Amount'],
// // // // // //       rows: [
// // // // // //         { name: 'TRXN001', date: '01/12/2024', amount: 500 },
// // // // // //         { name: 'TRXN002', date: '02/12/2024', amount: 250 },
// // // // // //       ],
// // // // // //     },
// // // // // //     {
// // // // // //       title: 'Coolie/Logistics',
// // // // // //       total: 500,
// // // // // //       headers: ['Transaction No.', 'Advance Date', 'Amount'],
// // // // // //       rows: [
// // // // // //         { name: 'TRXN001', date: '01/12/2024', amount: 300 },
// // // // // //         { name: 'TRXN002', date: '02/12/2024', amount: 200 },
// // // // // //       ],
// // // // // //     },
// // // // // //     {
// // // // // //       title: 'Payables to Suppliers',
// // // // // //       total: 3000,
// // // // // //       headers: [],
// // // // // //       rows: [],
// // // // // //     },
// // // // // //   ],
// // // // // // };

// // // // // // export default function TrialBalanceReport() {
// // // // // //   const [expandedSections, setExpandedSections] = useState({});

// // // // // //   const toggleSection = (title) => {
// // // // // //     setExpandedSections((prev) => ({ ...prev, [title]: !prev[title] }));
// // // // // //   };

// // // // // //   const renderSection = (section, isReceivable = true) => (
// // // // // //     <div key={section.title} className="border-b border-[#E8E8ED]">
// // // // // //       <div
// // // // // //         className="flex items-center justify-between bg-[#F0F9FF] px-6 py-3 font-semibold text-sm text-gray-700 cursor-pointer border-b border-[#E8E8ED]"
// // // // // //         onClick={() => toggleSection(section.title)}
// // // // // //       >
// // // // // //         <div className="flex items-center gap-2">
// // // // // //           {expandedSections[section.title] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
// // // // // //           <span>{section.title}</span>
// // // // // //         </div>
// // // // // //         <span className="text-right">${section.total.toFixed(2)}</span>
// // // // // //       </div>
// // // // // //       {expandedSections[section.title] && (
// // // // // //         <div className="bg-[#FFFFFF] text-sm">
// // // // // //           <div className="flex items-center px-6 py-2 bg-[#fbfaf9] border-b border-[#E8E8ED]">
// // // // // //             <input type="checkbox" className="mr-4 w-4 h-4 accent-[#4079ED]" />
// // // // // //             {section.headers.map((h, idx) => (
// // // // // //               <div key={idx} className="min-w-[152px] font-semibold">
// // // // // //                 {h}
// // // // // //               </div>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //           {section.rows.map((row, idx) => (
// // // // // //             <div key={idx} className="flex items-center px-6 py-2 border-b border-[#E8E8ED]">
// // // // // //               <input type="checkbox" className="mr-4 w-4 h-4 accent-[#4079ED]" />
// // // // // //               {isReceivable ? (
// // // // // //                 <>
// // // // // //                   <div className="min-w-[152px]">{row.name}</div>
// // // // // //                   <div className="min-w-[152px]">{row.invoice}</div>
// // // // // //                   <div className="min-w-[152px]">${row.amount.toFixed(2)}</div>
// // // // // //                 </>
// // // // // //               ) : (
// // // // // //                 <>
// // // // // //                   <div className="min-w-[152px]">{row.name}</div>
// // // // // //                   <div className="min-w-[152px]">{row.date}</div>
// // // // // //                   <div className="min-w-[152px]">${row.amount.toFixed(2)}</div>
// // // // // //                 </>
// // // // // //               )}
// // // // // //             </div>
// // // // // //           ))}
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );

// // // // // //   // Old dynamic calculation (not used anymore for display)
// // // // // //   const receivablesTotal = sections.receivables.reduce((sum, sec) => sum + sec.total, 0);
// // // // // //   const payablesTotal = sections.payables.reduce((sum, sec) => sum + sec.total, 0);

// // // // // //   return (
// // // // // //     <div className="p-3 min-h-screen font-[Urbanist]">
// // // // // //       <div className="bg-white rounded-[24px] shadow-md mt-5 ml-0 overflow-hidden">
// // // // // //         <div className="p-10">
// // // // // //           <div className="flex justify-between items-start mb-10">
// // // // // //             <div>
// // // // // //               <div className="text-sm text-gray-500 mb-2">Reports &gt; Trial Balance</div>
// // // // // //               <h1 className="text-[36px] font-bold mb-4">Trial Balance</h1>
// // // // // //             </div>
// // // // // //             <button className="bg-gray-100 hover:bg-gray-200 text-sm font-medium rounded-[12px] px-6 py-3 flex items-center gap-3">
// // // // // //               <PrinterIcon className="w-4 h-4" /> Print
// // // // // //             </button>
// // // // // //           </div>

// // // // // //           <div className="grid grid-cols-2 gap-8">
// // // // // //             <div>
// // // // // //               <div className="bg-[#F0FDFA] px-6 py-2 border-b border-[#E8E8ED] flex items-center">
// // // // // //                 <div className="text-green-600 font-black uppercase tracking-[0.04em] text-[24px] leading-[100%] min-w-[480px] w-[512px] h-[29px] font-[Urbanist] flex items-center justify-between">
// // // // // //                   RECEIVABLES
// // // // // //                   <span
// // // // // //                     className="normal-case font-normal text-[16px]"
// // // // // //                     style={{ color: '#27AE60' }}
// // // // // //                   >
// // // // // //                     $10,000.00
// // // // // //                   </span>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //               <div className="bg-white">
// // // // // //                 {sections.receivables.map((section, idx) => (
// // // // // //                   <div key={idx} className="mb-6">
// // // // // //                     {renderSection(section, true)}
// // // // // //                   </div>
// // // // // //                 ))}
// // // // // //               </div>
// // // // // //             </div>

// // // // // //             <div>
// // // // // //               <div className="bg-red-100 px-6 py-2 border-b border-[#E8E8ED] flex items-center">
// // // // // //                 <div className="text-red-600 font-black uppercase tracking-[0.04em] text-[24px] leading-[100%] min-w-[480px] w-[512px] h-[29px] font-[Urbanist] flex items-center justify-between">
// // // // // //                   PAYABLES
// // // // // //                   <span
// // // // // //                     className="normal-case font-normal text-[16px]"
// // // // // //                     style={{ color: '#EB5757' }}
// // // // // //                   >
// // // // // //                     $10,000.00
// // // // // //                   </span>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //               <div className="bg-white">
// // // // // //                 {sections.payables.map((section, idx) => (
// // // // // //                   <div key={idx} className="mb-6">
// // // // // //                     {renderSection(section, false)}
// // // // // //                   </div>
// // // // // //                 ))}
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>

// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }


// // // // // // import { useState } from 'react';
// // // // // // import { PrinterIcon } from 'lucide-react';

// // // // // // const sections = {
// // // // // //   receivables: [
// // // // // //     {
// // // // // //       title: 'Receivables from Customers',
// // // // // //       total: 5000,
// // // // // //       headers: ['Customer', 'Invoice No.', 'Amount'],
// // // // // //       rows: [
// // // // // //         { name: 'GreenMart', invoice: 'INV001', amount: 2000 },
// // // // // //         { name: 'LocalMart', invoice: 'INV002', amount: 3000 },
// // // // // //       ],
// // // // // //     },
// // // // // //     {
// // // // // //       title: 'Receivables from Suppliers',
// // // // // //       total: 2000,
// // // // // //       headers: ['Supplier', 'Credit Note No.', 'Amount'],
// // // // // //       rows: [
// // // // // //         { name: 'Farm Fresh', invoice: 'CRN001', amount: 1000 },
// // // // // //         { name: 'LocalMart', invoice: 'CRN002', amount: 1000 },
// // // // // //       ],
// // // // // //     },
// // // // // //     {
// // // // // //       title: 'Receivables from Employees',
// // // // // //       total: 1500,
// // // // // //       headers: [],
// // // // // //       rows: [],
// // // // // //     },
// // // // // //   ],
// // // // // //   payables: [
// // // // // //     {
// // // // // //       title: 'Commission',
// // // // // //       total: 750,
// // // // // //       headers: ['Transaction No.', 'Advance Date', 'Amount'],
// // // // // //       rows: [
// // // // // //         { name: 'TRXN001', date: '01/12/2024', amount: 500 },
// // // // // //         { name: 'TRXN002', date: '02/12/2024', amount: 250 },
// // // // // //       ],
// // // // // //     },
// // // // // //     {
// // // // // //       title: 'Coolie/Logistics',
// // // // // //       total: 500,
// // // // // //       headers: ['Transaction No.', 'Advance Date', 'Amount'],
// // // // // //       rows: [
// // // // // //         { name: 'TRXN001', date: '01/12/2024', amount: 300 },
// // // // // //         { name: 'TRXN002', date: '02/12/2024', amount: 200 },
// // // // // //       ],
// // // // // //     },
// // // // // //     {
// // // // // //       title: 'Payables to Suppliers',
// // // // // //       total: 3000,
// // // // // //       headers: [],
// // // // // //       rows: [],
// // // // // //     },
// // // // // //   ],
// // // // // // };

// // // // // // // Custom Arrow Icon (filled triangle)
// // // // // // const ArrowIcon = ({ isUp = false }) => (
// // // // // //   <svg
// // // // // //     width="16"
// // // // // //     height="16"
// // // // // //     viewBox="0 0 24 24"
// // // // // //     fill="currentColor"
// // // // // //     className={isUp ? "rotate-180" : ""}
// // // // // //     xmlns="http://www.w3.org/2000/svg"
// // // // // //   >
// // // // // //     <path d="M12 15L6 9H18L12 15Z" />
// // // // // //   </svg>
// // // // // // );

// // // // // // export default function TrialBalanceReport() {
// // // // // //   const [expandedSections, setExpandedSections] = useState({});

// // // // // //   const toggleSection = (title) => {
// // // // // //     setExpandedSections((prev) => ({ ...prev, [title]: !prev[title] }));
// // // // // //   };

// // // // // //   const renderSection = (section, isReceivable = true) => (
// // // // // //     <div key={section.title} className="border-b border-[#ede9e8]">
// // // // // //       <div
// // // // // //         className="flex items-center justify-between bg-[#F0F9FF] px-6 py-3 font-semibold text-sm text-gray-700 cursor-pointer border-b border-[#E8E8ED]"
// // // // // //         onClick={() => toggleSection(section.title)}
// // // // // //       >
// // // // // //         <div className="flex items-center gap-2">
// // // // // //           <ArrowIcon isUp={expandedSections[section.title]} />
// // // // // //           <span>{section.title}</span>
// // // // // //         </div>
// // // // // //         <span className="text-right">${section.total.toFixed(2)}</span>
// // // // // //       </div>
// // // // // //       {expandedSections[section.title] && (
// // // // // //         <div className="bg-[#FFFFFF] text-sm">
// // // // // //           <div className="flex items-center px-6 py-2 bg-[#fbfaf9] border-b border-[#E8E8ED]">
// // // // // //             <input type="checkbox" className="mr-4 w-4 h-4 accent-[#4079ED]" />
// // // // // //             {section.headers.map((h, idx) => (
// // // // // //               <div key={idx} className="min-w-[152px] font-semibold">
// // // // // //                 {h}
// // // // // //               </div>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //           {section.rows.map((row, idx) => (
// // // // // //             <div key={idx} className="flex items-center px-6 py-2 border-b border-[#E8E8ED]">
// // // // // //               <input type="checkbox" className="mr-4 w-4 h-4 accent-[#4079ED]" />
// // // // // //               {isReceivable ? (
// // // // // //                 <>
// // // // // //                   <div className="min-w-[152px]">{row.name}</div>
// // // // // //                   <div className="min-w-[152px]">{row.invoice}</div>
// // // // // //                   <div className="min-w-[152px]">${row.amount.toFixed(2)}</div>
// // // // // //                 </>
// // // // // //               ) : (
// // // // // //                 <>
// // // // // //                   <div className="min-w-[152px]">{row.name}</div>
// // // // // //                   <div className="min-w-[152px]">{row.date}</div>
// // // // // //                   <div className="min-w-[152px]">${row.amount.toFixed(2)}</div>
// // // // // //                 </>
// // // // // //               )}
// // // // // //             </div>
// // // // // //           ))}
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );

// // // // // //   const receivablesTotal = sections.receivables.reduce((sum, sec) => sum + sec.total, 0);
// // // // // //   const payablesTotal = sections.payables.reduce((sum, sec) => sum + sec.total, 0);

// // // // // //   return (
// // // // // //     <div className="p-3 min-h-screen font-[Urbanist]">
// // // // // //       <div className="bg-white rounded-[24px] shadow-md mt-5 ml-0 overflow-hidden">
// // // // // //         <div className="p-10">
// // // // // //           <div className="flex justify-between items-start mb-10">
// // // // // //             <div>
// // // // // //               <div className="text-sm text-gray-500 mb-2">Reports &gt; Trial Balance</div>
// // // // // //               <h1 className="text-[36px] font-bold mb-4">Trial Balance</h1>
// // // // // //             </div>
// // // // // //             <button className="bg-gray-100 hover:bg-gray-200 text-sm font-medium rounded-[12px] px-6 py-3 flex items-center gap-3">
// // // // // //               <PrinterIcon className="w-4 h-4" /> Print
// // // // // //             </button>
// // // // // //           </div>

// // // // // //           <div className="grid grid-cols-2 gap-8">
// // // // // //             <div>
// // // // // //               <div className="bg-[#F0FDFA] px-6 py-2 border-b border-[#E8E8ED] flex items-center">
// // // // // //                 <div className="text-green-600 font-black uppercase tracking-[0.04em] text-[24px] leading-[100%] min-w-[480px] w-[512px] h-[29px] font-[Urbanist] flex items-center justify-between">
// // // // // //                   RECEIVABLES
// // // // // //                   <span
// // // // // //                     className="normal-case font-normal text-[16px]"
// // // // // //                     style={{ color: '#27AE60' }}
// // // // // //                   >
// // // // // //                     $10,000.00
// // // // // //                   </span>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //               <div className="bg-white">
// // // // // //                 {sections.receivables.map((section, idx) => (
// // // // // //                   <div key={idx} className="mb-6">
// // // // // //                     {renderSection(section, true)}
// // // // // //                   </div>
// // // // // //                 ))}
// // // // // //               </div>
// // // // // //             </div>

// // // // // //             <div>
// // // // // //               <div className="bg-red-100 px-6 py-2 border-b border-[#E8E8ED] flex items-center">
// // // // // //                 <div className="text-red-600 font-black uppercase tracking-[0.04em] text-[24px] leading-[100%] min-w-[480px] w-[512px] h-[29px] font-[Urbanist] flex items-center justify-between">
// // // // // //                   PAYABLES
// // // // // //                   <span
// // // // // //                     className="normal-case font-normal text-[16px]"
// // // // // //                     style={{ color: '#EB5757' }}
// // // // // //                   >
// // // // // //                     $10,000.00
// // // // // //                   </span>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //               <div className="bg-white">
// // // // // //                 {sections.payables.map((section, idx) => (
// // // // // //                   <div key={idx} className="mb-6">
// // // // // //                     {renderSection(section, false)}
// // // // // //                   </div>
// // // // // //                 ))}
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>

// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }


// // // // import { useState } from 'react';
// // // // import { PrinterIcon } from 'lucide-react';

// // // // const sections = {
// // // //   receivables: [
// // // //     {
// // // //       title: 'Receivables from Customers',
// // // //       total: 5000,
// // // //       headers: ['Customer', 'Invoice No.', 'Amount'],
// // // //       rows: [
// // // //         { name: 'GreenMart', invoice: 'INV001', amount: 2000 },
// // // //         { name: 'LocalMart', invoice: 'INV002', amount: 3000 },
// // // //       ],
// // // //     },
// // // //     {
// // // //       title: 'Receivables from Suppliers',
// // // //       total: 2000,
// // // //       headers: ['Supplier', 'Credit Note No.', 'Amount'],
// // // //       rows: [
// // // //         { name: 'Farm Fresh', invoice: 'CRN001', amount: 1000 },
// // // //         { name: 'LocalMart', invoice: 'CRN002', amount: 1000 },
// // // //       ],
// // // //     },
// // // //     {
// // // //       title: 'Receivables from Employees',
// // // //       total: 1500,
// // // //       headers: [],
// // // //       rows: [],
// // // //     },
// // // //   ],
// // // //   payables: [
// // // //     {
// // // //       title: 'Commission',
// // // //       total: 750,
// // // //       headers: ['Transaction No.', 'Advance Date', 'Amount'],
// // // //       rows: [
// // // //         { name: 'TRXN001', date: '01/12/2024', amount: 500 },
// // // //         { name: 'TRXN002', date: '02/12/2024', amount: 250 },
// // // //       ],
// // // //     },
// // // //     {
// // // //       title: 'Coolie/Logistics',
// // // //       total: 500,
// // // //       headers: ['Transaction No.', 'Advance Date', 'Amount'],
// // // //       rows: [
// // // //         { name: 'TRXN001', date: '01/12/2024', amount: 300 },
// // // //         { name: 'TRXN002', date: '02/12/2024', amount: 200 },
// // // //       ],
// // // //     },
// // // //     {
// // // //       title: 'Payables to Suppliers',
// // // //       total: 3000,
// // // //       headers: [],
// // // //       rows: [],
// // // //     },
// // // //   ],
// // // // };

// // // // // Custom Arrow Icon
// // // // const ArrowIcon = ({ isUp = false }) => (
// // // //   <svg
// // // //     width="16"
// // // //     height="16"
// // // //     viewBox="0 0 24 24"
// // // //     fill="currentColor"
// // // //     className={isUp ? "rotate-180" : ""}
// // // //     xmlns="http://www.w3.org/2000/svg"
// // // //   >
// // // //     <path d="M12 15L6 9H18L12 15Z" />
// // // //   </svg>
// // // // );

// // // // export default function TrialBalanceReport() {
// // // //   const [expandedSections, setExpandedSections] = useState({});

// // // //   const toggleSection = (title) => {
// // // //     setExpandedSections((prev) => ({ ...prev, [title]: !prev[title] }));
// // // //   };

// // // //   const renderSection = (section, isReceivable = true) => (
// // // //     <div key={section.title} className="border-b border-[#ede9e8]">
// // // //       <div
// // // //         className="flex items-center justify-between bg-[#F0F9FF] px-6 py-3 font-semibold text-sm text-gray-700 cursor-pointer border-b border-[#E8E8ED]"
// // // //         onClick={() => toggleSection(section.title)}
// // // //       >
// // // //         <div className="flex items-center gap-2">
// // // //           <ArrowIcon isUp={expandedSections[section.title]} />
// // // //           <span>{section.title}</span>
// // // //         </div>
// // // //         <span className="text-right">${section.total.toFixed(2)}</span>
// // // //       </div>
// // // //       {expandedSections[section.title] && (
// // // //         <div className="bg-[#FFFFFF] text-sm">
// // // //           <div className="flex items-center px-6 py-2 bg-[#fbfaf9] border-b border-[#E8E8ED]">
// // // //             <input
// // // //               type="checkbox"
// // // //               className="mr-4 w-4 h-4"
// // // //               style={{
// // // //                 accentColor: '#5D5FEF',
// // // //                 border: '2px solid #5D5FEF',
// // // //                 borderRadius: '6px',
// // // //                 borderBlockColor:'#5D5FEF',
// // // //               }}
// // // //             />
// // // //             {section.headers.map((h, idx) => (
// // // //               <div key={idx} className="min-w-[152px] font-semibold">
// // // //                 {h}
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //           {section.rows.map((row, idx) => (
// // // //             <div key={idx} className="flex items-center px-6 py-2 border-b border-[#E8E8ED]">
// // // //               <input
// // // //                 type="checkbox"
// // // //                 className="mr-4 w-4 h-4"
// // // //                 style={{
// // // //                   accentColor: '#4079ED',
// // // //                   border: '2px solid #4079ED',
// // // //                   borderRadius: '6px',
// // // //                 }}
// // // //               />
// // // //               {isReceivable ? (
// // // //                 <>
// // // //                   <div className="min-w-[152px]">{row.name}</div>
// // // //                   <div className="min-w-[152px]">{row.invoice}</div>
// // // //                   <div className="min-w-[152px]">${row.amount.toFixed(2)}</div>
// // // //                 </>
// // // //               ) : (
// // // //                 <>
// // // //                   <div className="min-w-[152px]">{row.name}</div>
// // // //                   <div className="min-w-[152px]">{row.date}</div>
// // // //                   <div className="min-w-[152px]">${row.amount.toFixed(2)}</div>
// // // //                 </>
// // // //               )}
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );

// // // //   const receivablesTotal = sections.receivables.reduce((sum, sec) => sum + sec.total, 0);
// // // //   const payablesTotal = sections.payables.reduce((sum, sec) => sum + sec.total, 0);

// // // //   return (
// // // //     <div className="p-3 min-h-screen font-[Urbanist]">
// // // //       <div className="bg-white rounded-[24px] shadow-md mt-5 ml-0 overflow-hidden">
// // // //         <div className="p-10">
// // // //           <div className="flex justify-between items-start mb-10">
// // // //             <div>
// // // //               <div className="text-sm text-gray-500 mb-2">Reports &gt; Trial Balance</div>
// // // //               <h1 className="text-[36px] font-bold mb-4">Trial Balance</h1>
// // // //             </div>
// // // //             <button className="bg-gray-100 hover:bg-gray-200 text-sm font-medium rounded-[12px] px-6 py-3 flex items-center gap-3">
// // // //               <PrinterIcon className="w-4 h-4" /> Print
// // // //             </button>
// // // //           </div>

// // // //           <div className="grid grid-cols-2 gap-8">
// // // //             <div>
// // // //               <div className="bg-[#F0FDFA] px-6 py-2 border-b border-[#E8E8ED] flex items-center">
// // // //                 <div className="text-green-600 font-black uppercase tracking-[0.04em] text-[24px] leading-[100%] min-w-[480px] w-[512px] h-[29px] font-[Urbanist] flex items-center justify-between">
// // // //                   RECEIVABLES
// // // //                   <span
// // // //                     className="normal-case font-normal text-[16px]"
// // // //                     style={{ color: '#27AE60' }}
// // // //                   >
// // // //                     $10,000.00
// // // //                   </span>
// // // //                 </div>
// // // //               </div>
// // // //               <div className="bg-white">
// // // //                 {sections.receivables.map((section, idx) => (
// // // //                   <div key={idx} className="mb-6">
// // // //                     {renderSection(section, true)}
// // // //                   </div>
// // // //                 ))}
// // // //               </div>
// // // //             </div>

// // // //             <div>
// // // //               <div className="bg-red-100 px-6 py-2 border-b border-[#E8E8ED] flex items-center">
// // // //                 <div className="text-red-600 font-black uppercase tracking-[0.04em] text-[24px] leading-[100%] min-w-[480px] w-[512px] h-[29px] font-[Urbanist] flex items-center justify-between">
// // // //                   PAYABLES
// // // //                   <span
// // // //                     className="normal-case font-normal text-[16px]"
// // // //                     style={{ color: '#EB5757' }}
// // // //                   >
// // // //                     $10,000.00
// // // //                   </span>
// // // //                 </div>
// // // //               </div>
// // // //               <div className="bg-white">
// // // //                 {sections.payables.map((section, idx) => (
// // // //                   <div key={idx} className="mb-6">
// // // //                     {renderSection(section, false)}
// // // //                   </div>
// // // //                 ))}
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }


// // // // import { useState } from 'react';
// // // // import { PrinterIcon } from 'lucide-react';

// // // // const sections = {
// // // //   receivables: [
// // // //     {
// // // //       title: 'Receivables from Customers',
// // // //       total: 5000,
// // // //       headers: ['Customer', 'Invoice No.', 'Amount'],
// // // //       rows: [
// // // //         { name: 'GreenMart', invoice: 'INV001', amount: 2000 },
// // // //         { name: 'LocalMart', invoice: 'INV002', amount: 3000 },
// // // //       ],
// // // //     },
// // // //     {
// // // //       title: 'Receivables from Suppliers',
// // // //       total: 2000,
// // // //       headers: ['Supplier', 'Credit Note No.', 'Amount'],
// // // //       rows: [
// // // //         { name: 'Farm Fresh', invoice: 'CRN001', amount: 1000 },
// // // //         { name: 'LocalMart', invoice: 'CRN002', amount: 1000 },
// // // //       ],
// // // //     },
// // // //     {
// // // //       title: 'Receivables from Employees',
// // // //       total: 1500,
// // // //       headers: [],
// // // //       rows: [],
// // // //     },
// // // //   ],
// // // //   payables: [
// // // //     {
// // // //       title: 'Commission',
// // // //       total: 750,
// // // //       headers: ['Transaction No.', 'Advance Date', 'Amount'],
// // // //       rows: [
// // // //         { name: 'TRXN001', date: '01/12/2024', amount: 500 },
// // // //         { name: 'TRXN002', date: '02/12/2024', amount: 250 },
// // // //       ],
// // // //     },
// // // //     {
// // // //       title: 'Coolie/Logistics',
// // // //       total: 500,
// // // //       headers: ['Transaction No.', 'Advance Date', 'Amount'],
// // // //       rows: [
// // // //         { name: 'TRXN001', date: '01/12/2024', amount: 300 },
// // // //         { name: 'TRXN002', date: '02/12/2024', amount: 200 },
// // // //       ],
// // // //     },
// // // //     {
// // // //       title: 'Payables to Suppliers',
// // // //       total: 3000,
// // // //       headers: [],
// // // //       rows: [],
// // // //     },
// // // //   ],
// // // // };

// // // // // Custom Checkbox
// // // // const CustomCheckbox = () => (
// // // //   <label className="flex items-center cursor-pointer mr-4">
// // // //     <input type="checkbox" className="peer hidden" />
// // // //     <div className="w-3 h-3 border-2 border-[#4079ED] rounded-[12px] flex items-center justify-center peer-checked:bg-[#4079ED]">
// // // //       <svg
// // // //         className="hidden peer-checked:block w-3 h-3 text-white"
// // // //         viewBox="0 0 24 24"
// // // //         fill="none"
// // // //         stroke="currentColor"
// // // //         strokeWidth="3"
// // // //       >
// // // //         <path d="M6 12h12" />
// // // //       </svg>
// // // //     </div>
// // // //   </label>
// // // // );

// // // // // Custom Arrow Icon
// // // // const ArrowIcon = ({ isUp = false }) => (
// // // //   <svg
// // // //     width="16"
// // // //     height="16"
// // // //     viewBox="0 0 24 24"
// // // //     fill="currentColor"
// // // //     className={isUp ? "rotate-180" : ""}
// // // //     xmlns="http://www.w3.org/2000/svg"
// // // //   >
// // // //     <path d="M12 15L6 9H18L12 15Z" />
// // // //   </svg>
// // // // );

// // // // export default function TrialBalanceReport() {
// // // //   const [expandedSections, setExpandedSections] = useState({});

// // // //   const toggleSection = (title) => {
// // // //     setExpandedSections((prev) => ({ ...prev, [title]: !prev[title] }));
// // // //   };

// // // //   const renderSection = (section, isReceivable = true) => (
// // // //     <div key={section.title} className="border-b border-[#ede9e8]">
// // // //       <div
// // // //         className="flex items-center justify-between bg-[#F0F9FF] px-6 py-3 font-semibold text-sm text-gray-700 cursor-pointer border-b border-[#E8E8ED]"
// // // //         onClick={() => toggleSection(section.title)}
// // // //       >
// // // //         <div className="flex items-center gap-2">
// // // //           <ArrowIcon isUp={expandedSections[section.title]} />
// // // //           <span>{section.title}</span>
// // // //         </div>
// // // //         <span className="text-right">${section.total.toFixed(2)}</span>
// // // //       </div>
// // // //       {expandedSections[section.title] && (
// // // //         <div className="bg-[#FFFFFF] text-sm">
// // // //           <div className="flex items-center px-6 py-2 bg-[#fbfaf9] border-b border-[#E8E8ED]">
// // // //             <CustomCheckbox />
// // // //             {section.headers.map((h, idx) => (
// // // //               <div key={idx} className="min-w-[152px] font-semibold">
// // // //                 {h}
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //           {section.rows.map((row, idx) => (
// // // //             <div key={idx} className="flex items-center px-6 py-2 border-b border-[#E8E8ED]">
// // // //               <CustomCheckbox />
// // // //               {isReceivable ? (
// // // //                 <>
// // // //                   <div className="min-w-[152px]">{row.name}</div>
// // // //                   <div className="min-w-[152px]">{row.invoice}</div>
// // // //                   <div className="min-w-[152px]">${row.amount.toFixed(2)}</div>
// // // //                 </>
// // // //               ) : (
// // // //                 <>
// // // //                   <div className="min-w-[152px]">{row.name}</div>
// // // //                   <div className="min-w-[152px]">{row.date}</div>
// // // //                   <div className="min-w-[152px]">${row.amount.toFixed(2)}</div>
// // // //                 </>
// // // //               )}
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );

// // // //   const receivablesTotal = sections.receivables.reduce((sum, sec) => sum + sec.total, 0);
// // // //   const payablesTotal = sections.payables.reduce((sum, sec) => sum + sec.total, 0);

// // // //   return (
// // // //     <div className="p-3 min-h-screen font-[Urbanist]">
// // // //       <div className="bg-white rounded-[24px] shadow-md mt-5 ml-0 overflow-hidden">
// // // //         <div className="p-10">
// // // //           <div className="flex justify-between items-start mb-10">
// // // //             <div>
// // // //               <div className="text-sm text-gray-500 mb-2">Reports &gt; Trial Balance</div>
// // // //               <h1 className="text-[36px] font-bold mb-4">Trial Balance</h1>
// // // //             </div>
// // // //             <button className="bg-gray-100 hover:bg-gray-200 text-sm font-medium rounded-[12px] px-6 py-3 flex items-center gap-3">
// // // //               <PrinterIcon className="w-4 h-4" /> Print
// // // //             </button>
// // // //           </div>

// // // //           <div className="grid grid-cols-2 gap-8">
// // // //             <div>
// // // //               <div className="bg-[#F0FDFA] px-6 py-2 border-b border-[#E8E8ED] flex items-center">
// // // //                 <div className="text-green-600 font-black uppercase tracking-[0.04em] text-[24px] leading-[100%] min-w-[480px] w-[512px] h-[29px] font-[Urbanist] flex items-center justify-between">
// // // //                   RECEIVABLES
// // // //                   <span
// // // //                     className="normal-case font-normal text-[16px]"
// // // //                     style={{ color: '#27AE60' }}
// // // //                   >
// // // //                     ${receivablesTotal.toFixed(2)}
// // // //                   </span>
// // // //                 </div>
// // // //               </div>
// // // //               <div className="bg-white">
// // // //                 {sections.receivables.map((section, idx) => (
// // // //                   <div key={idx} className="mb-6">
// // // //                     {renderSection(section, true)}
// // // //                   </div>
// // // //                 ))}
// // // //               </div>
// // // //             </div>

// // // //             <div>
// // // //               <div className="bg-red-100 px-6 py-2 border-b border-[#E8E8ED] flex items-center">
// // // //                 <div className="text-red-600 font-black uppercase tracking-[0.04em] text-[24px] leading-[100%] min-w-[480px] w-[512px] h-[29px] font-[Urbanist] flex items-center justify-between">
// // // //                   PAYABLES
// // // //                   <span
// // // //                     className="normal-case font-normal text-[16px]"
// // // //                     style={{ color: '#EB5757' }}
// // // //                   >
// // // //                     ${payablesTotal.toFixed(2)}
// // // //                   </span>
// // // //                 </div>
// // // //               </div>
// // // //               <div className="bg-white">
// // // //                 {sections.payables.map((section, idx) => (
// // // //                   <div key={idx} className="mb-6">
// // // //                     {renderSection(section, false)}
// // // //                   </div>
// // // //                 ))}
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }


// // // // import { useState } from 'react';
// // // // import { PrinterIcon } from 'lucide-react';

// // // // const sections = {
// // // //   receivables: [
// // // //     {
// // // //       title: 'Receivables from Customers',
// // // //       total: 5000,
// // // //       headers: ['Customer', 'Invoice No.', 'Amount'],
// // // //       rows: [
// // // //         { name: 'GreenMart', invoice: 'INV001', amount: 2000 },
// // // //         { name: 'LocalMart', invoice: 'INV002', amount: 3000 },
// // // //       ],
// // // //     },
// // // //     {
// // // //       title: 'Receivables from Suppliers',
// // // //       total: 2000,
// // // //       headers: ['Supplier', 'Credit Note No.', 'Amount'],
// // // //       rows: [
// // // //         { name: 'Farm Fresh', invoice: 'CRN001', amount: 1000 },
// // // //         { name: 'LocalMart', invoice: 'CRN002', amount: 1000 },
// // // //       ],
// // // //     },
// // // //     {
// // // //       title: 'Receivables from Employees',
// // // //       total: 1500,
// // // //       headers: [],
// // // //       rows: [],
// // // //     },
// // // //   ],
// // // //   payables: [
// // // //     {
// // // //       title: 'Commission',
// // // //       total: 750,
// // // //       headers: ['Transaction No.', 'Advance Date', 'Amount'],
// // // //       rows: [
// // // //         { name: 'TRXN001', date: '01/12/2024', amount: 500 },
// // // //         { name: 'TRXN002', date: '02/12/2024', amount: 250 },
// // // //       ],
// // // //     },
// // // //     {
// // // //       title: 'Coolie/Logistics',
// // // //       total: 500,
// // // //       headers: ['Transaction No.', 'Advance Date', 'Amount'],
// // // //       rows: [
// // // //         { name: 'TRXN001', date: '01/12/2024', amount: 300 },
// // // //         { name: 'TRXN002', date: '02/12/2024', amount: 200 },
// // // //       ],
// // // //     },
// // // //     {
// // // //       title: 'Payables to Suppliers',
// // // //       total: 3000,
// // // //       headers: [],
// // // //       rows: [],
// // // //     },
// // // //   ],
// // // // };

// // // // // Updated Custom Checkbox
// // // // const CustomCheckbox = () => (
// // // //   <label className="flex items-center cursor-pointer mr-4">
// // // //     <input type="checkbox" className="peer hidden" />
// // // //     <div className="w-4 h-4 border-2 border-[#4079ED] rounded-[4px] flex items-center justify-center peer-checked:bg-[#4079ED]">
// // // //       <svg
// // // //         className="hidden peer-checked:block w-4 h-4"
// // // //         viewBox="0 0 24 24"
// // // //         fill="none"
// // // //         stroke="white"
// // // //         strokeWidth="3"
// // // //         strokeLinecap="round"
// // // //         strokeLinejoin="round"
// // // //       >
// // // //         <path d="M9 12l2 2l4-4" />
// // // //       </svg>
// // // //     </div>
// // // //   </label>
// // // // );

// // // // // Custom Arrow Icon
// // // // const ArrowIcon = ({ isUp = false }) => (
// // // //   <svg
// // // //     width="16"
// // // //     height="16"
// // // //     viewBox="0 0 24 24"
// // // //     fill="currentColor"
// // // //     className={isUp ? "rotate-180" : ""}
// // // //     xmlns="http://www.w3.org/2000/svg"
// // // //   >
// // // //     <path d="M12 15L6 9H18L12 15Z" />
// // // //   </svg>
// // // // );

// // // // export default function TrialBalanceReport() {
// // // //   const [expandedSections, setExpandedSections] = useState({});

// // // //   const toggleSection = (title) => {
// // // //     setExpandedSections((prev) => ({ ...prev, [title]: !prev[title] }));
// // // //   };

// // // //   const renderSection = (section, isReceivable = true) => (
// // // //     <div key={section.title} className="border-b border-[#ede9e8]">
// // // //       <div
// // // //         className="flex items-center justify-between bg-[#F0F9FF] px-6 py-3 font-semibold text-sm text-gray-700 cursor-pointer border-b border-[#E8E8ED]"
// // // //         onClick={() => toggleSection(section.title)}
// // // //       >
// // // //         <div className="flex items-center gap-2">
// // // //           <ArrowIcon isUp={expandedSections[section.title]} />
// // // //           <span>{section.title}</span>
// // // //         </div>
// // // //         <span className="text-right">${section.total.toFixed(2)}</span>
// // // //       </div>
// // // //       {expandedSections[section.title] && (
// // // //         <div className="bg-[#FFFFFF] text-sm">
// // // //           <div className="flex items-center px-6 py-2 bg-[#fbfaf9] border-b border-[#E8E8ED]">
// // // //             <CustomCheckbox />
// // // //             {section.headers.map((h, idx) => (
// // // //               <div key={idx} className="min-w-[152px] font-semibold">
// // // //                 {h}
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //           {section.rows.map((row, idx) => (
// // // //             <div key={idx} className="flex items-center px-6 py-2 border-b border-[#E8E8ED]">
// // // //               <CustomCheckbox />
// // // //               {isReceivable ? (
// // // //                 <>
// // // //                   <div className="min-w-[152px]">{row.name}</div>
// // // //                   <div className="min-w-[152px]">{row.invoice}</div>
// // // //                   <div className="min-w-[152px]">${row.amount.toFixed(2)}</div>
// // // //                 </>
// // // //               ) : (
// // // //                 <>
// // // //                   <div className="min-w-[152px]">{row.name}</div>
// // // //                   <div className="min-w-[152px]">{row.date}</div>
// // // //                   <div className="min-w-[152px]">${row.amount.toFixed(2)}</div>
// // // //                 </>
// // // //               )}
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );

// // // //   const receivablesTotal = sections.receivables.reduce((sum, sec) => sum + sec.total, 0);
// // // //   const payablesTotal = sections.payables.reduce((sum, sec) => sum + sec.total, 0);

// // // //   return (
// // // //     <div className="p-3 min-h-screen font-[Urbanist]">
// // // //       <div className="bg-white rounded-[24px] shadow-md mt-5 ml-0 overflow-hidden">
// // // //         <div className="p-10">
// // // //           <div className="flex justify-between items-start mb-10">
// // // //             <div>
// // // //               <div className="text-sm text-gray-500 mb-2">Reports &gt; Trial Balance</div>
// // // //               <h1 className="text-[36px] font-bold mb-4">Trial Balance</h1>
// // // //             </div>
// // // //             <button className="bg-gray-100 hover:bg-gray-200 text-sm font-medium rounded-[12px] px-6 py-3 flex items-center gap-3">
// // // //               <PrinterIcon className="w-4 h-4" /> Print
// // // //             </button>
// // // //           </div>

// // // //           <div className="grid grid-cols-2 gap-8">
// // // //             <div>
// // // //               <div className="bg-[#F0FDFA] px-6 py-2 border-b border-[#E8E8ED] flex items-center">
// // // //                 <div className="text-green-600 font-black uppercase tracking-[0.04em] text-[24px] leading-[100%] min-w-[480px] w-[512px] h-[29px] font-[Urbanist] flex items-center justify-between">
// // // //                   RECEIVABLES
// // // //                   <span
// // // //                     className="normal-case font-normal text-[16px]"
// // // //                     style={{ color: '#27AE60' }}
// // // //                   >
// // // //                     ${receivablesTotal.toFixed(2)}
// // // //                   </span>
// // // //                 </div>
// // // //               </div>
// // // //               <div className="bg-white">
// // // //                 {sections.receivables.map((section, idx) => (
// // // //                   <div key={idx} className="mb-6">
// // // //                     {renderSection(section, true)}
// // // //                   </div>
// // // //                 ))}
// // // //               </div>
// // // //             </div>

// // // //             <div>
// // // //               <div className="bg-red-100 px-6 py-2 border-b border-[#E8E8ED] flex items-center">
// // // //                 <div className="text-red-600 font-black uppercase tracking-[0.04em] text-[24px] leading-[100%] min-w-[480px] w-[512px] h-[29px] font-[Urbanist] flex items-center justify-between">
// // // //                   PAYABLES
// // // //                   <span
// // // //                     className="normal-case font-normal text-[16px]"
// // // //                     style={{ color: '#EB5757' }}
// // // //                   >
// // // //                     ${payablesTotal.toFixed(2)}
// // // //                   </span>
// // // //                 </div>
// // // //               </div>
// // // //               <div className="bg-white">
// // // //                 {sections.payables.map((section, idx) => (
// // // //                   <div key={idx} className="mb-6">
// // // //                     {renderSection(section, false)}
// // // //                   </div>
// // // //                 ))}
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // import { useState } from 'react';
// // // // import { PrinterIcon } from 'lucide-react';

// // // // const sections = {
// // // //   receivables: [
// // // //     {
// // // //       title: 'Receivables from Customers',
// // // //       total: 5000,
// // // //       headers: ['Customer', 'Invoice No.', 'Amount'],
// // // //       rows: [
// // // //         { name: 'GreenMart', invoice: 'INV001', amount: 2000 },
// // // //         { name: 'LocalMart', invoice: 'INV002', amount: 3000 },
// // // //       ],
// // // //     },
// // // //     {
// // // //       title: 'Receivables from Suppliers',
// // // //       total: 2000,
// // // //       headers: ['Supplier', 'Credit Note No.', 'Amount'],
// // // //       rows: [
// // // //         { name: 'Farm Fresh', invoice: 'CRN001', amount: 1000 },
// // // //         { name: 'LocalMart', invoice: 'CRN002', amount: 1000 },
// // // //       ],
// // // //     },
// // // //     {
// // // //       title: 'Receivables from Employees',
// // // //       total: 1500,
// // // //       headers: [],
// // // //       rows: [],
// // // //     },
// // // //   ],
// // // //   payables: [
// // // //     {
// // // //       title: 'Commission',
// // // //       total: 750,
// // // //       headers: ['Transaction No.', 'Advance Date', 'Amount'],
// // // //       rows: [
// // // //         { name: 'TRXN001', date: '01/12/2024', amount: 500 },
// // // //         { name: 'TRXN002', date: '02/12/2024', amount: 250 },
// // // //       ],
// // // //     },
// // // //     {
// // // //       title: 'Coolie/Logistics',
// // // //       total: 500,
// // // //       headers: ['Transaction No.', 'Advance Date', 'Amount'],
// // // //       rows: [
// // // //         { name: 'TRXN001', date: '01/12/2024', amount: 300 },
// // // //         { name: 'TRXN002', date: '02/12/2024', amount: 200 },
// // // //       ],
// // // //     },
// // // //     {
// // // //       title: 'Payables to Suppliers',
// // // //       total: 3000,
// // // //       headers: [],
// // // //       rows: [],
// // // //     },
// // // //   ],
// // // // };

// // // // // Perfect Custom Checkbox
// // // // const CustomCheckbox = () => (
// // // //   <label className="flex items-center cursor-pointer mr-7">
// // // //     <input type="checkbox" className="peer hidden" />
// // // //     <div className="w-5 h-5 border-2 border-[#4079ED] rounded-[5px] flex items-center justify-center peer-checked:bg-[#4079ED] transition-all duration-200">
// // // //       <svg
// // // //         className="hidden peer-checked:block w-3.5 h-3.5"
// // // //         viewBox="0 0 24 24"
// // // //         fill="none"
// // // //         stroke="white"
// // // //         strokeWidth="3"
// // // //         strokeLinecap="round"
// // // //         strokeLinejoin="round"
// // // //       >
// // // //         <polyline points="20 6 9 17 4 12" />
// // // //       </svg>
// // // //     </div>
// // // //   </label>
// // // // );


// // // // // Custom Arrow Icon
// // // // const ArrowIcon = ({ isUp = false }) => (
// // // //   <svg
// // // //     width="16"
// // // //     height="16"
// // // //     viewBox="0 0 24 24"
// // // //     fill="currentColor"
// // // //     className={isUp ? "rotate-180" : ""}
// // // //     xmlns="http://www.w3.org/2000/svg"
// // // //   >
// // // //     <path d="M12 15L6 9H18L12 15Z" />
// // // //   </svg>
// // // // );

// // // // export default function TrialBalanceReport() {
// // // //   const [expandedSections, setExpandedSections] = useState({});

// // // //   const toggleSection = (title) => {
// // // //     setExpandedSections((prev) => ({ ...prev, [title]: !prev[title] }));
// // // //   };

// // // //   const renderSection = (section, isReceivable = true) => (
// // // //     <div key={section.title} className="border-b border-[#ede9e8]">
// // // //       <div
// // // //         className="flex items-center justify-between bg-[#F0F9FF] px-6 py-3 font-semibold text-sm text-gray-700 cursor-pointer border-b border-[#E8E8ED]"
// // // //         onClick={() => toggleSection(section.title)}
// // // //       >
// // // //         <div className="flex items-center gap-2">
// // // //           <ArrowIcon isUp={expandedSections[section.title]} />
// // // //           <span>{section.title}</span>
// // // //         </div>
// // // //         <span className="text-right">${section.total.toFixed(2)}</span>
// // // //       </div>
// // // //       {expandedSections[section.title] && (
// // // //         <div className="bg-[#FFFFFF] text-sm">
// // // //           <div className="flex items-center px-6 py-2 bg-[#fbfaf9] border-b border-[#E8E8ED]">
// // // //             <CustomCheckbox />
// // // //             {section.headers.map((h, idx) => (
// // // //               <div key={idx} className="min-w-[152px] font-semibold">
// // // //                 {h}
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //           {section.rows.map((row, idx) => (
// // // //             <div key={idx} className="flex items-center px-6 py-2 border-b border-[#E8E8ED]">
// // // //               <CustomCheckbox />
// // // //               {isReceivable ? (
// // // //                 <>
// // // //                   <div className="min-w-[152px]">{row.name}</div>
// // // //                   <div className="min-w-[152px]">{row.invoice}</div>
// // // //                   <div className="min-w-[152px]">${row.amount.toFixed(2)}</div>
// // // //                 </>
// // // //               ) : (
// // // //                 <>
// // // //                   <div className="min-w-[152px]">{row.name}</div>
// // // //                   <div className="min-w-[152px]">{row.date}</div>
// // // //                   <div className="min-w-[152px]">${row.amount.toFixed(2)}</div>
// // // //                 </>
// // // //               )}
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );

// // // //   const receivablesTotal = sections.receivables.reduce((sum, sec) => sum + sec.total, 0);
// // // //   const payablesTotal = sections.payables.reduce((sum, sec) => sum + sec.total, 0);

// // // //   return (
// // // //     <div className="p-3 min-h-screen font-[Urbanist]">
// // // //       <div className="bg-white rounded-[24px] shadow-md mt-5 ml-0 overflow-hidden">
// // // //         <div className="p-10">
// // // //           <div className="flex justify-between items-start mb-10">
// // // //             <div>
// // // //               <div className="text-sm text-gray-500 mb-2">Reports &gt; Trial Balance</div>
// // // //               <h1 className="text-[36px] font-bold mb-4">Trial Balance</h1>
// // // //             </div>
// // // //             <button className="bg-gray-100 hover:bg-gray-200 text-sm font-medium rounded-[12px] px-6 py-3 flex items-center gap-3">
// // // //               <PrinterIcon className="w-4 h-4" /> Print
// // // //             </button>
// // // //           </div>

// // // //           <div className="grid grid-cols-2 gap-8">
// // // //             <div>
// // // //               <div className="bg-[#F0FDFA] px-6 py-2 border-b border-[#E8E8ED] flex items-center">
// // // //                 <div className="text-green-600 font-black uppercase tracking-[0.04em] text-[24px] leading-[100%] min-w-[480px] w-[512px] h-[29px] font-[Urbanist] flex items-center justify-between">
// // // //                   RECEIVABLES
// // // //                   <span
// // // //                     className="normal-case font-normal text-[16px]"
// // // //                     style={{ color: '#27AE60' }}
// // // //                   >
// // // //                     ${receivablesTotal.toFixed(2)}
// // // //                   </span>
// // // //                 </div>
// // // //               </div>
// // // //               <div className="bg-white">
// // // //                 {sections.receivables.map((section, idx) => (
// // // //                   <div key={idx} className="mb-6">
// // // //                     {renderSection(section, true)}
// // // //                   </div>
// // // //                 ))}
// // // //               </div>
// // // //             </div>

// // // //             <div>
// // // //               <div className="bg-red-100 px-6 py-2 border-b border-[#E8E8ED] flex items-center">
// // // //                 <div className="text-red-600 font-black uppercase tracking-[0.04em] text-[24px] leading-[100%] min-w-[480px] w-[512px] h-[29px] font-[Urbanist] flex items-center justify-between">
// // // //                   PAYABLES
// // // //                   <span
// // // //                     className="normal-case font-normal text-[16px]"
// // // //                     style={{ color: '#EB5757' }}
// // // //                   >
// // // //                     ${payablesTotal.toFixed(2)}
// // // //                   </span>
// // // //                 </div>
// // // //               </div>
// // // //               <div className="bg-white">
// // // //                 {sections.payables.map((section, idx) => (
// // // //                   <div key={idx} className="mb-6">
// // // //                     {renderSection(section, false)}
// // // //                   </div>
// // // //                 ))}
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }


// // // import { useState } from 'react';
// // // import { PrinterIcon } from 'lucide-react';

// // // const sections = {
// // //   receivables: [
// // //     {
// // //       title: 'Receivables from Customers',
// // //       total: 5000,
// // //       headers: ['Customer', 'Invoice No.', 'Amount'],
// // //       rows: [
// // //         { name: 'GreenMart', invoice: 'INV001', amount: 2000 },
// // //         { name: 'LocalMart', invoice: 'INV002', amount: 3000 },
// // //       ],
// // //     },
// // //     {
// // //       title: 'Receivables from Suppliers',
// // //       total: 2000,
// // //       headers: ['Supplier', 'Credit Note No.', 'Amount'],
// // //       rows: [
// // //         { name: 'Farm Fresh', invoice: 'CRN001', amount: 1000 },
// // //         { name: 'LocalMart', invoice: 'CRN002', amount: 1000 },
// // //       ],
// // //     },
// // //     {
// // //       title: 'Receivables from Employees',
// // //       total: 1500,
// // //       headers: [],
// // //       rows: [],
// // //     },
// // //   ],
// // //   payables: [
// // //     {
// // //       title: 'Commission',
// // //       total: 750,
// // //       headers: ['Transaction No.', 'Advance Date', 'Amount'],
// // //       rows: [
// // //         { name: 'TRXN001', date: '01/12/2024', amount: 500 },
// // //         { name: 'TRXN002', date: '02/12/2024', amount: 250 },
// // //       ],
// // //     },
// // //     {
// // //       title: 'Coolie/Logistics',
// // //       total: 500,
// // //       headers: ['Transaction No.', 'Advance Date', 'Amount'],
// // //       rows: [
// // //         { name: 'TRXN001', date: '01/12/2024', amount: 300 },
// // //         { name: 'TRXN002', date: '02/12/2024', amount: 200 },
// // //       ],
// // //     },
// // //     {
// // //       title: 'Payables to Suppliers',
// // //       total: 3000,
// // //       headers: [],
// // //       rows: [],
// // //     },
// // //   ],
// // // };

// // // // Custom Arrow Icon (filled triangle)
// // // const ArrowIcon = ({ isUp = false }) => (
// // //   <svg
// // //     width="16"
// // //     height="16"
// // //     viewBox="0 0 24 24"
// // //     fill="currentColor"
// // //     className={isUp ? "rotate-180" : ""}
// // //     xmlns="http://www.w3.org/2000/svg"
// // //   >
// // //     <path d="M12 15L6 9H18L12 15Z" />
// // //   </svg>
// // // );

// // // export default function TrialBalanceReport() {
// // //   const [expandedSections, setExpandedSections] = useState({});

// // //   const toggleSection = (title) => {
// // //     setExpandedSections((prev) => ({ ...prev, [title]: !prev[title] }));
// // //   };

// // //   const renderSection = (section, isReceivable = true) => (
// // //     <div key={section.title} className="border-b border-[#ede9e8]">
// // //       <div
// // //         className="flex items-center justify-between bg-[#F0F9FF] px-6 py-3 font-semibold text-sm text-gray-700 cursor-pointer border-b border-[#E8E8ED]"
// // //         onClick={() => toggleSection(section.title)}
// // //       >
// // //         <div className="flex items-center gap-2">
// // //           <ArrowIcon isUp={expandedSections[section.title]} />
// // //           <span>{section.title}</span>
// // //         </div>
// // //         <span className="text-right">${section.total.toFixed(2)}</span>
// // //       </div>
// // //       {expandedSections[section.title] && (
// // //         <div className="bg-[#FFFFFF] text-sm">
// // //           <div className="flex items-center px-6 py-2 bg-[#fbfaf9] border-b border-[#E8E8ED]">
// // //             <input
// // //               type="checkbox"
// // //               className="mr-4 w-4 h-4 accent-[#4079ED] border-2 border-[#4079ED] rounded-full"
// // //             />
// // //             {section.headers.map((h, idx) => (
// // //               <div key={idx} className="min-w-[152px] font-semibold">
// // //                 {h}
// // //               </div>
// // //             ))}
// // //           </div>
// // //           {section.rows.map((row, idx) => (
// // //             <div key={idx} className="flex items-center px-6 py-2 border-b border-[#E8E8ED]">
// // //               <input
// // //                 type="checkbox"
// // //                 className="mr-4 w-4 h-4 accent-[#4079ED] border-2 border-[#4079ED] rounded-full"
// // //               />
// // //               {isReceivable ? (
// // //                 <>
// // //                   <div className="min-w-[152px]">{row.name}</div>
// // //                   <div className="min-w-[152px]">{row.invoice}</div>
// // //                   <div className="min-w-[152px]">${row.amount.toFixed(2)}</div>
// // //                 </>
// // //               ) : (
// // //                 <>
// // //                   <div className="min-w-[152px]">{row.name}</div>
// // //                   <div className="min-w-[152px]">{row.date}</div>
// // //                   <div className="min-w-[152px]">${row.amount.toFixed(2)}</div>
// // //                 </>
// // //               )}
// // //             </div>
// // //           ))}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );

// // //   const receivablesTotal = sections.receivables.reduce((sum, sec) => sum + sec.total, 0);
// // //   const payablesTotal = sections.payables.reduce((sum, sec) => sum + sec.total, 0);

// // //   return (
// // //     <div className="p-3 min-h-screen font-[Urbanist]">
// // //       <div className="bg-white rounded-[24px] shadow-md mt-5 ml-0 overflow-hidden">
// // //         <div className="p-10">
// // //           <div className="flex justify-between items-start mb-10">
// // //             <div>
// // //               <div className="text-sm text-gray-500 mb-2">Reports &gt; Trial Balance</div>
// // //               <h1 className="text-[36px] font-bold mb-4">Trial Balance</h1>
// // //             </div>
// // //             <button className="bg-gray-100 hover:bg-gray-200 text-sm font-medium rounded-[12px] px-6 py-3 flex items-center gap-3">
// // //               <PrinterIcon className="w-4 h-4" /> Print
// // //             </button>
// // //           </div>

// // //           <div className="grid grid-cols-2 gap-8">
// // //             <div>
// // //               <div className="bg-[#F0FDFA] px-6 py-2 border-b border-[#E8E8ED] flex items-center">
// // //                 <div className="text-green-600 font-black uppercase tracking-[0.04em] text-[24px] leading-[100%] min-w-[480px] w-[512px] h-[29px] font-[Urbanist] flex items-center justify-between">
// // //                   RECEIVABLES
// // //                   <span
// // //                     className="normal-case font-normal text-[16px]"
// // //                     style={{ color: '#27AE60' }}
// // //                   >
// // //                     $10,000.00
// // //                   </span>
// // //                 </div>
// // //               </div>
// // //               <div className="bg-white">
// // //                 {sections.receivables.map((section, idx) => (
// // //                   <div key={idx} className="mb-6">
// // //                     {renderSection(section, true)}
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             </div>

// // //             <div>
// // //               <div className="bg-red-100 px-6 py-2 border-b border-[#E8E8ED] flex items-center">
// // //                 <div className="text-red-600 font-black uppercase tracking-[0.04em] text-[24px] leading-[100%] min-w-[480px] w-[512px] h-[29px] font-[Urbanist] flex items-center justify-between">
// // //                   PAYABLES
// // //                   <span
// // //                     className="normal-case font-normal text-[16px]"
// // //                     style={{ color: '#EB5757' }}
// // //                   >
// // //                     $10,000.00
// // //                   </span>
// // //                 </div>
// // //               </div>
// // //               <div className="bg-white">
// // //                 {sections.payables.map((section, idx) => (
// // //                   <div key={idx} className="mb-6">
// // //                     {renderSection(section, false)}
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           </div>

// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // import { useState } from 'react';
// // // import { PrinterIcon, CalendarIcon } from 'lucide-react';

// // // const sections = {
// // //   receivables: [
// // //     {
// // //       title: 'Receivables from Customers',
// // //       total: 5000,
// // //       headers: ['Customer', 'Invoice No.', 'Amount'],
// // //       rows: [
// // //         { name: 'GreenMart', invoice: 'INV001', amount: 2000 },
// // //         { name: 'LocalMart', invoice: 'INV002', amount: 3000 },
// // //       ],
// // //     },
// // //     {
// // //       title: 'Receivables from Suppliers',
// // //       total: 2000,
// // //       headers: ['Supplier', 'Credit Note No.', 'Amount'],
// // //       rows: [
// // //         { name: 'Farm Fresh', invoice: 'CRN001', amount: 1000 },
// // //         { name: 'LocalMart', invoice: 'CRN002', amount: 1000 },
// // //       ],
// // //     },
// // //     {
// // //       title: 'Receivables from Employees',
// // //       total: 1500,
// // //       headers: [],
// // //       rows: [],
// // //     },
// // //   ],
// // //   payables: [
// // //     {
// // //       title: 'Commission',
// // //       total: 750,
// // //       headers: ['Transaction No.', 'Advance Date', 'Amount'],
// // //       rows: [
// // //         { name: 'TRXN001', date: '01/12/2024', amount: 500 },
// // //         { name: 'TRXN002', date: '02/12/2024', amount: 250 },
// // //       ],
// // //     },
// // //     {
// // //       title: 'Coolie/Logistics',
// // //       total: 500,
// // //       headers: ['Transaction No.', 'Advance Date', 'Amount'],
// // //       rows: [
// // //         { name: 'TRXN001', date: '01/12/2024', amount: 300 },
// // //         { name: 'TRXN002', date: '02/12/2024', amount: 200 },
// // //       ],
// // //     },
// // //     {
// // //       title: 'Payables to Suppliers',
// // //       total: 3000,
// // //       headers: [],
// // //       rows: [],
// // //     },
// // //   ],
// // // };

// // // // Custom Arrow Icon
// // // const ArrowIcon = ({ isUp = false }) => (
// // //   <svg
// // //     width="16"
// // //     height="16"
// // //     viewBox="0 0 24 24"
// // //     fill="currentColor"
// // //     className={isUp ? "rotate-180" : ""}
// // //     xmlns="http://www.w3.org/2000/svg"
// // //   >
// // //     <path d="M12 15L6 9H18L12 15Z" />
// // //   </svg>
// // // );

// // // export default function TrialBalanceReport() {
// // //   const [expandedSections, setExpandedSections] = useState({});
// // //   const [startDate, setStartDate] = useState('');
// // //   const [endDate, setEndDate] = useState('');

// // //   const toggleSection = (title) => {
// // //     setExpandedSections((prev) => ({ ...prev, [title]: !prev[title] }));
// // //   };

// // //   const renderSection = (section, isReceivable = true) => (
// // //     <div key={section.title} className="border-b border-[#ede9e8]">
// // //       <div
// // //         className="flex items-center justify-between bg-[#F0F9FF] px-6 py-3 font-semibold text-sm text-gray-700 cursor-pointer border-b border-[#E8E8ED]"
// // //         onClick={() => toggleSection(section.title)}
// // //       >
// // //         <div className="flex items-center gap-2">
// // //           <ArrowIcon isUp={expandedSections[section.title]} />
// // //           <span>{section.title}</span>
// // //         </div>
// // //         <span className="text-right">${section.total.toFixed(2)}</span>
// // //       </div>
// // //       {expandedSections[section.title] && (
// // //         <div className="bg-[#FFFFFF] text-sm">
// // //           <div className="flex items-center px-6 py-2 bg-[#fbfaf9] border-b border-[#E8E8ED]">
// // //             <input
// // //               type="checkbox"
// // //               className="mr-4 w-4 h-4 accent-[#4079ED] border-2 border-[#4079ED] rounded-full"
// // //             />
// // //             {section.headers.map((h, idx) => (
// // //               <div key={idx} className="min-w-[152px] font-semibold">
// // //                 {h}
// // //               </div>
// // //             ))}
// // //           </div>
// // //           {section.rows.map((row, idx) => (
// // //             <div key={idx} className="flex items-center px-6 py-2 border-b border-[#E8E8ED]">
// // //               <input
// // //                 type="checkbox"
// // //                 className="mr-4 w-4 h-4 accent-[#4079ED] border-2 border-[#4079ED] rounded-full"
// // //               />
// // //               {isReceivable ? (
// // //                 <>
// // //                   <div className="min-w-[152px]">{row.name}</div>
// // //                   <div className="min-w-[152px]">{row.invoice}</div>
// // //                   <div className="min-w-[152px]">${row.amount.toFixed(2)}</div>
// // //                 </>
// // //               ) : (
// // //                 <>
// // //                   <div className="min-w-[152px]">{row.name}</div>
// // //                   <div className="min-w-[152px]">{row.date}</div>
// // //                   <div className="min-w-[152px]">${row.amount.toFixed(2)}</div>
// // //                 </>
// // //               )}
// // //             </div>
// // //           ))}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );

// // //   const receivablesTotal = sections.receivables.reduce((sum, sec) => sum + sec.total, 0);
// // //   const payablesTotal = sections.payables.reduce((sum, sec) => sum + sec.total, 0);

// // //   return (
// // //     <div className="p-3 min-h-screen font-[Urbanist]">
// // //       <div className="bg-white rounded-[24px] shadow-md mt-5 ml-0 overflow-hidden">
// // //         <div className="p-10">
// // //           {/* Header */}
// // //           <div className="flex justify-between items-start mb-10">
// // //             <div>
// // //               <div className="text-sm text-gray-500 mb-2">Reports &gt; Trial Balance</div>
// // //               <h1 className="text-[36px] font-bold mb-4">Trial Balance</h1>
// // //             </div>

// // //             {/* Right side (Print + Date Range) */}
// // //             <div className="flex flex-col items-end gap-4">
// // //               <button className="bg-gray-100 hover:bg-gray-200 text-sm font-medium rounded-[12px] px-6 py-3 flex items-center gap-3">
// // //                 <PrinterIcon className="w-4 h-4" /> Print
// // //               </button>
              
// // //               {/* Date Range Inputs */}
// // //               <div className="flex items-center gap-2">
// // //                 <div className="text-sm text-gray-400 mr-2">Date Range</div>
// // //                 <div className="relative">
// // //                   <input
// // //                     type="text"
// // //                     placeholder="DD/MM/YYYY"
// // //                     value={startDate}
// // //                     onChange={(e) => setStartDate(e.target.value)}
// // //                     className="rounded-[12px] border border-[#E8E8ED] px-4 py-2 text-gray-500 placeholder-gray-300 w-[160px] text-sm"
// // //                   />
// // //                   <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
// // //                 </div>
// // //                 <div className="text-sm text-gray-400 mx-1">to</div>
// // //                 <div className="relative">
// // //                   <input
// // //                     type="text"
// // //                     placeholder="DD/MM/YYYY"
// // //                     value={endDate}
// // //                     onChange={(e) => setEndDate(e.target.value)}
// // //                     className="rounded-[12px] border border-[#E8E8ED] px-4 py-2 text-gray-500 placeholder-gray-300 w-[160px] text-sm"
// // //                   />
// // //                   <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
// // //                 </div>
// // //               </div>
              
// // //             </div>
// // //           </div>

// // //           {/* Receivables + Payables */}
// // //           <div className="grid grid-cols-2 gap-8">
// // //             {/* Receivables */}
// // //             <div>
// // //               <div className="bg-[#F0FDFA] px-6 py-2 border-b border-[#E8E8ED] flex items-center">
// // //                 <div className="text-green-600 font-black uppercase tracking-[0.04em] text-[24px] leading-[100%] min-w-[480px] w-[512px] h-[29px] font-[Urbanist] flex items-center justify-between">
// // //                   RECEIVABLES
// // //                   <span
// // //                     className="normal-case font-normal text-[16px]"
// // //                     style={{ color: '#27AE60' }}
// // //                   >
// // //                     ${receivablesTotal.toFixed(2)}
// // //                   </span>
// // //                 </div>
// // //               </div>
// // //               <div className="bg-white">
// // //                 {sections.receivables.map((section, idx) => (
// // //                   <div key={idx} className="mb-6">
// // //                     {renderSection(section, true)}
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             </div>

// // //             {/* Payables */}
// // //             <div>
// // //               <div className="bg-red-100 px-6 py-2 border-b border-[#E8E8ED] flex items-center">
// // //                 <div className="text-red-600 font-black uppercase tracking-[0.04em] text-[24px] leading-[100%] min-w-[480px] w-[512px] h-[29px] font-[Urbanist] flex items-center justify-between">
// // //                   PAYABLES
// // //                   <span
// // //                     className="normal-case font-normal text-[16px]"
// // //                     style={{ color: '#EB5757' }}
// // //                   >
// // //                     ${payablesTotal.toFixed(2)}
// // //                   </span>
// // //                 </div>
// // //               </div>
// // //               <div className="bg-white">
// // //                 {sections.payables.map((section, idx) => (
// // //                   <div key={idx} className="mb-6">
// // //                     {renderSection(section, false)}
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           </div>

// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import { useState, useRef } from 'react';
// // import DatePicker from 'react-datepicker';
// // import 'react-datepicker/dist/react-datepicker.css';
// // import { CalendarIcon } from 'lucide-react';

// // const sections = {
// //   receivables: [
// //     {
// //       title: 'Receivables from Customers',
// //       total: 5000,
// //       headers: ['Customer', 'Invoice No.', 'Amount'],
// //       rows: [
// //         { name: 'GreenMart', invoice: 'INV001', amount: 2000 },
// //         { name: 'LocalMart', invoice: 'INV002', amount: 3000 },
// //       ],
// //     },
// //     {
// //       title: 'Receivables from Suppliers',
// //       total: 2000,
// //       headers: ['Supplier', 'Credit Note No.', 'Amount'],
// //       rows: [
// //         { name: 'Farm Fresh', invoice: 'CRN001', amount: 1000 },
// //         { name: 'LocalMart', invoice: 'CRN002', amount: 1000 },
// //       ],
// //     },
// //     {
// //       title: 'Receivables from Employees',
// //       total: 1500,
// //       headers: [],
// //       rows: [],
// //     },
// //   ],
// //   payables: [
// //     {
// //       title: 'Commission',
// //       total: 750,
// //       headers: ['Transaction No.', 'Advance Date', 'Amount'],
// //       rows: [
// //         { name: 'TRXN001', date: '01/12/2024', amount: 500 },
// //         { name: 'TRXN002', date: '02/12/2024', amount: 250 },
// //       ],
// //     },
// //     {
// //       title: 'Coolie/Logistics',
// //       total: 500,
// //       headers: ['Transaction No.', 'Advance Date', 'Amount'],
// //       rows: [
// //         { name: 'TRXN001', date: '01/12/2024', amount: 300 },
// //         { name: 'TRXN002', date: '02/12/2024', amount: 200 },
// //       ],
// //     },
// //     {
// //       title: 'Payables to Suppliers',
// //       total: 3000,
// //       headers: [],
// //       rows: [],
// //     },
// //   ],
// // };

// // const ArrowIcon = ({ isUp = false }) => (
// //   <svg
// //     width="16"
// //     height="16"
// //     viewBox="0 0 24 24"
// //     fill="currentColor"
// //     className={isUp ? "rotate-180" : ""}
// //     xmlns="http://www.w3.org/2000/svg"
// //   >
// //     <path d="M12 15L6 9H18L12 15Z" />
// //   </svg>
// // );

// // export default function TrialBalanceReport() {
// //   const [expandedSections, setExpandedSections] = useState({});
// //   const [startDate, setStartDate] = useState(null);
// //   const [endDate, setEndDate] = useState(null);

// //   const startDatePickerRef = useRef(null);
// //   const endDatePickerRef = useRef(null);

// //   const toggleSection = (title) => {
// //     setExpandedSections((prev) => ({ ...prev, [title]: !prev[title] }));
// //   };

// //   const renderSection = (section, isReceivable = true) => (
// //     <div key={section.title} className="border-b border-[#ede9e8]">
// //       <div
// //         className="flex items-center justify-between bg-[#F0F9FF] px-6 py-3 font-semibold text-sm text-gray-700 cursor-pointer border-b border-[#E8E8ED]"
// //         onClick={() => toggleSection(section.title)}
// //       >
// //         <div className="flex items-center gap-2">
// //           <ArrowIcon isUp={expandedSections[section.title]} />
// //           <span>{section.title}</span>
// //         </div>
// //         <span className="text-right">${section.total.toFixed(2)}</span>
// //       </div>
// //       {expandedSections[section.title] && (
// //         <div className="bg-[#FFFFFF] text-sm">
// //           <div className="flex items-center px-6 py-2 bg-[#fbfaf9] border-b border-[#E8E8ED]">
// //             <input
// //               type="checkbox"
// //               className="mr-4 w-4 h-4 accent-[#4079ED] border-2 border-[#4079ED] rounded-full"
// //             />
// //             {section.headers.map((h, idx) => (
// //               <div key={idx} className="min-w-[152px] font-semibold">
// //                 {h}
// //               </div>
// //             ))}
// //           </div>
// //           {section.rows.map((row, idx) => (
// //             <div key={idx} className="flex items-center px-6 py-2 border-b border-[#E8E8ED]">
// //               <input
// //                 type="checkbox"
// //                 className="mr-4 w-4 h-4 accent-[#4079ED] border-2 border-[#4079ED] rounded-full"
// //               />
// //               {isReceivable ? (
// //                 <>
// //                   <div className="min-w-[152px]">{row.name}</div>
// //                   <div className="min-w-[152px]">{row.invoice}</div>
// //                   <div className="min-w-[152px]">${row.amount.toFixed(2)}</div>
// //                 </>
// //               ) : (
// //                 <>
// //                   <div className="min-w-[152px]">{row.name}</div>
// //                   <div className="min-w-[152px]">{row.date}</div>
// //                   <div className="min-w-[152px]">${row.amount.toFixed(2)}</div>
// //                 </>
// //               )}
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );

// //   const receivablesTotal = sections.receivables.reduce((sum, sec) => sum + sec.total, 0);
// //   const payablesTotal = sections.payables.reduce((sum, sec) => sum + sec.total, 0);

// //   return (
// //     <div className="p-3 min-h-screen font-[Urbanist]">
// //       <div className="bg-white rounded-[24px] shadow-md mt-5 ml-0 overflow-hidden">
// //         <div className="p-10">
// //           {/* Header */}
// //           <div className="flex justify-between items-start mb-10">
// //             <div>
// //               <div className="text-sm text-gray-500 mb-2">Reports &gt; Trial Balance</div>
// //               <h1 className="text-[36px] font-bold mb-4">Trial Balance</h1>
// //             </div>

// //             {/* Right side (Date Range) */}
// //             <div className="flex flex-col items-end gap-4">
// //               {/* Date Range Inputs */}
// //               <div className="flex items-center gap-2">
// //                 <div className="text-sm text-gray-400 mr-2">Date Range</div>
// //                 {/* Start Date */}
// //                 <div className="relative">
// //                   <DatePicker
// //                     selected={startDate}
// //                     onChange={(date) => setStartDate(date)}
// //                     dateFormat="dd/MM/yyyy"
// //                     customInput={
// //                       <input
// //                         type="text"
// //                         placeholder="DD/MM/YYYY"
// //                         className="rounded-[12px] border border-[#E8E8ED] px-4 py-2 text-gray-500 placeholder-gray-300 w-[160px] text-sm"
// //                       />
// //                     }
// //                     ref={startDatePickerRef}
// //                   />
// //                   <CalendarIcon
// //                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 cursor-pointer"
// //                     onClick={() => startDatePickerRef.current.setOpen(true)}
// //                   />
// //                 </div>

// //                 <div className="text-sm text-gray-400 mx-1">to</div>

// //                 {/* End Date */}
// //                 <div className="relative">
// //                   <DatePicker
// //                     selected={endDate}
// //                     onChange={(date) => setEndDate(date)}
// //                     dateFormat="dd/MM/yyyy"
// //                     customInput={
// //                       <input
// //                         type="text"
// //                         placeholder="DD/MM/YYYY"
// //                         className="rounded-[12px] border border-[#E8E8ED] px-4 py-2 text-gray-500 placeholder-gray-300 w-[160px] text-sm"
// //                       />
// //                     }
// //                     ref={endDatePickerRef}
// //                   />
// //                   <CalendarIcon
// //                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 cursor-pointer"
// //                     onClick={() => endDatePickerRef.current.setOpen(true)}
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Receivables + Payables */}
// //           <div className="grid grid-cols-2 gap-8">
// //             {/* Receivables */}
// //             <div>
// //               <div className="bg-[#F0FDFA] px-6 py-2 border-b border-[#E8E8ED] flex items-center">
// //                 <div className="text-green-600 font-black uppercase tracking-[0.04em] text-[24px] leading-[100%] min-w-[480px] w-[512px] h-[29px] font-[Urbanist] flex items-center justify-between">
// //                   RECEIVABLES
// //                   <span
// //                     className="normal-case font-normal text-[16px]"
// //                     style={{ color: '#27AE60' }}
// //                   >
// //                     ${receivablesTotal.toFixed(2)}
// //                   </span>
// //                 </div>
// //               </div>
// //               <div className="bg-white">
// //                 {sections.receivables.map((section, idx) => (
// //                   <div key={idx} className="mb-6">
// //                     {renderSection(section, true)}
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Payables */}
// //             <div>
// //               <div className="bg-red-100 px-6 py-2 border-b border-[#E8E8ED] flex items-center">
// //                 <div className="text-red-600 font-black uppercase tracking-[0.04em] text-[24px] leading-[100%] min-w-[480px] w-[512px] h-[29px] font-[Urbanist] flex items-center justify-between">
// //                   PAYABLES
// //                   <span
// //                     className="normal-case font-normal text-[16px]"
// //                     style={{ color: '#EB5757' }}
// //                   >
// //                     ${payablesTotal.toFixed(2)}
// //                   </span>
// //                 </div>
// //               </div>
// //               <div className="bg-white">
// //                 {sections.payables.map((section, idx) => (
// //                   <div key={idx} className="mb-6">
// //                     {renderSection(section, false)}
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>

// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// import { useState, useRef } from 'react';
// import { PrinterIcon, CalendarIcon } from 'lucide-react';

// // Dummy sections data
// const sections = {
//   receivables: [
//     {
//       title: 'Receivables from Customers',
//       total: 5000,
//       headers: ['Customer', 'Invoice No.', 'Amount'],
//       rows: [
//         { name: 'GreenMart', invoice: 'INV001', amount: 2000 },
//         { name: 'LocalMart', invoice: 'INV002', amount: 3000 },
//       ],
//     },
//     {
//       title: 'Receivables from Suppliers',
//       total: 2000,
//       headers: ['Supplier', 'Credit Note No.', 'Amount'],
//       rows: [
//         { name: 'Farm Fresh', invoice: 'CRN001', amount: 1000 },
//         { name: 'LocalMart', invoice: 'CRN002', amount: 1000 },
//       ],
//     },
//     {
//       title: 'Receivables from Employees',
//       total: 1500,
//       headers: [],
//       rows: [],
//     },
//   ],
//   payables: [
//     {
//       title: 'Commission',
//       total: 750,
//       headers: ['Transaction No.', 'Advance Date', 'Amount'],
//       rows: [
//         { name: 'TRXN001', date: '01/12/2024', amount: 500 },
//         { name: 'TRXN002', date: '02/12/2024', amount: 250 },
//       ],
//     },
//     {
//       title: 'Coolie/Logistics',
//       total: 500,
//       headers: ['Transaction No.', 'Advance Date', 'Amount'],
//       rows: [
//         { name: 'TRXN001', date: '01/12/2024', amount: 300 },
//         { name: 'TRXN002', date: '02/12/2024', amount: 200 },
//       ],
//     },
//     {
//       title: 'Payables to Suppliers',
//       total: 3000,
//       headers: [],
//       rows: [],
//     },
//   ],
// };

// // Custom Arrow Icon
// const ArrowIcon = ({ isUp = false }) => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="currentColor"
//     className={isUp ? "rotate-180" : ""}
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path d="M12 15L6 9H18L12 15Z" />
//   </svg>
// );

// export default function TrialBalanceReport() {
//   const [expandedSections, setExpandedSections] = useState({});
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   const startDateRef = useRef(null);
//   const endDateRef = useRef(null);

//   const toggleSection = (title) => {
//     setExpandedSections((prev) => ({ ...prev, [title]: !prev[title] }));
//   };

//   const renderSection = (section, isReceivable = true) => (
//     <div key={section.title} className="border-b border-[#ede9e8]">
//       <div
//         className="flex items-center justify-between bg-[#F0F9FF] px-6 py-3 font-semibold text-sm text-gray-700 cursor-pointer border-b border-[#E8E8ED]"
//         onClick={() => toggleSection(section.title)}
//       >
//         <div className="flex items-center gap-2">
//           <ArrowIcon isUp={expandedSections[section.title]} />
//           <span>{section.title}</span>
//         </div>
//         <span className="text-right">${section.total.toFixed(2)}</span>
//       </div>
//       {expandedSections[section.title] && (
//         <div className="bg-[#FFFFFF] text-sm">
//           <div className="flex items-center px-6 py-2 bg-[#fbfaf9] border-b border-[#E8E8ED]">
//             <input
//               type="checkbox"
//               className="mr-4 w-4 h-4 accent-[#4079ED] border-2 border-[#4079ED] rounded-full"
//             />
//             {section.headers.map((h, idx) => (
//               <div key={idx} className="min-w-[152px] font-semibold">
//                 {h}
//               </div>
//             ))}
//           </div>
//           {section.rows.map((row, idx) => (
//             <div key={idx} className="flex items-center px-6 py-2 border-b border-[#E8E8ED]">
//               <input
//                 type="checkbox"
//                 className="mr-4 w-4 h-4 accent-[#4079ED] border-2 border-[#4079ED] rounded-full"
//               />
//               {isReceivable ? (
//                 <>
//                   <div className="min-w-[152px]">{row.name}</div>
//                   <div className="min-w-[152px]">{row.invoice}</div>
//                   <div className="min-w-[152px]">${row.amount.toFixed(2)}</div>
//                 </>
//               ) : (
//                 <>
//                   <div className="min-w-[152px]">{row.name}</div>
//                   <div className="min-w-[152px]">{row.date}</div>
//                   <div className="min-w-[152px]">${row.amount.toFixed(2)}</div>
//                 </>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );

//   const receivablesTotal = sections.receivables.reduce((sum, sec) => sum + sec.total, 0);
//   const payablesTotal = sections.payables.reduce((sum, sec) => sum + sec.total, 0);

//   return (
//     <div className="p-3 min-h-screen font-[Urbanist]">
//       <div className="bg-white rounded-[24px] shadow-md mt-5 ml-0 overflow-hidden">
//         <div className="p-10">
//           {/* Header */}
//           <div className="flex justify-between items-start mb-10">
//             <div>
//               <div className="text-sm text-gray-500 mb-2">Reports &gt; Trial Balance</div>
//               <h1 className="text-[36px] font-bold mb-4">Trial Balance</h1>
//             </div>

//             {/* Right side (Print + Date Range) */}
//             <div className="flex flex-col items-end gap-4">
//               <button className="bg-gray-100 hover:bg-gray-200 text-sm font-medium rounded-[12px] px-6 py-3 flex items-center gap-3">
//                 <PrinterIcon className="w-4 h-4" /> Print
//               </button>

//               {/* Date Range Inputs */}
//               <div className="flex items-center gap-2">
//                 <div className="text-sm text-gray-400 mr-2">Date Range</div>
//                 <div className="relative">
//                   <input
//                     ref={startDateRef}
//                     type="date"
//                     value={startDate}
//                     onChange={(e) => setStartDate(e.target.value)}
//                     className="rounded-[12px] border border-[#E8E8ED] px-4 py-2 text-gray-500 placeholder-gray-300 w-[160px] text-sm"
//                   />
//                   <CalendarIcon
//                     onClick={() => startDateRef.current.showPicker()}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 cursor-pointer"
//                   />
//                 </div>
//                 <div className="text-sm text-gray-400 mx-1">to</div>
//                 <div className="relative">
//                   <input
//                     ref={endDateRef}
//                     type="date"
//                     value={endDate}
//                     onChange={(e) => setEndDate(e.target.value)}
//                     className="rounded-[12px] border border-[#E8E8ED] px-4 py-2 text-gray-500 placeholder-gray-300 w-[160px] text-sm"
//                   />
//                   <CalendarIcon
//                     onClick={() => endDateRef.current.showPicker()}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 cursor-pointer"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Receivables + Payables */}
//           <div className="grid grid-cols-2 gap-8">
//             {/* Receivables */}
//             <div>
//               <div className="bg-[#F0FDFA] px-6 py-2 border-b border-[#E8E8ED] flex items-center">
//                 <div className="text-green-600 font-black uppercase tracking-[0.04em] text-[24px] leading-[100%] min-w-[480px] w-[512px] h-[29px] font-[Urbanist] flex items-center justify-between">
//                   RECEIVABLES
//                   <span
//                     className="normal-case font-normal text-[16px]"
//                     style={{ color: '#27AE60' }}
//                   >
//                     ${receivablesTotal.toFixed(2)}
//                   </span>
//                 </div>
//               </div>
//               <div className="bg-white">
//                 {sections.receivables.map((section, idx) => (
//                   <div key={idx} className="mb-6">
//                     {renderSection(section, true)}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Payables */}
//             <div>
//               <div className="bg-red-100 px-6 py-2 border-b border-[#E8E8ED] flex items-center">
//                 <div className="text-red-600 font-black uppercase tracking-[0.04em] text-[24px] leading-[100%] min-w-[480px] w-[512px] h-[29px] font-[Urbanist] flex items-center justify-between">
//                   PAYABLES
//                   <span
//                     className="normal-case font-normal text-[16px]"
//                     style={{ color: '#EB5757' }}
//                   >
//                     ${payablesTotal.toFixed(2)}
//                   </span>
//                 </div>
//               </div>
//               <div className="bg-white">
//                 {sections.payables.map((section, idx) => (
//                   <div key={idx} className="mb-6">
//                     {renderSection(section, false)}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useRef } from 'react';
// import { PrinterIcon, CalendarIcon } from 'lucide-react';

// // Dummy sections data
// const sections = {
//   receivables: [
//     {
//       title: 'Receivables from Customers',
//       total: 5000,
//       headers: ['Customer', 'Invoice No.', 'Amount'],
//       rows: [
//         { name: 'GreenMart', invoice: 'INV001', amount: 2000 },
//         { name: 'LocalMart', invoice: 'INV002', amount: 3000 },
//       ],
//     },
//     {
//       title: 'Receivables from Suppliers',
//       total: 2000,
//       headers: ['Supplier', 'Credit Note No.', 'Amount'],
//       rows: [
//         { name: 'Farm Fresh', invoice: 'CRN001', amount: 1000 },
//         { name: 'LocalMart', invoice: 'CRN002', amount: 1000 },
//       ],
//     },
//     {
//       title: 'Receivables from Employees',
//       total: 1500,
//       headers: [],
//       rows: [],
//     },
//   ],
//   payables: [
//     {
//       title: 'Commission',
//       total: 750,
//       headers: ['Transaction No.', 'Advance Date', 'Amount'],
//       rows: [
//         { name: 'TRXN001', date: '01/12/2024', amount: 500 },
//         { name: 'TRXN002', date: '02/12/2024', amount: 250 },
//       ],
//     },
//     {
//       title: 'Coolie/Logistics',
//       total: 500,
//       headers: ['Transaction No.', 'Advance Date', 'Amount'],
//       rows: [
//         { name: 'TRXN001', date: '01/12/2024', amount: 300 },
//         { name: 'TRXN002', date: '02/12/2024', amount: 200 },
//       ],
//     },
//     {
//       title: 'Payables to Suppliers',
//       total: 3000,
//       headers: [],
//       rows: [],
//     },
//   ],
// };

// // Custom Arrow Icon
// const ArrowIcon = ({ isUp = false }) => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="currentColor"
//     className={isUp ? "rotate-180" : ""}
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path d="M12 15L6 9H18L12 15Z" />
//   </svg>
// );

// export default function TrialBalanceReport() {
//   const [expandedSections, setExpandedSections] = useState({});
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   const startDateRef = useRef(null);
//   const endDateRef = useRef(null);

//   const toggleSection = (title) => {
//     setExpandedSections((prev) => ({ ...prev, [title]: !prev[title] }));
//   };

//   const renderSection = (section, isReceivable = true) => (
//     <div key={section.title} className="border-b border-[#ede9e8]">
//       <div
//         className="flex items-center justify-between bg-[#F0F9FF] px-6 py-3 font-semibold text-sm text-gray-700 cursor-pointer border-b border-[#E8E8ED]"
//         onClick={() => toggleSection(section.title)}
//       >
//         <div className="flex items-center gap-2">
//           <ArrowIcon isUp={expandedSections[section.title]} />
//           <span>{section.title}</span>
//         </div>
//         <span className="text-right">${section.total.toFixed(2)}</span>
//       </div>
//       {expandedSections[section.title] && (
//         <div className="bg-[#FFFFFF] text-sm">
//           <div className="flex items-center px-6 py-2 bg-[#fbfaf9] border-b border-[#E8E8ED]">
//             <input
//               type="checkbox"
//               className="mr-4 w-4 h-4 accent-[#4079ED] border-2 border-[#4079ED] rounded-full"
//             />
//             {section.headers.map((h, idx) => (
//               <div key={idx} className="min-w-[152px] font-semibold">
//                 {h}
//               </div>
//             ))}
//           </div>
//           {section.rows.map((row, idx) => (
//             <div key={idx} className="flex items-center px-6 py-2 border-b border-[#E8E8ED]">
//               <input
//                 type="checkbox"
//                 className="mr-4 w-4 h-4 accent-[#4079ED] border-2 border-[#4079ED] rounded-full"
//               />
//               {isReceivable ? (
//                 <>
//                   <div className="min-w-[152px]">{row.name}</div>
//                   <div className="min-w-[152px]">{row.invoice}</div>
//                   <div className="min-w-[152px]">${row.amount.toFixed(2)}</div>
//                 </>
//               ) : (
//                 <>
//                   <div className="min-w-[152px]">{row.name}</div>
//                   <div className="min-w-[152px]">{row.date}</div>
//                   <div className="min-w-[152px]">${row.amount.toFixed(2)}</div>
//                 </>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );

//   const receivablesTotal = sections.receivables.reduce((sum, sec) => sum + sec.total, 0);
//   const payablesTotal = sections.payables.reduce((sum, sec) => sum + sec.total, 0);

//   return (
//     <div className="p-3 min-h-screen font-[Urbanist]">
//       <div className="bg-white rounded-[24px] shadow-md mt-5 ml-0 overflow-hidden">
//         <div className="p-10">
//           {/* Header */}
//           <div className="flex justify-between items-start mb-10">
//             <div>
//               <div className="text-sm text-gray-500 mb-2">Reports &gt; Trial Balance</div>
//               <h1 className="text-[36px] font-bold mb-4">Trial Balance</h1>
//             </div>

//             {/* Right side (Print + Date Range) */}
//             <div className="flex flex-col items-end gap-4">
//               <button className="bg-gray-100 hover:bg-gray-200 text-sm font-medium rounded-[12px] px-6 py-3 flex items-center gap-3">
//                 <PrinterIcon className="w-4 h-4" /> Print
//               </button>

//               {/* Date Range Inputs */}
//               <div className="flex items-center gap-2">
//                 <div className="text-sm text-gray-400 mr-2">Date Range</div>
//                 <div className="relative">
//                   <input
//                     ref={startDateRef}
//                     type="date"
//                     value={startDate}
//                     onChange={(e) => setStartDate(e.target.value)}
//                     className="rounded-[12px] border border-[#E8E8ED] px-4 py-2 text-gray-500 placeholder-gray-300 w-[160px] text-sm"
//                   />
//                   <CalendarIcon
//                     onClick={() => startDateRef.current.showPicker()}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4 cursor-pointer"
//                   />
//                 </div>
//                 <div className="text-sm text-gray-400 mx-1">to</div>
//                 <div className="relative">
//                   <input
//                     ref={endDateRef}
//                     type="date"
//                     value={endDate}
//                     onChange={(e) => setEndDate(e.target.value)}
//                     className="rounded-[12px] border border-[#E8E8ED] px-4 py-2 text-gray-500 placeholder-gray-300 w-[160px] text-sm"
//                   />
//                   <CalendarIcon
//                     onClick={() => endDateRef.current.showPicker()}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4 cursor-pointer"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Receivables + Payables */}
//           <div className="grid grid-cols-2 gap-8">
//             {/* Receivables */}
//             <div>
//               <div className="bg-[#F0FDFA] px-6 py-2 border-b border-[#E8E8ED] flex items-center">
//                 <div className="text-green-600 font-black uppercase tracking-[0.04em] text-[24px] leading-[100%] min-w-[480px] w-[512px] h-[29px] font-[Urbanist] flex items-center justify-between">
//                   RECEIVABLES
//                   <span
//                     className="normal-case font-normal text-[16px]"
//                     style={{ color: '#27AE60' }}
//                   >
//                     ${receivablesTotal.toFixed(2)}
//                   </span>
//                 </div>
//               </div>
//               <div className="bg-white">
//                 {sections.receivables.map((section, idx) => (
//                   <div key={idx} className="mb-6">
//                     {renderSection(section, true)}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Payables */}
//             <div>
//               <div className="bg-red-100 px-6 py-2 border-b border-[#E8E8ED] flex items-center">
//                 <div className="text-red-600 font-black uppercase tracking-[0.04em] text-[24px] leading-[100%] min-w-[480px] w-[512px] h-[29px] font-[Urbanist] flex items-center justify-between">
//                   PAYABLES
//                   <span
//                     className="normal-case font-normal text-[16px]"
//                     style={{ color: '#EB5757' }}
//                   >
//                     ${payablesTotal.toFixed(2)}
//                   </span>
//                 </div>
//               </div>
//               <div className="bg-white">
//                 {sections.payables.map((section, idx) => (
//                   <div key={idx} className="mb-6">
//                     {renderSection(section, false)}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useRef } from 'react';
import { PrinterIcon, CalendarIcon } from 'lucide-react';

// Dummy sections data
const sections = {
  receivables: [
    {
      title: 'Receivables from Customers',
      total: 5000,
      headers: ['Customer', 'Invoice No.', 'Amount'],
      rows: [
        { name: 'GreenMart', invoice: 'INV001', amount: 2000 },
        { name: 'LocalMart', invoice: 'INV002', amount: 3000 },
      ],
    },
    {
      title: 'Receivables from Suppliers',
      total: 2000,
      headers: ['Supplier', 'Credit Note No.', 'Amount'],
      rows: [
        { name: 'Farm Fresh', invoice: 'CRN001', amount: 1000 },
        { name: 'LocalMart', invoice: 'CRN002', amount: 1000 },
      ],
    },
    {
      title: 'Receivables from Employees',
      total: 1500,
      headers: [],
      rows: [],
    },
  ],
  payables: [
    {
      title: 'Commission',
      total: 750,
      headers: ['Transaction No.', 'Advance Date', 'Amount'],
      rows: [
        { name: 'TRXN001', date: '01/12/2024', amount: 500 },
        { name: 'TRXN002', date: '02/12/2024', amount: 250 },
      ],
    },
    {
      title: 'Coolie/Logistics',
      total: 500,
      headers: ['Transaction No.', 'Advance Date', 'Amount'],
      rows: [
        { name: 'TRXN001', date: '01/12/2024', amount: 300 },
        { name: 'TRXN002', date: '02/12/2024', amount: 200 },
      ],
    },
    {
      title: 'Payables to Suppliers',
      total: 3000,
      headers: [],
      rows: [],
    },
  ],
};

// Custom Arrow Icon
const ArrowIcon = ({ isUp = false }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={isUp ? "rotate-180" : ""}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 15L6 9H18L12 15Z" />
  </svg>
);

export default function TrialBalanceReport() {
  const [expandedSections, setExpandedSections] = useState({});
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const toggleSection = (title) => {
    setExpandedSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const renderSection = (section, isReceivable = true) => (
    <div key={section.title} className="border-b border-[#ede9e8]">
      <div
        className="flex items-center justify-between bg-[#F0F9FF] px-6 py-3 font-semibold text-sm text-gray-700 cursor-pointer border-b border-[#E8E8ED]"
        onClick={() => toggleSection(section.title)}
      >
        <div className="flex items-center gap-2">
          <ArrowIcon isUp={expandedSections[section.title]} />
          <span>{section.title}</span>
        </div>
        <span className="text-right">${section.total.toFixed(2)}</span>
      </div>
      {expandedSections[section.title] && (
        <div className="bg-[#FFFFFF] text-sm">
          <div className="flex items-center px-6 py-2 bg-[#fbfaf9] border-b border-[#E8E8ED]">
            <input
              type="checkbox"
              className="mr-4 w-4 h-4 accent-[#4079ED] border-2 border-[#4079ED] rounded-full"
            />
            {section.headers.map((h, idx) => (
              <div key={idx} className="min-w-[152px] font-semibold">
                {h}
              </div>
            ))}
          </div>
          {section.rows.map((row, idx) => (
            <div key={idx} className="flex items-center px-6 py-2 border-b border-[#E8E8ED]">
              <input
                type="checkbox"
                className="mr-4 w-4 h-4 accent-[#4079ED] border-2 border-[#4079ED] rounded-full"
              />
              {isReceivable ? (
                <>
                  <div className="min-w-[152px]">{row.name}</div>
                  <div className="min-w-[152px]">{row.invoice}</div>
                  <div className="min-w-[152px]">${row.amount.toFixed(2)}</div>
                </>
              ) : (
                <>
                  <div className="min-w-[152px]">{row.name}</div>
                  <div className="min-w-[152px]">{row.date}</div>
                  <div className="min-w-[152px]">${row.amount.toFixed(2)}</div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const receivablesTotal = sections.receivables.reduce((sum, sec) => sum + sec.total, 0);
  const payablesTotal = sections.payables.reduce((sum, sec) => sum + sec.total, 0);

  return (
    <div className="p-3 min-h-screen font-[Urbanist]">
      <div className="bg-white rounded-[24px] shadow-md mt-5 ml-0 overflow-hidden">
        <div className="p-10">
          {/* Header */}
          <div className="flex justify-between items-start mb-10">
            <div>
              <div className="text-sm text-gray-500 mb-2">Reports &gt; Trial Balance</div>
              <h1 className="text-[36px] font-bold mb-4">Trial Balance</h1>
            </div>

            {/* Right side (Print + Date Range) */}
            <div className="flex flex-col items-end gap-4">
              <button className="bg-gray-100 hover:bg-gray-200 text-sm font-medium rounded-[12px] px-6 py-3 flex items-center gap-3">
                <PrinterIcon className="w-4 h-4" /> Print
              </button>

              {/* Date Range Inputs */}
              <div className="flex items-center gap-2">
                <div className="text-sm text-gray-400 mr-2">Date Range</div>
                <div className="relative flex items-center gap-2">
                  <input
                    ref={startDateRef}
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="rounded-[12px] border border-[#E8E8ED] px-4 py-2 text-gray-500 placeholder-gray-300 w-[160px] text-sm"
                  />
                <div className="text-sm text-gray-400 mr-2">to</div>
                  <input
                    ref={endDateRef}
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="rounded-[12px] border border-[#E8E8ED] px-4 py-2 text-gray-500 placeholder-gray-300 w-[160px] text-sm"
                  />
                </div>
                    


              </div>
            </div>
          </div>

          {/* Receivables + Payables */}
          <div className="grid grid-cols-2 gap-8">
            {/* Receivables */}
            <div>
              <div className="bg-[#F0FDFA] px-6 py-2 border-b border-[#E8E8ED] flex items-center">
                <div className="text-green-600 font-black uppercase tracking-[0.04em] text-[24px] leading-[100%] min-w-[480px] w-[512px] h-[29px] font-[Urbanist] flex items-center justify-between">
                  RECEIVABLES
                  <span
                    className="normal-case font-normal text-[16px]"
                    style={{ color: '#27AE60' }}
                  >
                    ${receivablesTotal.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="bg-white">
                {sections.receivables.map((section, idx) => (
                  <div key={idx} className="mb-6">
                    {renderSection(section, true)}
                  </div>
                ))}
              </div>
            </div>

            {/* Payables */}
            <div>
              <div className="bg-red-100 px-6 py-2 border-b border-[#E8E8ED] flex items-center">
                <div className="text-red-600 font-black uppercase tracking-[0.04em] text-[24px] leading-[100%] min-w-[480px] w-[512px] h-[29px] font-[Urbanist] flex items-center justify-between">
                  PAYABLES
                  <span
                    className="normal-case font-normal text-[16px]"
                    style={{ color: '#EB5757' }}
                  >
                    ${payablesTotal.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="bg-white">
                {sections.payables.map((section, idx) => (
                  <div key={idx} className="mb-6">
                    {renderSection(section, false)}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
