const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String },
    role: { type: String, default: "user", enum: ["user", "admin"] },
  },
  { timestaps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;