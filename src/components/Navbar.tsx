"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const { status } = useSession();

  // Don't show navbar if not authenticated or still loading
  if (status === "loading" || status === "unauthenticated") {
    return null;
  }

  // Don't show navbar on auth pages
  if (pathname?.startsWith("/auth")) {
    return null;
  }

  const tabs = [
    { href: "/", label: "Home" },
    { href: "/add", label: "Add" },
    { href: "/edit", label: "Edit" },
    { href: "/delete", label: "Delete" },
    { href: "/complete", label: "Complete" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname === "/home";
    }
    return pathname === href;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`nav-tab ${isActive(tab.href) ? "active" : ""}`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
