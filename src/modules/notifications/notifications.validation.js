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
    title: z.string().min(2).max(200).optional(),
    message: z.string().min(2).max(2000).optional(),
    is_read: z.boolean().optional(),
  }),
});

const notificationQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().max(100).optional().default(20),
    is_read: z.enum(['true', 'false']).optional(),
    user_id: z.coerce.number().int().positive().optional(),
  }),
});

module.exports = { createNotificationSchema, updateNotificationSchema, notificationQuerySchema };
