const formatAreaResponse = (area) => {
  return area;
};

const formatAreaListResponse = (areas) => {
  return areas.map(formatAreaResponse);
};

module.exports = {
  formatAreaResponse,
  formatAreaListResponse,
};
