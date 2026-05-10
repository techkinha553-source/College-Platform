const express = require("express");
const router = express.Router();
const prisma = require("../prismaClient");

// GET all colleges
router.get("/", async (req, res) => {
  try {
    console.log("🔥 COLLEGE ROUTE HIT");

    const colleges = await prisma.college.findMany();

    return res.json({
      success: true,
      data: colleges
    });

  } catch (error) {
    console.log("❌ ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const college = await prisma.college.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({
      success: true,
      data: college,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const college = await prisma.college.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({
      success: true,
      data: college,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

router.post("/predict", async (req, res) => {
  try {
    const { exam, rank } = req.body;

    const parsedRank = Number(rank);

    const cutoffs = await prisma.cutoff.findMany({
      where: {
        exam: exam,
        openingRank: {
          lte: parsedRank,
        },
        closingRank: {
          gte: parsedRank,
        },
      },
      include: {
        college: true,
      },
    });

    res.json({
      success: true,
      data: cutoffs,
    });
  } catch (error) {
    console.log("PREDICT ERROR:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;