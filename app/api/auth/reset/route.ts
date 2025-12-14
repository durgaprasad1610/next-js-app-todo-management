import { connectDB } from "@/src/lib/db";
import User from "@/src/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();

  const { token, newPassword } = await req.json();

  const user = await User.findOne({ resetToken: token });

  if (!user || !user.resetTokenExpiry) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  if (user.resetTokenExpiry.getTime() < Date.now()) {
    return NextResponse.json({ error: "Token expired" }, { status: 400 });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;

  await user.save();

  return NextResponse.json({ message: "Password reset successful" });
}
