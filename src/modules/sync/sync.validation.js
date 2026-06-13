const { z } = require('zod');

const createSyncLogSchema = z.object({
  body: z.object({
    operation_type: z.string().min(1).max(50),
    table_name: z.string().min(1).max(100),
    record_id: z.coerce.number().int().optional().nullable(),
    sync_status: z.enum(['pending', 'synced', 'failed']).optional(),
  }),
});

const updateSyncLogSchema = z.object({
  body: z.object({
    sync_status: z.enum(['pending', 'synced', 'failed']),
  }),
});

module.exports = { createSyncLogSchema, updateSyncLogSchema };
