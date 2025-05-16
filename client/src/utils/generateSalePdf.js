import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { format } from "date-fns";

export const generateSalesPdfBlob = async (
  entries,
  customerName,
  date,
  previousBalance = 0,
  dailyReceipts = 0
) => {
  return new Promise(async (resolve, reject) => {
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

    const html = `
    <div style="font-family: Arial, sans-serif; margin: 40px;">
      <table style="width: 100%;">
       <tr>
  <td colspan="5" style="padding: 8px; border: 1px solid black;">
    <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold;">
      <span>${customerName.toUpperCase()}</span>
      <span>${formattedDate}</span>
    </div>
  </td>
</tr>

        <tr>
          <th style="border: 1px solid black; padding: 8px;">Box Code</th>
          <th style="border: 1px solid black; padding: 8px;">ItemName</th>
          <th style="border: 1px solid black; padding: 8px;">Unit Price</th>
          <th style="border: 1px solid black; padding: 8px;">Box/Kgs</th>
          <th style="border: 1px solid black; padding: 8px;">Amount</th>
        </tr>
        ${entries
          .map((row) => {
            const qtyText =
              row.quantityBox > 0
                ? `${row.quantityBox} BOX`
                : `${row.quantityKg} KG`;
            return `
              <tr>
                <td style="border: 1px solid black; padding: 8px;">${
                  row.supplier?.supplierCode || "N/A"
                }</td>
                <td style="border: 1px solid black; padding: 8px;">${
                  row.item?.itemName || "N/A"
                }</td>
                <td style="border: 1px solid black; padding: 8px;">${row.unitPrice?.toFixed(
                  2
                )}</td>
                <td style="border: 1px solid black; padding: 8px;">${qtyText}</td>
                <td style="border: 1px solid black; padding: 8px;">${row.totalCost?.toFixed(
                  2
                )}</td>
              </tr>`;
          })
          .join("")}
        <tr>
          <td colspan="3" style="font-weight:bold; border: 1px solid black; padding: 8px;">
            <div style="display: flex; justify-content: space-around;">
              <span>Total</span>
              <span>${totalBox.toFixed(2)} Box</span>
              <span>${totalKg.toFixed(2)} Kg</span>
            </div>
          </td>
          <td colspan="2" style="font-weight:bold; text-align: right; border: 1px solid black; padding: 8px;">
            ${totalAmount.toFixed(2)}
          </td>
        </tr>
        <tr>
          <td colspan="3" style="font-weight:bold; border: 1px solid black; padding: 8px;">Previous Balance</td>
          <td colspan="2" style="text-align: right; border: 1px solid black; padding: 8px;">${previousBalance.toFixed(
            2
          )}</td>
        </tr>
        <tr>
          <td colspan="3" style="font-weight:bold; border: 1px solid black; padding: 8px;">Daily Receipts</td>
          <td colspan="2" style="text-align: right; border: 1px solid black; padding: 8px;">${dailyReceipts.toFixed(
            2
          )}</td>
        </tr>
        <tr>
          <td colspan="3" style="font-weight:bold; border: 1px solid black; padding: 8px;">Gross Total</td>
          <td colspan="2" style="text-align: right; border: 1px solid black; padding: 8px;">${grossTotal.toFixed(
            2
          )}</td>
        </tr>
      </table>
    </div>
    `;

    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "-9999px";
    container.innerHTML = html;
    document.body.appendChild(container);

    try {
      const canvas = await html2canvas(container, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      document.body.removeChild(container);
      resolve(pdf.output("blob"));
    } catch (err) {
      document.body.removeChild(container);
      reject(err);
    }
  });
};
