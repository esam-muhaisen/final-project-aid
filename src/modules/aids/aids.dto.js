const formatAidResponse = (aid) => {
  return aid;
};

const formatAidListResponse = (aids) => {
  return aids.map(formatAidResponse);
};

module.exports = {
  formatAidResponse,
  formatAidListResponse,
};
