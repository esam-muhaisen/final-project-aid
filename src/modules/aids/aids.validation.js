const { z } = require("zod");

const createAidSchema = z.object({
  body: z.object({
    aid_type_id: z.coerce.number().int(),
    donor_id: z.coerce.number().int().optional().nullable(),
    quantity: z.coerce.number().int().min(1),
    expiry_date: z.string().datetime().or(z.string().date()).optional().nullable(),
    batch_code: z.string().max(50).optional().nullable(),
  }),
});

const updateAidSchema = z.object({
  body: z.object({
    aid_type_id: z.coerce.number().int().optional(),
    donor_id: z.coerce.number().int().optional().nullable(),
    quantity: z.coerce.number().int().min(1).optional(),
    remaining_quantity: z.coerce.number().int().min(0).optional(),
    expiry_date: z.string().datetime().or(z.string().date()).optional().nullable(),
    status: z.enum(["active", "exhausted", "expired"]).optional(),
    batch_code: z.string().max(50).optional().nullable(),
  }),
});

module.exports = {
  createAidSchema,
  updateAidSchema,
};
