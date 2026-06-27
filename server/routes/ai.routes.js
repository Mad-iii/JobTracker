const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");

router.use(protect);

// Placeholder — Full implementation in Week 5
router.post("/review-resume", (req, res) => {
  res.json({ success: true, message: "AI resume review — coming in Week 5." });
});

router.post("/generate-cover-letter", (req, res) => {
  res.json({ success: true, message: "AI cover letter generator — coming in Week 5." });
});

router.post("/match-score", (req, res) => {
  res.json({ success: true, message: "AI job match score — coming in Week 5." });
});

router.post("/interview-prep", (req, res) => {
  res.json({ success: true, message: "AI interview prep — coming in Week 5." });
});

module.exports = router;
