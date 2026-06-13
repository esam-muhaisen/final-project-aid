const { z } = require("zod");

const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100),
    email: z.string().email().max(150).optional().nullable(),
    password: z.string().min(6).max(255),
    role: z.enum(["admin", "donor", "beneficiary", "local_org"]),
    phone: z.string().max(20).optional().nullable(),
  }),
});

const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100).optional(),
    email: z.string().email().max(150).optional().nullable(),
    password: z.string().min(6).max(255).optional(),
    role: z.enum(["admin", "donor", "beneficiary", "local_org"]).optional(),
    phone: z.string().max(20).optional().nullable(),
    is_active: z.boolean().optional(),
  }),
});

const updateStatusSchema = z.object({
  body: z.object({
    is_active: z.boolean(),
  }),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  updateStatusSchema,
};
