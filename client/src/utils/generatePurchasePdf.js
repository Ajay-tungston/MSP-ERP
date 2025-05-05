import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const generatePurchasePdfBlob = async (purchaseData) => {
  const {
    selectedSupplier,
    purchaseCount,
    dateOfPurchase,
    items,
    totalQuantityInBox,
    totalQuantityInKg,
    totalPrice,
    commission,
    marketFee,
    totalDeduction,
  } = purchaseData;

  return new Promise(async (resolve, reject) => {
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "-9999px";
    container.style.fontFamily = "Arial, sans-serif";
    container.style.fontSize = "14px";
    container.style.lineHeight = "1.4";
    container.style.padding = "20px";
    container.style.width = "210mm"; // A4 width
    container.style.boxSizing = "border-box";

    container.innerHTML = `
      <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 10px;">
        <div style="font-size: 20px; font-weight: bold; color: #d40000;">M.S. PAREEKUTTY SONS</div>
        <div style="font-size: 16px; font-weight: bold; color: #000066;">ICE FISH MERCHANTS</div>
        <div style="font-size: 13px; margin-top: 5px;">Fish Market Road, Perumbavoor, Cochin, Kerala.<br>Mobile-Offi: 9947770468</div>
        <div style="font-size: 13px;">DATE: ${new Date(dateOfPurchase).toLocaleDateString("en-GB")}</div>
      </div>

      <div style="margin-top: 10px;">
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <colgroup>
            <col style="width: 18%;">
            <col style="width: 42%;">
            <col style="width: 15%;">
            <col style="width: 25%;">
          </colgroup>
          <tr>
            <td style="font-weight: bold; color: #000; padding: 8px; text-align: left; border: none;">Supplier Name:</td>
            <td style="font-weight: bold; color: #006600; padding: 8px; text-align: left; border: none;">${selectedSupplier?.supplierName || "-"}</td>
            <td style="font-weight: bold; color: #000; padding: 8px; text-align: left; border: none;">Purchase No:</td>
            <td style="font-weight: bold; color: #006600; padding: 8px; text-align: left; border: none;">${purchaseCount || "-"}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; color: #000; padding: 8px; text-align: left; border: none;">Address:</td>
            <td colspan="3" style="font-weight: bold; color: #006600; padding: 8px; text-align: left; border: none;">${selectedSupplier?.address || "-"}</td>
          </tr>
        </table>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <thead>
          <tr>
            <th style="border: 1px solid #000; padding: 8px; text-align: center; background-color: #e0e0e0;">No</th>
            <th style="border: 1px solid #000; padding: 8px; text-align: center; background-color: #e0e0e0;">Item Name</th>
            <th style="border: 1px solid #000; padding: 8px; text-align: center; background-color: #e0e0e0;">Unit Price</th>
            <th style="border: 1px solid #000; padding: 8px; text-align: center; background-color: #e0e0e0;">Qty</th>
            <th style="border: 1px solid #000; padding: 8px; text-align: center; background-color: #e0e0e0;">Box / Kgs</th>
            <th style="border: 1px solid #000; padding: 8px; text-align: center; background-color: #e0e0e0;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${items
            .map(
              (item, index) => `
              <tr>
                <td style="border: 1px solid #000; padding: 8px; text-align: center;">${index + 1}</td>
                <td style="border: 1px solid #000; padding: 8px; text-align: center;">${item.name}</td>
                <td style="border: 1px solid #000; padding: 8px; text-align: center;">${item.price}</td>
                <td style="border: 1px solid #000; padding: 8px; text-align: center;">${item.kg || item.box}</td>
                <td style="border: 1px solid #000; padding: 8px; text-align: center;">${item.kg ? "KG" : "BOX"}</td>
                <td style="border: 1px solid #000; padding: 8px; text-align: center;">${item.total}</td>
              </tr>`
            )
            .join("")}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="border: 1px solid #000; padding: 8px; text-align: left; font-weight: bold;">Total</td>
            <td style="border: 1px solid #000; padding: 8px;"></td>
            <td style="border: 1px solid #000; padding: 8px; text-align: center; font-weight: bold; color: #006600;">${totalQuantityInBox + totalQuantityInKg}</td>
            <td style="border: 1px solid #000; padding: 8px; text-align: center; font-weight: bold;">${
              totalQuantityInBox > 0 ? totalQuantityInBox + " Box" : ""
            }${totalQuantityInKg > 0 ? " / " + totalQuantityInKg + " Kg" : ""}</td>
            <td style="border: 1px solid #000; padding: 8px; text-align: center;">${totalPrice}</td>
          </tr>
        </tfoot>
      </table>

      <div style="margin-top: 10px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 4px 8px; text-align: left; border: none;">Commission:</td>
            <td style="padding: 4px 8px; text-align: left; border: none;">₹${commission?.toFixed(2) || "0.00"}</td>
          </tr>
          <tr>
            <td style="padding: 4px 8px; text-align: left; border: none;">Expense:</td>
            <td style="padding: 4px 8px; text-align: left; border: none;">₹${marketFee?.toFixed(2) || "0.00"}</td>
          </tr>
          <tr>
            <td style="padding: 4px 8px; text-align: left; border: none; font-weight: bold;">Grand Total:</td>
            <td style="padding: 4px 8px; text-align: left; border: none; font-weight: bold;">₹${(
              totalPrice - totalDeduction
            ).toFixed(2)}</td>
          </tr>
        </table>
      </div>
    `;

    document.body.appendChild(container);

    try {
      const canvas = await html2canvas(container, { 
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true
      });
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