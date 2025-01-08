import express from "express";
import { getVoters } from "../controllers/voter.Controller.js";

import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();
router.get("/getVoters", authMiddleware, getVoters);
export default router;
