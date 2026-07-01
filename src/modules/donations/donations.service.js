const crypto = require('crypto');
const donationsRepository = require('./donations.repository');
const { logDonationAudit } = require('../../shared/audit');

const generateTrackingCode = () => {
  return 'DON-' + crypto.randomBytes(6).toString('hex').toUpperCase();
};

const create = async (data) => {
  if (data.donor_id) {
    const existing = await donationsRepository.findByDonorId(data.donor_id);
    if (existing) {
      const updated = await donationsRepository.incrementAmount(existing.id, data.amount);
      await logDonationAudit(data.user_id, updated.id, 'increment_donation_amount');
      return updated;
    }
  }

  data.tracking_code = generateTrackingCode();
  const donation = await donationsRepository.create(data);
  await logDonationAudit(data.user_id, donation.id, 'create_donation');
  
  return donation;
};

const findAll = async () => donationsRepository.findAll();

const findById = async (id) => {
  const donation = await donationsRepository.findById(id);
  if (!donation) { const err = new Error('Donation not found'); err.status = 404; throw err; }
  return donation;
};

const findByTrackingCode = async (trackingCode) => {
  const donation = await donationsRepository.findByTrackingCode(trackingCode);
  if (!donation) { const err = new Error('Donation not found'); err.status = 404; throw err; }
  return donation;
};

const update = async (id, data) => {
  await findById(id);
  return donationsRepository.update(id, data);
};

const remove = async (id) => {
  await findById(id);
  return donationsRepository.remove(id);
};

module.exports = { create, findAll, findById, findByTrackingCode, update, remove };
