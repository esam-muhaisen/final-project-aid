const formatSyncLogResponse = (log) => ({
  id: log.id,
  user_id: log.user_id,
  operation_type: log.operation_type,
  table_name: log.table_name,
  record_id: log.record_id,
  sync_status: log.sync_status,
  created_at: log.created_at,
  synced_at: log.synced_at
});

const formatSyncLogListResponse = (list) => list.map(formatSyncLogResponse);

module.exports = { formatSyncLogResponse, formatSyncLogListResponse };
