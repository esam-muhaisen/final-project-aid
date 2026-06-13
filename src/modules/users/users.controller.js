const usersService = require("./users.service");
const { formatUserResponse, formatUserListResponse } = require("./users.dto");

const create = async (req, res, next) => {
  try {
    const actorId = req.user ? req.user.id : null;
    const user = await usersService.create(req.body, actorId);
    res.status(201).json(formatUserResponse(user));
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  try {
    const users = await usersService.findAll();
    res.json(formatUserListResponse(users));
  } catch (error) {
    next(error);
  }
};

const findById = async (req, res, next) => {
  try {
    const user = await usersService.findById(req.params.id);
    res.json(formatUserResponse(user));
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const actorId = req.user ? req.user.id : null;
    const user = await usersService.update(req.params.id, req.body, actorId);
    res.json(formatUserResponse(user));
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const actorId = req.user ? req.user.id : null;
    await usersService.deleteUser(req.params.id, actorId);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const actorId = req.user ? req.user.id : null;
    const user = await usersService.updateStatus(req.params.id, req.body.is_active, actorId);
    res.json(formatUserResponse(user));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  deleteUser,
  updateStatus,
};
