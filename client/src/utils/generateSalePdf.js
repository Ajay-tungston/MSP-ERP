import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { format } from "date-fns";


export const generateSalesPdfBlob = async (entries, customerName, date) => {
  return new Promise(async (resolve, reject) => {
    const formattedDate = format(new Date(date), "dd/MM/yyyy");
    const grandTotal = entries.reduce(
      (sum, row) => sum + Number(row.totalCost || 0),
      0
    );

    const html = `
      <div style="font-family: Arial, sans-serif; margin: 20px;">
        <h1 style="text-align:center;">Individual Sales Report</h1>
        <h2 style="text-align:center;">Customer: ${customerName}</h2>
        <h3 style="text-align:center;">Date: ${formattedDate}</h3>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-top: 20px;">
          <thead>
            <tr>
              <th style="border:1px solid #000; padding:8px;">Invoice No</th>
              <th style="border:1px solid #000; padding:8px;">Item</th>
              <th style="border:1px solid #000; padding:8px;">Supplier</th>
              <th style="border:1px solid #000; padding:8px;">Qty (Kg)</th>
              <th style="border:1px solid #000; padding:8px;">Qty (Box)</th>
              <th style="border:1px solid #000; padding:8px;">Price</th>
              <th style="border:1px solid #000; padding:8px;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${entries
              .map(
                (row) => `
                <tr>
                  <td style="border:1px solid #000; padding:8px;">${row.transactionNumber || ""}</td>
                  <td style="border:1px solid #000; padding:8px;">${row.item?.itemName || "N/A"}</td>
                  <td style="border:1px solid #000; padding:8px;">${row.supplier?.supplierName || "N/A"}</td>
                  <td style="border:1px solid #000; padding:8px;">${row.quantityKg > 0 ? row.quantityKg : "0"}</td>
                  <td style="border:1px solid #000; padding:8px;">${row.quantityBox > 0 ? row.quantityBox : "0"}</td>
                  <td style="border:1px solid #000; padding:8px;">${row.unitPrice?.toFixed(2) || "0.00"}</td>
                  <td style="border:1px solid #000; padding:8px;">${row.totalCost?.toFixed(2) || "0.00"}</td>
                </tr>
              `
              )
              .join("")}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="6" style="border:1px solid #000; padding:8px; text-align:right; font-weight:bold;">Grand Total:</td>
              <td style="border:1px solid #000; padding:8px;">$${grandTotal.toFixed(2)}</td>
            </tr>
          </tfoot>
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
