require("dotenv").config();
 const connectDB = require("./src/config/db");

const bcrypt = require("bcryptjs");

const User = require("./src/models/User");
const Deal = require("./src/models/Deal");
const InvestorPreference = require("./src/models/InvestorPreference");

const seed = async () => {
  try {
   

await connectDB();

    console.log("MongoDB Connected");

    await User.deleteMany();
    await Deal.deleteMany();
    await InvestorPreference.deleteMany();

    const corporate = await User.create({
      name: "Corporate User",
      email: "corporate@test.com",
      password: await bcrypt.hash("123456", 10),
      role: "Corporate",
    });

    const investor = await User.create({
      name: "Investor User",
      email: "investor@test.com",
      password: await bcrypt.hash("123456", 10),
      role: "Investor",
    });

    await InvestorPreference.create({
      user: investor._id,
      riskAppetite: "Medium",
      preferredIndustries: ["Healthcare", "Technology"],
      minBudget: 50000,
      maxBudget: 300000,
    });

    await Deal.create([
      {
        companyName: "MediAI",
        industry: "Healthcare",
        investmentRequired: 1500000,
        expectedROI: 22,
        riskLevel: "Medium",
        description: "Healthcare AI Platform",
        minInvestment: 50000,
        maxInvestment: 300000,
        targetAmount: 1500000,
        currentRaisedAmount: 200000,
        closingDate: new Date("2026-12-31"),
        createdBy: corporate._id,
      },
      {
        companyName: "EcoTech",
        industry: "Technology",
        investmentRequired: 1000000,
        expectedROI: 18,
        riskLevel: "Low",
        description: "Green Energy Startup",
        minInvestment: 30000,
        maxInvestment: 200000,
        targetAmount: 1000000,
        currentRaisedAmount: 100000,
        closingDate: new Date("2026-11-30"),
        createdBy: corporate._id,
      },
    ]);

    console.log("Seed Data Inserted");

    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seed();