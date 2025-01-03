import express from "express";
import multer from "multer";
import {
  getNominees,
  voteNominee,
  addNominee,
} from "../controllers/nominee.Controller.js";
import { authMiddleware, adminAuth } from "../middleware/auth.js";

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
router.get("/getNominee", authMiddleware, getNominees);
router.post(
  "/addnominees",
  authMiddleware,
  adminAuth,
  upload.single("image"),
  addNominee
);
router.put("/vote/:id", authMiddleware, voteNominee);

export default router;
