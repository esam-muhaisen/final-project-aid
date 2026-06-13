const formatBeneficiaryResponse = (beneficiary) => {
  if (!beneficiary) return null;
  if (beneficiary.users) {
    const { password, ...userWithoutPassword } = beneficiary.users;
    beneficiary.users = userWithoutPassword;
  }
  return beneficiary;
};

const formatBeneficiaryListResponse = (beneficiaries) => {
  return beneficiaries.map(formatBeneficiaryResponse);
};

module.exports = {
  formatBeneficiaryResponse,
  formatBeneficiaryListResponse,
};
