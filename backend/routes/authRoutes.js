const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(404).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: user.id },
      "SECRET_KEY",
      { expiresIn: "7d" }
    );

    res.json({ success: true, token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;