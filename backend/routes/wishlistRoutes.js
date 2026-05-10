const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Save college
router.post("/save", async (req, res) => {
  try {
    const { userId, collegeId } = req.body;

    const saved = await prisma.savedCollege.create({
      data: {
        userId,
        collegeId,
      },
    });

    res.json({ success: true, saved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get saved colleges
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const data = await prisma.savedCollege.findMany({
      where: { userId: Number(userId) },
      include: { college: true },
    });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove saved college
router.delete("/", async (req, res) => {
  try {
    const { userId, collegeId } = req.body;

    await prisma.savedCollege.deleteMany({
      where: {
        userId: Number(userId),
        collegeId: Number(collegeId),
      },
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;