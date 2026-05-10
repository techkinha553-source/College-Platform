const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.college.createMany({
    data: [
      {
        name: "IIT Delhi",
        location: "New Delhi",
        fees: "2.2L/year",
        rating: 4.8,
        description: "Top engineering institute in India",
        image: "https://source.unsplash.com/400x300/?college"
      },
      {
        name: "IIT Bombay",
        location: "Mumbai",
        fees: "2.3L/year",
        rating: 4.9,
        description: "Premier engineering institute",
        image: "https://source.unsplash.com/400x300/?university"
      },
      {
        name: "NIT Trichy",
        location: "Tamil Nadu",
        fees: "1.5L/year",
        rating: 4.6,
        description: "Top NIT in India",
        image: "https://source.unsplash.com/400x300/?campus"
      }
    ],
  });

  await prisma.cutoff.createMany({
    data: [
      {
        exam: "JEE",
        branch: "CSE",
        openingRank: 1,
        closingRank: 1000,
        collegeId: 1,
      },
      {
        exam: "JEE",
        branch: "ECE",
        openingRank: 1001,
        closingRank: 5000,
        collegeId: 2,
      },
      {
        exam: "JEE",
        branch: "ME",
        openingRank: 5001,
        closingRank: 10000,
        collegeId: 3,
      },
    ],
  });

  console.log("Seed data inserted");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });