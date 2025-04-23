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

    const totalSuppliers = await Supplier.countDocuments();

    if (totalSuppliers === 0) {
      return res.status(200).json({
        currentPage: page,
        totalPages: 0,
        totalSuppliers: 0,
        suppliers: [],
      });
    }

    const suppliers = await Supplier.find().skip(skip).limit(limit);

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
const deleteSuppliers = async (req, res) => {
  try {
    const { supplierIds } = req.body;

    if (!Array.isArray(supplierIds) || supplierIds.length === 0) {
      return res
        .status(400)
        .json({ message: "Please provide a valid list of supplier IDs." });
    }
    const result = await Supplier.deleteMany({ _id: { $in: supplierIds } });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    return res.status(200).json({
      message: `${result.deletedCount} suppliers deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error deleting suppliers" });
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
      "supplierName supplierCode commission"
    );
    return res.status(200).json(suppliers);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error getting suppliers" });
  }
};

module.exports = {
  addNewSupplier,
  getAllSuppliers,
  deleteSuppliers,
  getSupplierList,
};
