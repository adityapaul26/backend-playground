import userModel from "../models/user.model.js";
import crypto from "crypto";

export async function register(req, res) {
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
