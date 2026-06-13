const campaignsService = require('./campaigns.service');
const { formatCampaignResponse, formatCampaignListResponse } = require('./campaigns.dto');

const create = async (req, res, next) => {
  try {
    const campaign = await campaignsService.create(req.body);
    res.status(201).json(formatCampaignResponse(campaign));
  } catch (err) {
    next(err);
  }
};

const findAll = async (req, res, next) => {
  try {
    const list = await campaignsService.findAll();
    res.json(formatCampaignListResponse(list));
  } catch (err) {
    next(err);
  }
};

const findById = async (req, res, next) => {
  try {
    const campaign = await campaignsService.findById(req.params.id);
    res.json(formatCampaignResponse(campaign));
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const campaign = await campaignsService.update(req.params.id, req.body);
    res.json(formatCampaignResponse(campaign));
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await campaignsService.deleteCampaign(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = { create, findAll, findById, update, remove };
