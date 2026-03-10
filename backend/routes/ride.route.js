import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createRideController } from "../controllers/ride.controller.js";

const rideRouter = express.Router();

rideRouter.post("/create", authMiddleware, createRideController);

export default rideRouter;
