import mongoose from "mongoose";

const nomineeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    votes: {
      type: Number,
      default: 0, // Track the number of votes
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Nominee", nomineeSchema);
