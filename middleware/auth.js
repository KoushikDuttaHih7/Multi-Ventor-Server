const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/userModel");
const { JWT_SECRET_KEY } = process.env;

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(token, JWT_SECRET_KEY);

  req.user = await UserModel.findById(decoded.id);

  next();
});
