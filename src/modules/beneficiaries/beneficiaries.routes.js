const express = require("express");
const beneficiariesController = require("./beneficiaries.controller");
const authenticate = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");
const validate = require("../../middleware/validation.middleware");
const { createBeneficiarySchema, updateBeneficiarySchema } = require("./beneficiaries.validation");

const router = express.Router();

router.post("/", authenticate, authorize(["admin"]), validate(createBeneficiarySchema), beneficiariesController.create);
router.get("/", authenticate, authorize(["admin", "local_org"]), beneficiariesController.findAll);
router.get("/:id", authenticate, authorize(["admin", "local_org", "beneficiary"]), beneficiariesController.findById);
router.put("/:id", authenticate, authorize(["admin", "local_org", "beneficiary"]), validate(updateBeneficiarySchema), beneficiariesController.update);
router.delete("/:id", authenticate, authorize(["admin"]), beneficiariesController.deleteBeneficiary);
router.get("/:id/history", authenticate, authorize(["admin", "local_org", "beneficiary"]), beneficiariesController.findHistory);

module.exports = router;
