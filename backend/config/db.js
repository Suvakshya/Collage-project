const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const URL = process.env.MONGODB_URL;
mongoose.connect(URL);
const db = mongoose.connection
  .on("connected", () => console.log("connection success"))
  .on("disconnected", () => console.log("disconnected "))
  .on("error", (error) => console.log(error));

module.exports = db;
