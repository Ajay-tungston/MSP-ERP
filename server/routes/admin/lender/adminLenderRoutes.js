const express = require("express");
const router = express.Router();
const {
  getLenders,
  addLender,
  deleteLender
} = require("../../../controllers/admin/lender/adminLender");

router.get("/get", getLenders);
router.post("/add", addLender);
router.delete("/delete/:id", deleteLender);

module.exports = router;
