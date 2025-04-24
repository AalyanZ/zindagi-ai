const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  subscription: { type: String, enum: ["basic", "standard", "premium"], required: true }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
