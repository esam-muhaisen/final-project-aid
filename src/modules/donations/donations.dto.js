const formatDonationResponse = (d) => ({
  id: d.id,
  guest_name: d.guest_name,
  guest_email: d.guest_email,
  amount: d.amount,
  currency: d.currency,
  status: d.status,
  donated_at: d.donated_at
});

const formatDonationListResponse = (list) => list.map(formatDonationResponse);

module.exports = { formatDonationResponse, formatDonationListResponse };
