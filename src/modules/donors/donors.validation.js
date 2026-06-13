const { z } = require("zod");

const createDonorSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100),
    email: z.string().email().max(150).optional().nullable(),
    password: z.string().min(6),
    phone: z.string().max(20).optional().nullable(),
    org_name: z.string().max(200).optional().nullable(),
    country: z.string().max(80).optional().nullable(),
  }),
});

const updateDonorSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100).optional(),
    email: z.string().email().max(150).optional().nullable(),
    password: z.string().min(6).optional(),
    phone: z.string().max(20).optional().nullable(),
    org_name: z.string().max(200).optional().nullable(),
    country: z.string().max(80).optional().nullable(),
  }),
});

module.exports = {
  createDonorSchema,
  updateDonorSchema,
};
