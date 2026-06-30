const express = require("express");
const controller = require("./beneficiary-aids.controller");
const authenticate = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");
const validate = require("../../middleware/validation.middleware");
const { updateBeneficiaryAidSchema } = require("./beneficiary-aids.validation");

const router = express.Router();

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
  authorize(["local_org", "admin"]),
  validate(updateBeneficiaryAidSchema),
  controller.update
);

router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  controller.remove
);

module.exports = router;
