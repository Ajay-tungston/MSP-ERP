const express = require("express");
const router = express.Router();
const {
  getLenders,
  addLender,
  deleteLender
} = require("../../../controllers/admin/lender/adminLender");

router.get("/admin/lender", getLenders);
router.post("/admin/lender/add", addLender);
router.delete("/admin/lender/:id", deleteLender);

module.exports = router;
