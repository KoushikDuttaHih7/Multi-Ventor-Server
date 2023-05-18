const express = require("express");
const { register } = require("../controller/userController");
const router = express.Router();
const { upload } = require("../multer");

router.post("/sign-up", upload.single("file"), register);

module.exports = router;
