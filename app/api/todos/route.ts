import { connectDB } from "@/src/lib/db";
import Todo from "@/src/models/Todo";
import { NextResponse } from "next/server";

// GET ALL TODOS
export async function GET() {
    await connectDB();
    const todos = await Todo.find().sort({ createdAt: -1 });
    return NextResponse.json(todos);
  }

// ADD TODO
export async function POST(req: Request) {
  await connectDB();
  const { title } = await req.json();
  const todo = await Todo.create({ title });
  return NextResponse.json(todo);
}

// UPDATE TODO
export async function PUT(req: Request) {
    await connectDB();
    const { id, title, status } = await req.json();
  
    const updateData: any = {};
    if (title) updateData.title = title;
    if (status) updateData.status = status;
  
    const updated = await Todo.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(updated);
  }

// DELETE TODO
export async function DELETE(req: Request) {
  await connectDB();
  const { id } = await req.json();
  const deleted = await Todo.findByIdAndUpdate(
    id,
    { status: "DELETED" },
    { new: true }
  );
  return NextResponse.json(deleted);
}
