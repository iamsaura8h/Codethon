import { Router } from "express";
import { googleLogin, logoutUser, getUser } from "../controllers/authController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/google", googleLogin);
router.get("/logout", logoutUser);
router.get("/me", isAuthenticated, getUser);

export default router;
