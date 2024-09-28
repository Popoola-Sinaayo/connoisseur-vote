import Candidate from "@/models/candidates";
import Voters from "@/models/voters";
import mongoose from "mongoose";

const connectToDB = () =>
  mongoose
    .connect(
      "mongodb+srv://Popoola:prayer1020@cluster0.mbbmo7d.mongodb.net/david-be?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("Connected to database");
      Voters.find({}).then((data) => {
        if (data.length === 0) {
          Voters.create({
            id: "DAVID-001",
            pin: "4321",
          });
          Voters.create({
            id: "DAVID-002",
            pin: "1234",
          });
        }
      });
      Candidate.find({}).then((data) => {
        if (data.length === 0) {
          Candidate.create({
            name: "David",
            party: "AAA",
            votes: 0,
            voters: [],
          });
          Candidate.create({
            name: "Sinaayo",
            party: "BBB",
            votes: 0,
            voters: [],
          });
          Candidate.create({
            name: "Victor",
            party: "CCC",
            votes: 0,
            voters: [],
          });
        }
      });
    })
    .catch((err) => console.log(err));

export default connectToDB;
