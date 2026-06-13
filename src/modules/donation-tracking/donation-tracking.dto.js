const formatTrackingResponse = (t) => ({
  id: t.id,
  donation_id: t.donation_id,
  status: t.status,
  description: t.description,
  created_at: t.created_at
});

const formatTrackingListResponse = (list) => list.map(formatTrackingResponse);

module.exports = { formatTrackingResponse, formatTrackingListResponse };
