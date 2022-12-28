const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Client = require("../models/clientModel");
const { userInfo } = require("os");

// @desc    Register a new Client
// @route   /api/clients
// @access  Public
const registerClient = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //   Validation
  // If any fields are left empty
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // Find if client already exists
  const clientExists = await Client.findOne({ email });

  if (clientExists) {
    res.status(400);
    throw new Error("Client already exists");
  }

  // Hash out password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create Client
  const client = await Client.create({
    name,
    email,
    password: hashedPassword,
  });

  if (client) {
    res.status(201).json({
      _id: client._id,
      name: client.name,
      email: client.email,
      token: generateToken(client._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Client Data");
  }
});

// @desc    Login a Client
// @route   /api/clients/login
// @access  Public
const loginClient = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const client = await Client.findOne({ email });

  // Check client and if passwords match
  if (client && (await bcrypt.compare(password, client.password))) {
    res.status(200).json({
      _id: client._id,
      name: client.name,
      email: client.email,
      token: generateToken(client._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid information");
  }
});

// @desc    Get current Client
// @route   /api/clients/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const client = {
    id: req.client._id,
    email: req.client.email,
    name: req.client.name,
  };

  // res.send("me");
  res.status(200).json(client);
});

// Generate Client token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
};

module.exports = {
  registerClient,
  loginClient,
  getMe,
};
