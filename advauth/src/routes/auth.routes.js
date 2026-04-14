import express from "express";
import {
  register,
  getMe,
  refreshToken,
} from "../controller/auth.controller.js";

const router = express.Router();

/**
 * POST /api/auth/register
 */
router.post("/register", register);

router.get("/getme", getMe);

router.get("/refresh-token", refreshToken);
export default router;
