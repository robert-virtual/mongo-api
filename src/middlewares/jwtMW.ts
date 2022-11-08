import { Handler } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

declare global {
  namespace Express {
    export interface Request {
      user: JwtPayload;
    }
  }
}

export const checkJwt: Handler = (req, res, next) => {
  try {
    const token = req.get("Authorization").split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "access denied" });
    }
    const payload = verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = payload as JwtPayload;
    next();
  } catch (error) {
    return res.status(401).json({ error:"you must provide a valid json web token",details: error.message });
  }
};
