const Pickup = require("../../../models/Pickup");

// Add a new Pickup
const addNewPickup = async (req, res) => {
  try {
    const { vehicleName, vehicleNo, rcNo } = req.body;

    if (!vehicleName || !vehicleNo || !rcNo) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Pickup.findOne({
      $or: [{ vehicleNo }, { rcNo }],
    });
    if (existing) {
      return res.status(400).json({
        message: "Pickup with the same vehicle number or RC number already exists",
      });
    }

    const newPickup = new Pickup({ vehicleName, vehicleNo, rcNo });
    await newPickup.save();

    return res.status(201).json({ message: "Pickup added successfully", newPickup });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error adding pickup" });
  }
};

// Get all pickups (optionally paginated)
const getAllPickups = async (req, res) => {
  try {
    const pickups = await Pickup.find().sort({ createdAt: -1 });
    return res.status(200).json(pickups);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching pickups" });
  }
};

// Get single pickup by ID
const getPickupById = async (req, res) => {
  try {
    const { id } = req.params;
    const pickup = await Pickup.findById(id);
    if (!pickup) {
      return res.status(404).json({ message: "Pickup not found" });
    }
    return res.status(200).json(pickup);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching pickup" });
  }
};

// Get simplified list (for dropdowns)
const getPickupList = async (req, res) => {
  try {
    const list = await Pickup.find().select("vehicleName vehicleNo rcNo");
    return res.status(200).json(list);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching pickup list" });
  }
};

// Update pickup
const updatePickup = async (req, res) => {
  try {
    const { id } = req.params;
    const { vehicleName, vehicleNo, rcNo } = req.body;

    if (!vehicleName || !vehicleNo || !rcNo) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Pickup.findOne({
      _id: { $ne: id },
      $or: [{ vehicleNo }, { rcNo }],
    });
    if (existing) {
      return res.status(400).json({
        message: "Another pickup with same vehicle number or RC number exists",
      });
    }

    const updatedPickup = await Pickup.findByIdAndUpdate(
      id,
      { vehicleName, vehicleNo, rcNo },
      { new: true, runValidators: true }
    );

    if (!updatedPickup) {
      return res.status(404).json({ message: "Pickup not found" });
    }

    return res.status(200).json({ message: "Pickup updated", updatedPickup });
  } catch (error) {
    return res.status(500).json({ message: "Error updating pickup" });
  }
};

// Delete pickup
const deletePickup = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Pickup.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Pickup not found" });
    }

    return res.status(200).json({ message: "Pickup deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting pickup" });
  }
};

module.exports = {
  addNewPickup,
  getAllPickups,
  getPickupById,
  getPickupList,
  updatePickup,
  deletePickup,
};
