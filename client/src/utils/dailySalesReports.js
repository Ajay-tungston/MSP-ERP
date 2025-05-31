import { format } from "date-fns";

export function printMultipleCustomerSalesReport(customersData, date) {
  if (!Array.isArray(customersData)) {
    console.error("Invalid customersData input. Expected an array.");
    return;
  }

  const formattedDate = format(new Date(date), "dd/MM/yyyy");

  const printContent = `
    <html>
      <head>
        <title>Sales Report</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 10px;
            width: 148mm;
            height: 210mm;
          }
          .report-container {
            page-break-after: always;
            padding: 10px;
          }
          .top-section {
            display: flex;
            justify-content: space-between;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 15px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 22px;
            margin-top: 15px;
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: center;
          }
          th {
            background-color: white;
            font-weight: bold;
            font-size: 22px;
          }
          .total-row td {
            font-weight: bold;
            background-color: #f2f2f2;
          }
          .label {
            text-align: left;
            font-weight: bold;
          }
          .label-right {
            text-align: right;
            font-weight: bold;
          }
          .total-text {
            display: flex;
            justify-content: space-around;
            width: 100%;
            font-size: 22px;
          }
          @media print {
            @page {
              size: 148mm 210mm;
              margin: 5mm;
            }
          }
        </style>
      </head>
      <body>
        ${customersData
          .map(({ customerName, items = [], previousBalance = 0, dailyReceipts = 0 ,dailyTotal=0,grossTotal=0}) => {
            let totalBox = 0;
            let totalKg = 0;
            let totalAmount = 0;

            items.forEach((row) => {
              const qtyBox = parseFloat(row["Qty (Box)"]) || 0;
              const qtyKg = parseFloat(row["Qty (KG)"]) || 0;
              const amount = parseFloat(row.totalCost) || 0;

              totalBox += qtyBox;
              totalKg += qtyKg;
              totalAmount += amount;
            });

            // const grossTotal = totalAmount + previousBalance - dailyReceipts;

            return `
              <div class="report-container">
                <table>
                  <thead>
                    <tr>
                      <td colspan="5">
                        <div class="top-section">
                          <div>${customerName?.toUpperCase?.() || "UNKNOWN CUSTOMER"}</div>
                          <div>${formattedDate}</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th style="width: 20%">Box Code</th>
                      <th style="width: 30%">Item Name</th>
                      <th style="width: 15%">Unit Price</th>
                      <th style="width: 15%">Box/Kgs</th>
                      <th style="width: 20%">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${items
                      .map((row) => {
                        const qtyBox = row["Qty (Box)"];
                        const qtyKg = row["Qty (KG)"];
                        const quantityDisplay = qtyBox > 0 ? `${qtyBox} BOX` : `${qtyKg} KG`;

                        return `
                          <tr>
                            <td>${row.supplierCode || "N/A"}</td>
                            <td>${row.Item || "N/A"}</td>
                            <td>${(row.Price ?? 0).toFixed(2)}</td>
                            <td>${quantityDisplay}</td>
                            <td>${(row.Total ?? 0).toFixed(2)}</td>
                          </tr>
                        `;
                      })
                      .join("")}

                    <tr class="total-row">
                      <td colspan="3">
                        <div class="total-text">
                          <strong>Total</strong>
                          <span>${totalBox.toFixed(2)} Box</span>
                          <span>${totalKg.toFixed(2)} Kg</span>
                        </div>
                      </td>
                      <td colspan="2" class="label-right">${dailyTotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td class="label" colspan="3">Previous Balance</td>
                      <td colspan="2" class="label-right">${previousBalance.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td class="label" colspan="3">Daily Receipts</td>
                      <td colspan="2" class="label-right">${dailyReceipts.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td class="label" colspan="3">Gross Total</td>
                      <td colspan="2" class="label-right">${grossTotal.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            `;
          })
          .join("")}
        <script>
          window.onload = function () {
            setTimeout(function() {
              window.print();
              window.close();
            }, 200);
          };
        </script>
      </body>
    </html>
  `;

  const newWindow = window.open("", "", "width=600,height=900");
  newWindow.document.write(printContent);
  newWindow.document.close();
}
