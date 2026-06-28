const formatBeneficiaryAidResponse = (aid) => {
  if (!aid) return null;
  if (aid.beneficiaries && aid.beneficiaries.users) {
    const { password, ...userWithoutPassword } = aid.beneficiaries.users;
    aid.beneficiaries.users = userWithoutPassword;
  }
  if (aid.local_organizations && aid.local_organizations.users) {
    const { password, ...userWithoutPassword } = aid.local_organizations.users;
    aid.local_organizations.users = userWithoutPassword;
  }
  return aid;
};

const formatBeneficiaryAidListResponse = (aids) => {
  return aids.map(formatBeneficiaryAidResponse);
};

module.exports = {
  formatBeneficiaryAidResponse,
  formatBeneficiaryAidListResponse,
};
