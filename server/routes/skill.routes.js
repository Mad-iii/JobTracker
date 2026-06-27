const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const Skill = require("../models/Skill");

router.use(protect);

router.get("/", async (req, res, next) => {
  try {
    const skills = await Skill.find({ user: req.user._id }).sort("category name");
    res.json({ success: true, data: skills });
  } catch (err) { next(err); }
});

router.post("/", async (req, res, next) => {
  try {
    const skill = await Skill.create({ ...req.body, user: req.user._id });
    res.status(201).json({ success: true, data: skill });
  } catch (err) { next(err); }
});

router.put("/:id", async (req, res, next) => {
  try {
    const skill = await Skill.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true });
    if (!skill) return res.status(404).json({ success: false, message: "Skill not found." });
    res.json({ success: true, data: skill });
  } catch (err) { next(err); }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const skill = await Skill.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!skill) return res.status(404).json({ success: false, message: "Skill not found." });
    res.json({ success: true, message: "Skill deleted." });
  } catch (err) { next(err); }
});

module.exports = router;
