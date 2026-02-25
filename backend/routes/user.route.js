import express from "express";
import { registerUser } from "../controllers/user.controller.js";
import { registerUserValidation } from "../validation/user.validation.js";

const router = express.Router();

router.post("/register",registerUserValidation, registerUser);

export default router;