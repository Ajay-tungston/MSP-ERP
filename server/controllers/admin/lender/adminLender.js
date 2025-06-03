const Lender = require("../../../models/Lender");
const Payment = require("../../../models/Payment");

// GET /admin/lender
exports.getLenders = async (req, res) => {
  try {
    let { page = 1, limit = 8, search = "" } = req.query;

    // Ensure page and limit are integers
    page = parseInt(page);
    limit = parseInt(limit);

    // Create a query object to search by name or phone
    const query = {};

    // If search query is provided, filter by name or phone (case-insensitive)
    if (search) {
      const regex = new RegExp(".*" + search.trim() + ".*", "i");
      query.name = regex;
    }

    // Get total number of lenders matching the query
    const total = await Lender.countDocuments(query);

    // Get the lenders with pagination
    const lenders = await Lender.find(query)
      .sort({ createdAt: -1 }) // Newest first
      .skip((page - 1) * limit) // Skip for pagination
      .limit(limit); // Limit the number of results

    // Return lenders, total count, total pages, and current page
    res.status(200).json({
      lenders,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error("Error in getLenders:", err);
    res.status(500).json({ message: "Failed to fetch lenders" });
  }
};

// POST /admin/lender/add
exports.addLender = async (req, res) => {
  const { name, phone, address, openingBalance } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ message: "Name and phone are required." });
  }

  try {
    const newLender = new Lender({
      name,
      phone,
      address: address || "",
      openingBalance: Number(openingBalance) || 0,
    });

    await newLender.save();
    res.status(201).json(newLender);
  } catch (err) {
    console.error("Error adding lender:", err);
    res.status(500).json({ message: "Failed to add lender." });
  }
};

// DELETE /admin/lender/:id
exports.deleteLender = async (req, res) => {
  try {
    const lenderId = req.params.id;

    // Check if any payment is linked to this lender
    const linkedPayment = await Payment.findOne({ lender: lenderId });

    if (linkedPayment) {
      return res.status(400).json({
        message: "Cannot delete lender as it is linked to a payment.",
      });
    }

    // Proceed with deletion if not linked
    const deleted = await Lender.findByIdAndDelete(lenderId);

    if (!deleted) {
      return res.status(404).json({ message: "Lender not found." });
    }

    res.status(200).json({ message: "Lender deleted successfully." });
  } catch (err) {
    console.error("Error deleting lender:", err);
    res.status(500).json({ message: "Failed to delete lender." });
  }
};

// GET /admin/lender/all
exports.getAllLendersList = async (req, res) => {
  try {
    const search = req.query.search || "";
    const query = search ? { name: { $regex: search, $options: "i" } } : {};

    const lenders = await Lender.find(query);
    return res.status(200).json(lenders);
  } catch (error) {
    console.error("Error getting lenders list:", error);
    return res.status(500).json({ message: "Error getting lender" });
  }
};

// PUT /admin/lender/update/:id
exports.updateLender = async (req, res) => {
  const { id } = req.params;
  const { name, phone, address, openingBalance } = req.body;

  if (!name || name.trim().length < 3) {
    return res
      .status(400)
      .json({ message: "Lender name must be at least 3 characters long." });
  }

  if (!phone || phone.trim().length < 7) {
    return res.status(400).json({ message: "Phone number is invalid." });
  }

  try {
    const updatedLender = await Lender.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        phone: phone.trim(),
        address: address?.trim() || "",
        openingBalance: Number(openingBalance) || 0,
      },
      { new: true }
    );

    if (!updatedLender) {
      return res.status(404).json({ message: "Lender not found." });
    }

    res
      .status(200)
      .json({ message: "Lender updated successfully.", lender: updatedLender });
  } catch (error) {
    console.error("Error updating lender:", error);
    res.status(500).json({ message: "Failed to update lender." });
  }
};
