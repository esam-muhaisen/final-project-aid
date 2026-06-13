const formatDonorResponse = (donor) => {
  if (!donor) return null;
  if (donor.users) {
    const { password, ...userWithoutPassword } = donor.users;
    donor.users = userWithoutPassword;
  }
  return donor;
};

const formatDonorListResponse = (donors) => {
  return donors.map(formatDonorResponse);
};

module.exports = {
  formatDonorResponse,
  formatDonorListResponse,
};
