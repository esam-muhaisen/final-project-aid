const formatUserResponse = (user) => {
  if (!user) return null;
  const { password, ...formatted } = user;
  return formatted;
};

const formatUserListResponse = (users) => {
  return users.map(formatUserResponse);
};

module.exports = {
  formatUserResponse,
  formatUserListResponse,
};
