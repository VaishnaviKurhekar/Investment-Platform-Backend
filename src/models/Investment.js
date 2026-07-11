const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema(
  {
    investor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deal",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ["Interested", "Invested"],
      default: "Interested",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Investment",
  investmentSchema
);