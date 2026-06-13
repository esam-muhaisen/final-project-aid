const formatAidTypeResponse = (aidType) => {
  return aidType;
};

const formatAidTypeListResponse = (aidTypes) => {
  return aidTypes.map(formatAidTypeResponse);
};

module.exports = {
  formatAidTypeResponse,
  formatAidTypeListResponse,
};
