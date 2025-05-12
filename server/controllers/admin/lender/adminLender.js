const Lender = require("../../../models/Lender");

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
      const regex = new RegExp(search, "i");
      query.$or = [{ name: regex }, { phone: regex }];
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
  const { name, phone, address, } = req.body;
  if (!name || !phone ) {
    return res.status(400).json({ message: "Name, phone, and address are required." });
  }
  try {
    const newLender = new Lender({ name, phone, address:address || "",});
    await newLender.save();
    res.status(201).json(newLender);
  } catch (err) {
    res.status(500).json({ message: "Failed to add lender." });
  }
};

// DELETE /admin/lender/:id
exports.deleteLender = async (req, res) => {
  try {
    await Lender.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Lender deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete lender." });
  }
};
