import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @desc Register new user
// @route POST /api/auth/signup
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "User already exists" });

        const user = await User.create({ name, email, password });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
};

// @desc Login user
// @route POST /api/auth/login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "Invalid email or password" });

        // const isMatch = await user.matchPassword(password);
        // if (!isMatch)
        //   return res.status(400).json({ message: "Invalid email or password" });

        if (user.password !== password)
            return res.status(400).json({ message: "Invalid email or password" });

        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};

export const logoutUser = async (req, res) => {
  try {
    // In stateless JWT, logout is handled on the client.
    // But we can clear any cookie if token stored in cookie.
    res.clearCookie("token"); // only if you're using cookies
    res.status(200).json({
      message: "User logged out successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging out user", error });
  }
};