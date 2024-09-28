import { NextResponse } from "next/server";
import connectToDB from "@/utils/connectDB";
import Voters from "@/models/voters";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  console.log("Hello from Next.js!");
  console.log(req.method);
  if (req.method === "POST") {
    // console.log("Hello from Next.js!");\
    const data = await req.json();
    console.log(data);
    const { id, pin } = data;
    if (!id || !pin) {
      return NextResponse.json(
        {
          message: "Please fill all fields",
        },
        { status: 400 }
      );
    }
    await connectToDB();
    const voter = await Voters.findOne({ id, pin });
    if (!voter) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    } else {
      const token = jwt.sign({ id, pin }, "TOKEN THAT WILL BE USED", {
        expiresIn: "7d",
      });
      return NextResponse.json(
        {
          message: "Login successful",
          token,
        },
        { status: 200 }
      );
    }
  } else {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }
}
