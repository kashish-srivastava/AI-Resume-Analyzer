const express = require("express");
const router = express.Router();
const Resume = require("../models/Resume");

// GET
router.get("/", async (req, res) => {
  const data = await Resume.find();
  res.json(data);
});
// POST
router.post("/", async (req, res) => {
  try {
    const { name, email, skills } = req.body;

    const newResume = new Resume({
      name,
      email,
      skills,
    });

    await newResume.save();
    res.status(201).json(newResume);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
// DELETE
router.delete("/:id", async (req, res) => {
  await Resume.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// PUT (EDIT)
router.put("/:id", async (req, res) => {
  const updated = await Resume.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

module.exports = router;
