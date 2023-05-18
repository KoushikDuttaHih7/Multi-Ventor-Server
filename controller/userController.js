const UserModel = require("../model/userModel");
const path = require("path");
// const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;

  const userEmail = await UserModel.findOne({ email });
  if (userEmail) {
    const filename = req.file.filename;
    const filePath = `uploads/${filename}`;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Error Deleting File" });
      } else {
        res.jsom({ message: "File Deleted successfully" });
      }
    });
    return next(new ErrorHandler("User Already Exist", 400));
  }

  const filename = req.file.filename;
  const fileUrl = path.join(filename);
  const avatar = fileUrl;

  const user = {
    name,
    email,
    password,
    avatar,
  };
  // console.log(user);
  const newUser = await UserModel.create(user);
  res.status(201).json({
    success: true,
    newUser,
  });
};
