const express = require("express");
const { createDeal, getAllDeals, updateDeal, deleteDeal, getRecommendedDeals} = require("../controllers/dealController");

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Get all active deals (logged-in users)
router.get("/", verifyToken, getAllDeals);

// Create deal (Corporate only)
router.post(
  "/",
  verifyToken,
  authorizeRoles("Corporate"),
  createDeal
);

// Update deal (Corporate only)
router.put(
  "/:id",
  verifyToken,
  authorizeRoles("Corporate"),
  updateDeal
);
// Delete deal (Corporate only)
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("Corporate"),
  deleteDeal
);
// Get recommended deals for investor
router.get(
  "/recommended",
  verifyToken,
  authorizeRoles("Investor"),
  getRecommendedDeals
);

module.exports = router;