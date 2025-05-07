import { format } from "date-fns";

export const openSalesRegisterPrintPage = (entries, grandTotal, startDate, toDate) => {
  const newWindow = window.open('', '', 'width=800,height=600');

  // Calculate totalBox and totalKg from entries
  const totalBox = entries.reduce((sum, e) => sum + (e.totalBox || 0), 0);
  const totalKg = entries.reduce((sum, e) => sum + (e.totalKg || 0), 0);

  const printContent = `
  <html>
  <head>
    <title>Sales Register</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 20px;
      }
      h1 {
        text-align: center;
        margin-bottom: 20px;
      }
      h3 {
        text-align: center;
        margin-bottom: 30px;
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
    <h1>SALES REGISTER</h1>
    <h3>
      From: ${format(new Date(startDate), "dd/MM/yyyy")} &nbsp;&nbsp; To: ${format(new Date(toDate), "dd/MM/yyyy")}
    </h3>
    <table>
      <thead>
        <tr>
          <th>SlNo</th>
          <th>Customer Name</th>
          <th>Box Qty</th>
          <th>KG Qty</th>
          <th>Total Amount</th>
        </tr>
      </thead>
      <tbody>
        ${entries.map((entry, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${entry?.customerName || "N/A"}</td>
            <td>${entry?.totalBox || 0}</td>
            <td>${entry?.totalKg || 0}</td>
            <td>${entry?.totalAmount?.toFixed(2) || "0.00"}</td>
          </tr>
        `).join('')}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2">Grand Total</td>
          <td>${totalBox}</td>
          <td>${totalKg}</td>
          <td>${grandTotal?.toFixed(2) || "0.00"}</td>
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
