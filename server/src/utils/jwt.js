import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { JWT_SECRET } = process.env;

export const signToken = (user) =>
  jwt.sign(
    {
      sub: user.id,
      displayName: user.displayName,
      emails: user.emails,
      photos: user.photos
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

export const verifyToken = (token) => jwt.verify(token, JWT_SECRET);
