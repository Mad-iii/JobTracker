const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const {
  getApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
  getStats,
} = require("../controllers/application.controller");
const { protect } = require("../middleware/auth.middleware");

router.use(protect);

const STATUSES = [
  "Bookmarked", "Applied", "Phone Screen", "Technical Interview",
  "Final Interview", "Offer", "Rejected", "Withdrawn", "Ghosted",
];
const WORK_TYPES = ["Remote", "Hybrid", "On-site", ""];
const SOURCES = ["LinkedIn", "Indeed", "Company Website", "Referral", "AngelList", "Glassdoor", "Other", ""];

const createValidators = [
  body("company").trim().notEmpty().withMessage("Company is required"),
  body("role").trim().notEmpty().withMessage("Role is required"),
  body("status").optional().isIn(STATUSES).withMessage("Invalid status"),
  body("workType").optional().isIn(WORK_TYPES).withMessage("Invalid work type"),
  body("source").optional().isIn(SOURCES).withMessage("Invalid source"),
  body("salaryMin").optional({ nullable: true }).isFloat({ min: 0 }).withMessage("salaryMin must be a positive number"),
  body("salaryMax").optional({ nullable: true }).isFloat({ min: 0 }).withMessage("salaryMax must be a positive number"),
  body("appliedDate").optional({ nullable: true }).isISO8601().withMessage("appliedDate must be a valid date"),
];

const updateValidators = [
  body("company").optional().trim().notEmpty().withMessage("Company cannot be empty"),
  body("role").optional().trim().notEmpty().withMessage("Role cannot be empty"),
  body("status").optional().isIn(STATUSES).withMessage("Invalid status"),
  body("workType").optional().isIn(WORK_TYPES).withMessage("Invalid work type"),
  body("source").optional().isIn(SOURCES).withMessage("Invalid source"),
  body("salaryMin").optional({ nullable: true }).isFloat({ min: 0 }).withMessage("salaryMin must be a positive number"),
  body("salaryMax").optional({ nullable: true }).isFloat({ min: 0 }).withMessage("salaryMax must be a positive number"),
  body("appliedDate").optional({ nullable: true }).isISO8601().withMessage("appliedDate must be a valid date"),
];

router.get("/stats", getStats);
router.get("/", getApplications);
router.get("/:id", getApplication);
router.post("/", createValidators, createApplication);
router.put("/:id", updateValidators, updateApplication);
router.delete("/:id", deleteApplication);

module.exports = router;