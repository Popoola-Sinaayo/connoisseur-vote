import mongoose from "mongoose";

const connectToDB = () =>
  mongoose
    .connect(
      "mongodb+srv://Popoola:prayer1020@cluster0.mbbmo7d.mongodb.net/david-be?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => console.log(err));

export default connectToDB;
