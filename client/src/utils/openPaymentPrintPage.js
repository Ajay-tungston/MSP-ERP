import { format } from "date-fns";

export const openPaymentPrintPage = (payment) => {
  const newWindow = window.open("", "", "width=800,height=600");

  const printContent = `
    <html>
      <head>
        <title>Payment Report</title>
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
            margin-top: 20px;
          }
          th, td {
            border: 1px solid black;
            padding: 10px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
            width: 30%;
          }
        </style>
      </head>
      <body>
        <h1>Payment Report</h1>
        <table>
          <tr>
            <th>Payment Type</th>
            <td>${payment?.paymentType || "-"}</td>
          </tr>
          <tr>
            <th>Category</th>
            <td>${payment?.category || "-"}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>
              ${
                payment.category === "supplier"
                  ? payment?.supplier?.supplierName
                  : payment.category === "customer"
                  ? payment?.customer?.customerName
                  : payment.category === "employee"
                  ? payment?.employee?.employeeName
                  : payment.category === "company"
                  ? payment?.company?.companyName
                  : payment.category === "expense"
                  ? payment?.expense?.expense
                  : payment.category === "vehicle"
                  ? payment?.vehicle?.vehicleName
                  : payment.category === "lender"
                  ? payment?.lender?.name
                  : payment?.otherPartyName || "N/A"
              }
            </td>
          </tr>
          <tr>
            <th>Amount</th>
            <td>₹ ${payment?.amount?.toFixed(2) || "-"}</td>
          </tr>
          <tr>
            <th>Payment Mode</th>
            <td>${payment?.paymentMode || "-"}</td>
          </tr>
          <tr>
            <th>Date</th>
            <td>${format(new Date(payment.date), "dd/MM/yyyy")}</td>
          </tr>
          <tr>
            <th>Note</th>
            <td>${payment?.note || "-"}</td>
          </tr>
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
