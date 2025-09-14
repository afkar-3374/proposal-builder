const mongoose = require("mongoose");

const ProposalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  items: [
    {
      name: String,
      cost: Number
    }
  ],
  total: { type: Number, required: true },
  submittedBy: { type: String, required: true },
  phone: { type: String, required: true },
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Proposal", ProposalSchema);
