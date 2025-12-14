"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState<any[]>([]);

  const loadTodos = async () => {
    const res = await fetch("/api/todos");
    setTodos(await res.json());
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const addTodo = async () => {
    if (!title) return;
    await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ title }),
    });
    setTitle("");
    loadTodos();
  };

  const updateTodo = async (id: string, status: string) => {
    let title;
    if (status === "EDITED") {
      title = prompt("Edit todo");
      if (!title) return;
    }

    await fetch("/api/todos", {
      method: "PUT",
      body: JSON.stringify({ id, title, status }),
    });

    loadTodos();
  };

  return (
    <>
      <h2>Home</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add todo"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos
          .filter((t) => t.status === "ACTIVE")
          .map((t) => (
            <li key={t._id}>
              {t.title}
              <button onClick={() => updateTodo(t._id, "EDITED")}>
                Edit
              </button>
              <button onClick={() => updateTodo(t._id, "DELETED")}>
                Delete
              </button>
              <button onClick={() => updateTodo(t._id, "COMPLETED")}>
                Complete
              </button>
            </li>
          ))}
      </ul>
    </>
  );
}
