const { z } = require("zod");

const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(2).max(80),
    description: z.string().optional().nullable(),
  }),
});

const updateCategorySchema = z.object({
  body: z.object({
    name: z.string().min(2).max(80).optional(),
    description: z.string().optional().nullable(),
  }),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  createAidCategorySchema: createCategorySchema,
  updateAidCategorySchema: updateCategorySchema,
};
