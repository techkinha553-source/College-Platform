const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log("➡️ Request:", req.method, req.url);
  next();
});

// Routes
const collegeRoutes = require("./routes/collegeRoutes");
const authRoutes = require("./routes/authRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");

app.use("/api/wishlist", wishlistRoutes);
app.use("/api/colleges", collegeRoutes);
app.use("/api/auth", authRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = 5050;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});