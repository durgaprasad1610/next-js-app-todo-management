"use client";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/users").then(r => r.json()).then(setUsers);
  }, []);

  const updateRole = async (id: string, role: string) => {
    await fetch("/api/admin/users", {
      method: "PUT",
      body: JSON.stringify({ id, role }),
    });
    location.reload();
  };

  return (
    <>
      <h2>Admin User Management</h2>
      {users.map(u => (
        <div key={u._id}>
          {u.email} — {u.role}
          <Button onClick={() => updateRole(u._id, "ADMIN")}>Make Admin</Button>
          <Button onClick={() => updateRole(u._id, "USER")}>Make User</Button>
        </div>
      ))}
    </>
  );
}
