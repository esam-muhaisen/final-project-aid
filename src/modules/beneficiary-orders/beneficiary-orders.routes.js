const express = require("express");
const controller = require("./beneficiary-orders.controller");
const authenticate = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");
const validate = require("../../middleware/validation.middleware");
const {
  createBeneficiaryOrderSchema,
  updateBeneficiaryOrderSchema,
} = require("./beneficiary-orders.validation");

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize(["admin", "beneficiary"]),
  validate(createBeneficiaryOrderSchema),
  controller.create
);

router.get(
  "/",
  authenticate,
  authorize(["admin", "local_org", "beneficiary"]),
  controller.findAll
);

router.get(
  "/:id",
  authenticate,
  authorize(["admin", "local_org", "beneficiary"]),
  controller.findById
);

router.put(
  "/:id",
  authenticate,
  authorize(["admin", "local_org", "beneficiary"]),
  validate(updateBeneficiaryOrderSchema),
  controller.update
);

router.delete(
  "/:id",
  authenticate,
  authorize(["admin", "beneficiary"]),
  controller.remove
);

module.exports = router;
