const express = require("express");
const router = express.Router();
const {
  registerClient,
  loginClient,
  getMe,
} = require("../controllers/clientController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", registerClient);
router.post("/login", loginClient);
router.get("/me", protect, getMe);

module.exports = router;
