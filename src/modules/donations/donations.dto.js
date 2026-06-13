const formatDonationResponse = (d) => ({
  id: d.id,
  donor_id: d.donor_id,
  guest_name: d.guest_name,
  guest_email: d.guest_email,
  amount: d.amount,
  currency: d.currency,
  tracking_code: d.tracking_code,
  status: d.status,
  donated_at: d.donated_at
});

const formatDonationListResponse = (list) => list.map(formatDonationResponse);

module.exports = { formatDonationResponse, formatDonationListResponse };
