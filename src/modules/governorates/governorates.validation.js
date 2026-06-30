const { z } = require("zod");

const createGovernorateSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(80),
  }),
});

const updateGovernorateSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(80).optional(),
  }),
});

module.exports = {
  createGovernorateSchema,
  updateGovernorateSchema,
};
