import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'defaultsecret';

    if(!token) {
        res.status(401).json({ message: "Access Denied: No token provided" });
        return
    }

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            res.status(403).json({ message: "Access Denied: Invalid token" });
            return;
        }
        req.user = user;
        next();
    });
  }