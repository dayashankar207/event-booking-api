import { Router } from "express";
import {
  register,
  login,
  refreshAccessToken,
  logout,
} from "../controllers/user.controller.js";
import {
  validateRegister,
  validateLogin,
} from "../validators/user.validator.js";
import {
  loginLimiter,
  registerLimiter,
  refreshLimiter,
} from "../middlewares/rateLimiter.middlware.js";

const router = Router();

router.post("/register", registerLimiter, validateRegister, register);

router.post("/login", loginLimiter, validateLogin, login);

router.post("/refresh-token", refreshLimiter, refreshAccessToken);

router.post("/logout", logout);

export default router;
