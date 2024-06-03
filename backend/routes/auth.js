const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user.js");

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existinngUser = await User.findOne({ email });
    if (existinngUser) {
      return res
        .status(400)
        .json({ error: "Email adress is already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

router.post("/login", async (req, res) => {
try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res
          .status(401)
          .json({ error: "Invalid email" });
      }
      const isPasswordValid=await bcrypt.compare(password,user.password);
      if(!isPasswordValid){
        return res
        .status(401)
        .json({ error: "Invalid password" });
      }
      res.status(200).json({
        id:user._id,
        email:user.email,
        username:user.username,
        role:user.role
      });
} catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
}
})

router.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

router.get("/profile/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({
      id: user._id,
      email: user.email,
      username: user.username,
      address: user.address,
      role: user.role,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

router.put("/updateProfile", async (req, res) => {
  try {
    const {username, email, address } = req.body;
    const id = req.body._id || req.body.id;
    const user = await User.findById(id);
    console.log(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.address = address || user.address;

    await user.save();
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
