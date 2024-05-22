const express = require("express");
const router = express.Router();
const {
  createJudge,
  getAllJudges,
  getJudgeById,
  updateJudgeById,
  deleteJudgeById,
} = require("../controllers/judgeController");

// Create a new judge
router.post("/createJudge", createJudge);

// Get all judges
router.get("/getJudges", getAllJudges);

// Get a judge by ID
router.get("/getJudgeById/:id", getJudgeById);

// Update a judge by ID
router.put("/updateJudgeById/:id", updateJudgeById);

// Delete a judge by ID
router.delete("/deleteJudgeById/:id", deleteJudgeById);

module.exports = router;
