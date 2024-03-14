const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModal");
const config = require("../config/config");

const generateAccessToken = (user) => {
  return jwt.sign(user, config.jwtSecret, { expiresIn: "1h" });
};

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = generateAccessToken({ email: newUser.email });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = generateAccessToken({ email: user.email });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signup, login };
