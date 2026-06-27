const express = require("express");
const authController = require("./auth.controller");
const authenticate = require("../../middleware/auth.middleware");
const validate = require("../../middleware/validation.middleware");
const { loginSchema, refreshTokenSchema, changePasswordSchema, beneficiaryLoginSchema } = require("./auth.validation");

const router = express.Router();

router.post("/login", validate(loginSchema), authController.login);
router.post("/login-beneficiary", validate(beneficiaryLoginSchema), authController.loginBeneficiary);
router.post("/logout", validate(refreshTokenSchema), authController.logout);
router.post("/refresh-token", validate(refreshTokenSchema), authController.refresh);
router.post("/change-password", authenticate, validate(changePasswordSchema), authController.changePassword);

module.exports = router;
