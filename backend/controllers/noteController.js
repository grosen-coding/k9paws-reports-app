const asyncHandler = require("express-async-handler");

const Client = require("../models/clientModel");
const Note = require("../models/noteModel");
const Report = require("../models/reportModel");

// @desc    Get notes for a report
// @route   GET /api/reports/:reportId/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  // Get client using ID in the JWT
  const client = await Client.findById(req.client.id);

  if (!client) {
    res.status(401);
    throw new Error("Client not found");
  }

  //   Get Reports
  const report = await Report.findById(req.params.reportId);

  if (report.client.toString() !== req.client.id) {
    res.status(401);
    throw new Error("Client not authorized");
  }

  const notes = await Note.find({ report: req.params.reportId });

  res.status(200).json(notes);
});

// @desc    Create report note
// @route   POST /api/reports/:reportId/notes
// @access  Private
const addNote = asyncHandler(async (req, res) => {
  // Get client using ID in the JWT
  const client = await Client.findById(req.client.id);

  if (!client) {
    res.status(401);
    throw new Error("Client not found");
  }

  //   Get Reports
  const report = await Report.findById(req.params.reportId);

  if (report.client.toString() !== req.client.id) {
    res.status(401);
    throw new Error("Client not authorized");
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    report: req.params.reportId,
    client: req.client.id,
  });

  res.status(200).json(note);
});

module.exports = {
  getNotes,
  addNote,
};
