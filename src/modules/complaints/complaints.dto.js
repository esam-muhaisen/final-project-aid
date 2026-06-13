const formatComplaintResponse = (c) => ({
  id: c.id,
  beneficiary_id: c.beneficiary_id,
  subject: c.subject,
  message: c.message,
  status: c.status,
  admin_response: c.admin_response,
  resolved_by: c.resolved_by,
  created_at: c.created_at
});

const formatComplaintListResponse = (list) => list.map(formatComplaintResponse);

module.exports = { formatComplaintResponse, formatComplaintListResponse };
