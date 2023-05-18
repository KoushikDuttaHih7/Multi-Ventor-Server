const express = require("express");
const ErrorHandler = require("./middleware/errorMidleware");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", express.static("uploads"));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: ".env",
  });
}

// Import Routes
const user = require("./routes/userRoutes");

app.use("/api/v1/user", user);

// ErrorHandler
app.use(ErrorHandler);

module.exports = app;
