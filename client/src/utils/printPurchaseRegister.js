import { format } from "date-fns";

export const openPurchaseRegisterPrintPage = (entries, totalStats, startDate, toDate) => {
  const newWindow = window.open('', '', 'width=800,height=600');

  const printContent = `
  <html>
  <head>
    <title>Purchase Register</title>
    <style>
       body {
      font-family: Arial, sans-serif;
      margin: 20px;
    }
    h1 {
      text-align: center;
      margin-bottom: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
    }
    th, td {
      border: 1px solid black;
      padding: 8px;
      text-align: center;
    }
    th {
      background-color: #f2f2f2;
    }
    tfoot td {
      font-weight: bold;
      background-color: #f9f9f9;
    }
    </style>
  </head>
  <body>
    <h1>PURCHASE REGISTER</h1>
    <h3 style="text-align: center; margin-bottom: 30px;">
      From: ${format(new Date(startDate), "dd/MM/yyyy")} &nbsp;&nbsp; To: ${format(new Date(toDate), "dd/MM/yyyy")}
    </h3>
    <table>
      <thead>
        <tr>
          <th>SlNo</th>
          <th>Inv Date</th>
          <th>Sup Name</th>
          <th>Box Qty</th>
          <th>KG Qty</th>
          <th>Gross</th>
          <th>Commission</th>
          <th>Expense</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${entries.map((entry, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${format(new Date(entry.dateOfPurchase), "dd/MM/yyyy") || "-"}</td>
            <td>${entry?.supplier?.supplierName || "N/A"}</td>
            <td>${entry?.totalBox || 0}</td>
            <td>${entry?.totalKg || 0}</td>
            <td>${entry?.grossTotalAmount?.toFixed(2) || "-"}</td>
            <td>${entry?.commissionPaid?.toFixed(2) || "-"}</td>
            <td>${entry?.marketFee?.toFixed(2) || "-"}</td>
            <td>${entry?.netTotalAmount?.toFixed(2) || "-"}</td>
          </tr>
        `).join('')}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3">Total</td>
          <td>${totalStats?.totalBox || "-"}</td>
          <td>${totalStats?.totalKg || "-"}</td>
          <td>${totalStats?.grossTotalAmount?.toFixed(2) || "-"}</td>
          <td>${totalStats?.totalCommission?.toFixed(2) || "-"}</td>
          <td>${totalStats?.totalMarketFee?.toFixed(2) || "-"}</td>
          <td>${totalStats?.netTotalAmount?.toFixed(2) || "-"}</td>
        </tr>
      </tfoot>
    </table>

    <script>
      window.onload = function() {
        window.print();
      };
    </script>
  </body>
  </html> 
  `;

  newWindow.document.write(printContent);
  newWindow.document.close();
};
