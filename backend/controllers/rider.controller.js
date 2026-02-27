import riderModel from "../models/rider.model.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";
import { validationResult } from "express-validator";

export const registerRider = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("validation errors", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { fullName, email, password, vehicle } = req.body;

    if (!fullName || !email || !password || !vehicle) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const riderExists = await riderModel.findOne({ email });

    if (riderExists) {
      return res.status(400).json({ message: "Rider already exists" });
    }

    const rider = await riderModel.create({
      fullName: {
        firstName: fullName.firstName,
        lastName: fullName.lastName,
      },
      email,
      password: await riderModel.hashPassword(password),
      vehicle: {
        vehicleType: vehicle.vehicleType,
        vehicleNumber: vehicle.vehicleNumber,
        color: vehicle.color,
        capacity: vehicle.capacity,
      },
    });

    const token = rider.generateToken();
    res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res
      .status(201)
      .json({ message: "User registered successfully", rider, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginRider = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    const rider = await riderModel.findOne({ email }).select("+password");
    if (!rider) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await rider.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = rider.generateToken();
    res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(200).json({ token, rider });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const logout = async (req,res) => {
    // res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (token) {
      await blacklistTokenModel.create({ 
        token, 
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) 
      });
    }
    res.status(200).json({ message: "Logged out successfully" });
} 

export const getProfile = async (req, res) => {
    console.log("req.rider", req.rider);
    try {
        const rider = await riderModel.findById(req.rider._id);
        res.status(200).json({ rider });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
