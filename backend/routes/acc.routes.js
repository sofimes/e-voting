import express from "express";
import {
  login,
  signup,
  logout,
  getMe,
} from "../controllers/auth.Controller.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();
router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.get("/getme", authMiddleware, getMe);
export default router;
