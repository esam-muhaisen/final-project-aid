const { z } = require("zod");

const createBeneficiarySchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100),
    email: z.string().email().max(150).optional().nullable(),
    password: z.string().min(6),
    phone: z.string().max(20).optional().nullable(),
    national_id: z.string().min(5).max(20),
    area_id: z.coerce.number().optional().nullable(),
    family_size: z.coerce.number().min(1),
    income: z.coerce.number().min(0).default(0),
    patients_count: z.coerce.number().min(0).default(0),
    disabled_count: z.coerce.number().min(0).default(0),
    is_displaced: z.boolean().default(false),
    release_date: z.string().datetime().or(z.string().date()),
  }),
});

const updateBeneficiarySchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100).optional(),
    email: z.string().email().max(150).optional().nullable(),
    password: z.string().min(6).optional(),
    phone: z.string().max(20).optional().nullable(),
    national_id: z.string().min(5).max(20).optional(),
    area_id: z.coerce.number().optional().nullable(),
    family_size: z.coerce.number().min(1).optional(),
    income: z.coerce.number().min(0).optional(),
    patients_count: z.coerce.number().min(0).optional(),
    disabled_count: z.coerce.number().min(0).optional(),
    is_displaced: z.boolean().optional(),
    release_date: z.string().datetime().or(z.string().date()).optional(),
    status: z.enum(["pending", "eligible", "not_eligible"]).optional(),
  }),
});

module.exports = {
  createBeneficiarySchema,
  updateBeneficiarySchema,
};
