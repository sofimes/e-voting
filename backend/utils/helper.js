import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY, NODE_ENV } from "../config/config.js";
export const throwCommonError = (error, res) => {
  if (
    error?.name === "SequelizeUniqueConstraintError" ||
    error?.original?.code === "ER_DUP_ENTRY"
  ) {
    console.error("error---------", error);
    return res.status(409).json({
      status: "error",
      message:
        error?.parent?.sqlMessage?.split(" for key")[0] || "duplicate data",
    });
  }
  if (error?.name === "ValidationError") {
    console.error("error---------", error);
    return res.status(409).json({
      status: "error",
      message: error?.details[0]?.message || "validation error",
    });
  }
  if (!error?.notForLog) console.error(error);
  if (error?.notForLog) {
    return res
      .status(error?.status || 200)
      .json({ status: "error", message: error?.message });
  }
  if (error?.status)
    return res
      .status(error?.status)
      .json({ status: "error", message: error.message });
  return res
    .status(500)
    .json({ status: "error", message: "Internal server error!" });
};
export const doNotLogError = (message, status) => {
  const error = new Error(message);
  error.notForLog = true;
  error.status = status;
  return error;
};
export const generateTokenAndSetCookie = (userId, role, res) => {
  const token = jwt.sign({ userId, role }, JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: NODE_ENV !== "development",
  });
  return token;
};
