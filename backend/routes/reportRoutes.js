const express = require("express");
const router = express.Router();
const {
  getReports,
  getReport,
  createReport,
  deleteReport,
  updateReport,
} = require("../controllers/reportController");

const { protect } = require("../middleware/authMiddleware");

// Re-route into note router
const noteRouter = require("./noteRoutes");
router.use("/:reportId/notes", noteRouter);

router.route("/").get(protect, getReports).post(protect, createReport);

router
  .route("/:id")
  .get(protect, getReport)
  .delete(protect, deleteReport)
  .put(protect, updateReport);

module.exports = router;
