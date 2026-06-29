const authService = require("./auth.service");
const { formatLoginResponse, formatBeneficiaryLoginResponse } = require("./auth.dto");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    const { beneficiary, organization } = result;
    res.json(formatLoginResponse(result.user, { beneficiary, organization }, result.accessToken, result.refreshToken));
  } catch (error) {
    next(error);
  }
};



const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    await authService.logout(refreshToken);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.refresh(refreshToken);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    await authService.changePassword(req.user.id, oldPassword, newPassword);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const loginBeneficiary = async (req, res, next) => {
  try {
    const { national_id, release_date } = req.body;
    const result = await authService.loginBeneficiary(national_id, release_date);
    res.json(formatBeneficiaryLoginResponse(result.user, result.beneficiary, result.accessToken, result.refreshToken));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  logout,
  refresh,
  changePassword,
  loginBeneficiary,
};
