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
<div className="admin-container">
  <h2 className="admin-title">Admin User Management</h2>

  <div className="user-list">
    {users.map((u) => (
      <div key={u._id} className="user-card">
        <div className="user-info">
          <span className="user-email">{u.email}</span>
          <span className={`user-role ${u.role.toLowerCase()}`}>
            {u.role}
          </span>
        </div>

        <div className="user-actions">
          <button
            className="role-btn"
            onClick={() => updateRole(u._id, "ADMIN")}
            disabled={u.role === "ADMIN"}
          >
            Make Admin
          </button>

          <button
            className="role-btn secondary"
            onClick={() => updateRole(u._id, "USER")}
            disabled={u.role === "USER"}
          >
            Make User
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

  );
}
