const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Accessible by any logged-in user
router.get("/profile", verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected route accessed successfully",
    user: req.user,
  });
});

// Accessible only by Corporate users
router.get(
  "/corporate",
  verifyToken,
  authorizeRoles("Corporate"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Corporate User!",
    });
  }
);

module.exports = router;