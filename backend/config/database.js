import mongoose from "mongoose";
import { MONGO_URI } from "./config.js";
import User from "../models/User.Model.js";
import Admin from "../models/Admin.Model.js";
import bcrypt from "bcryptjs";

const createAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) {
      console.log("Admin user already exists.");
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("0991500027", salt);
    const admin = new User({
      fullName: "Sofanit Mesfin",
      password: hashedPassword,
      email: "sofanitmesfin19@gmail.com",
      age: "20",
      gender: "female",
      role: "admin",
    });

    const savedAdminUser = await admin.save();

    const adminDetails = new Admin({
      userId: savedAdminUser._id,
      department: "IT",
      isSuperAdmin: true,
    });
    await adminDetails.save();

    console.log("Admin user created successfully.");
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await createAdmin();
    console.log("MongoDB connected");
  } catch (error) {
    console.error(`Error connection to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
export default connectDB;
