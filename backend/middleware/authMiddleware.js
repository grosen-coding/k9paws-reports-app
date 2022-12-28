const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Client = require("../models/clientModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      //   Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //   Get client from token
      req.client = await Client.findById(decoded.id).select("-password");

      //   Call next piece of middleware
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("You are not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("You are not authorized");
  }
});

module.exports = { protect };
