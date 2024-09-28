/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import connectToDB from "@/utils/connectDB";
import Candidate from "@/models/candidates";

connectToDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const candidates = await Candidate.find();
  res.status(200).json(candidates);
}
