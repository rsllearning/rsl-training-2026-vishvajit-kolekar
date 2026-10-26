"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathName = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/projects", label: "Projects" },
    { href: "/settings", label: "Settings" },
  ];

  return (
    <header className="header">
      <h1>Project Explorer</h1>
      <nav className="navLinks">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={pathName === link.href ? "activeLink" : ""}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
