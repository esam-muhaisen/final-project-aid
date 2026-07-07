const prisma = require('../../config/db');

const getDashboardStats = async () => {
  const [
    beneficiariesCount,
    donationsStats,
    campaignsCount,
    usersCountByRole
  ] = await Promise.all([
    prisma.beneficiaries.groupBy({
      by: ['status'],
      _count: { _all: true }
    }),
    prisma.donations.aggregate({
      _count: { _all: true },
      _sum: { amount: true }
    }),
    prisma.campaigns.count({
      where: { status: 'active' }
    }),
    prisma.users.groupBy({
      by: ['role'],
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
