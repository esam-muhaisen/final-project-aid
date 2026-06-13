const { z } = require("zod");

const createAidTypeSchema = z.object({
  body: z.object({
    category_id: z.coerce.number().int(),
    name: z.string().min(2).max(120),
    unit: z.string().max(30).default("item"),
  }),
});

const updateAidTypeSchema = z.object({
  body: z.object({
    category_id: z.coerce.number().int().optional(),
    name: z.string().min(2).max(120).optional(),
    unit: z.string().max(30).optional(),
  }),
});

module.exports = {
  createAidTypeSchema,
  updateAidTypeSchema,
};
