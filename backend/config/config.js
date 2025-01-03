import dotenv from "dotenv";
// IP address (196.191.221.250)
dotenv.config();
export const PORT = process.env.PORT || 5500;
export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const COOKIE_SESSION_KEY = process.env.COOKIE_SESSION_KEY;
export const NODE_ENV = process.env.NODE_ENV;
