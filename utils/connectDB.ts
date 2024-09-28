import voters from "@/models/voters";
import mongoose from "mongoose";

const connectToDB = () =>
  mongoose
    .connect(
      "mongodb+srv://Popoola:prayer1020@cluster0.mbbmo7d.mongodb.net/david-be?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("Connected to database");
      voters.create({
        id: "DAVID-001",
        pin: "4321",
      });
      voters.create({
        id: "DAVID-002",
        pin: "1234",
      });
    })
    .catch((err) => console.log(err));

export default connectToDB;
