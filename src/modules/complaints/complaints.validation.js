const { z } = require('zod');

const createComplaintSchema = z.object({
  body: z.object({
    beneficiary_id: z.coerce.number().int().positive(),
    subject: z.string().min(3).max(200),
    message: z.string().min(5).max(2000),
  }),
});

const resolveComplaintSchema = z.object({
  body: z.object({
    admin_response: z.string().min(3).max(2000),
    status: z.enum(['under_review', 'resolved']).default('resolved'),
  }),
});
  
module.exports = { createComplaintSchema, resolveComplaintSchema };
