const formatCycleResponse = (cycle) => {
  return cycle;
};

const formatCycleListResponse = (cycles) => {
  return cycles.map(formatCycleResponse);
};

module.exports = {
  formatCycleResponse,
  formatCycleListResponse,
};
