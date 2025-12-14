"use client";
import { useSession, signOut } from "next-auth/react";
import { Button, Box, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminPanelSettings, Logout, Home } from "@mui/icons-material";

export default function Main() {
  const { data, status } = useSession();
  const pathname = usePathname();

  // Don't show on auth pages or if not authenticated
  if (pathname?.startsWith("/auth") || status !== "authenticated") {
    return null;
  }

  return (
    <Box className="main-nav">
      <Box className="main-nav-content">
        <Link href="/" className="main-nav-link">
          <Home className="main-nav-icon" />
          <Typography variant="body2" className="main-nav-text">
            Home
          </Typography>
        </Link>

        {data?.user.role === "ADMIN" && (
          <Link href="/admin" className="main-nav-link admin-link">
            <AdminPanelSettings className="main-nav-icon" />
            <Typography variant="body2" className="main-nav-text">
              Admin Panel
            </Typography>
          </Link>
        )}

        <Button
          onClick={() => signOut()}
          className="main-nav-button"
          startIcon={<Logout />}
          variant="outlined"
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}
