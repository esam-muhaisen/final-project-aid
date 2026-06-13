const formatAuditLogResponse = (log) => ({
  id: log.id,
  user_id: log.user_id,
  action: log.action,
  table_name: log.table_name,
  record_id: log.record_id,
  created_at: log.created_at,
  user: log.users ? {
    id: log.users.id,
    name: log.users.name,
    email: log.users.email,
    role: log.users.role
  } : null
});

const formatAuditLogListResponse = (list) => list.map(formatAuditLogResponse);

module.exports = { formatAuditLogResponse, formatAuditLogListResponse };
