"use client";
import { useEffect, useState } from "react";

export default function Add() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("/api/todos").then(res => res.json()).then(setTodos);
  }, []);

  return (
    <>
      <h2>Added Todos</h2>
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
