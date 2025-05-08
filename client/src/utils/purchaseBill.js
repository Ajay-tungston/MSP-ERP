// utils/printPurchase.js

export const handlePurchasePrint = ({
    selectedSupplier,
    purchaseCount,
    dateOfPurchase,
    items,
    totalQuantityInBox,
    totalQuantityInKg,
    totalPrice,
    commission,
    marketFee,
    totalDeduction,
  }) => {
    const printWindow = window.open("", "_blank");
  
    const style = `
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; font-size: 14px; }
        .header {
          text-align: center;
          border-bottom: 2px solid #000;
          padding-bottom: 10px;
          margin-bottom: 10px;
        }
        .title {
          font-size: 20px;
          font-weight: bold;
          color: #d40000;
        }
        .subtitle {
          font-size: 16px;
          font-weight: bold;
          color: #000066;
        }
        .contact {
          font-size: 13px;
          margin-top: 5px;
        }
        .section { margin-top: 10px; }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }
        th, td {
          border: 1px solid #000;
          padding: 8px;
          text-align: center;
        }
        th {
          background-color: #e0e0e0;
        }
        .summary td {
          border: none;
          padding: 4px 8px;
          text-align: left;
        }
        .highlight {
          font-weight: bold;
          color: #000;
        }
        .value {
          font-weight: bold;
          color: #006600;
        }
      </style>
    `;
  
    const html = `
      <html>
        <head>
          <title>Purchase Entry</title>
          ${style}
        </head>
        <body>
          <div class="header">
            <div class="title">M.S. PAREEKUTTY SONS</div>
            <div class="subtitle">ICE FISH MERCHANTS</div>
            <div class="contact">Fish Market Road, Perumbavoor, Cochin, Kerala.<br>Mobile-Offi: 9947770468</div>
            <div class="contact">DATE: ${new Date(dateOfPurchase).toLocaleDateString("en-GB")}</div>
          </div>
  
          <div class="section">
            <table style="border: none; width: 100%; margin-top: 10px;">
              <colgroup>
                <col style="width: 18%;">
                <col style="width: 42%;">
                <col style="width: 15%;">
                <col style="width: 25%;">
              </colgroup>
              <tr>
                <td class="highlight">Supplier Name:</td>
                <td class="value">${selectedSupplier?.supplierName || "-"}</td>
                <td class="highlight">Purchase No:</td>
                <td class="value">${purchaseCount || "-"}</td>
              </tr>
              <tr>
                <td class="highlight">Address:</td>
                <td colspan="3" class="value">${selectedSupplier?.address || "-"}</td>
              </tr>
            </table>
          </div>
  
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Item Name</th>
                <th>Unit Price</th>
                <th>Qty</th>
                <th>Box / Kgs</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${items
                .map(
                  (item, index) => `
                  <tr>
                    <td>${index + 1}</td>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td>${item.kg || item.box}</td>
                    <td>${item.kg ? "KG" : "BOX"}</td>
                    <td>${item.total}</td>
                  </tr>`
                )
                .join("")}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2"><strong>Total</strong></td>
                <td></td>
                <td class="value">${totalQuantityInBox + totalQuantityInKg}</td>
                <td><strong>${
                  totalQuantityInBox > 0 ? totalQuantityInBox + " Box" : ""
                } ${
      totalQuantityInKg > 0 ? "/ " + totalQuantityInKg + " Kg" : ""
    }</strong></td>
                <td>${totalPrice}</td>
              </tr>
            </tfoot>
          </table>
  
          <div class="section">
            <table class="summary">
              <tr><td>Commission:</td><td>₹${commission?.toFixed(2) || "0.00"}</td></tr>
              <tr><td>Expense:</td><td>₹${marketFee?.toFixed(2) || "0.00"}</td></tr>
              <tr><td><strong>Grand Total:</strong></td><td><strong>₹${(
                totalPrice - totalDeduction
              ).toFixed(2)}</strong></td></tr>
            </table>
          </div>
  
          <script>
            window.onload = function() {
              window.print();
              setTimeout(() => window.close(), 500);
            };
          </script>
        </body>
      </html>
    `;
  
    printWindow.document.write(html);
    printWindow.document.close();
  };
  