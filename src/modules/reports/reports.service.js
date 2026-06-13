const prisma = require('../../config/db');

const getDashboardStats = async () => {
  const [
    beneficiariesCount,
    donationsStats,
    distributionsStats,
    campaignsCount,
    usersCountByRole,
    distributionsCountByStatus
  ] = await Promise.all([
    prisma.beneficiaries.groupBy({
      by: ['status'],
      _count: { _all: true }
    }),
    prisma.donations.aggregate({
      _count: { _all: true },
      _sum: { amount: true }
    }),
    prisma.distributions.aggregate({
      _sum: { quantity_given: true }
    }),
    prisma.campaigns.count({
      where: { status: 'active' }
    }),
    prisma.users.groupBy({
      by: ['role'],
      _count: { _all: true }
    }),
    prisma.distributions.groupBy({
      by: ['status'],
      _count: { _all: true }
    })
  ]);

  return {
    beneficiaries: beneficiariesCount.reduce((acc, curr) => {
      acc[curr.status || 'unknown'] = curr._count._all;
      return acc;
    }, {}),
    donations: {
      total_count: donationsStats._count._all,
      total_amount: donationsStats._sum.amount || 0
    },
    distributions: {
      total_quantity_given: distributionsStats._sum.quantity_given || 0,
      status_breakdown: distributionsCountByStatus.reduce((acc, curr) => {
        acc[curr.status || 'unknown'] = curr._count._all;
        return acc;
      }, {})
    },
    campaigns: {
      active_count: campaignsCount
    },
    users: usersCountByRole.reduce((acc, curr) => {
      acc[curr.role] = curr._count._all;
      return acc;
    }, {})
  };
};

module.exports = { getDashboardStats };
