import express from "express";
import {getDistanceTimeController, searchLocationController} from "../controllers/map.controller.js";

const mapRouter = express.Router();

mapRouter.get("/distance-time", getDistanceTimeController);
mapRouter.get("/search", searchLocationController);

export default mapRouter;
