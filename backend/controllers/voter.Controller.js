import Vote from "../models/Vote.Model.js";
import User from "../models/User.Model.js";
export const getVoters = async (req, res) => {
  try {
    const voters = await Vote.find()
      .populate("voterId", "fullName email _id")
      .exec();

    res.status(200).json(voters);
  } catch (error) {
    console.error("Error fetching voters:", error);
    res.status(500).json({ message: "Failed to fetch voters" });
  }
};

export const updateVoter = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email } = req.body;

    if (!fullName || !email) {
      return res
        .status(400)
        .json({ message: "Missing required fields: fullName or email" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { fullName, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Voter not found" });
    }

    const updatedVote = await Vote.findOneAndUpdate(
      { voterId: user._id },
      { $set: { "voterId.fullName": fullName, "voterId.email": email } },
      { new: true }
    );

    if (!updatedVote) {
      return res
        .status(404)
        .json({ message: "Vote record not found for the voter" });
    }

    res.status(200).json({
      message: "Voter updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.error("Error updating voter:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const deleteVoter = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedVoter = await Vote.findOneAndDelete({ voterId: id });

    if (!deletedVoter) {
      return res.status(404).json({ message: "Voter not found" });
    }

    res.status(200).json({ message: "Voter deleted successfully" });
  } catch (error) {
    console.error("Error deleting voter:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
