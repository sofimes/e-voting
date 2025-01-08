import Vote from "../models/Vote.Model.js";

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
