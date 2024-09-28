import type { NextApiRequest, NextApiResponse } from "next";
import connectToDB from "@/utils/connectDB";
import Voters from "@/models/voters";
import jwt from "jsonwebtoken";

connectToDB();
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Hello from Next.js!");
  console.log(req.body);
  const { id, pin } = req.body;
  if (!id || !pin) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  const voter = Voters.findOne({ id, pin });
  if (!voter) {
    return res.status(400).json({ message: "Invalid credentials" });
  } else {
    const token = jwt.sign({ id, pin }, "TOKEN THAT WILL BE USED", {
      expiresIn: "7d",
    });
    return res.status(200).json({ message: "Login successful", token });
  }
  //   res.status(200).json({ message: "Hello from Next.js!" });
}
