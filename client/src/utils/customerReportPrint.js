
export const handleCustomerReportPrint = ({
    selectedCustomer,
    startDate,
    endDate,
    reportRows,
    summary,
  }) => {
    const printWindow = window.open("", "_blank");
  
    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-GB");
    const style = `
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; font-size: 14px; }
        .header {
          text-align: center;
          border-bottom: 2px solid #000;
          padding-bottom: 10px;
          margin-bottom: 10px;
        }
        .subtitle { font-size: 16px; font-weight: bold; color: #000066; }
        .contact { font-size: 13px; margin-top: 5px; }
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
          background-color: #f0f0f0;
        }
        .totals {
          font-weight: bold;
          background-color: #f9f9f9;
        }
      </style>
    `;
  
    const html = `
      <html>
        <head>
          <title>Customer Report</title>
          ${style}  
        </head>
        <body>
          <div class="header">
            <div class="subtitle">Customer Ledger Report</div>
            <div class="contact">
              Customer: <strong>${selectedCustomer?.name || "N/A"}</strong><br>
              Date Range: <strong>${formatDate(startDate)}</strong> to <strong>${formatDate(endDate)}</strong></div>
          </div>
  
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Debit (₹)</th>
                <th>Credit (₹)</th>
                <th>Balance (₹)</th>
              </tr>
            </thead>
            <tbody>
              ${
                reportRows?.length > 0
                  ? reportRows
                      .map(
                        (row) => `
                <tr>
                  <td>${row.formattedDate}</td>
                  <td>${row.description}</td>
                  <td>${row.debit ? `₹${row.debit.toFixed(2)}` : "-"}</td>
                  <td>${row.credit ? `₹${row.credit.toFixed(2)}` : "-"}</td>
                  <td>₹${row.balance.toFixed(2)}</td>
                </tr>`
                      )
                      .join("")
                  : `<tr><td colspan="5">No transactions for selected date range.</td></tr>`
              }
  
              ${
                reportRows?.length > 0
                  ? `
                <tr class="totals">
                  <td colspan="2">Period Totals</td>
                  <td>₹${summary?.totalDebit?.toFixed(2) || "0.00"}</td>
                  <td>₹${summary?.totalCredit?.toFixed(2) || "0.00"}</td>
                  <td>₹${summary?.closingBalance?.toFixed(2) || "0.00"}</td>
                </tr>`
                  : ""
              }
            </tbody>
          </table>
  
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
  