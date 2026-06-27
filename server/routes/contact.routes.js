const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const Contact = require("../models/Contact");

router.use(protect);

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contact.find({ user: req.user._id }).sort("-createdAt");
    res.json({ success: true, data: contacts });
  } catch (err) { next(err); }
});

router.post("/", async (req, res, next) => {
  try {
    const contact = await Contact.create({ ...req.body, user: req.user._id });
    res.status(201).json({ success: true, data: contact });
  } catch (err) { next(err); }
});

router.put("/:id", async (req, res, next) => {
  try {
    const contact = await Contact.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true });
    if (!contact) return res.status(404).json({ success: false, message: "Contact not found." });
    res.json({ success: true, data: contact });
  } catch (err) { next(err); }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const contact = await Contact.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!contact) return res.status(404).json({ success: false, message: "Contact not found." });
    res.json({ success: true, message: "Contact deleted." });
  } catch (err) { next(err); }
});

module.exports = router;
