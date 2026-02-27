import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import riderRouter from "./routes/rider.route.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended:true }));
app.get("/", (req,res) => res.send("<h1>Noor</h1>"));
app.use("/api/users", userRouter);
app.use("/api/riders", riderRouter);



export default app;