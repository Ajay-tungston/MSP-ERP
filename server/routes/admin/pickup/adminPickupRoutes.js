const express = require("express");
const router = express.Router();
const verifyJwt = require("../../../middleware/verifyJwt");
const {
  addNewPickup,
  getAllPickups,
  getPickupById,
  getPickupList,
  updatePickup,
  deletePickup,
} = require("../../../controllers/admin/pickup/pickupController");

router.post("/add", verifyJwt, addNewPickup);
router.get("/get", verifyJwt, getAllPickups);
router.get("/get/:id", verifyJwt, getPickupById);
router.get("/list", verifyJwt,getPickupList);
router.put("/update/:id", verifyJwt, updatePickup);
router.delete("/delete/:id", verifyJwt, deletePickup);

module.exports = router;
                                               