const activeRefreshTokens = new Set();

const addRefreshToken = async (token) => {
  activeRefreshTokens.add(token);
};

const hasRefreshToken = async (token) => {
  return activeRefreshTokens.has(token);
};

const removeRefreshToken = async (token) => {
  activeRefreshTokens.delete(token);
};

module.exports = {
  addRefreshToken,
  hasRefreshToken,
  removeRefreshToken,
};
