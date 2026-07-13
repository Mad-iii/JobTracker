const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contact.controller");
const { protect } = require("../middleware/auth.middleware");

router.use(protect);

const createValidators = [
  body("name").trim().notEmpty().withMessage("Contact name is required"),
  body("email").optional({ checkFalsy: true }).isEmail().withMessage("Must be a valid email"),
  body("relationship")
    .optional()
    .isIn(["Recruiter", "Hiring Manager", "Referral", "Colleague", "Mentor", "Other"])
    .withMessage("Invalid relationship type"),
];

const updateValidators = [
  body("name").optional().trim().notEmpty().withMessage("Contact name cannot be empty"),
  body("email").optional({ checkFalsy: true }).isEmail().withMessage("Must be a valid email"),
  body("relationship")
    .optional()
    .isIn(["Recruiter", "Hiring Manager", "Referral", "Colleague", "Mentor", "Other"])
    .withMessage("Invalid relationship type"),
];

router.get("/", getContacts);
router.get("/:id", getContact);
router.post("/", createValidators, createContact);
router.put("/:id", updateValidators, updateContact);
router.delete("/:id", deleteContact);

module.exports = router;