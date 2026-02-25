import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes/user.route.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req,res) => res.send("Noor"));
app.use("/api/user", router);


export default app;