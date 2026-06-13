const cyclesRepository = require("./distribution-cycles.repository");

const create = async (data) => {
  const cycleData = {
    ...data,
    status: "planned",
  };

  if (data.start_date) {
    cycleData.start_date = new Date(data.start_date);
  }
  if (data.end_date) {
    cycleData.end_date = new Date(data.end_date);
  }

  return cyclesRepository.create(cycleData);
};

const findAll = async () => {
  return cyclesRepository.findAll();
};

const findById = async (id) => {
  const cycle = await cyclesRepository.findById(id);
  if (!cycle) {
    const error = new Error("Distribution cycle not found");
    error.status = 404;
    throw error;
  }
  return cycle;
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

  return cyclesRepository.update(id, updateData);
};

const deleteCycle = async (id) => {
  await findById(id);
  return cyclesRepository.deleteCycle(id);
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  deleteCycle,
};
