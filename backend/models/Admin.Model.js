import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    department: {
      type: String,
      required: false, // Optional field for admin's department
    },
    permissions: {
      type: [String],
      default: ["manage_users", "manage_votes", "manage_nominees"], // Permissions granted to the admin
    },
    isSuperAdmin: {
      type: Boolean,
      default: false, // To distinguish between regular admins and superadmins
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Admin", adminSchema);
