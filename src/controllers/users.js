const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const allUsers = asyncHandler(async (_, res) => {
  const users = await User.find({});
  return res.json(users);
});

const createUser = asyncHandler(async (req, res) => {
  const { username, firstName, lastName, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const error = new Error("Email already exists.");
    error.statusCode = 400;
    throw error;
  }
  const newUser = await User.create({
    username,
    firstName,
    lastName,
    email,
    password,
    role,
  });

  return res.json({
    newUser,
    token: generateToken(newUser._id, newUser.role),
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("Invalid credentials.");
    error.statusCode = 400;
    throw error;
  }
  if (await bcrypt.compare(password, user.password)) {
    return res.json({
      _id: user.id,
      name: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } else {
    const error = new Error("Invalid credentials.");
    error.statusCode = 400;
    throw error;
  }
});

function generateToken(id, role) {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}

module.exports = {
  allUsers,
  createUser,
  loginUser,
};
