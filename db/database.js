const mongoose = require("mongoose");

const MONGODB_URL = process.env.DB_URL;

const connectDatabase = () => {
  mongoose
    .connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(
        `Mongodb connected with server: ${data.connection.host}`.cyan
      );
    });
};

module.exports = connectDatabase;
