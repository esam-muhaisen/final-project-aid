const express = require("express");
const controller = require("./pickup-locations.controller");
const authenticate = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");
const validate = require("../../middleware/validation.middleware");
const { createPickupLocationSchema, updatePickupLocationSchema } = require("./pickup-locations.validation");

const router = express.Router();

router.post("/", authenticate, authorize(["admin"]), validate(createPickupLocationSchema), controller.create);
router.get("/", authenticate, authorize(["admin", "local_org", "donor", "beneficiary"]), controller.findAll);
router.get("/:id", authenticate, authorize(["admin", "local_org", "donor", "beneficiary"]), controller.findById);
router.put("/:id", authenticate, authorize(["admin"]), validate(updatePickupLocationSchema), controller.update);
router.delete("/:id", authenticate, authorize(["admin"]), controller.remove);

module.exports = router;
