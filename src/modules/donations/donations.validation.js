const { z } = require('zod');
const createDonationSchema = z.object({
  body: z.object({
    donor_id: z.number().optional(),
    guest_name: z.string().max(100).optional(),
    guest_email: z.string().email().max(150).optional(),
    amount: z.number().positive(),
    currency: z.string().max(10).optional(),
    tracking_code: z.string().max(20).optional()
  })
});
module.exports = { createDonationSchema };
