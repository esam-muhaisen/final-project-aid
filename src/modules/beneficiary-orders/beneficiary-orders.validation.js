const { z } = require("zod");

const createBeneficiaryOrderSchema = z.object({
  body: z.object({
    beneficiary_id: z.number({ required_error: "beneficiary_id is required" }).int().positive(),
    aid_type_id: z.number({ required_error: "aid_type_id is required" }).int().positive(),
    description: z.string().optional().nullable(),
  }),
});

const updateBeneficiaryOrderSchema = z.object({
  body: z.object({
    aid_type_id: z.number().int().positive().optional(),
    description: z.string().optional().nullable(),
    status: z.enum(["pending", "approved", "rejected"]).optional(),
  }),
});

module.exports = {
  createBeneficiaryOrderSchema,
  updateBeneficiaryOrderSchema,
};
