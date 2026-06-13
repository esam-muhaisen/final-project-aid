const { z } = require("zod");

const createOrgSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100),
    email: z.string().email().max(150).optional().nullable(),
    password: z.string().min(6),
    phone: z.string().max(20).optional().nullable(),
    org_name: z.string().min(2).max(200),
    area_id: z.coerce.number().optional().nullable(),
  }),
});

const updateOrgSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100).optional(),
    email: z.string().email().max(150).optional().nullable(),
    password: z.string().min(6).optional(),
    phone: z.string().max(20).optional().nullable(),
    org_name: z.string().min(2).max(200).optional(),
    area_id: z.coerce.number().optional().nullable(),
  }),
});

const verifyOrgSchema = z.object({
  body: z.object({
    is_verified: z.boolean(),
  }),
});

module.exports = {
  createOrgSchema,
  updateOrgSchema,
  verifyOrgSchema,
};
