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

router.get("/stats", getStats);
router.get("/", getApplications);
router.get("/:id", getApplication);

router.post(
  "/",
  [
    body("company").trim().notEmpty().withMessage("Company is required"),
    body("role").trim().notEmpty().withMessage("Role is required"),
  ],
  createApplication
);

router.put("/:id", updateApplication);
router.delete("/:id", deleteApplication);

module.exports = router;
