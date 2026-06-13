const { z } = require('zod');
const createSchema = z.object({
  body: z.object({
    beneficiary_id: z.number().int().positive(),
    org_id: z.number().int().positive(),
    result: z.enum(['approved', 'rejected']),
    notes: z.string().optional()
  })
});
const updateSchema = z.object({
  body: z.object({
    result: z.enum(['approved', 'rejected']).optional(),
    notes: z.string().optional()
  })
});
module.exports = { createSchema, updateSchema };
