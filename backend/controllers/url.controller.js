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
