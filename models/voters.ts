import mongoose from "mongoose";

const voterSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
});

const Voter = mongoose.models.Voter || mongoose.model("Voter", voterSchema);

export default Voter;