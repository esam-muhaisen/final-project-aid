const formatPickupLocationResponse = (location) => {
  return location;
};

const formatPickupLocationListResponse = (locations) => {
  return locations.map(formatPickupLocationResponse);
};

module.exports = {
  formatPickupLocationResponse,
  formatPickupLocationListResponse,
};
