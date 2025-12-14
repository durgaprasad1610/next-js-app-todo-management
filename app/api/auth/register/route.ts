import { connectDB } from "@/src/lib/db";
import User from "@/src/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { registerSchema } from "@/src/lib/auth";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    // Connect to database
    await connectDB();

    // Parse and validate request body
    const body = await req.json();
    const { email, password } = body;

    // Validate email and password using Zod schema
    try {
      await registerSchema.parseAsync({ email, password });
    } catch (validationError: any) {
      return NextResponse.json(
        { 
          error: validationError.errors?.[0]?.message || "Invalid email or password format",
          details: validationError.errors 
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const exists = await User.findOne({ email: email.toLowerCase().trim() });
    if (exists) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password before storing
    const hashed = await bcrypt.hash(password, 10);

    // Create new user in database
    const userData = {
      email: email.toLowerCase().trim(),
      password: hashed,
      role: "USER" as const, // Default role
    };
    const user = await User.create(userData);

    // Return success response (don't send password back)
    return NextResponse.json(
      {
        message: "Account created successfully",
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);

    // Handle duplicate key error (MongoDB)
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      { error: "Failed to create account. Please try again." },
      { status: 500 }
    );
  }
}
