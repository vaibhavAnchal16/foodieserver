const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// create student schema & model
const UserSchema = new Schema({
  first_name: {
    type: String,
    required: [true, "First name is required"],
  },
  last_name: {
    type: String,
    required: [true, "Last name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  token: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
