const formatCampaignResponse = (campaign) => {
  return {
    ...campaign,
    target_amount: campaign.target_amount ?? 'unlimited',
  };
};

const formatCampaignListResponse = (campaigns) => {
  return campaigns.map(formatCampaignResponse);
};

module.exports = {
  formatCampaignResponse,
  formatCampaignListResponse,
};
