const mongoose = require("mongoose");
require("dotenv").config();

function connectDB() {
  return mongoose.connect(process.env.CONNECTION_STRING);
}

module.exports = connectDB;
