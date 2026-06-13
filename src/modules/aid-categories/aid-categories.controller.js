const aidCategoriesService = require('./aid-categories.service');
const { formatCategoryResponse, formatCategoryListResponse } = require('./aid-categories.dto');
const { createAidCategorySchema, updateAidCategorySchema } = require('./aid-categories.validation');
const authenticate = require('../../middleware/auth.middleware');
const authorize = require('../../middleware/role.middleware');
const validate = require('../../middleware/validation.middleware');

const create = async (req, res, next) => {
  try {
    const data = await aidCategoriesService.create(req.body);
    res.status(201).json(formatCategoryResponse(data));
  } catch (err) {
    next(err);
  }
};

const findAll = async (req, res, next) => {
  try {
    const list = await aidCategoriesService.findAll();
    res.json(formatCategoryListResponse(list));
  } catch (err) {
    next(err);
  }
};

const findById = async (req, res, next) => {
  try {
    const data = await aidCategoriesService.findById(Number(req.params.id));
    res.json(formatCategoryResponse(data));
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const data = await aidCategoriesService.update(Number(req.params.id), req.body);
    res.json(formatCategoryResponse(data));
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await aidCategoriesService.deleteCategory(Number(req.params.id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = { create, findAll, findById, update, remove };
