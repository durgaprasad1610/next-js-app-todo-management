import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    title: String,
    status: {
      type: String,
      enum: ["ACTIVE", "EDITED", "DELETED", "COMPLETED"],
      default: "ACTIVE",
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.models.Todo ||
  mongoose.model("Todo", TodoSchema);
