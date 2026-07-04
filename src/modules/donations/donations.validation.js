const { z } = require('zod');
const createDonationSchema = z.object({
  body: z.object({
    donor_id: z.number().nullable().optional(),
    guest_name: z.string().max(100).nullable().optional(),
    guest_email: z.preprocess(
      (v) => (v === '' ? undefined : v),
      z.string().email().max(150).nullable().optional()
    ),
    amount: z.number().positive(),
    currency: z.string().max(10).nullable().optional(),
    tracking_code: z.string().max(20).nullable().optional()
  })
});
module.exports = { createDonationSchema };
