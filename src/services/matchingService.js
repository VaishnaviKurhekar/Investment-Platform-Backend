const calculateMatchScore = (deal, preference) => {
  let score = 0;

  // 1. Risk Match (30)
  if (deal.riskLevel === preference.riskAppetite) {
    score += 30;
  }

  // 2. Industry Match (25)
  if (
    preference.preferredIndustries.includes(deal.industry)
  ) {
    score += 25;
  }

  // 3. Budget Compatibility (20)
  if (
    deal.minInvestment <= preference.maxBudget &&
    deal.maxInvestment >= preference.minBudget
  ) {
    score += 20;
  }

  // 4. ROI Attractiveness (15)
  // Cap ROI contribution at 15 points
  score += Math.min(deal.expectedROI, 15);

  // 5. Popularity (10)
  // For now, use currentRaisedAmount as a simple popularity indicator.
  const popularityScore = Math.min(
    (deal.currentRaisedAmount / deal.targetAmount) * 10,
    10
  );

  score += popularityScore;

  return Number(score.toFixed(2));
};

module.exports = {
  calculateMatchScore,
};