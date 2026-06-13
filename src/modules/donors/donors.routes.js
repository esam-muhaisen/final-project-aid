const express = require("express");
const donorsController = require("./donors.controller");
const authenticate = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");
const validate = require("../../middleware/validation.middleware");
const { createDonorSchema, updateDonorSchema } = require("./donors.validation");

const router = express.Router();

router.post("/", authenticate, authorize(["admin"]), validate(createDonorSchema), donorsController.create);
router.get("/", authenticate, authorize(["admin"]), donorsController.findAll);
router.get("/:id", authenticate, authorize(["admin", "donor"]), donorsController.findById);
router.put("/:id", authenticate, authorize(["admin", "donor"]), validate(updateDonorSchema), donorsController.update);
router.delete("/:id", authenticate, authorize(["admin"]), donorsController.deleteDonor);

module.exports = router;
