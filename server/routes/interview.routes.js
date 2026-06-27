const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const Interview = require("../models/Interview");

router.use(protect);

// GET all interviews for user (optionally filter by application)
router.get("/", async (req, res, next) => {
  try {
    const filter = { user: req.user._id };
    if (req.query.applicationId) filter.application = req.query.applicationId;
    const interviews = await Interview.find(filter).sort({ scheduledAt: 1 }).populate("application", "company role");
    res.json({ success: true, data: interviews });
  } catch (err) { next(err); }
});

// GET single
router.get("/:id", async (req, res, next) => {
  try {
    const interview = await Interview.findOne({ _id: req.params.id, user: req.user._id }).populate("application", "company role");
    if (!interview) return res.status(404).json({ success: false, message: "Interview not found." });
    res.json({ success: true, data: interview });
  } catch (err) { next(err); }
});

// POST create
router.post("/", async (req, res, next) => {
  try {
    const interview = await Interview.create({ ...req.body, user: req.user._id });
    res.status(201).json({ success: true, data: interview });
  } catch (err) { next(err); }
});

// PUT update
router.put("/:id", async (req, res, next) => {
  try {
    const interview = await Interview.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id }, req.body, { new: true, runValidators: true }
    );
    if (!interview) return res.status(404).json({ success: false, message: "Interview not found." });
    res.json({ success: true, data: interview });
  } catch (err) { next(err); }
});

// DELETE
router.delete("/:id", async (req, res, next) => {
  try {
    const interview = await Interview.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!interview) return res.status(404).json({ success: false, message: "Interview not found." });
    res.json({ success: true, message: "Interview deleted." });
  } catch (err) { next(err); }
});

module.exports = router;
