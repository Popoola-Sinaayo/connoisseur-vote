/* eslint-disable @typescript-eslint/no-explicit-any */
import connectToDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import Candidate from "@/models/candidates";

export async function GET() {
  await connectToDB();
  const candidates = await Candidate.find();
  return NextResponse.json(candidates, { status: 200 });
}
export const dynamic = "force-dynamic";