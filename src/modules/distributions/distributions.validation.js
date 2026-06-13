const { z } = require("zod");

const createDistributionSchema = z.object({
  body: z.object({
    beneficiary_id: z.coerce.number().int(),
    aid_id: z.coerce.number().int(),
    distribution_cycle_id: z.coerce.number().int(),
    quantity: z.coerce.number().int().min(1),
    notes: z.string().optional().nullable(),
  }),
});

module.exports = { createDistributionSchema };
