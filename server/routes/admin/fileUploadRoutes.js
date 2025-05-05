const express = require("express");
const router = express.Router();
const { uploadPdf } = require("../../controllers/admin/fileUploadController");
const upload = require("../../middleware/multer");

router.post("/upload-pdf", upload.single("pdf"),uploadPdf);


module.exports = router;
