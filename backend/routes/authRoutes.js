const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/authController");

//router object
const router = express.Router();

//ROURING
router.post("/register", registerController);
router.post("/login", loginController);

module.exports = router;
