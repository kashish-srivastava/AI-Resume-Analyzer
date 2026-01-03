const express = require("express");
const router = express.Router();

// AI skill analyzer
router.post("/analyze", (req, res) => {
  console.log("AI analyze hit"); // ✅ yahan hona chahiye

  const { skills } = req.body;

  if (!skills || skills.length === 0) {
    return res.status(400).json({ message: "No skills provided" });
  }

  const requiredSkills = ["React", "Node", "MongoDB", "JavaScript"];

  const matched = skills.filter(skill =>
    requiredSkills.includes(skill)
  );

  const missing = requiredSkills.filter(skill =>
    !skills.includes(skill)
  );

  const score = Math.round(
    (matched.length / requiredSkills.length) * 100
  );

  // ✅ sirf EK response
  res.json({
    matched,
    missing,
    score,
    message: "AI analysis successful"
  });
});

module.exports = router;