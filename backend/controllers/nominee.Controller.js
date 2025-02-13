import Nominee from "../models/Nominee.Model.js";
import { doNotLogError, throwCommonError } from "../utils/helper.js";
import Vote from "../models/Vote.Model.js";
export const getNominees = async (req, res) => {
  try {
    const nominees = await Nominee.find();
    res.status(200).json(nominees);
  } catch (error) {
    console.log("error fetching nominees", error.message);
    throwCommonError(error, res);
  }
};
export const voteNominee = async (req, res) => {
  try {
    const { id: nomineeId } = req.params;
    const voterId = req.user.id;

    const existingVote = await Vote.findOne({ voterId });
    if (existingVote) {
      return res.status(403).json({
        message: "You have already voted",
      });
    }

    const nominee = await Nominee.findById(nomineeId);
    if (!nominee) {
      throw doNotLogError("Nominee not found", 404);
    }

    const newVote = new Vote({ voterId, nomineeId });
    await newVote.save();

    nominee.votes += 1;
    await nominee.save();

    res.status(200).json({
      message: "Vote recorded successfully",
      nominee,
    });
  } catch (error) {
    console.error("Error voting for nominee", error.message);
    throwCommonError(error, res);
  }
};
export const addNominee = async (req, res) => {
  try {
    const { name, description } = req.body;
    const imagePath = req.file ? req.file.path : null;
    if (!name || !description || !imagePath) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const newNominee = new Nominee({
      name,
      description,
      image: imagePath,
    });
    await newNominee.save();
    res
      .status(201)
      .json({ message: "Nominee added successfully", nominee: newNominee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const deleteNominee = async (req, res) => {
  try {
    const nomineeId = req.params.id;
    const nominee = await Nominee.findByIdAndDelete(nomineeId);

    if (!nominee) {
      return res.status(404).json({ message: "Nominee not found" });
    }

    res.status(200).json({ message: "Nominee deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting nominee" });
  }
};
export const editNominee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name || !description) {
      return res
        .status(400)
        .json({ message: "Name and description are required" });
    }

    const nominee = await Nominee.findById(id);
    if (!nominee) {
      return res.status(404).json({ message: "Nominee not found" });
    }

    nominee.name = name;
    nominee.description = description;
    await nominee.save();

    res.status(200).json({ message: "Nominee updated successfully", nominee });
  } catch (error) {
    console.error("Error editing nominee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
