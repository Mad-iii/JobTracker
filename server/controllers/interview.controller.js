const { validationResult } = require("express-validator");
const Interview = require("../models/Interview");
const Application = require("../models/Application");

// GET /api/interviews?applicationId=
exports.getInterviews = async (req, res, next) => {
  try {
    const filter = { user: req.user._id };
    if (req.query.applicationId) filter.application = req.query.applicationId;

    const interviews = await Interview.find(filter)
      .sort({ scheduledAt: 1 })
      .populate("application", "company role status");

    res.json({ success: true, data: interviews });
  } catch (error) {
    next(error);
  }
};

// GET /api/interviews/:id
exports.getInterview = async (req, res, next) => {
  try {
    const interview = await Interview.findOne({ _id: req.params.id, user: req.user._id }).populate(
      "application",
      "company role status"
    );
    if (!interview) {
      return res.status(404).json({ success: false, message: "Interview not found." });
    }
    res.json({ success: true, data: interview });
  } catch (error) {
    next(error);
  }
};

// POST /api/interviews
exports.createInterview = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    // Confirm the application exists and belongs to this user before linking to it
    const application = await Application.findOne({ _id: req.body.application, user: req.user._id });
    if (!application) {
      return res.status(400).json({
        success: false,
        message: "The application this interview references does not exist or does not belong to you.",
      });
    }

    const interview = await Interview.create({ ...req.body, user: req.user._id });
    res.status(201).json({ success: true, data: interview });
  } catch (error) {
    next(error);
  }
};

// PUT /api/interviews/:id
exports.updateInterview = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    if (req.body.application) {
      const application = await Application.findOne({ _id: req.body.application, user: req.user._id });
      if (!application) {
        return res.status(400).json({
          success: false,
          message: "The application this interview references does not exist or does not belong to you.",
        });
      }
    }

    const interview = await Interview.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!interview) {
      return res.status(404).json({ success: false, message: "Interview not found." });
    }
    res.json({ success: true, data: interview });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/interviews/:id
exports.deleteInterview = async (req, res, next) => {
  try {
    const interview = await Interview.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!interview) {
      return res.status(404).json({ success: false, message: "Interview not found." });
    }
    res.json({ success: true, message: "Interview deleted." });
  } catch (error) {
    next(error);
  }
};