const { z } = require("zod");

const createPickupLocationSchema = z.object({
  body: z.object({
    area_id: z.number({ required_error: "area_id is required" }).int().positive(),
    name: z.string().min(2).max(200),
  }),
});

const updatePickupLocationSchema = z.object({
  body: z.object({
    area_id: z.number().int().positive().optional(),
    name: z.string().min(2).max(200).optional(),
  }),
});

module.exports = {
  createPickupLocationSchema,
  updatePickupLocationSchema,
};
