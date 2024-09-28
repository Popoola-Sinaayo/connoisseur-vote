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

export default mongoose.model("Voter", voterSchema);
