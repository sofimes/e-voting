import User from "../models/User.Model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/helper.js";
import { doNotLogError, throwCommonError } from "../utils/helper.js";

export const signup = async (req, res) => {
  try {
    const { fullName, age, gender, email, password } = req.body;

    if (!fullName || !password || !email || !gender || !age) {
      throw doNotLogError("All fields are required", 400);
    }
    const emailRegex = /^[\w._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const trimmedEmail = email.trim();
    const checking = !emailRegex.test(trimmedEmail); // check if email is valid
    if (checking) {
      throw doNotLogError("Invalid email format", 400);
    }
    const existingEmail = await User.findOne({ email: trimmedEmail });
    if (existingEmail) {
      throw doNotLogError("Email already exist", 400);
    }

    if (password.length < 6) {
      throw doNotLogError("Password must be at least 6 characters", 400);
    }

    //hashed password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //new user

    const newUser = new User({
      fullName: fullName,
      password: hashedPassword,
      email: trimmedEmail,
      gender: gender,
      age: age,
    });
    console.log("newuser", newUser);
    if (newUser) {
      await newUser.save();
      const token = generateTokenAndSetCookie(newUser._id, newUser.role, res);

      console.log("user created");
      res.status(200).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        age: newUser.age,
        email: newUser.email,
        gender: newUser.gender,
        role: newUser.role,
        token,
      });
    } else {
      throw doNotLogError("Failed to create new user", 400);
    }
  } catch (error) {
    throwCommonError(error, res);
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailRegex = /^[\w._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const trimmedEmail = email.trim();
    const checking = !emailRegex.test(trimmedEmail); // check if email is valid
    if (checking) {
      throw doNotLogError("Invalid email format", 400);
    }

    const user = await User.findOne({
      email: trimmedEmail,
    });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || trimmedEmail !== user.email) {
      throw doNotLogError("Email doesn't match the record", 400);
    }

    if (!user) {
      throw doNotLogError("User not found", 400);
    }

    if (!isPasswordCorrect) {
      throw doNotLogError("Invalid password or phone number", 400);
    }

    const { role } = user; // get the user's role
    const token = generateTokenAndSetCookie(user._id, role, res);

    console.log(`User (${role}) logged in successfully`);
    console.log("User logged in successfully");
    res.status(200).json({
      token,
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      age: user.age,
      gender: user.gender,
      role: user.role,
    });
  } catch (error) {
    throwCommonError(error, res);
  }
};
export const getMe = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw doNotLogError("User not found", 404);
    }
    // Return the user's details
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error in getMe function", error.message);
    throwCommonError(error, res);
  }
};
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "LOgged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    throwCommonError(error, res);
  }
};
