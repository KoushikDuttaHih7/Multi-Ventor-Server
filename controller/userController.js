const UserModel = require("../model/userModel");
const path = require("path");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const { FRONTEND_URL, ACTIVATION_SECRET } = process.env;

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userEmail = await UserModel.findOne({ email });
    if (userEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error Deleting File" });
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

    const activationToken = createActivationToken(user);

    const activationUrl = `${FRONTEND_URL}/activation/${activationToken}`;
    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, Please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email:- ${user.email} to activate your account`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// Create Activation Token
const createActivationToken = (user) => {
  return jwt.sign(user, ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// Activate User
exports.activateUser = catchAsyncError(async (req, res, next) => {
  try {
    const { activation_token } = req.body;
    const user = jwt.verify(activation_token, ACTIVATION_SECRET);
    if (!user) {
      return next(new ErrorHandler("Invalid Token", 400));
    }
    const { name, email, password, avatar } = user;

    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return next(new ErrorHandler("User Already Exist", 400));
    }

    newUser = await UserModel.create({
      name,
      email,
      password,
      avatar,
    });
    sendToken(newUser, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
