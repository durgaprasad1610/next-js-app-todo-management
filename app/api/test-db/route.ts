import { connectDB } from "@/src/lib/db";
import User from "@/src/models/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const db = mongoose.connection.db;
    const dbName = db?.databaseName;
    const collections = await db?.listCollections().toArray();

    // Get user count
    const userCount = await User.countDocuments();

    // Get all users (without passwords)
    const users = await User.find({}).select("-password").limit(10);

    return NextResponse.json({
      success: true,
      database: {
        name: dbName,
        state: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
        collections: collections?.map((c) => c.name) || [],
      },
      users: {
        count: userCount,
        collection: User.collection.name,
        sample: users,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

