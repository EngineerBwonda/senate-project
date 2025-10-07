// pages/minutes.jsx
"use client";

import React, { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faDownload,
  faEye,
  faCheckCircle,
  faCircle,
  faFilter,
  faSearch,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./minutes.module.css";

/**
 * Minutes Page
 * - Mobile-first responsive layout
 * - List of minutes (mock data)
 * - Actions: View (open in new tab), Download, Mark Received / Unmark
 * - Search + filter by status
 *
 * Note: install FontAwesome if not present:
 *   npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons
 */

const MOCK_MINUTES = [
  {
    id: "m-2025-09-01",
    title: "Senate Liaison — Monthly Meeting Minutes (Sept 2025)",
    date: "2025-09-01",
    file: "/minutes/meeting-minutes-sept-2025.pdf",
    summary: "Discussion on devolution implementation and county coordination.",
    received: false,
  },
  {
    id: "m-2025-08-05",
    title: "Budget Oversight Minutes (Aug 2025)",
    date: "2025-08-05",
    file: "/minutes/budget-oversight-aug-2025.pdf",
    summary: "Review of county budget queries and committee directives.",
    received: true,
  },
  {
    id: "m-2025-07-10-1",
    title: "Stakeholder Forum Minutes (July 2025)",
    date: "2025-07-10",
    file: "/minutes/stakeholder-forum-jul-2025.pdf",
    summary: "Notes and action points from the county stakeholder forum.",
    received: false,
  },
  {
    id: "m-2025-06-14",
    title: "Operational Briefing Minutes (June 2025)",
    date: "2025-06-14",
    file: "/minutes/op-briefing-jun-2025.pdf",
    summary: "Internal operations and field visit planning.",
    received: true,
  },
  {
    id: "m-2025-07-10-2",
    title: "Stakeholder Forum Minutes (July 2025)",
    date: "2025-07-10",
    file: "/minutes/stakeholder-forum-jul-2025.pdf",
    summary: "Notes and action points from the county stakeholder forum.",
    received: false,
  },
  {
    id: "m-2025-03-10",
    title: "Stakeholder Forum Minutes (March 2025)",
    date: "2025-03-10",
    file: "/minutes/stakeholder-forum-mar-2025.pdf",
    summary: "Notes and action points from the county stakeholder forum.",
    received: false,
  },
  {
    id: "m-2025-04-10",
    title: "Stakeholder Forum Minutes (April 2025)",
    date: "2025-04-10",
    file: "/minutes/stakeholder-forum-apr-2025.pdf",
    summary: "Notes and action points from the county stakeholder forum.",
    received: false,
  },
];

function MinuteCard({ item, onToggleReceived }) {
  return (
    <article className={styles.card} aria-labelledby={`min-${item.id}-title`}>
      <div className={styles.row}>
        <div className={styles.iconWrap}>
          <FontAwesomeIcon icon={faFileLines} className={styles.icon} />
        </div>

        <div className={styles.meta}>
          <h3 id={`min-${item.id}-title`} className={styles.title}>
            {item.title}
          </h3>
          <div className={styles.small}>
            <time className={styles.date}>
              <FontAwesomeIcon icon={faCalendarAlt} />{" "}
              {new Date(item.date).toLocaleDateString()}
            </time>
            <span className={styles.sep}>•</span>
            <span className={styles.summary}>{item.summary}</span>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={`${styles.btn} ${styles.view}`}
          onClick={() =>
            window.open(item.file, "_blank", "noopener,noreferrer")
          }
          title="View"
        >
          <FontAwesomeIcon icon={faEye} />{" "}
          <span className={styles.btnLabel}>View</span>
        </button>

        <a
          className={`${styles.btn} ${styles.download}`}
          href={item.file}
          download
          title="Download"
        >
          <FontAwesomeIcon icon={faDownload} />{" "}
          <span className={styles.btnLabel}>Download</span>
        </a>

        <button
          className={`${styles.btn} ${
            item.received ? styles.receivedBtn : styles.pendingBtn
          }`}
          onClick={() => onToggleReceived(item.id)}
          title={item.received ? "Mark as not received" : "Mark as received"}
        >
          <FontAwesomeIcon icon={item.received ? faCheckCircle : faCircle} />
          <span className={styles.btnLabel}>
            {item.received ? "Received" : "Mark Received"}
          </span>
        </button>
      </div>
    </article>
  );
}

export default function MinutesPage() {
  const [items, setItems] = useState(MOCK_MINUTES);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all"); // all | received | pending

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((it) => {
      if (filter === "received" && !it.received) return false;
      if (filter === "pending" && it.received) return false;
      if (!q) return true;
      return (
        it.title.toLowerCase().includes(q) ||
        it.summary.toLowerCase().includes(q) ||
        it.date.toLowerCase().includes(q)
      );
    });
  }, [items, query, filter]);

  function toggleReceived(id) {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, received: !it.received } : it))
    );
  }

  function clearSearch() {
    setQuery("");
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.h1}>Senate Liaison Office — Minutes</h1>
          <p className={styles.lead}>
            View, download and mark minutes as received. Mobile-first layout.
          </p>
        </div>

        <div className={styles.controls}>
          <div className={styles.search}>
            <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
            <input
              type="search"
              placeholder="Search minutes, summaries, dates..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={styles.searchInput}
              aria-label="Search minutes"
            />
            {query && (
              <button
                className={styles.clear}
                onClick={clearSearch}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className={styles.filter}>
            <FontAwesomeIcon icon={faFilter} className={styles.filterIcon} />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={styles.select}
              aria-label="Filter minutes"
            >
              <option value="all">All</option>
              <option value="received">Received</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </header>

      <section className={styles.list}>
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            No minutes match your search/filter.
          </div>
        ) : (
          filtered.map((m) => (
            <MinuteCard key={m.id} item={m} onToggleReceived={toggleReceived} />
          ))
        )}
      </section>

      <footer className={styles.footer}>
        <small>Updated: {new Date().toLocaleDateString()}</small>
      </footer>
    </main>
  );
}
