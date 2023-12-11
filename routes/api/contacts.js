const express = require("express");

const router = express.Router();

const {
  getById,
  getAll,
  add,
  deleteById,
  updateById,
  updateStatusContact,
} = require("../../controllers/contacts");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/contact");

router.get("/", authenticate, getAll);

router.get("/:contactId", authenticate, isValidId, getById);

router.post("/", authenticate, validateBody(schemas.addSchema), add);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  updateById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateStatusSchema),
  updateStatusContact
);

router.delete("/:contactId", authenticate, isValidId, deleteById);

module.exports = router;
