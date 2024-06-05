const express = require("express");
const router = express.Router();
const {
  getAllComplaints,
  getComplaintById,
  createComplaint,
  updateComplaintById,
  deleteComplaintById,
} = require("../controllers/complaintController");

router.get("get/", getAllComplaints);
router.get("get/:id", getComplaintById);
router.post("create/", createComplaint);
router.post("update/:id", updateComplaintById);
router.delete("delete/:id", deleteComplaintById);

module.exports = router;
