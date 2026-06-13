const campaignsRepository = require("./campaigns.repository");

const create = async (data) => {
  const campaignData = {
    ...data,
    collected_amount: 0,
    status: "active",
  };

  if (data.start_date) {
    campaignData.start_date = new Date(data.start_date);
  }
  if (data.end_date) {
    campaignData.end_date = new Date(data.end_date);
  }

  return campaignsRepository.create(campaignData);
};

const findAll = async () => {
  return campaignsRepository.findAll();
};

const findById = async (id) => {
  const campaign = await campaignsRepository.findById(id);
  if (!campaign) {
    const error = new Error("Campaign not found");
    error.status = 404;
    throw error;
  }
  return campaign;
};

const update = async (id, data) => {
  await findById(id);

  const updateData = { ...data };
  if (data.start_date) {
    updateData.start_date = new Date(data.start_date);
  }
  if (data.end_date) {
    updateData.end_date = new Date(data.end_date);
  }

  return campaignsRepository.update(id, updateData);
};

const deleteCampaign = async (id) => {
  await findById(id);
  return campaignsRepository.deleteCampaign(id);
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  deleteCampaign,
};
