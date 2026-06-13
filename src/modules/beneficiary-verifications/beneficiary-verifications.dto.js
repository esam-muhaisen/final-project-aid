const formatVerificationResponse = (v) => ({
  id: v.id,
  beneficiary_id: v.beneficiary_id,
  org_id: v.org_id,
  result: v.result,
  notes: v.notes,
  created_at: v.created_at,
  updated_at: v.updated_at
});

const formatVerificationListResponse = (list) => list.map(formatVerificationResponse);

module.exports = { formatVerificationResponse, formatVerificationListResponse };
