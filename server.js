const app = require("./app");
require("dotenv").config();
const colors = require("colors");

const PORT = process.env.PORT;
const connectDatabase = require("./db/database");

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error ${err.message}`);
  console.log(`Shutting Down the server for handling uncaught exception`);
});

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: ".env",
  });
}

// connect Database
connectDatabase();

// Create server
const server = app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`Shutting Down the server for unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
