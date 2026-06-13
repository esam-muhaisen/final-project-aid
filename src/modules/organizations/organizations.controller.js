const orgsService = require("./organizations.service");
const { formatOrgResponse, formatOrgListResponse } = require("./organizations.dto");

const create = async (req, res, next) => {
  try {
    const actorId = req.user ? req.user.id : null;
    const org = await orgsService.create(req.body, actorId);
    res.status(201).json(formatOrgResponse(org));
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  try {
    const orgs = await orgsService.findAll();
    res.json(formatOrgListResponse(orgs));
  } catch (error) {
    next(error);
  }
};

const findById = async (req, res, next) => {
  try {
    const org = await orgsService.findById(req.params.id);
    if (req.user.role === "local_org" && req.user.id !== org.user_id) {
      return res.status(403).json({ error: "Access denied" });
    }
    res.json(formatOrgResponse(org));
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const org = await orgsService.findById(req.params.id);
    if (req.user.role === "local_org" && req.user.id !== org.user_id) {
      return res.status(403).json({ error: "Access denied" });
    }
    const actorId = req.user ? req.user.id : null;
    const updated = await orgsService.update(req.params.id, req.body, actorId);
    res.json(formatOrgResponse(updated));
  } catch (error) {
    next(error);
  }
};

const deleteOrg = async (req, res, next) => {
  try {
    const actorId = req.user ? req.user.id : null;
    await orgsService.deleteOrg(req.params.id, actorId);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const verify = async (req, res, next) => {
  try {
    const actorId = req.user ? req.user.id : null;
    const updated = await orgsService.verify(req.params.id, req.body.is_verified, actorId);
    res.json(formatOrgResponse(updated));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  deleteOrg,
  verify,
};
