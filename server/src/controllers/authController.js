import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  const { credential } = req.body; // ID token from frontend

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, name, email, picture } = payload;

    let user = await User.findOne({ googleId: sub });
    if (!user) {
      user = await User.create({
        googleId: sub,
        name,
        email,
        avatar: picture,
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("auth-token", token, {
      httpOnly: true,
      secure: false, // change to true for production HTTPS
      sameSite: "lax",
    });

    return res.json({ message: "Login Success", user });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid Credential" });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("auth-token");
  res.json({ message: "Logged Out" });
};

export const getUser = async (req, res) => {
  res.json({ user: req.user });
};
