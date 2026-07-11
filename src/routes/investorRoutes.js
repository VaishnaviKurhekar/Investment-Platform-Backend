const express = require("express");
const {
  createOrUpdatePreference,
} = require("../controllers/investorController");

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/preferences",
  verifyToken,
  authorizeRoles("Investor"),
  createOrUpdatePreference
);

module.exports = router;