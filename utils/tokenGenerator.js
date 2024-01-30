import { ITokenPayload } from "../types/tokenType";
const dotEnv = require("dotenv");
dotEnv.config();
const jwt = require("jsonwebtoken");

export const generateAccessToken = (body) => {
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  const token = jwt.sign(body, accessTokenSecret, { expiresIn: "12 h" });
  return token;
};
