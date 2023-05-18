const express = require("express");
const {
  register,
  activateUser,
  loginUser,
} = require("../controller/userController");
const router = express.Router();
const { upload } = require("../multer");

router.post("/sign-up", upload.single("file"), register);
router.post("/activation", activateUser);
router.post("/login", loginUser);

module.exports = router;
