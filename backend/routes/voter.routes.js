import express from "express";
import {
  getVoters,
  deleteVoter,
  updateVoter,
} from "../controllers/voter.Controller.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();
router.get("/getVoters", authMiddleware, getVoters);
router.delete("/delete/:id", authMiddleware, deleteVoter);
router.put("/edit/:id", authMiddleware, updateVoter);
export default router;
