const mongoose = require("mongoose");
const Deal = require("../models/Deal");
const Investment = require("../models/Investment");

const expressInterest = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { dealId, amount } = req.body;

    const deal = await Deal.findById(dealId).session(session);

    if (!deal || deal.isDeleted) {
      await session.abortTransaction();
      session.endSession();

      return res.status(404).json({
        success: false,
        message: "Deal not found",
      });
    }

    // Validate investment range
    if (
      amount < deal.minInvestment ||
      amount > deal.maxInvestment
    ) {
      await session.abortTransaction();
      session.endSession();

      return res.status(400).json({
        success: false,
        message: `Investment amount must be between ${deal.minInvestment} and ${deal.maxInvestment}`,
      });
    }

    // Prevent over-investment
    if (
      deal.currentRaisedAmount + amount >
      deal.targetAmount
    ) {
      await session.abortTransaction();
      session.endSession();

      return res.status(400).json({
        success: false,
        message: "Investment exceeds target amount",
      });
    }

    const investment = await Investment.create(
      [
        {
          investor: req.user.id,
          deal: dealId,
          amount,
          status: "Interested",
        },
      ],
      { session }
    );

    deal.currentRaisedAmount += amount;

    if (deal.currentRaisedAmount >= deal.targetAmount) {
      deal.status = "Closed";
    } else {
      deal.status = "Partially Filled";
    }

    await deal.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "Interest expressed successfully",
      investment: investment[0],
      currentRaisedAmount: deal.currentRaisedAmount,
      dealStatus: deal.status,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error("Investment Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  expressInterest,
};