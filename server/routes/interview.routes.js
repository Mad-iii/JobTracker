const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const {
  getInterviews,
  getInterview,
  createInterview,
  updateInterview,
  deleteInterview,
} = require("../controllers/interview.controller");
const { protect } = require("../middleware/auth.middleware");

router.use(protect);

const createValidators = [
  body("application")
    .notEmpty()
    .withMessage("An application id is required")
    .isMongoId()
    .withMessage("application must be a valid id"),
  body("round").trim().notEmpty().withMessage("Interview round is required"),
  body("scheduledAt")
    .notEmpty()
    .withMessage("scheduledAt is required")
    .isISO8601()
    .withMessage("scheduledAt must be a valid date"),
  body("type")
    .optional()
    .isIn(["Phone", "Video", "On-site", "Take-home", "Technical", "Behavioral", "Other"])
    .withMessage("Invalid interview type"),
  body("status")
    .optional()
    .isIn(["Scheduled", "Completed", "Cancelled", "Rescheduled"])
    .withMessage("Invalid interview status"),
  body("selfRating").optional().isInt({ min: 1, max: 5 }).withMessage("selfRating must be between 1 and 5"),
];

const updateValidators = [
  body("application").optional().isMongoId().withMessage("application must be a valid id"),
  body("round").optional().trim().notEmpty().withMessage("Interview round cannot be empty"),
  body("scheduledAt").optional().isISO8601().withMessage("scheduledAt must be a valid date"),
  body("type")
    .optional()
    .isIn(["Phone", "Video", "On-site", "Take-home", "Technical", "Behavioral", "Other"])
    .withMessage("Invalid interview type"),
  body("status")
    .optional()
    .isIn(["Scheduled", "Completed", "Cancelled", "Rescheduled"])
    .withMessage("Invalid interview status"),
  body("selfRating").optional().isInt({ min: 1, max: 5 }).withMessage("selfRating must be between 1 and 5"),
];

router.get("/", getInterviews);
router.get("/:id", getInterview);
router.post("/", createValidators, createInterview);
router.put("/:id", updateValidators, updateInterview);
router.delete("/:id", deleteInterview);

module.exports = router;