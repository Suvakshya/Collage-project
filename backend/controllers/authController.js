const userModel = require("../models/userModel");
const { hashPassword, comparePassword } = require("../utils/passwordhash");
const dotenv = require("dotenv").config();
const JWT = require("jsonwebtoken");

//REGISTER
const registerController = async (req, res) => {
  try {
    const { name, email, address, phone, password } = req.body;
    if (!name) return res.send({ message: "name is required" });
    if (!email) return res.send({ message: "email is required" });
    if (!address) return res.send({ message: "address is required" });
    if (!phone) return res.send({ message: "phone is required" });
    if (!password) return res.send({ message: "password is required" });

    //cheaking for exgisting user
    const exgistingUser = await userModel.findOne({ email: email });
    if (exgistingUser) {
      return res.status(200).send({
        success: false,
        message: "user already exist please login",
      });
    }
    //hashing the password
    const hashedPassword = await hashPassword(password);
    //creating new user
    const user = await new userModel({
      name,
      email,
      address,
      phone,
      password: hashedPassword, //changing the plain password with the hashed password
    }).save();
    res.status(201).send({
      success: true,
      message: "user Registerd succesfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in registration",
      error,
    });
  }
};

//LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "email and password are required",
      });
    }
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.send(404).send({
        success: false,
        message: "User is not registerd",
      });
    }
    //comparing the password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "invalid password",
      });
    }
    //if password matched then we generate  a jwt token
    const token = JWT.sign({ user }, process.env.JWT_SECRETE, {
      expiresIn: "2d",
    });
    //sending the succes token and user detail
    res.status(200).send({
      success: true,
      message: "login successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error during login ",
      error,
    });
  }
};
module.exports = { registerController, loginController };
