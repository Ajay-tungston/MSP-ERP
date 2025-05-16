import { format } from "date-fns";

export const IndividualsalesReport = (
  entries,
  customerName,
  date,
  previousBalance = 0,
  dailyReceipts = 0
) => {
  const newWindow = window.open("", "", "width=800,height=600");
  const formattedDate = format(new Date(date), "dd/MM/yyyy");

  let totalBox = 0;
  let totalKg = 0;
  let totalAmount = 0;

  entries.forEach((row) => {
    totalBox += Number(row.quantityBox || 0);
    totalKg += Number(row.quantityKg || 0);
    totalAmount += Number(row.totalCost || 0);
  });

  const grossTotal = totalAmount + previousBalance - dailyReceipts;

  const printContent = `
    <html>
      <head>
        <title>Sales Report</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 40px;
          }

          .top-section {
            display: flex;
            justify-content: space-between;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
          }

          .highlight {
            background-color: yellow;
            padding: 2px 6px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 16px;
            margin-top: 10px;
          }

          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: center;
          }

          th {
            background-color: white;
            font-weight: bold;
          }

          .total-row td {
            font-weight: bold;
            background-color: #f2f2f2;
          }

          .yellow-bg {
            background-color: yellow;
            font-weight: bold;
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
}
        </style>
      </head>
      <body>
      

        <table>
          <thead>
          <tr><td colspan="5"> <div class="top-section">
          <div >${customerName.toUpperCase()}</div>
          <div >${formattedDate}</div>
        </div></td></tr>
            <tr>
              <th>Box Code</th>
              <th>ItemName</th>
              <th>Unit Price</th>
              <th>Box/Kgs</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            ${entries
              .map(
                (row) => `
              <tr>
                <td>${row.supplier.supplierCode || "N/A"}</td>
                <td>${row.item?.itemName || "N/A"}</td>
                <td>${row.unitPrice?.toFixed(2)}</td>
                <td>${
                  row.quantityBox > 0
                    ? `${row.quantityBox} BOX`
                    : `${row.quantityKg} KG`
                }</td>
                <td>${row.totalCost?.toFixed(2)}</td>
              </tr>
            `
              )
              .join("")}

            <tr class="total-row">
              <td colspan="3" ><div class="total-text"><strong>Total</strong><span>${totalBox.toFixed(
                2
              )} Box </span> <span>${totalKg.toFixed(2)} Kg</span></div></td>
              <td colspan="2" class="label-right" >${totalAmount.toFixed(2)}</td>
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
            <td  colspan="2" class="label-right">${grossTotal.toFixed(2)}</td>
          </tr>
                    </tbody>

        </table>

        <script>
          window.onload = function () {
            window.print();
          };
        </script>
      </body>
    </html>
  `;

  newWindow.document.write(printContent);
  newWindow.document.close();
};

export default IndividualsalesReport;
