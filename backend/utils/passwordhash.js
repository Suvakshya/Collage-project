const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    //generate slat
    const salt = await bcrypt.genSalt(10);
    //hashing the password
    const hashedpassword = await bcrypt.hash(password, salt);
    return hashedpassword;
  } catch (error) {
    console.log(error);
  }
};

const comparePassword = async (password, hashedpassword) => {
  return bcrypt.compare(password, hashedpassword);
};
module.exports = { hashPassword, comparePassword };
