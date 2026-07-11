const Deal = require("../models/Deal");
const InvestorPreference = require("../models/InvestorPreference");
const {calculateMatchScore} = require("../services/matchingService");
const {getCache, setCache, clearCache} = require("../utils/cache");

const createDeal = async (req, res) => {
  try {
    const dealData = {
      ...req.body,
      createdBy: req.user.id,
    };

    const deal = await Deal.create(dealData);
    clearCache();

    res.status(201).json({
      success: true,
      message: "Deal created successfully",
      deal,
    });
  } catch (error) {
    console.error("Create Deal Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllDeals = async (req, res) => {
  try {
    const cacheKey = JSON.stringify(req.query);

const cachedDeals = getCache(cacheKey);

if (cachedDeals) {
  return res.status(200).json(cachedDeals);
}
    const {
      industry,
      riskLevel,
      minROI,
      maxROI,
      minInvestment,
      maxInvestment,
      sortBy,
      order,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {
      isDeleted: false,
      status: { $ne: "Closed" },
    };

    // Filters
    if (industry) filter.industry = industry;
    if (riskLevel) filter.riskLevel = riskLevel;

    if (minROI || maxROI) {
      filter.expectedROI = {};
      if (minROI) filter.expectedROI.$gte = Number(minROI);
      if (maxROI) filter.expectedROI.$lte = Number(maxROI);
    }

    if (minInvestment || maxInvestment) {
      filter.minInvestment = {};
      if (minInvestment)
        filter.minInvestment.$gte = Number(minInvestment);
      if (maxInvestment)
        filter.minInvestment.$lte = Number(maxInvestment);
    }

    // Sorting
    let sortOption = { createdAt: -1 };

    if (sortBy) {
      sortOption = {
        [sortBy]: order === "asc" ? 1 : -1,
      };
    }

    // Pagination
    const skip = (page - 1) * limit;

    const deals = await Deal.find(filter)
      .populate("createdBy", "name email role")
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const totalDeals = await Deal.countDocuments(filter);

    const response = {
  success: true,
  currentPage: Number(page),
  totalPages: Math.ceil(totalDeals / limit),
  totalDeals,
  count: deals.length,
  deals,
};

setCache(cacheKey, response);

res.status(200).json(response);
  } catch (error) {
    console.error("Get Deals Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateDeal = async (req, res) => {
  try {
    const { id } = req.params;

    const deal = await Deal.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!deal) {
      return res.status(404).json({
        success: false,
        message: "Deal not found",
      });
    }

    // Only the creator can update the deal
    if (deal.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this deal",
      });
    }

    const updatedDeal = await Deal.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    clearCache();

    res.status(200).json({
      success: true,
      message: "Deal updated successfully",
      deal: updatedDeal,
    });
  } catch (error) {
    console.error("Update Deal Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteDeal = async (req, res) => {
  try {
    const { id } = req.params;

    const deal = await Deal.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!deal) {
      return res.status(404).json({
        success: false,
        message: "Deal not found",
      });
    }

    // Only the creator can delete the deal
    if (deal.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this deal",
      });
    }

    deal.isDeleted = true;
    await deal.save();
    clearCache();

    res.status(200).json({
      success: true,
      message: "Deal deleted successfully",
    });
  } catch (error) {
    console.error("Delete Deal Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getRecommendedDeals = async (req, res) => {
  try {
    const preference = await InvestorPreference.findOne({
      user: req.user.id,
    });

    if (!preference) {
      return res.status(404).json({
        success: false,
        message: "Investor preferences not found",
      });
    }

    const deals = await Deal.find({
      isDeleted: false,
      status: { $ne: "Closed" },
    });

    const recommendedDeals = deals
      .map((deal) => {
        const matchScore = calculateMatchScore(
          deal,
          preference
        );

        return {
          ...deal.toObject(),
          matchScore,
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore);

    res.status(200).json({
      success: true,
      count: recommendedDeals.length,
      deals: recommendedDeals,
    });
  } catch (error) {
    console.error("Recommendation Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createDeal,
  getAllDeals,
  updateDeal,
  deleteDeal,
  getRecommendedDeals,
};
