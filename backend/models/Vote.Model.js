import mongoose from "mongoose";
const voteSchema = new mongoose.Schema({
  voterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  nomineeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Nominee",
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Vote", voteSchema);
