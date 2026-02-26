import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/user.controller.js";
import { registerUserValidation, loginUserValidation } from "../validation/user.validation.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register",registerUserValidation, registerUser);
router.post("/login", loginUserValidation, loginUser);
router.get("/profile", authMiddleware, getUserProfile);

export default router;