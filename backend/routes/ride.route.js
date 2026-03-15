import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createRideController, confirmRideController } from "../controllers/ride.controller.js";

const rideRouter = express.Router();

rideRouter.post("/create", authMiddleware, createRideController);
rideRouter.post("/confirm", authMiddleware, confirmRideController);

export default rideRouter;
