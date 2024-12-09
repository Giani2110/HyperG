import jwt from "jsonwebtoken"; 
import { SECRET_KEY } from "../config/config.js";

export const createToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { algorithm: "HS256", expiresIn: "2h" });
};

export const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};