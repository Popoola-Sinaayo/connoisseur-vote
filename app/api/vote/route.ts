/* eslint-disable @typescript-eslint/no-explicit-any */
import connectToDB from "@/utils/connectDB";
import jwt from "jsonwebtoken";
import Voters from "@/models/voters";
import Candidate from "@/models/candidates";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  console.log(data);
  await connectToDB();
  const { token, candidateId } = data;
  if (!token || !candidateId) {
    return NextResponse.json(
      { message: "Please fill all fields" },
      { status: 400 }
    );
  }
  // Check if the token is valid
  const tokenData: any = jwt.verify(token, "TOKEN THAT WILL BE USED");
  if (!tokenData) {
    return NextResponse.json({ message: "Invalid token" }, { status: 400 });
  }
  const voter = await Voters.findOne({ id: tokenData.id, pin: tokenData.pin });
  if (!voter) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 400 }
    );
  }
  const getIfVoted = await Candidate.findOne({
    voters: { $in: [voter._id] },
  });
  if (getIfVoted) {
    return NextResponse.json(
      { message: "You have already voted" },
      { status: 400 }
    );
  }
  await Candidate.findOneAndUpdate(
    { _id: candidateId },
    { $inc: { votes: 1 }, $push: { voters: voter._id } }
  );
  return NextResponse.json({ message: "Vote Casted" });
}
