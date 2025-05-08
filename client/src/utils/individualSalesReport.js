import { format } from "date-fns";

export const IndividualsalesReport = (entries, customerName, date) => {
  const newWindow = window.open("", "", "width=800,height=600");
  const formattedDate = format(new Date(date), "dd/MM/yyyy");

  // 🔢 Calculate the grand total
  const grandTotal = entries.reduce(
    (sum, row) => sum + Number(row.totalCost || 0),
    0
  );

  const printContent = `
  <html>
    <head>
      <title>Sales Report - ${customerName}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
        }
        h1, h2, h3 {
          text-align: center;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
          margin-top: 20px;
        }
        th, td {
          border: 1px solid #000;
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
      <h1>Individual Sales Report</h1>
      <h2>Customer: ${customerName}</h2>
      <h3>Date: ${formattedDate}</h3>

      <table>
        <thead>
          <tr>
          
            <th>Invoice No</th>
            <th>Item</th>
            <th>Supplier</th>
            <th>Qty (Kg)</th>
            <th>Qty (Box)</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${entries
            .map(
              (row) => `
            <tr>
              
              <td>${row.transactionNumber}</td>
              <td>${row.item?.itemName || "N/A"}</td>
              <td>${row.supplier?.supplierName || "N/A"}</td>
              <td>${row.quantityKg > 0 ? row.quantityKg : "0"}</td>
              <td>${row.quantityBox > 0 ? row.quantityBox : "0"}</td>
              <td>${row.unitPrice.toFixed(2)}</td>
              <td>${row.totalCost.toFixed(2)}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
     <tfoot>
  <tr>
    <td colspan="6" style="text-align: right;">Grand Total:</td>
    <td>$${grandTotal.toFixed(2)}</td>
  </tr>
</tfoot>

      </table>

      <script>
        window.onload = function () {
          window.print();
        };
      </script>
    </body>
  </html>`;

  newWindow.document.write(printContent);
  newWindow.document.close();
};

export default IndividualsalesReport;
