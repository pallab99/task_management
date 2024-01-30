import dotEnv from "dotenv";
dotEnv.config();
import jwt from "jsonwebtoken";
export const generateAccessToken = (body) => {
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  const token = jwt.sign(body, accessTokenSecret, { expiresIn: "12 h" });
  return token;
};
