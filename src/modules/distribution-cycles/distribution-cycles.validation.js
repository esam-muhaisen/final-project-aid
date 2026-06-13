const { z } = require("zod");

const createCycleSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(200),
    description: z.string().optional().nullable(),
    start_date: z.string().date().or(z.string().datetime()).optional().nullable(),
    end_date: z.string().date().or(z.string().datetime()).optional().nullable(),
  }),
});

const updateCycleSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(200).optional(),
    description: z.string().optional().nullable(),
    start_date: z.string().date().or(z.string().datetime()).optional().nullable(),
    end_date: z.string().date().or(z.string().datetime()).optional().nullable(),
    status: z.enum(["planned", "active", "completed", "cancelled"]).optional(),
  }),
});

module.exports = {
  createCycleSchema,
  updateCycleSchema,
};
