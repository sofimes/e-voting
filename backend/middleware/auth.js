import jwt from "jsonwebtoken";
import User from "../models/User.Model.js";
import { JWT_SECRET_KEY } from "../config/config.js";
import { throwCommonError, doNotLogError } from "../utils/helper.js";
export const authMiddleware = async (req, res, next) => {
  try {
    const token =
      req.cookies.jwt ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    console.log("Token received in middleware:", token);

    if (!token) {
      throw doNotLogError("No token provided, authorization denied", 401);
    }
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    if (!decoded) {
      throw doNotLogError("Invalid token", 401);
    }
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      throw doNotLogError("User not found", 404);
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Token verification failed", error.message);
    throwCommonError(error, res);
  }
};
export const roleMiddleware = (requiredRole) => (req, res, next) => {
  try {
    const userRole = req.user.role;
    if (userRole !== requiredRole) {
      throw doNotLogError("Forbidden, unauthorized role", 403);
    }
    next();
  } catch (error) {
    throwCommonError(error, res);
  }
};
export const adminAuth = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};
