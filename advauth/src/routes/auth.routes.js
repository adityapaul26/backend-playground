import express from "express";
import {
  register,
  getMe,
  refreshToken,
  logout,
  logoutAll,
  login,
  verifyEmail,
} from "../controller/auth.controller.js";

const router = express.Router();

/**
 * POST /api/auth/register
 */
router.post("/register", register);

router.post("/login", login);

router.post("/verify-otp", verifyEmail);

router.get("/getme", getMe);

router.get("/refresh-token", refreshToken);

router.get("/logout", logout);

router.get("/logout-all", logoutAll);
export default router;
