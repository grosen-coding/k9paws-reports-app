const asyncHandler = require("express-async-handler");

const Client = require("../models/clientModel");
const Report = require("../models/reportModel");

// @desc    Get Client Reports
// @route   GET /api/reports
// @access  Private
const getReports = asyncHandler(async (req, res) => {
  // Get client using ID in the JWT
  const client = await Client.findById(req.client.id);

  if (!client) {
    res.status(401);
    throw new Error("Client not found");
  }

  //   Get Reports
  const reports = await Report.find({ client: req.client.id });

  res.status(200).json(reports);
});

// @desc    Get Client Report
// @route   GET /api/reports/:id
// @access  Private
const getReport = asyncHandler(async (req, res) => {
  // Get client using ID in the JWT
  const client = await Client.findById(req.client.id);

  if (!client) {
    res.status(401);
    throw new Error("Client not found");
  }

  //   Get Report
  const report = await Report.findById(req.params.id);

  if (!report) {
    res.status(404);
    throw new Error("Report not found");
  }

  if (report.client.toString() !== req.client.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  res.status(200).json(report);
});

// @desc    Create new Client Report
// @route   POST /api/reports
// @access  Private
const createReport = asyncHandler(async (req, res) => {
  const { category, description } = req.body;

  if (!category || !description) {
    res.status(400);
    throw new Error("Please select a category and add a description.");
  }

  // Get client using ID in the JWT
  const client = await Client.findById(req.client.id);

  if (!client) {
    res.status(401);
    throw new Error("Client not found");
  }

  const report = await Report.create({
    category,
    description,
    client: req.client.id,
    status: "open",
  });

  res.status(201).json(report);
});

// @desc    Delete Client Report
// @route   DELETE /api/reports/:id
// @access  Private
const deleteReport = asyncHandler(async (req, res) => {
  // Get client using ID in the JWT
  const client = await Client.findById(req.client.id);

  if (!client) {
    res.status(401);
    throw new Error("Client not found");
  }

  //   Get Report
  const report = await Report.findById(req.params.id);

  if (!report) {
    res.status(404);
    throw new Error("Report not found");
  }

  if (report.client.toString() !== req.client.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }
  await report.remove();

  res.status(200).json({ success: true });
});

// @desc    Update Client Report
// @route   PUT /api/reports/:id
// @access  Private
const updateReport = asyncHandler(async (req, res) => {
  // Get client using ID in the JWT
  const client = await Client.findById(req.client.id);

  if (!client) {
    res.status(401);
    throw new Error("Client not found");
  }

  //   Get Report
  const report = await Report.findById(req.params.id);

  if (!report) {
    res.status(404);
    throw new Error("Report not found");
  }

  if (report.client.toString() !== req.client.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const updatedReport = await Report.findByIdAndUpdate(
    req.params.id,
    req.body,
    { open: true }
  );

  res.status(200).json(updatedReport);
});

module.exports = {
  getReports,
  getReport,
  createReport,
  deleteReport,
  updateReport,
};
