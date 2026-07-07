const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const env = require("../../config/env");
const prisma = require("../../config/db");
const authRepository = require("./auth.repository");
const usersRepository = require("../users/users.repository");
const beneficiariesRepository = require("../beneficiaries/beneficiaries.repository");
const organizationsRepository = require("../organizations/organizations.repository");
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

  // Build extras based on user role
  const extras = {};
  if (user.role === "beneficiary") {
    extras.beneficiary = await beneficiariesRepository.findByUserId(user.id);
    if (extras.beneficiary && extras.beneficiary.status === "not_eligible") {
      const error = new Error("Your account has been rejected. You are not eligible to access the system.");
      error.status = 403;
      throw error;
    }
  } else if (user.role === "local_org") {
    extras.organization = await organizationsRepository.findByUserId(user.id);
    if (extras.organization && !extras.organization.is_verified) {
      const error = new Error("Your organization account has not been verified yet. Please contact the admin.");
      error.status = 403;
      throw error;
    }
  }

  return { user, ...extras, accessToken, refreshToken };
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

const loginBeneficiary = async (nationalId, releaseDate, password) => {
  const beneficiary = await prisma.beneficiaries.findUnique({
    where: { national_id: nationalId },
    include: {
      users: true,
    },
  });

  if (!beneficiary) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  if (beneficiary.status === "not_eligible") {
    const error = new Error("Your account has been rejected. You are not eligible to access the system.");
    error.status = 403;
    throw error;
  }

  const dbDateStr = beneficiary.release_date.toISOString().split("T")[0];
  const inputDateStr = new Date(releaseDate).toISOString().split("T")[0];
  if (dbDateStr !== inputDateStr) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  const user = beneficiary.users;
  if (!user || !user.is_active) {
    const error = new Error("User inactive or not found");
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
  await logAuditAction(user.id, "Beneficiary Login", "users", user.id);

  return { user, beneficiary, accessToken, refreshToken };
};

module.exports = {
  login,
  logout,
  refresh,
  changePassword,
  loginBeneficiary,
};
