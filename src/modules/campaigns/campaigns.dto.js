const formatCampaignResponse = (campaign) => {
  return campaign;
};

const formatCampaignListResponse = (campaigns) => {
  return campaigns.map(formatCampaignResponse);
};

module.exports = {
  formatCampaignResponse,
  formatCampaignListResponse,
};
