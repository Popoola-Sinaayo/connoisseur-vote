import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  party: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    required: true,
  },
  voters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Voter",
    },
  ],
});

export default mongoose.model("Candidate", candidateSchema);
