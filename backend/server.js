const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 3000;
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");

//rest object
const app = express();

//middleware
app.use(express.json());

//routes
app.use("/", authRoutes);

//rest api
app.listen(PORT, () => console.log(`server is listening in port ${PORT}`));
