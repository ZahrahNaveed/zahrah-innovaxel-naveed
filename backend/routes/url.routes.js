const express = require("express");
const router = express.Router();
const {
  createShortUrl,
  getOriginalUrl,
  updateShortUrl,
  deleteShortUrl,
  getUrlStats
} = require("../controllers/url.controller");

// Create new short URL
router.post("/", createShortUrl);

// Get original URL and increment access count
router.get("/:shortCode", getOriginalUrl);

// Update long URL for a shortCode
router.put("/:shortCode", updateShortUrl);

// Delete short URL
router.delete("/:shortCode", deleteShortUrl);

// Get access stats
router.get("/:shortCode/stats", getUrlStats);

module.exports = router;
