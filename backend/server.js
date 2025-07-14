const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const Url = require("./models/url.model");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


// Redirect short code
app.get("/:shortCode", async (req, res) => {
  const { shortCode } = req.params;
  try {
    const found = await Url.findOne({ shortCode });
    if (!found) return res.status(404).send("URL not found");

    found.accessCount += 1;
    await found.save();

    res.redirect(found.url);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Routes
const urlRoutes = require("./routes/url.routes");
app.use("/shorten", urlRoutes);

// Connect DB and start server
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.error("MongoDB error:", err));
