const formatLoginResponse = (user, extras = {}, accessToken, refreshToken) => {
  const { password, ...userWithoutPassword } = user;
  return {
    user: userWithoutPassword,
    ...extras,
    accessToken,
    refreshToken,
  };
};

module.exports = {
  formatLoginResponse,
};
