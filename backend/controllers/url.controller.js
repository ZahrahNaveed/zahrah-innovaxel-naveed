const Url = require("../models/url.model");
const generateCode = require("../utils/generateCode");

// POST /shorten
exports.createShortUrl = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const shortCode = generateCode();

  try {
    const newUrl = await Url.create({ url, shortCode });
    res.status(201).json(newUrl);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// GET /shorten/:shortCode
exports.getOriginalUrl = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const found = await Url.findOne({ shortCode });
    if (!found) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    // Increment access count
    found.accessCount += 1;
    await found.save();

    res.json(found);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// PUT /shorten/:shortCode
exports.updateShortUrl = async (req, res) => {
  const { shortCode } = req.params;
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const updated = await Url.findOneAndUpdate(
      { shortCode },
      { url, updatedAt: new Date() },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};
