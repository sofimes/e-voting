import express from "express";
import authRoutes from "./routes/acc.routes.js";
import cors from "cors";
import connectDB from "./config/database.js";
import { PORT, MONGO_URI, COOKIE_SESSION_KEY } from "./config/config.js";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import nomineeRoutes from "./routes/nominee.routes.js";
const app = express();

// Middleware
app.use(
  cors({
    origin: "https://vercel-deploy-evoting-pro.vercel.app/", // Frontend URL
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Cookie session configuration
app.use(
  cookieSession({
    name: "car_rent",
    keys: [COOKIE_SESSION_KEY],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.use("/uploads", express.static("uploads"));
// Connect to the database
connectDB();
console.log(`Connected to MongoDB at URI: ${MONGO_URI}`);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/nominees", nomineeRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
