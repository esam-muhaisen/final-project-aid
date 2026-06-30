const beneficiaryOrdersService = require("./beneficiary-orders.service");
const beneficiariesService = require("../beneficiaries/beneficiaries.service");
const beneficiariesRepository = require("../beneficiaries/beneficiaries.repository");
const {
  formatBeneficiaryOrderResponse,
  formatBeneficiaryOrderListResponse,
} = require("./beneficiary-orders.dto");

const create = async (req, res, next) => {
  try {
    const beneficiary = await beneficiariesService.findById(req.body.beneficiary_id);
    if (req.user.role === "beneficiary" && req.user.id !== beneficiary.user_id) {
      return res.status(403).json({ error: "Access denied: You cannot create orders for another beneficiary" });
    }
    const order = await beneficiaryOrdersService.create(req.body);
    res.status(201).json(formatBeneficiaryOrderResponse(order));
  } catch (err) {
    next(err);
  }
};

const findAll = async (req, res, next) => {
  try {
    let { beneficiary_id } = req.query;

    if (req.user.role === "beneficiary") {
      const beneficiary = await beneficiariesRepository.findByUserId(req.user.id);
      if (!beneficiary) {
        return res.status(404).json({ error: "Beneficiary record not found" });
      }
      beneficiary_id = beneficiary.id;
    }

    let orders;
    if (beneficiary_id) {
      orders = await beneficiaryOrdersService.findByBeneficiary(beneficiary_id);
    } else {
      orders = await beneficiaryOrdersService.findAll();
    }
    res.json(formatBeneficiaryOrderListResponse(orders));
  } catch (err) {
    next(err);
  }
};

const findById = async (req, res, next) => {
  try {
    const order = await beneficiaryOrdersService.findById(req.params.id);
    if (req.user.role === "beneficiary" && req.user.id !== order.beneficiaries.user_id) {
      return res.status(403).json({ error: "Access denied" });
    }
    res.json(formatBeneficiaryOrderResponse(order));
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const order = await beneficiaryOrdersService.findById(req.params.id);
    if (req.user.role === "beneficiary") {
      console.log("req.user:", req.user);
      console.log("order:", order);
      console.log("beneficiaries:", order?.beneficiaries);

      if (req.user.id !== order?.beneficiaries?.user_id) {
        return res.status(403).json({ error: "Access denied" });
      }
      if (req.body.status !== undefined) {
        return res.status(403).json({ error: "Access denied: Beneficiaries cannot update order status" });
      }
    }

    // if (req.body.status !== undefined && req.body.status !== order.status) {
    //   if (req.user.role !== "local_org") {
    //     return res.status(403).json({ error: "Access denied: Only local organizations can update order status" });
    //   }
    // }

    const updated = await beneficiaryOrdersService.update(req.params.id, req.body, req.user);
    res.json(formatBeneficiaryOrderResponse(updated));
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const order = await beneficiaryOrdersService.findById(req.params.id);
    if (req.user.role === "beneficiary" && req.user.id !== order.beneficiaries.user_id) {
      return res.status(403).json({ error: "Access denied" });
    }
    await beneficiaryOrdersService.deleteOrder(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
};
