"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./navigation.module.css";

const DashboardIcon = ({ active }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={styles.icon}
  >
    <rect
      x="3"
      y="3"
      width="8"
      height="8"
      rx="1.5"
      fill={active ? "#2563eb" : "none"}
      stroke={active ? "#2563eb" : "#9ca3af"}
      strokeWidth="1.5"
    />
    <rect
      x="13"
      y="3"
      width="8"
      height="5"
      rx="1.5"
      fill={active ? "#2563eb" : "none"}
      stroke={active ? "#2563eb" : "#9ca3af"}
      strokeWidth="1.5"
    />
    <rect
      x="13"
      y="10"
      width="8"
      height="11"
      rx="1.5"
      fill={active ? "#2563eb" : "none"}
      stroke={active ? "#2563eb" : "#9ca3af"}
      strokeWidth="1.5"
    />
    <rect
      x="3"
      y="13"
      width="8"
      height="8"
      rx="1.5"
      fill={active ? "#2563eb" : "none"}
      stroke={active ? "#2563eb" : "#9ca3af"}
      strokeWidth="1.5"
    />
  </svg>
);

const ChatIcon = ({ active }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={styles.icon}
  >
    <path
      d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
      fill={active ? "#2563eb" : "none"}
      stroke={active ? "#2563eb" : "#9ca3af"}
      strokeWidth="1.5"
    />
  </svg>
);

const FeedsIcon = ({ active }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={styles.icon}
  >
    <path
      d="M4 6h16M4 12h10M4 18h16"
      stroke={active ? "#2563eb" : "#9ca3af"}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const navItems = [
  { id: "dashboard", label: "Dashboard", href: "/", Icon: DashboardIcon },
  {
    id: "chat",
    label: "Chat",
    href: "/chat",
    Icon: ChatIcon,
  },
  { id: "feeds", label: "Feeds", href: "/news", Icon: FeedsIcon },
];

export default function BottomTabNav() {
  const pathname = usePathname() || "/";

  return (
    <nav className={styles.nav} aria-label="Bottom navigation">
      <div className={styles.container}>
        {navItems.map(({ id, label, href, Icon }) => {
          const active =
            pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={id}
              href={href}
              className={`${styles.link} ${active ? styles.active : ""}`}
              aria-current={active ? "page" : undefined}
            >
              <Icon active={active} />
              <span className={styles.label}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
