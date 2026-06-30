const express = require("express");
const controller = require("./areas.controller");
const authenticate = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");
const validate = require("../../middleware/validation.middleware");
const { createAreaSchema, updateAreaSchema } = require("./areas.validation");

const router = express.Router();

router.post("/", authenticate, authorize(["admin"]), validate(createAreaSchema), controller.create);
router.get("/", authenticate, authorize(["admin", "local_org", "donor", "beneficiary"]), controller.findAll);
router.get("/:id", authenticate, authorize(["admin", "local_org", "donor", "beneficiary"]), controller.findById);
router.put("/:id", authenticate, authorize(["admin"]), validate(updateAreaSchema), controller.update);
router.delete("/:id", authenticate, authorize(["admin"]), controller.remove);

module.exports = router;
