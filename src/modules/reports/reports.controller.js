const reportsService = require('./reports.service');

const getDashboardStats = async (req, res, next) => {
  try {
    const stats = await reportsService.getDashboardStats();
    res.json(stats);
  } catch (err) {
    next(err);
  }
};

module.exports = { getDashboardStats };
