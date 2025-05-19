const fs = require("fs");
const path = require("path");

const sanitize = (str) => str.replace(/[^a-z0-9]/gi, "-").toLowerCase();

const uploadPdf = async (req, res) => {
  try {
    const { billType, customerName, date } = req.body;
    const file = req.file;
    if (!billType || !customerName || !date || !file) {
      return res.status(400).json({ error: "Missing billType, customerName, date or file" });
    }

    // Normalize inputs
    const normalizedBillType = sanitize(billType.trim());
    const normalizedCustomer = sanitize(customerName.trim());
    const safeDate = new Date(date).toISOString().split("T")[0];

    const fileName = `${normalizedBillType}-${normalizedCustomer}-${safeDate}.pdf`;
    const uploadDir = path.join(__dirname, "../../public/uploads");
    const uploadPath = path.join(uploadDir, fileName);
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${fileName}`;

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // ✅ File already exists: return link and remove the temp uploaded one
    if (fs.existsSync(uploadPath)) {
      fs.unlinkSync(uploadPath); // delete the old PDF
    }
    fs.renameSync(file.path, uploadPath);
    return res.status(200).json({ fileUrl });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
};

module.exports = { uploadPdf };
