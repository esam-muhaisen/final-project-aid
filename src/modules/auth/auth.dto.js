const formatLoginResponse = (user, beneficiary, accessToken, refreshToken) => {
  const { password, ...userWithoutPassword } = user;
  return {
    user: userWithoutPassword,
    beneficiary: beneficiary || null,
    accessToken,
    refreshToken,
  };
};

module.exports = {
  formatLoginResponse,
};
