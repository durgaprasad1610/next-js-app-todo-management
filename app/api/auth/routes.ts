import { connectDB } from "@/src/lib/db";
import User from "@/src/models/User";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/src/lib/validators";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();
  const { email, password } = await registerSchema.parseAsync(body);

  const exists = await User.findOne({ email });
  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);

  await User.create({
    email,
    password: hashed,
    role: "USER",
  });

  return NextResponse.json({ message: "Account created successfully" });
}
