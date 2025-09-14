const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Proposal = require("../models/Proposal");

// Create Proposal
router.post("/", async (req, res) => {
  try {
    const newProposal = new Proposal(req.body);
    await newProposal.save();
    res.status(201).json(newProposal);
  } catch (err) {
    console.error("❌ Error saving proposal:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get All Proposals
router.get("/", async (req, res) => {
  try {
    const proposals = await Proposal.find();
    res.json(proposals);
  } catch (err) {
    console.error("❌ Error fetching proposals:", err);
    res.status(500).json({ error: err.message });
  }
});

// Delete Proposal
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid proposal id" });
    }

    const deleted = await Proposal.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Proposal not found" });

    res.json({ message: "✅ Proposal deleted", id });
  } catch (err) {
    console.error("❌ Error deleting proposal:", err);
    res.status(500).json({ error: err.message });
  }
});

// Approve Proposal
router.put("/:id/approve", async (req, res) => {
  try {
    const proposal = await Proposal.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );
    res.json(proposal);
  } catch (err) {
    console.error("❌ Error approving proposal:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
