const donationTrackingRepository = require('./donation-tracking.repository');
const donationsRepository = require('../donations/donations.repository');
const audit = require('../../shared/audit');

const create = async (data) => {
  const donation = await donationsRepository.findById(data.donation_id);
  if (!donation) {
    const err = new Error('Donation not found');
    err.status = 404;
    throw err;
  }
  const tracking = await donationTrackingRepository.create(data);
  // Optional: update donation status in donations table based on tracking update
  await donationsRepository.update(data.donation_id, { status: data.status === 'delivered' ? 'completed' : 'pending' });
  await audit.log('create_tracking', 'donation_tracking', tracking.id);
  return tracking;
};

const findAll = async () => donationTrackingRepository.findAll();

const findById = async (id) => {
  const tracking = await donationTrackingRepository.findById(id);
  if (!tracking) {
    const err = new Error('Tracking record not found');
    err.status = 404;
    throw err;
  }
  return tracking;
};

const update = async (id, data) => {
  await findById(id);
  return donationTrackingRepository.update(id, data);
};

const remove = async (id) => {
  await findById(id);
  return donationTrackingRepository.remove(id);
};

module.exports = { create, findAll, findById, update, remove };
