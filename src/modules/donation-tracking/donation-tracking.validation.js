const { z } = require('zod');

const createTrackingSchema = z.object({
  body: z.object({
    donation_id: z.coerce.number().int().positive(),
    status: z.string().min(1).max(100),
    description: z.string().max(500).optional().nullable(),
  }),
});

const updateTrackingSchema = z.object({
  body: z.object({
    status: z.string().min(1).max(100).optional(),
    description: z.string().max(500).optional().nullable(),
  }),
});

module.exports = { createTrackingSchema, updateTrackingSchema };
