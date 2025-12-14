import { connectDB } from "@/src/lib/db";
import User from "@/src/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const users = await User.find().select("-password");
  return NextResponse.json(users);
}

export async function PUT(req: Request) {
  await connectDB();
  const { id, role } = await req.json();
  await User.findByIdAndUpdate(id, { role });
  return NextResponse.json({ success: true });
}
