const express = require("express");
const {
  expressInterest,
} = require("../controllers/investmentController");

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/interest",
  verifyToken,
  authorizeRoles("Investor"),
  expressInterest
);

module.exports = router;