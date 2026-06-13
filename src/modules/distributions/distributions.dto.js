const formatDistributionResponse = (dist) => {
  return {
    id: dist.id,
    aid_id: dist.aid_id,
    beneficiary_id: dist.beneficiary_id,
    org_id: dist.org_id,
    cycle_id: dist.cycle_id,
    quantity_given: dist.quantity_given,
    status: dist.status,
    delivered_at: dist.delivered_at,
    created_at: dist.created_at,
  };
};

const formatDistributionListResponse = (dists) => {
  return dists.map(formatDistributionResponse);
};

module.exports = { formatDistributionResponse, formatDistributionListResponse };
