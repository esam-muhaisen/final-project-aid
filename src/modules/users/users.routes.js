const express = require("express");
const usersController = require("./users.controller");
const authenticate = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");
const validate = require("../../middleware/validation.middleware");
const { createUserSchema, updateUserSchema, updateStatusSchema } = require("./users.validation");

const router = express.Router();

router.post("/", validate(createUserSchema), usersController.create);
router.get("/", authenticate, authorize(["admin"]), usersController.findAll);
router.get("/:id", authenticate, usersController.findById);
router.put("/:id", authenticate, validate(updateUserSchema), usersController.update);
router.delete("/:id", authenticate, authorize(["admin"]), usersController.deleteUser);
router.patch("/:id/status", authenticate, authorize(["admin"]), validate(updateStatusSchema), usersController.updateStatus);

module.exports = router;
