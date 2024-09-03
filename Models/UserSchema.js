const { date } = require("@hapi/joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const addUser = new Schema({
  PhoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
});
//creating a hashed password
addUser.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash(this.Password, salt);
    this.Password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

//Validating the password entered by client
addUser.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.Password);
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("UserSchema", addUser, "UserSchema");
