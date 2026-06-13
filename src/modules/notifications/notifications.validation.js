const { z } = require('zod');

const createNotificationSchema = z.object({
  body: z.object({
    user_id: z.coerce.number().int().positive(),
    title: z.string().min(2).max(200),
    message: z.string().min(2).max(2000),
  }),
});

const updateNotificationSchema = z.object({
  body: z.object({
    is_read: z.boolean(),
  }),
});

module.exports = { createNotificationSchema, updateNotificationSchema };
