const { validationResult } = require("express-validator");
const Skill = require("../models/Skill");

// GET /api/skills
exports.getSkills = async (req, res, next) => {
  try {
    const filter = { user: req.user._id };
    if (req.query.category) filter.category = req.query.category;

    const skills = await Skill.find(filter).sort("category name");
    res.json({ success: true, data: skills });
  } catch (error) {
    next(error);
  }
};

// GET /api/skills/:id
exports.getSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findOne({ _id: req.params.id, user: req.user._id });
    if (!skill) {
      return res.status(404).json({ success: false, message: "Skill not found." });
    }
    res.json({ success: true, data: skill });
  } catch (error) {
    next(error);
  }
};

// POST /api/skills
exports.createSkill = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const skill = await Skill.create({ ...req.body, user: req.user._id });
    res.status(201).json({ success: true, data: skill });
  } catch (error) {
    // Duplicate skill name for this user (see unique index in Skill.js)
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "You already have a skill with this name." });
    }
    next(error);
  }
};

// PUT /api/skills/:id
exports.updateSkill = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const skill = await Skill.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!skill) {
      return res.status(404).json({ success: false, message: "Skill not found." });
    }
    res.json({ success: true, data: skill });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "You already have a skill with this name." });
    }
    next(error);
  }
};

// DELETE /api/skills/:id
exports.deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!skill) {
      return res.status(404).json({ success: false, message: "Skill not found." });
    }
    res.json({ success: true, message: "Skill deleted." });
  } catch (error) {
    next(error);
  }
};