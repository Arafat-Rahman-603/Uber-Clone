import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = async(req,res,next) => {
    const token = req.headers.authorization.split(" ")[ 1 ] || req.cookies.token;
    if(!token) return res.status(401).json({message: "Unauthorized"});
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        if(!user) return res.status(401).json({message: "Unauthorized"});
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({message: "Unauthorized"});
    }
}