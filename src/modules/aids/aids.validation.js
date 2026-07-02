const { z } = require("zod");

const createAidSchema = z.object({
  body: z.object({
    aid_type_id: z.coerce.number().int(),
    org_id: z.coerce.number().int().optional().nullable(),
    quantity: z.coerce.number().int().min(1),
    batch_code: z.string().max(50).optional().nullable(),
  }),
});

const updateAidSchema = z.object({
  body: z.object({
    aid_type_id: z.coerce.number().int().optional(),
    org_id: z.coerce.number().int().optional().nullable(),
    quantity: z.coerce.number().int().min(1).optional(),
    remaining_quantity: z.coerce.number().int().min(0).optional(),
    status: z.enum(["active", "exhausted", "expired"]).optional(),
    batch_code: z.string().max(50).optional().nullable(),
  }),
});

const deductAidSchema = z.object({
  body: z.object({
    quantity: z.coerce.number().int().min(1),
  }),
});

module.exports = {
  createAidSchema,
  updateAidSchema,
  deductAidSchema,
};
