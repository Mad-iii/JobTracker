const { validationResult } = require("express-validator");
const Contact = require("../models/Contact");

// GET /api/contacts
exports.getContacts = async (req, res, next) => {
  try {
    const filter = { user: req.user._id };
    if (req.query.relationship) filter.relationship = req.query.relationship;
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: "i" } },
        { company: { $regex: req.query.search, $options: "i" } },
      ];
    }

    const contacts = await Contact.find(filter).sort("-createdAt");
    res.json({ success: true, data: contacts });
  } catch (error) {
    next(error);
  }
};

// GET /api/contacts/:id
exports.getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, user: req.user._id }).populate(
      "applications",
      "company role status"
    );
    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact not found." });
    }
    res.json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

// POST /api/contacts
exports.createContact = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const contact = await Contact.create({ ...req.body, user: req.user._id });
    res.status(201).json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

// PUT /api/contacts/:id
exports.updateContact = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact not found." });
    }
    res.json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/contacts/:id
exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact not found." });
    }
    res.json({ success: true, message: "Contact deleted." });
  } catch (error) {
    next(error);
  }
};