export const handleTrialBalancePrint = ({
    receivablesFromCustomers,
    receivablesFromEmployees,
    receivablesFromSuppliers,
    payablesToSuppliers,
    payablesToLenders,
    vehicleReceivables,
    vehiclePayables,
    totalCommission,
    totalCoolie,
    totalExpense,
    totalSalary,
    cashBalance,
    stockInHand,
    profit,
    loss,
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
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 15px;
          margin-bottom: 30px;
        }
        th, td {
          border: 1px solid #000;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #e0e0e0;
        }
        .section-title {
          margin-top: 20px;
          font-size: 16px;
          font-weight: bold;
          text-align: center;
          border-top: 1px solid #000;
          padding-top: 10px;
        }
        .total-row {
          font-weight: bold;
          background-color: #f0f0f0;
        }
        .profit-loss {
          display: flex;
          justify-content: space-around;
          margin-top: 20px;
        }
        .profit-loss div {
          border: 1px solid #000;
          padding: 10px;
          width: 40%;
        }
        .profit {
          color: green;
          font-weight: bold;
          font-size: 15px;
        }
        .loss {
          color: red;
          font-weight: bold;
          font-size: 15px;
        }
      </style>
    `;
  
    // Calculate totals for sections
    const totalReceivables =
      receivablesFromCustomers +
      receivablesFromEmployees +
      receivablesFromSuppliers +
      totalSalary +
      totalExpense +
      cashBalance +
      stockInHand +
      loss + // You said "vehicles loss" is in receivables, assuming this is 'loss'
      vehicleReceivables;
  
    const totalPayables =
      payablesToSuppliers +
      payablesToLenders +
      profit + // profit in payables section
      totalCommission +
      totalCoolie +
      vehiclePayables;
  
    const html = `
      <html>
        <head>
          <title>Trial Balance</title>
          ${style}
        </head>
        <body>
          <div class="header">
            <!-- <div class="title">M.S. PAREEKUTTY SONS</div> -->
            <div class="subtitle">TRIAL BALANCE REPORT</div>
            <div class="contact">DATE: ${new Date().toLocaleDateString("en-GB")}</div>
          </div>
  
          <div class="section-title">Receivables</div>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Receivables from Suppliers</td><td>₹${receivablesFromSuppliers.toFixed(2)}</td></tr>
              <tr><td>Receivables from Customers</td><td>₹${receivablesFromCustomers.toFixed(2)}</td></tr>
              <tr><td>Receivables from Employees</td><td>₹${receivablesFromEmployees.toFixed(2)}</td></tr>
              <tr><td>Salary</td><td>₹${totalSalary.toFixed(2)}</td></tr>
              <tr><td>Expense</td><td>₹${totalExpense.toFixed(2)}</td></tr>
              <tr><td>Cash Balance</td><td>₹${cashBalance.toFixed(2)}</td></tr>
              <tr><td>Stock In Hand</td><td>₹${stockInHand.toFixed(2)}</td></tr>
              <tr><td>Vehicle Receivables</td><td>₹${vehicleReceivables.toFixed(2)}</td></tr>
              <tr><td>Loss</td><td>₹${loss.toFixed(2)}</td></tr>
  
              <tr class="total-row">
                <td>Total Receivables</td>
                <td>₹${totalReceivables.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
  
          <div class="section-title">Payables</div>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Payables to Suppliers</td><td>₹${payablesToSuppliers.toFixed(2)}</td></tr>
              <tr><td>Payables to Lenders</td><td>₹${payablesToLenders.toFixed(2)}</td></tr>
              <tr><td>Profit</td><td>₹${profit.toFixed(2)}</td></tr>
              <tr><td>Commission</td><td>₹${totalCommission.toFixed(2)}</td></tr>
              <tr><td>Coolie</td><td>₹${totalCoolie.toFixed(2)}</td></tr>
              <tr><td>Vehicle Payables</td><td>₹${vehiclePayables.toFixed(2)}</td></tr>
  
              <tr class="total-row">
                <td>Total Payables</td>
                <td>₹${totalPayables.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
  
          <script>
            window.onload = function () {
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
  