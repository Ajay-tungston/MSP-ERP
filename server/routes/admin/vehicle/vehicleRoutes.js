const express = require("express");
const router = express.Router();
const verifyJwt = require("../../../middleware/verifyJwt");

const {
  addNewVehicle,
  getAllVehicles,
  getVehicleById,
  getVehicleList,
  updateVehicle,
  deleteVehicle,
  getVehiclesByDateRange,
  getVehiclePayments
} = require("../../../controllers/admin/vehicle/vehicleController");

router.post("/add", verifyJwt, addNewVehicle);
router.get("/get", verifyJwt, getAllVehicles);
router.get("/get/:id", verifyJwt, getVehicleById);
router.get("/list", verifyJwt, getVehicleList);
router.put("/update/:id", verifyJwt, updateVehicle);
router.delete("/delete/:id", verifyJwt, deleteVehicle);
router.get("/payment", getVehiclePayments);
router.get("/date",verifyJwt,getVehiclesByDateRange);
module.exports = router;
