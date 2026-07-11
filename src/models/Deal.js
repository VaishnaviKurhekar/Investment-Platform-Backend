const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    industry: {
      type: String,
      required: true,
    },
    investmentRequired: {
      type: Number,
      required: true,
    },
    expectedROI: {
      type: Number,
      required: true,
    },
    riskLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Open", "Partially Filled", "Closed"],
      default: "Open",
    },
    description: {
      type: String,
    },
    minInvestment: {
      type: Number,
      required: true,
    },
    maxInvestment: {
      type: Number,
      required: true,
    },
    targetAmount: {
      type: Number,
      required: true,
    },
    currentRaisedAmount: {
      type: Number,
      default: 0,
    },
    closingDate: {
      type: Date,
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    riskScore: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Deal", dealSchema);