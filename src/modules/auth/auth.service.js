const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const env = require("../../config/env");
const prisma = require("../../config/db");
const authRepository = require("./auth.repository");
const usersRepository = require("../users/users.repository");
const { logAuditAction } = require("../../shared/audit");

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, env.JWT_SECRET, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

const login = async (email, password) => {
  const user = await usersRepository.findByEmail(email);
  if (!user || !user.is_active) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  const matches = await bcrypt.compare(password, user.password);
  if (!matches) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await authRepository.addRefreshToken(refreshToken);
  await logAuditAction(user.id, "Login", "users", user.id);

  return { user, accessToken, refreshToken };
};

const logout = async (refreshToken) => {
  const exists = await authRepository.hasRefreshToken(refreshToken);
  if (!exists) {
    const error = new Error("Invalid refresh token");
    error.status = 400;
    throw error;
  }
  await authRepository.removeRefreshToken(refreshToken);
};

const refresh = async (refreshToken) => {
  const exists = await authRepository.hasRefreshToken(refreshToken);
  if (!exists) {
    const error = new Error("Invalid or revoked refresh token");
    error.status = 401;
    throw error;
  }

  try {
    const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);
    const user = await usersRepository.findById(decoded.id);

    if (!user || !user.is_active) {
      const error = new Error("User inactive or not found");
      error.status = 401;
      throw error;
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    await authRepository.removeRefreshToken(refreshToken);
    await authRepository.addRefreshToken(newRefreshToken);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  } catch (err) {
    await authRepository.removeRefreshToken(refreshToken);
    const error = new Error("Invalid or expired refresh token");
    error.status = 401;
    throw error;
  }
};

const changePassword = async (userId, oldPassword, newPassword) => {
  const user = await usersRepository.findById(userId);
  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  const matches = await bcrypt.compare(oldPassword, user.password);
  if (!matches) {
    const error = new Error("Incorrect old password");
    error.status = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await usersRepository.update(userId, { password: hashedPassword });
  await logAuditAction(userId, "Password Change", "users", userId);
};

module.exports = {
  login,
  logout,
  refresh,
  changePassword,
};
