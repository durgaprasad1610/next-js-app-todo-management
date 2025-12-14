import { connectDB } from "@/src/lib/db";
import User from "@/src/models/User";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();

  const { email } = await req.json();
  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ message: "If user exists, email sent" });
  }

  const token = crypto.randomUUID();
  user.resetToken = token;
  user.resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);

  await user.save();

  // 👉 In real app send email
  console.log(`Reset link: http://localhost:3000/auth/reset/${token}`);

  return NextResponse.json({ message: "Reset link sent" });
}
