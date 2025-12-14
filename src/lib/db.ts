import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

export const connectDB = async () => {
  // If already connected, return
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    const dbName = mongoose.connection.db?.databaseName;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};
