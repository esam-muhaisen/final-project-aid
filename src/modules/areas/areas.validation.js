const { z } = require("zod");

const createAreaSchema = z.object({
  body: z.object({
    governorate_id: z.coerce.number().int().positive(),
    name: z.string().min(1).max(100),
  }),
});

const updateAreaSchema = z.object({
  body: z.object({
    governorate_id: z.coerce.number().int().positive().optional(),
    name: z.string().min(1).max(100).optional(),
  }),
});

module.exports = {
  createAreaSchema,
  updateAreaSchema,
};
