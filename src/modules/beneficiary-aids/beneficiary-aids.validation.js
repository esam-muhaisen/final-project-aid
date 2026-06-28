const { z } = require("zod");

const updateBeneficiaryAidSchema = z.object({
  body: z.object({
    status: z.enum(["rejected", "approved", "preparing", "shipping", "delivered"]).optional(),
    pickup_location_id: z.number().int().positive().optional().nullable(),
  }),
});

module.exports = {
  updateBeneficiaryAidSchema,
};
