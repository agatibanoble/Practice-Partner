// app.js
const express = require("express");
const router = express.Router();
const {
  renderVisitListPage,
  renderCreateVisitPage,
  renderEditVisitPage,
} = require("../controllers/visitController");

// Routes for handling visit operations
router.get("/listVisits", renderVisitListPage);
router.get("/addVisit", renderCreateVisitPage);
router.get("/editVisit/:id", renderEditVisitPage);

module.exports = router;
