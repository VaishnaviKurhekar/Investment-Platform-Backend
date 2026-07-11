const Investment = require("../models/Investment");
const Deal = require("../models/Deal");

const getAnalytics = async (req, res) => {
  try {
    const totalInvestorsInterested =
      await Investment.distinct("investor").then(
        (users) => users.length
      );

    const totalAmountRaised = await Deal.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$currentRaisedAmount" },
        },
      },
    ]);

    const totalInterests = await Investment.countDocuments();
    const totalDeals = await Deal.countDocuments({
      isDeleted: false,
    });

    const conversionRate =
      totalDeals === 0
        ? 0
        : ((totalInterests / totalDeals) * 100).toFixed(2);

    res.status(200).json({
      success: true,
      analytics: {
        totalInvestorsInterested,
        totalAmountRaised:
          totalAmountRaised[0]?.total || 0,
        totalInterests,
        totalDeals,
        conversionRate: `${conversionRate}%`,
      },
    });
  } catch (error) {
    console.error("Analytics Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getAnalytics,
};