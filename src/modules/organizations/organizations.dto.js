const formatOrgResponse = (org) => {
  if (!org) return null;
  if (org.users) {
    const { password, ...userWithoutPassword } = org.users;
    org.users = userWithoutPassword;
  }
  return org;
};

const formatOrgListResponse = (orgs) => {
  return orgs.map(formatOrgResponse);
};

module.exports = {
  formatOrgResponse,
  formatOrgListResponse,
};
