const express = require("express");
const {
  register,
  activateUser,
  loginUser,
  getUser,
  logout,
} = require("../controller/userController");
const router = express.Router();
const { upload } = require("../multer");
const { isAuthenticated } = require("../middleware/auth");

router.post("/sign-up", upload.single("file"), register);
router.post("/activation", activateUser);
router.post("/login", loginUser);
router.get("/getUser", isAuthenticated, getUser);
router.get("/logout", isAuthenticated, logout);

module.exports = router;
