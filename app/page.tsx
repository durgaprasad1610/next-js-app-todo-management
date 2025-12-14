"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    setTodos(await res.json());
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ title }),
    });
    setTitle("");
    fetchTodos();
  };

  return (
    <>
      <h2>Home</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter todo"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos
          .filter((t: any) => t.status === "active")
          .map((t: any) => (
            <li key={t._id}>{t.title}</li>
          ))}
      </ul>
    </>
  );
}
