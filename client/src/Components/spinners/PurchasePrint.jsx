import React, { forwardRef } from "react";

const PurchasePrint = forwardRef(({ purchaseEntries }, ref) => {
  return (
    <div ref={ref}>
    <h1 style={{ textAlign: "center" }}>Purchase Report (Full)</h1>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid black" }}>Supplier</th>
          <th style={{ border: "1px solid black" }}>Purchase Number</th>
          <th style={{ border: "1px solid black" }}>Total Amount</th>
          <th style={{ border: "1px solid black" }}>Date</th>
        </tr>
      </thead>
      <tbody>
        {purchaseEntries.map((entry) => (
          <tr key={entry._id}>
            <td style={{ border: "1px solid black" }}>
              {entry?.supplier?.supplierName}
            </td>
            <td style={{ border: "1px solid black" }}>
              {entry?.purchaseNumber}
            </td>
            <td style={{ border: "1px solid black" }}>
              {entry.totalAmount}
            </td>
            <td style={{ border: "1px solid black" }}>
              {new Date(entry.dateOfPurchase).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
});

export default PurchasePrint;
