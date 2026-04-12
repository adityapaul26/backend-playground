import userModel from "../models/user.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    const doesUserAlreadyExist = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (doesUserAlreadyExist) {
      return res.status(409).json({
        message: "Username or email already exist",
      });
    }

    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: user._id,
      },
      config.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

async function getMe(req, res) {
  const token = req.headers.authorization?.split(" ")[1]; // from frontend it is sent as 'Bearer token' .therefore it
  // is accessed by splitting and choosing the second one

  if (!token) {
    return res.status(401).json({
      message: "Token not present",
    });
  }

  const decoded = jwt.verify(token, config.JWT_SECRET);
}

export default { register, getMe };
