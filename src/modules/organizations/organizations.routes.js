const express = require("express");
const orgsController = require("./organizations.controller");
const authenticate = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");
const validate = require("../../middleware/validation.middleware");
const { createOrgSchema, updateOrgSchema, verifyOrgSchema } = require("./organizations.validation");

const router = express.Router();

router.post("/", authenticate, authorize(["admin"]), validate(createOrgSchema), orgsController.create);
router.get("/", authenticate, authorize(["admin"]), orgsController.findAll);
router.get("/:id", authenticate, authorize(["admin", "local_org"]), orgsController.findById);
router.put("/:id", authenticate, authorize(["admin", "local_org"]), validate(updateOrgSchema), orgsController.update);
router.delete("/:id", authenticate, authorize(["admin"]), orgsController.deleteOrg);
router.patch("/:id/verify", authenticate, authorize(["admin"]), validate(verifyOrgSchema), orgsController.verify);

module.exports = router;
