const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const {
  getSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
} = require("../controllers/skill.controller");
const { protect } = require("../middleware/auth.middleware");

router.use(protect);

const createValidators = [
  body("name").trim().notEmpty().withMessage("Skill name is required"),
  body("category")
    .optional()
    .isIn(["Technical", "Language", "Framework", "Tool", "Soft Skill", "Other"])
    .withMessage("Invalid category"),
  body("proficiency")
    .optional()
    .isIn(["Beginner", "Intermediate", "Advanced", "Expert"])
    .withMessage("Invalid proficiency level"),
  body("yearsOfExperience").optional().isFloat({ min: 0 }).withMessage("yearsOfExperience must be 0 or greater"),
];

const updateValidators = [
  body("name").optional().trim().notEmpty().withMessage("Skill name cannot be empty"),
  body("category")
    .optional()
    .isIn(["Technical", "Language", "Framework", "Tool", "Soft Skill", "Other"])
    .withMessage("Invalid category"),
  body("proficiency")
    .optional()
    .isIn(["Beginner", "Intermediate", "Advanced", "Expert"])
    .withMessage("Invalid proficiency level"),
  body("yearsOfExperience").optional().isFloat({ min: 0 }).withMessage("yearsOfExperience must be 0 or greater"),
];

router.get("/", getSkills);
router.get("/:id", getSkill);
router.post("/", createValidators, createSkill);
router.put("/:id", updateValidators, updateSkill);
router.delete("/:id", deleteSkill);

module.exports = router;