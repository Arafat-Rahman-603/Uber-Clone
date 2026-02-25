import userModel from "../models/user.model.js";
import { validationResult } from "express-validator";

export const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await userModel.create({
    fullName: {
      firstName: fullName.firstName,
      lastName: fullName.lastName,
    },
    email,
    password: await userModel.hashPassword(password),
  });

  const token = user.generateToken();
  res
    .status(201)
    .json({ message: "User registered successfully", user, token });
};
