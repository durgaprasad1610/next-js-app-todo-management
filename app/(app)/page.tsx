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

    fetchTodos();
  };

  return (
    <>
      <h2>Home</h2>
      <div className="add-todo-container">
        <input
          className="add-todo-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo"
        />

        <button
          className="add-todo-btn"
          onClick={addTodo}
          disabled={!title.trim()}
        >
          Add
        </button>

      </div>


      <ul className="todo-list">
        {todos
          .filter((t: any) => t.status === "ACTIVE")
          .map((t: any) => (
            <li key={t._id} className="todo-item">
              <span className="todo-title">{t.title}</span>

              <div className="todo-actions">
                <button
                  className="btn edit"
                  onClick={() => updateTodo(t._id, "EDITED")}
                >
                  Edit
                </button>

                <button
                  className="btn delete"
                  onClick={() => updateTodo(t._id, "DELETED")}
                >
                  Delete
                </button>

                <button
                  className="btn complete"
                  onClick={() => updateTodo(t._id, "COMPLETED")}
                >
                  Complete
                </button>
              </div>
            </li>
          ))}
      </ul>

    </>
  );
}
