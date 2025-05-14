const express = require("express");
const router = express.Router();
const {
  getLenders,
  addLender,
  deleteLender
} = require("../../../controllers/admin/lender/adminLender");
const verifyJwt = require("../../../middleware/verifyJwt");
router.get("/get",verifyJwt, getLenders);
router.post("/add", verifyJwt, addLender);
router.delete("/delete/:id",verifyJwt, deleteLender);

module.exports = router;
