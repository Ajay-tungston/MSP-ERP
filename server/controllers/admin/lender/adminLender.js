const Lender = require("../../../models/Lender");

// GET /admin/lender
exports.getLenders = async (req, res) => {
  try {
    const lenders = await Lender.find();
    res.status(200).json(lenders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch lenders" });
  }
};

// POST /admin/lender/add
exports.addLender = async (req, res) => {
  const { name, phone, address, } = req.body;
  if (!name || !phone || !address) {
    return res.status(400).json({ message: "Name, phone, and address are required." });
  }
  try {
    const newLender = new Lender({ name, phone, address,});
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
