const express = require("express");

const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/users");
const {
  register,
  login,
  getCurrent,
  logout,
} = require("../../controllers/auth");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), register);

router.post("/login", validateBody(schemas.loginSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

module.exports = router;
