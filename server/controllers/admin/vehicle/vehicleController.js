const Vehicle = require("../../../models/Vehicle");
const Payment = require("../../../models/Payment");

// Add a new Vehicle
const addNewVehicle = async (req, res) => {
  try {
    const { vehicleName, vehicleNo, rcNo } = req.body;

    if (!vehicleName || !vehicleNo || !rcNo) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Vehicle.findOne({
      $or: [{ vehicleNo }, { rcNo }],
    });
    if (existing) {
      return res.status(400).json({
        message: "Vehicle with the same vehicle number or RC number already exists",
      });
    }

    const newVehicle = new Vehicle({ vehicleName, vehicleNo, rcNo });
    await newVehicle.save();

    return res.status(201).json({ message: "Vehicle added successfully", newVehicle });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error adding vehicle" });
  }
};

// Get all vehicles
const getAllVehicles = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const query = {
      vehicleName: { $regex: search, $options: "i" } // case-insensitive search
    };
    
    const totalCount = await Vehicle.countDocuments(query);
    const vehicles = await Vehicle.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));
    
    console.log(vehicles)
    return res.status(200).json({
      data: vehicles,
      currentPage: Number(page),
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
    });
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return res.status(500).json({ message: "Error fetching vehicles" });
  }
};


// Get single vehicle by ID
const getVehicleById = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    return res.status(200).json(vehicle);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching vehicle" });
  }
};

// Get simplified list (for dropdowns)
const getVehicleList = async (req, res) => {
  try {
    const list = await Vehicle.find().select("vehicleName vehicleNo rcNo");
    return res.status(200).json(list);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching vehicle list" });
  }
};

// Update vehicle
const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const { vehicleName, vehicleNo, rcNo } = req.body;

    if (!vehicleName || !vehicleNo || !rcNo) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Vehicle.findOne({
      _id: { $ne: id },
      $or: [{ vehicleNo }, { rcNo }],
    });
    if (existing) {
      return res.status(400).json({
        message: "Another vehicle with same vehicle number or RC number exists",
      });
    }

    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      id,
      { vehicleName, vehicleNo, rcNo },
      { new: true, runValidators: true }
    );

    if (!updatedVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    return res.status(200).json({ message: "Vehicle updated", updatedVehicle });
  } catch (error) {
    return res.status(500).json({ message: "Error updating vehicle" });
  }
};

// Delete vehicle
const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if vehicle is used in any payment
    const isUsed = await Payment.findOne({
      category: "vehicle",
      vehicle: id,
    });

    if (isUsed) {
      return res.status(400).json({
        message: "Cannot delete: Vehicle is referenced in payment records.",
      });
    }

    // Proceed to delete if not used
    const deleted = await Vehicle.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    return res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    return res.status(500).json({ message: "Error deleting vehicle" });
  }
};

// Get vehicles by date range with pagination
const getVehiclesByDateRange = async (req, res) => {
  try {
    const { from, to, page = 1, limit = 8 } = req.query;

    if (!from || !to) {
      return res.status(400).json({ message: "From and to dates are required" });
    }

    const fromDate = new Date(from);
    const toDate = new Date(to);
    toDate.setHours(23, 59, 59, 999);

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [vehicles, totalCount] = await Promise.all([
      Vehicle.find({
        createdAt: {
          $gte: fromDate,
          $lte: toDate,
        },
      })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Vehicle.countDocuments({
        createdAt: {
          $gte: fromDate,
          $lte: toDate,
        },
      }),
    ]);

    return res.status(200).json({
      data: vehicles,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
    });
  } catch (error) {
    console.error("Error fetching vehicles by date range:", error);
    return res.status(500).json({ message: "Error fetching vehicles by date range" });
  }
};

// Get vehicle payments with pagination
const getVehiclePayments = async (req, res) => {
  try {
    const { from, to, page = 1, limit = 8 } = req.query;

    const query = { category: "vehicle" };

    if (from && to) {
      query.date = {
        $gte: new Date(from),
        $lte: new Date(new Date(to).setHours(23, 59, 59, 999)),
      };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [vehiclePayments, totalCount] = await Promise.all([
      Payment.find(query)
        .populate("vehicle", "vehicleName vehicleNo rcNo")
        .sort({ date: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Payment.countDocuments(query),
    ]);

    res.status(200).json({
      data: vehiclePayments,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
    });
  } catch (error) {
    console.error("Error fetching vehicle payments:", error);
    res.status(500).json({ message: "Failed to fetch vehicle payments" });
  }
};

module.exports = {
  addNewVehicle,
  getAllVehicles,
  getVehicleById,
  getVehicleList,
  updateVehicle,
  deleteVehicle,
  getVehiclesByDateRange,
  getVehiclePayments,
};
