const Payment = require("../../../models/Payment");
const PurchaseEntry = require("../../../models/PurchaseEntry");
const SalesEntry = require("../../../models/SalesEntry");

// const getTrialBalance = async (req, res) => {
//   try {
//     //debit
//     //cashinHand/bank
//     const paymentSummary = await Payment.aggregate([
//       {
//         $group: {
//           _id: "$paymentType",
//           totalAmount: { $sum: "$amount" },
//         },
//       },
//     ]);

//     let totalIn = 0;
//     let totalOut = 0;

//     paymentSummary.forEach((item) => {
//       if (item._id === "PaymentIn") {
//         totalIn = item.totalAmount;
//       } else if (item._id === "PaymentOut") {
//         totalOut = item.totalAmount;
//       }
//     });

//     const cashInHand = totalIn - totalOut;

//     //accout receivable
//     const customerSalesAndPayments = await Promise.all([
//         // Get total sales per customer
//         SalesEntry.aggregate([
//           { $match: { status: "completed" } },
//           { $unwind: "$customers" },
//           {
//             $group: {
//               _id: "$customers.customer",
//               totalPurchases: { $sum: "$customers.totalAmount" }
//             }
//           }
//         ]),
//         // Get total payments per customer
//         Payment.aggregate([
//           { 
//             $match: { 
//               paymentType: "PaymentIn", 
//               category: "customer" 
//             } 
//           },
//           { 
//             $group: { 
//               _id: "$customer", 
//               totalPayments: { $sum: "$amount" } 
//             } 
//           }
//         ])
//       ]);
      
//       const [customerSales, customerPayments] = customerSalesAndPayments;
      
//       // Merge results to see customer-wise net balance
//       const customerBalances = customerSales.map(sale => {
//         const payment = customerPayments.find(p => p._id.equals(sale._id));
//         return {
//           customerId: sale._id,
//           totalPurchases: sale.totalPurchases,
//           totalPayments: payment?.totalPayments || 0,
//           balanceDue: sale.totalPurchases - (payment?.totalPayments || 0)
//         };
//       });
//       const grandTotalsOfRecevibalesFromCustomers = customerBalances.reduce(
//         (totals, customer) => ({
//           totalPurchases: totals.totalPurchases + customer.totalPurchases,
//           totalPayments: totals.totalPayments + customer.totalPayments,
//           totalBalanceDue: totals.totalBalanceDue + customer.balanceDue,
//         }), 
//         { totalPurchases: 0, totalPayments: 0, totalBalanceDue: 0 }
//       );
      


//       //credit
//       //acc payable
//       const supplierBalances = await Promise.all([
//         // Total purchases per supplier
//         PurchaseEntry.aggregate([
//           {
//             $group: {
//               _id: "$supplier",
//               totalPurchases: { $sum: "$netTotalAmount" }
//             }
//           }
//         ]),
//         // Total payments per supplier
//         Payment.aggregate([
//           { 
//             $match: { 
//               paymentType: "PaymentOut",
//               category: "supplier" 
//             } 
//           },
//           { 
//             $group: { 
//               _id: "$supplier", 
//               totalPayments: { $sum: "$amount" } 
//             } 
//           }
//         ])
//       ]);
      
//       const [purchasesBySupplier, paymentsBySupplier] = supplierBalances;
      
//       // Merge to calculate balances
//       const supplierOwed = purchasesBySupplier.map(purchase => {
//         const payment = paymentsBySupplier.find(p => p._id.equals(purchase._id));
//         return {
//           supplierId: purchase._id,
//           totalPurchases: purchase.totalPurchases,
//           totalPayments: payment?.totalPayments || 0,
//           balanceDue: purchase.totalPurchases - (payment?.totalPayments || 0)
//         };
//       });
//       const grandTotalsOfPayablesToSuppliers = supplierOwed.reduce(
//         (totals, supplier) => {
//           return {
//             totalPurchases: totals.totalPurchases + supplier.totalPurchases,
//             totalPayments: totals.totalPayments + supplier.totalPayments,
//             totalBalanceDue: totals.totalBalanceDue + supplier.balanceDue,
//           };
//         },
//         { totalPurchases: 0, totalPayments: 0, totalBalanceDue: 0 } // Initial values
//       );
      
// //employee
// const employeePaymentDetails = await Payment.aggregate([
//     {
//       $match: {
//         paymentType: "PaymentOut",
//         category: "employee"
//       }
//     },
//     {
//       $facet: {
//         // Individual employee breakdown
//         employeeDetails: [
//           {
//             $group: {
//               _id: "$employee",
//               totalPaid: { $sum: "$amount" },
//               paymentCount: { $sum: 1 }
//             }
//           },
//           {
//             $lookup: {
//               from: "employees",
//               localField: "_id",
//               foreignField: "_id",
//               as: "employeeDetails"
//             }
//           },
//           {
//             $unwind: "$employeeDetails"
//           },
//           {
//             $project: {
//               employeeId: "$_id",
//               employeeName: "$employeeDetails.name",
//               totalPaid: 1,
//               paymentCount: 1,
//               _id: 0
//             }
//           }
//         ],
//         // Grand total calculation
//         grandTotal: [
//           {
//             $group: {
//               _id: null,
//               totalAmount: { $sum: "$amount" },
//               totalPayments: { $sum: 1 }
//             }
//           }
//         ]
//       }
//     }
//   ]);
      
// //company
// const companyPaymentResults = await Payment.aggregate([
//     {
//       $match: {
//         category: "company" // Include both PaymentIn and PaymentOut
//       }
//     },
//     {
//       $facet: {
//         // Individual company transactions
//         companyTransactions: [
//           {
//             $group: {
//               _id: "$company",
//               totalPaidOut: {
//                 $sum: {
//                   $cond: [
//                     { $eq: ["$paymentType", "PaymentOut"] },
//                     "$amount",
//                     0
//                   ]
//                 }
//               },
//               totalReceived: {
//                 $sum: {
//                   $cond: [
//                     { $eq: ["$paymentType", "PaymentIn"] },
//                     "$amount",
//                     0
//                   ]
//                 }
//               },
//               transactionCount: { $sum: 1 }
//             }
//           },
//           {
//             $lookup: {
//               from: "companies",
//               localField: "_id",
//               foreignField: "_id",
//               as: "companyDetails"
//             }
//           },
//           {
//             $unwind: "$companyDetails"
//           },
//           {
//             $project: {
//               companyId: "$_id",
//               companyName: "$companyDetails.name",
//               paymentsOut: "$totalPaidOut",
//               paymentsIn: "$totalReceived",
//               netFlow: { $subtract: ["$totalReceived", "$totalPaidOut"] },
//               transactionCount: 1,
//               _id: 0
//             }
//           }
//         ],
//         // Overall totals
//         overallTotals: [
//           {
//             $group: {
//               _id: null,
//               totalOut: {
//                 $sum: {
//                   $cond: [
//                     { $eq: ["$paymentType", "PaymentOut"] },
//                     "$amount",
//                     0
//                   ]
//                 }
//               },
//               totalIn: {
//                 $sum: {
//                   $cond: [
//                     { $eq: ["$paymentType", "PaymentIn"] },
//                     "$amount",
//                     0
//                   ]
//                 }
//               },
//               totalTransactions: { $sum: 1 },
//               netFlow: {
//                 $sum: {
//                   $cond: [
//                     { $eq: ["$paymentType", "PaymentIn"] },
//                     "$amount",
//                     { $multiply: ["$amount", -1] }
//                   ]
//                 }
//               }
//             }
//           },
//           {
//             $project: {
//               _id: 0,
//               totalPaymentsOut: "$totalOut",
//               totalPaymentsIn: "$totalIn",
//               netCompanyFlow: "$netFlow",
//               totalTransactions: 1
//             }
//           }
//         ]
//       }
//     }
//   ]);
  
//   // Process results
//   const companyBalances = companyPaymentResults[0]?.companyTransactions || [];
//   const overallCompanyTotals = companyPaymentResults[0]?.overallTotals[0] || {
//     totalPaymentsOut: 0,
//     totalPaymentsIn: 0,
//     netCompanyFlow: 0,
//     totalTransactions: 0
//   };
  
//   // Final structured output
//   const companyTotalResult = {
//     individualCompanyBalances: companyBalances,
//     overallCompanyTotals: overallCompanyTotals
//   };
  
//   //other
//   const otherPaymentResults = await Payment.aggregate([
//     {
//       $match: {
//         paymentType: "PaymentOut",
//         category: "Other"
//       }
//     },
//     {
//       $facet: {
//         // Individual breakdown
//         otherPayments: [
//           {
//             $group: {
//               _id: "$otherPartyName", // Group by the party name
//               totalPaid: { $sum: "$amount" },
//               paymentCount: { $sum: 1 }
//             }
//           },
//           {
//             $project: {
//               partyName: "$_id",
//               totalPaid: 1,
//               paymentCount: 1,
//               _id: 0
//             }
//           }
//         ],
//         // Grand totals
//         grandTotal: [
//           {
//             $group: {
//               _id: null,
//               totalAmount: { $sum: "$amount" },
//               totalPayments: { $sum: 1 }
//             }
//           }
//         ]
//       }
//     }
//   ]);

//   //commision and market fee
//   const commisionAndMarketFee = await PurchaseEntry.aggregate([
//     {
//       $facet: {
//         // Individual purchase records
//         purchaseDetails: [
//           {
//             $lookup: {
//               from: "suppliers",
//               localField: "supplier",
//               foreignField: "_id",
//               as: "supplierInfo"
//             }
//           },
//           {
//             $unwind: "$supplierInfo"
//           },
//           {
//             $project: {
//               _id: 0,
//               purchaseNumber: 1,
//               date: "$dateOfPurchase",
//               supplierName: "$supplierInfo.name",
//               netTotal: "$netTotalAmount",
//               commission: "$commissionPaid",
//               marketFee: 1,
//               itemsCount: { $size: "$items" }
//             }
//           },
//           { $sort: { date: -1 } } // Newest first
//         ],
        
//         // Grand totals
//         summaryStats: [
//           {
//             $group: {
//               _id: null,
//               totalCommission: { $sum: "$commissionPaid" },
//               totalMarketFee: { $sum: "$marketFee" },
//               totalPurchases: { $sum: "$netTotalAmount" },
//               totalTransactions: { $sum: 1 },
//               avgCommission: { $avg: "$commissionPaid" }
//             }
//           },
//           {
//             $project: {
//               _id: 0,
//               totalCommission: 1,
//               totalMarketFee: 1,
//               totalPurchases: 1,
//               totalTransactions: 1,
//               avgCommission: { $round: ["$avgCommission", 2] }
//             }
//           }
//         ]
//       }
//     }
//   ]);
  
//   // Process results
//   const individualCommisionAndMarketFee = commisionAndMarketFee[0]?.purchaseDetails || [];
//   const totalcommisionAndMarketFee = commisionAndMarketFee[0]?.summaryStats[0] || {
//     totalCommission: 0,
//     totalMarketFee: 0,
//     totalPurchases: 0,
//     totalTransactions: 0,
//     avgCommission: 0
//   };
  
//   // Final structured result
//   const commisionAndMarketFeeResult = {
//     purchases: individualCommisionAndMarketFee,
//     totalcommisionAndMarketFee,
//     // Derived metrics
//     // avgMarketFee: individualCommisionAndMarketFee.length > 0 
//     //   ? (totalcommisionAndMarketFee.totalMarketFee / individualCommisionAndMarketFee.length).toFixed(2)
//     //   : 0
//   };
  

//     res.json({cashInHand, customerBalances,grandTotalsOfRecevibalesFromCustomers,supplierOwed,grandTotalsOfPayablesToSuppliers,employeePaymentDetails,companyTotalResult,otherPaymentResults,commisionAndMarketFeeResult });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Error fetching payment summary" });
//   }
// };


const getTrialBalance = async (req, res) => {
    try {
      // 1. Cash In Hand (Bank/Cash)
      const paymentSummary = await Payment.aggregate([
        {
          $group: {
            _id: "$paymentType",
            totalAmount: { $sum: "$amount" },
          },
        },
      ]);
  
      let totalIn = 0;
      let totalOut = 0;
  
      paymentSummary.forEach((item) => {
        if (item._id === "PaymentIn") totalIn = item.totalAmount;
        else if (item._id === "PaymentOut") totalOut = item.totalAmount;
      });
  
      const cashInHand = totalIn - totalOut;
  
      // 2. Accounts Receivable (Customers)
      const [customerSales, customerPayments] = await Promise.all([
        SalesEntry.aggregate([
          { $match: { status: "completed" } },
          { $unwind: "$customers" },
          {
            $group: {
              _id: "$customers.customer",
              totalPurchases: { $sum: "$customers.totalAmount" },
            },
          },
        ]),
        Payment.aggregate([
          {
            $match: {
              paymentType: "PaymentIn",
              category: "customer",
            },
          },
          {
            $group: {
              _id: "$customer",
              totalPayments: { $sum: "$amount" },
            },
          },
        ]),
      ]);
  
      const customerBalances = customerSales.map((sale) => {
        const payment = customerPayments.find((p) => p._id.equals(sale._id));
        return {
          customerId: sale._id,
          totalPurchases: sale.totalPurchases,
          totalPayments: payment?.totalPayments || 0,
          balanceDue: sale.totalPurchases - (payment?.totalPayments || 0),
        };
      });
  
      const totalReceivables = customerBalances.reduce(
        (totals, c) => ({
          totalPurchases: totals.totalPurchases + c.totalPurchases,
          totalPayments: totals.totalPayments + c.totalPayments,
          totalBalanceDue: totals.totalBalanceDue + c.balanceDue,
        }),
        { totalPurchases: 0, totalPayments: 0, totalBalanceDue: 0 }
      );
  
      // 3. Accounts Payable (Suppliers)
      const [supplierPurchases, supplierPayments] = await Promise.all([
        PurchaseEntry.aggregate([
          {
            $group: {
              _id: "$supplier",
              totalPurchases: { $sum: "$netTotalAmount" },
            },
          },
        ]),
        Payment.aggregate([
          {
            $match: {
              paymentType: "PaymentOut",
              category: "supplier",
            },
          },
          {
            $group: {
              _id: "$supplier",
              totalPayments: { $sum: "$amount" },
            },
          },
        ]),
      ]);
  
      const supplierBalances = supplierPurchases.map((purchase) => {
        const payment = supplierPayments.find((p) => p._id.equals(purchase._id));
        return {
          supplierId: purchase._id,
          totalPurchases: purchase.totalPurchases,
          totalPayments: payment?.totalPayments || 0,
          balanceDue: purchase.totalPurchases - (payment?.totalPayments || 0),
        };
      });
  
      const totalPayables = supplierBalances.reduce(
        (totals, s) => ({
          totalPurchases: totals.totalPurchases + s.totalPurchases,
          totalPayments: totals.totalPayments + s.totalPayments,
          totalBalanceDue: totals.totalBalanceDue + s.balanceDue,
        }),
        { totalPurchases: 0, totalPayments: 0, totalBalanceDue: 0 }
      );
  
      // 4. Employee Payments
      const employeePaymentDetails = await Payment.aggregate([
        {
          $match: {
            paymentType: "PaymentOut",
            category: "employee",
          },
        },
        {
          $facet: {
            employeeDetails: [
              {
                $group: {
                  _id: "$employee",
                  totalPaid: { $sum: "$amount" },
                  paymentCount: { $sum: 1 },
                },
              },
              {
                $lookup: {
                  from: "employees",
                  localField: "_id",
                  foreignField: "_id",
                  as: "employeeDetails",
                },
              },
              { $unwind: "$employeeDetails" },
              {
                $project: {
                  employeeId: "$_id",
                  employeeName: "$employeeDetails.name",
                  totalPaid: 1,
                  paymentCount: 1,
                  _id: 0,
                },
              },
            ],
            grandTotal: [
              {
                $group: {
                  _id: null,
                  totalAmount: { $sum: "$amount" },
                  totalPayments: { $sum: 1 },
                },
              },
            ],
          },
        },
      ]);
  
      // 5. Company Payments (In & Out)
      const companyPayments = await Payment.aggregate([
        {
          $match: {
            category: "company",
          },
        },
        {
          $facet: {
            companyTransactions: [
              {
                $group: {
                  _id: "$company",
                  totalPaidOut: {
                    $sum: {
                      $cond: [{ $eq: ["$paymentType", "PaymentOut"] }, "$amount", 0],
                    },
                  },
                  totalReceived: {
                    $sum: {
                      $cond: [{ $eq: ["$paymentType", "PaymentIn"] }, "$amount", 0],
                    },
                  },
                  transactionCount: { $sum: 1 },
                },
              },
              {
                $lookup: {
                  from: "companies",
                  localField: "_id",
                  foreignField: "_id",
                  as: "companyDetails",
                },
              },
              { $unwind: "$companyDetails" },
              {
                $project: {
                  companyId: "$_id",
                  companyName: "$companyDetails.name",
                  paymentsOut: "$totalPaidOut",
                  paymentsIn: "$totalReceived",
                  netFlow: { $subtract: ["$totalReceived", "$totalPaidOut"] },
                  transactionCount: 1,
                  _id: 0,
                },
              },
            ],
            overallTotals: [
              {
                $group: {
                  _id: null,
                  totalPaymentsOut: {
                    $sum: {
                      $cond: [{ $eq: ["$paymentType", "PaymentOut"] }, "$amount", 0],
                    },
                  },
                  totalPaymentsIn: {
                    $sum: {
                      $cond: [{ $eq: ["$paymentType", "PaymentIn"] }, "$amount", 0],
                    },
                  },
                  totalTransactions: { $sum: 1 },
                },
              },
            ],
          },
        },
      ]);
  
      // 6. Other Payments
      const otherPayments = await Payment.aggregate([
        {
          $match: {
            paymentType: "PaymentOut",
            category: "Other",
          },
        },
        {
          $facet: {
            otherPayments: [
              {
                $group: {
                  _id: "$otherPartyName",
                  totalPaid: { $sum: "$amount" },
                  paymentCount: { $sum: 1 },
                },
              },
              {
                $project: {
                  partyName: "$_id",
                  totalPaid: 1,
                  paymentCount: 1,
                  _id: 0,
                },
              },
            ],
            grandTotal: [
              {
                $group: {
                  _id: null,
                  totalAmount: { $sum: "$amount" },
                  totalPayments: { $sum: 1 },
                },
              },
            ],
          },
        },
      ]);
  
      // 7. Commission & Market Fee Summary
      const commissionSummary = await PurchaseEntry.aggregate([
        {
          $facet: {
            purchaseDetails: [
              {
                $lookup: {
                  from: "suppliers",
                  localField: "supplier",
                  foreignField: "_id",
                  as: "supplierInfo",
                },
              },
              { $unwind: "$supplierInfo" },
              {
                $project: {
                  purchaseNumber: 1,
                  date: "$dateOfPurchase",
                  supplierName: "$supplierInfo.name",
                  netTotal: "$netTotalAmount",
                  commission: "$commissionPaid",
                  marketFee: 1,
                  itemsCount: { $size: "$items" },
                  _id: 0,
                },
              },
              { $sort: { date: -1 } },
            ],
            summaryStats: [
              {
                $group: {
                  _id: null,
                  totalCommission: { $sum: "$commissionPaid" },
                  totalMarketFee: { $sum: "$marketFee" },
                  totalPurchases: { $sum: "$netTotalAmount" },
                  totalTransactions: { $sum: 1 },
                  avgCommission: { $avg: "$commissionPaid" },
                },
              },
              {
                $project: {
                  _id: 0,
                  totalCommission: 1,
                  totalMarketFee: 1,
                  totalPurchases: 1,
                  totalTransactions: 1,
                  avgCommission: { $round: ["$avgCommission", 2] },
                },
              },
            ],
          },
        },
      ]);
  
      res.json({
        cashInHand,
        receivables: {
          customerBalances,
          totalReceivables,
        },
        payables: {
          supplierBalances,
          totalPayables,
        },
        employeePayments: employeePaymentDetails[0],
        companyPayments: {
          individualCompanyBalances: companyPayments[0]?.companyTransactions || [],
          overallCompanyTotals: companyPayments[0]?.overallTotals[0] || {},
        },
        otherPayments: otherPayments[0],
        commissionSummary: {
          purchases: commissionSummary[0]?.purchaseDetails || [],
          totals: commissionSummary[0]?.summaryStats[0] || {},
        },
      });
    } catch (error) {
      console.error("Trial Balance Error:", error);
      res.status(500).json({ message: "Error fetching trial balance summary" });
    }
  };
  

module.exports = { getTrialBalance };
