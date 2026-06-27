const formatLoginResponse = (user, accessToken, refreshToken) => {
  const { password, ...userWithoutPassword } = user;
  return {
    user: userWithoutPassword,
    accessToken,
    refreshToken,
  };
};

const formatBeneficiaryLoginResponse = (user, beneficiary, accessToken, refreshToken) => {
  const { password, ...userWithoutPassword } = user;
  const { users, ...beneficiaryWithoutUser } = beneficiary;
  return {
    accessToken,
    refreshToken,
    user: userWithoutPassword,
    beneficiary: beneficiaryWithoutUser,
  };
};

module.exports = {
  formatLoginResponse,
  formatBeneficiaryLoginResponse,
};
