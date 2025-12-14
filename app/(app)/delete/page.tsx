"use client";
import { useEffect, useState } from "react";

export default function DeleteTab() {
  const [todos, setTodos] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/todos").then(r => r.json()).then(setTodos);
  }, []);

  return (
    <>
      <h2>Deleted Todos</h2>
      {todos
        .filter(t => t.status === "DELETED")
        .map(t => <p key={t._id}>{t.title}</p>)}
    </>
  );
}
