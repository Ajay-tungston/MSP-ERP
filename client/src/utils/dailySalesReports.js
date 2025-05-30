import { format } from "date-fns";

/**
 * Utility to print sales reports for multiple customers,
 * with each customer's report starting on a new printed page.
 *
 * @param {Array} customersData - Array of customer report data objects:
 *  [{
 *    customerName: string,
 *    entries: Array of sales entries,
 *    previousBalance?: number,
 *    dailyReceipts?: number
 *  }]
 * @param {string|Date} date - Report date
 */
export function printMultipleCustomerSalesReport(customersData, date) {
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
            width: 148mm; /* Half A3 width */
            height: 210mm; /* Half A3 height */
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
              size: 148mm 210mm; /* Half A3 */
              margin: 5mm;
            }

            body {
              font-size: 24px;
              width: 148mm;
              height: 210mm;
              margin: 0;
              padding: 10px;
            }

            table {
              font-size: 22px;
            }

            th, td {
              padding: 8px;
              font-size: 20px;
            }

            .top-section {
              font-size: 26px;
            }

            .total-text {
              font-size: 22px;
            }

            .label, .label-right {
              font-size: 22px;
            }
          }
        </style>
      </head>
      <body>
        ${customersData
          .map(({ customerName, entries, previousBalance = 0, dailyReceipts = 0 }) => {
            let totalBox = 0;
            let totalKg = 0;
            let totalAmount = 0;

            entries.forEach((row) => {
              totalBox += Number(row.quantityBox || 0);
              totalKg += Number(row.quantityKg || 0);
              totalAmount += Number(row.totalCost || 0);
            });

            const grossTotal = totalAmount + previousBalance - dailyReceipts;

            return `
              <div class="report-container">
                <table>
                  <thead>
                    <tr>
                      <td colspan="5">
                        <div class="top-section">
                          <div>${customerName.toUpperCase()}</div>
                          <div>${formattedDate}</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th style="width: 20%">Box Code</th>
                      <th style="width: 30%">ItemName</th>
                      <th style="width: 15%">Unit Price</th>
                      <th style="width: 15%">Box/Kgs</th>
                      <th style="width: 20%">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${entries
                      .map(
                        (row) => `
                      <tr>
                        <td>${row.supplier?.supplierCode || "N/A"}</td>
                        <td>${row.item?.itemName || "N/A"}</td>
                        <td>${row.unitPrice?.toFixed(2)}</td>
                        <td>${
                          row.quantityBox > 0
                            ? `${row.quantityBox} BOX`
                            : `${row.quantityKg} KG`
                        }</td>
                        <td>${row.totalCost?.toFixed(2)}</td>
                      </tr>`
                      )
                      .join("")}

                    <tr class="total-row">
                      <td colspan="3">
                        <div class="total-text">
                          <strong>Total</strong>
                          <span>${totalBox.toFixed(2)} Box</span>
                          <span>${totalKg.toFixed(2)} Kg</span>
                        </div>
                      </td>
                      <td colspan="2" class="label-right">${totalAmount.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td class="label" colspan="3">Previous Balance</td>
                      <td colspan="2" class="label-right">${previousBalance.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td class="label" colspan="3">Daily receipts</td>
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
