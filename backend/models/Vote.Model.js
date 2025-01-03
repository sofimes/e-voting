import mongoose from "mongoose";
const voteSchema = new mongoose.Schema({
  voterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Reference to the user
  nomineeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Nominee",
    required: true,
  }, // Reference to the nominee
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Vote", voteSchema);
