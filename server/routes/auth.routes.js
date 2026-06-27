const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const { register, login, getMe, updateProfile, changePassword } = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");

router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 60 }),
    body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
  ],
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login
);

router.get("/me", protect, getMe);
router.put("/profile", protect, updateProfile);
router.post("/change-password", protect, changePassword);

module.exports = router;
