/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import connectToDB from "@/utils/connectDB";
import jwt from "jsonwebtoken";
import Voters from "@/models/voters";
import Candidate from "@/models/candidates";

connectToDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);
  const { token, candidateId } = req.body;
  if (!token || !candidateId) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  // Check if the token is valid
  const tokenData: any = jwt.verify(token, "TOKEN THAT WILL BE USED");
  if (!tokenData) {
    return res.status(400).json({ message: "Invalid token" });
  }
  const voter = await Voters.findOne({ id: tokenData.id, pin: tokenData.pin });
  if (!voter) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const getIfVoted = await Candidate.findOne({
    _id: candidateId,
    voters: { $in: [voter._id] },
  });
  if (getIfVoted) {
    return res.status(400).json({ message: "You have already voted" });
  }
  await Candidate.findOneAndUpdate(
    { _id: candidateId },
    { $inc: { votes: 1 }, $push: { voters: voter._id } }
  );
  res.status(200).json({ message: "Vote Casted" });
}
