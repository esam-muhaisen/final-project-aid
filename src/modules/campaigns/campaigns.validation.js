const { z } = require("zod");

const createCampaignSchema = z.object({
  body: z.object({
    title: z.string().min(2).max(200),
    description: z.string().optional().nullable(),
    target_amount: z.preprocess(
      (v) => (v === 'unlimited' ? null : v === null || v === '' ? null : Number(v)),
      z.number().min(0).nullable().optional()
    ),
    start_date: z.string().date().or(z.string().datetime()).optional().nullable(),
    end_date: z.string().date().or(z.string().datetime()).optional().nullable(),
  }),
});

const updateCampaignSchema = z.object({
  body: z.object({
    title: z.string().min(2).max(200).optional(),
    description: z.string().optional().nullable(),
    target_amount: z.preprocess(
      (v) => (v === 'unlimited' ? null : v === null || v === '' ? null : Number(v)),
      z.number().min(0).nullable().optional()
    ),
    collected_amount: z.coerce.number().min(0).optional(),
    start_date: z.string().date().or(z.string().datetime()).optional().nullable(),
    end_date: z.string().date().or(z.string().datetime()).optional().nullable(),
    status: z.enum(["active", "closed"]).optional(),
  }),
});

module.exports = {
  createCampaignSchema,
  updateCampaignSchema,
};
