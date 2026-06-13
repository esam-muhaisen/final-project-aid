const { z } = require("zod");

const loginSchema = z.object({
  body: z.object({
    email: z.string().email().max(150),
    password: z.string().min(6),
  }),
});

const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(1),
  }),
});

const changePasswordSchema = z.object({
  body: z.object({
    oldPassword: z.string().min(6),
    newPassword: z.string().min(6),
  }),
});

module.exports = {
  loginSchema,
  refreshTokenSchema,
  changePasswordSchema,
};
