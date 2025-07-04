const Payment = require("../../../models/Payment");
const PurchaseEntry = require("../../../models/PurchaseEntry");
const Supplier = require("../../../models/Supplier");
const validator = require("validator");

const addNewSupplier = async (req, res) => {
  try {
    const {
      supplierCode,
      supplierName,
      address,
      phone,
      whatsapp,
      advance,
      advanceDeducted,
      commission,
      marketFee
    } = req.body;

    //required feilds
    if (!supplierCode || !supplierName || !phone) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    if (
      supplierCode &&
      (!validator.isAlphanumeric(supplierCode) ||
        supplierCode.length < 3 ||
        supplierCode.length > 10)
    ) {
      return res.status(400).json({
        message:
          "Supplier code must be alphanumeric and between 3 and 10 characters long",
      });
    }

    //checking for duplicates
    const existingSupplier = await Supplier.findOne({ supplierCode });
    if (existingSupplier) {
      return res.status(400).json({ message: "Supplier code must be unique" });
    }

    if (
      !validator.isAlphanumeric(supplierName, "en-US", { ignore: " " }) ||
      supplierName.length < 3 ||
      supplierName.length > 100
    ) {
      return res.status(400).json({
        message:
          "Supplier name should be alphanumeric and between 3 to 100 characters long",
      });
    }

    if (address && (address.length < 5 || address.length > 200)) {
      return res
        .status(400)
        .json({ message: "Address must be between 5 and 200 characters long" });
    }

    if (
      !validator.isMobilePhone(phone, "any", { strictMode: false }) ||
      phone.length !== 10
    ) {
      return res.status(400).json({
        message: "Invalid phone number format, it should be 10 digits",
      });
    }

    if (
      whatsapp &&
      (!validator.isMobilePhone(whatsapp, "any", { strictMode: false }) ||
        whatsapp.length !== 10)
    ) {
      return res.status(400).json({
        message: "Invalid WhatsApp number format. It must be 10 digits.",
      });
    }

    if (advance && (!validator.isNumeric(advance.toString()) || advance < 0)) {
      return res
        .status(400)
        .json({ message: "Advance must be a valid non-negative number" });
    }

    if (
      advanceDeducted &&
      (!validator.isNumeric(advanceDeducted.toString()) || advanceDeducted < 0)
    ) {
      return res.status(400).json({
        message: "Advance deducted must be a valid non-negative number",
      });
    }

    if (
      commission &&
      (!validator.isNumeric(commission.toString()) ||
        commission < 0 ||
        commission > 100)
    ) {
      return res.status(400).json({
        message: "Commission must be a number between 0 and 100 (inclusive)",
      });
    }
    if (marketFee && (!validator.isNumeric(marketFee.toString()) || marketFee < 0)) {
      return res
        .status(400)
        .json({ message: "marketFee must be a valid non-negative number" });
    }

    // const lastSupplier = await Supplier.findOne().sort({ no: -1 });
    // const nextNo = lastSupplier ? lastSupplier.no + 1 : 1;
    // const supplierCode = `S${nextNo}`;

    const newSupplier = new Supplier({
      supplierCode,
      supplierName,
      address,
      phone,
      whatsapp,
      advance,
      advanceDeducted,
      commission,
      marketFee
    });
    await newSupplier.save();
    return res
      .status(201)
      .json({ message: "Supplier added successfully", newSupplier });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error adding supplier" });
  }
};

const getAllSuppliers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search || "";

    const searchQuery = search
      ? {
          $or: [
            { supplierName: { $regex: search, $options: "i" } },
            { supplierCode: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const totalSuppliers = await Supplier.countDocuments();

    if (totalSuppliers === 0) {
      return res.status(200).json({
        currentPage: page,
        totalPages: 0,
        totalSuppliers: 0,
        suppliers: [],
      });
    }

    const suppliers = await Supplier.find(searchQuery)
      .sort({ createdAt: -1 })  
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalSuppliers / limit),
      totalSuppliers,
      suppliers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error getting suppliers" });
  }
};

//need to add logic for check the supplier has any transcations
const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;

    const supplier = await Supplier.findById(id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    const hasPurchases = await PurchaseEntry.exists({ supplier: id });
    if (hasPurchases) {
      return res.status(400).json({
        message: "Cannot delete: This supplier is linked with one or more purchases.",
      });
    }

    const hasPayments = await Payment.exists({
      category: "supplier",
      supplier: id,
    });
    if (hasPayments) {
      return res.status(400).json({
        message: "Cannot delete: This supplier is linked with one or more payments.",
      });
    }

    await Supplier.findByIdAndDelete(id);

    return res.status(200).json({ message: "Supplier deleted successfully." });
  } catch (error) {
    console.error("Error deleting supplier:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

//select supplier in purchase bill
const getSupplierList = async (req, res) => {
  try {
    const search = req.query.search || "";
    const query = search
      ? {
          $or: [
            { supplierName: { $regex: search, $options: "i" } },
            { supplierCode: { $regex: search, $options: "i" } },
          ],
        }
      : {};
    const suppliers = await Supplier.find(query).select(
      "supplierName supplierCode commission marketFee address whatsapp advanceDeducted"
    );
    return res.status(200).json(suppliers);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error getting suppliers" });
  }
};

const updateSupplier = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      id,
      {
        $set: req.body, // only update fields that are provided in body
      },
      { new: true, runValidators: true }
    );

    if (!updatedSupplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json(updatedSupplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleSupplier = async (req, res) => {
  const { id } = req.params;

  try {
    const supplier = await Supplier.findById(id);

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getSupplierAdvance = async (req, res) => {
  try {
    const supplierId  = req.params.id;

    if (!supplierId) {
      return res.status(400).json({ message: "Supplier ID is required." });
    }

    const supplier = await Supplier.findById(supplierId);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found." });
    }

    const purchases = await PurchaseEntry.find({ supplier: supplierId }).lean();
    const payments = await Payment.find({
      supplier: supplierId,
      paymentType: { $in: ["PaymentOut", "PaymentIn"] },
      category: "supplier",
    }).lean();

    // let balance = supplier.openingBalance || 0;
    let balance =0;

    // Add purchases (increase what we owe)
    purchases.forEach((purchase) => {
      balance += purchase.netTotalAmount;
    });

    // Apply payments
    payments.forEach((payment) => {
      if (payment.paymentType === "PaymentOut") {
        balance -= payment.amount; // We paid the supplier
      } else if (payment.paymentType === "PaymentIn") {
        balance += payment.amount; // Supplier returned money
      }
    });

    let advanceAmount = 0;
    if (balance < 0) {
      advanceAmount = Math.abs(balance);
    }

    res.json({
      supplierId,
      supplierName: supplier.supplierName,
      advanceAmount: Number(advanceAmount.toFixed(2)),
      status: advanceAmount > 0 ? "Advance Given" : "No Advance",
    });
  } catch (err) {
    console.error("Error in getSupplierAdvance:", err);
    res.status(500).json({ message: "Failed to fetch supplier advance." });
  }
};


module.exports = {
  addNewSupplier,
  getAllSuppliers,
  deleteSupplier,
  getSupplierList,
  updateSupplier,
  getSingleSupplier,
  getSupplierAdvance
};
