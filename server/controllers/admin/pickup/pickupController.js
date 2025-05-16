const Pickup = require("../../../models/Pickup");
const validator = require("validator");

// Add a new Pickup
const addNewPickup = async (req, res) => {
  try {
    const { name, route, phone,date, address, vehicleNo, licenseNo, rate } = req.body;

    // Required fields validation
    if (!name || !route || !phone || !date || !vehicleNo || !licenseNo || !rate) {
      return res.status(400).json({ message: "Please fill in all required fields" });
    }

    // Validate name
    if (
      !validator.isAlphanumeric(name, "en-US", { ignore: " " }) ||
      name.length < 3 ||
      name.length > 100
    ) {
      return res.status(400).json({
        message: "Name must be alphanumeric and between 3 to 100 characters",
      });
    }

    // Validate phone
    if (
      !validator.isMobilePhone(phone, "any", { strictMode: false }) ||
      phone.length !== 10
    ) {
      return res.status(400).json({ message: "Phone number must be 10 digits" });
    }

    // Validate rate
    if (!validator.isNumeric(rate.toString()) || parseFloat(rate) < 0) {
      return res.status(400).json({ message: "Rate must be a valid number" });
    }

    // Check for existing vehicleNo or licenseNo
    const existing = await Pickup.findOne({
      $or: [{ vehicleNo }, { licenseNo }],
    });
    if (existing) {
      return res.status(400).json({
        message: "Pickup with the same vehicle number or license already exists",
      });
    }

    const newPickup = new Pickup({
      name,
      route,
      phone,
      date,
      address,
      vehicleNo,
      licenseNo,
      rate,
    });

    await newPickup.save();
    return res.status(201).json({ message: "Pickup added successfully", newPickup });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error adding pickup" });
  }
};

// Get all pickups (with pagination and search)
const getAllPickups = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || "";

    const searchQuery = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { route: { $regex: search, $options: "i" } },
            { phone: { $regex: search, $options: "i" } },
            { vehicleNo: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const totalPickups = await Pickup.countDocuments(searchQuery);

    const pickups = await Pickup.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalPickups / limit),
      totalPickups,
      pickups,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error getting pickups" });
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
    return res.status(500).json({ message: "Error fetching pickup", error: error.message });
  }
};

// Get simplified pickup list (e.g. for dropdowns)
const getPickupList = async (req, res) => {
  try {
    const search = req.query.search || "";
    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { route: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const list = await Pickup.find(query).select("name route vehicleNo licenseNo");

    return res.status(200).json(list);
  } catch (error) {
    return res.status(500).json({ message: "Error getting pickup list" });
  }
};

// Update a pickup
const updatePickup = async (req, res) => {
  const { id } = req.params;
  const { name, route, phone, address, vehicleNo, licenseNo, rate } = req.body;

  try {
    const existingPickup = await Pickup.findById(id);
    if (!existingPickup) {
      return res.status(404).json({ message: "Pickup not found" });
    }

    const duplicate = await Pickup.findOne({
      _id: { $ne: id },
      $or: [{ vehicleNo }, { licenseNo }],
    });
    if (duplicate) {
      return res
        .status(400)
        .json({ message: "Another pickup with same vehicle/license exists" });
    }

    const updatedPickup = await Pickup.findByIdAndUpdate(
      id,
      { name, route, phone, address, vehicleNo, licenseNo, rate },
      { new: true, runValidators: true }
    );

    return res.status(200).json({ message: "Pickup updated", updatedPickup });
  } catch (error) {
    return res.status(500).json({ message: "Error updating pickup" });
  }
};

// Delete pickup
const deletePickup = async (req, res) => {
  try {
    const { id } = req.params;

    const pickup = await Pickup.findById(id);
    if (!pickup) {
      return res.status(404).json({ message: "Pickup not found" });
    }

    await Pickup.findByIdAndDelete(id);

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
