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
const Candidate =
  mongoose.models.Candidate || mongoose.model("Candidate", candidateSchema);

export default Candidate;