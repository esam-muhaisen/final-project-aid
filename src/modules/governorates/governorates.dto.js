const formatGovernorateResponse = (governorate) => {
  return governorate;
};

const formatGovernorateListResponse = (governorates) => {
  return governorates.map(formatGovernorateResponse);
};

module.exports = {
  formatGovernorateResponse,
  formatGovernorateListResponse,
};
