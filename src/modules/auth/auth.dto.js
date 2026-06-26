const formatLoginResponse = (user, accessToken, refreshToken) => {
  const { password, ...userWithoutPassword } = user;
  return {
    user: userWithoutPassword,
    accessToken,
    refreshToken,
  };
};

module.exports = {
  formatLoginResponse,
};
