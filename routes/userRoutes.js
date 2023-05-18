const express = require("express");
const { register, activateUser } = require("../controller/userController");
const router = express.Router();
const { upload } = require("../multer");

router.post("/sign-up", upload.single("file"), register);
router.post("/activation", activateUser);

module.exports = router;
