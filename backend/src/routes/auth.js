import { Router } from "express";
import { login, getRoles, getMe } from "../controllers/authController.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.post("/login", login);
router.get("/roles", getRoles);
router.get("/me", authenticate, getMe);

export default router;
