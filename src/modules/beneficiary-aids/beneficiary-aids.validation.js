const { z } = require("zod");

const createBeneficiaryAidSchema = z.object({
  body: z.object({
    beneficiary_id: z.number().int().positive(),
    aid_type_id: z.number().int().positive(),
    pickup_location_id: z.number().int().positive().optional().nullable(),
  }),
});

const updateBeneficiaryAidSchema = z.object({
  body: z.object({
    status: z.enum(["rejected", "approved", "preparing", "shipping", "delivered"]).optional(),
    pickup_location_id: z.number().int().positive().optional().nullable(),
  }),
});

module.exports = {
  createBeneficiaryAidSchema,
  updateBeneficiaryAidSchema,
};
