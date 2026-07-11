const InvestorPreference = require("../models/InvestorPreference");

const createOrUpdatePreference = async (req, res) => {
  try {
    const { riskAppetite, preferredIndustries, minBudget, maxBudget } =
      req.body;

    const preference = await InvestorPreference.findOneAndUpdate(
      { user: req.user.id },
      {
        riskAppetite,
        preferredIndustries,
        minBudget,
        maxBudget,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Investor preferences saved successfully",
      preference,
    });
  } catch (error) {
    console.error("Investor Preference Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createOrUpdatePreference,
};