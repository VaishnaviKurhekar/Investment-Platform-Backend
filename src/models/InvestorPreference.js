const mongoose = require("mongoose");

const investorPreferenceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    riskAppetite: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },
    preferredIndustries: [
      {
        type: String,
      },
    ],
    minBudget: {
      type: Number,
      required: true,
    },
    maxBudget: {
      type: Number,
      required: true,
    },
    historicalInvestments: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "InvestorPreference",
  investorPreferenceSchema
);